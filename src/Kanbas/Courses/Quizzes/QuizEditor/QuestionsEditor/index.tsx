import React, { useState, useEffect } from 'react';
import MCQEditor from './MCQEditor';
import FIBEditor from './FIBEditor';
import TFQEditor from './TFQEditor';
import * as client from '../../QuestionClient';
import { useParams } from 'react-router';
import * as quizClient from '../../client';
import { IoTrashOutline } from "react-icons/io5";

interface Que {
  title: string;
  _id: string;
  text: string;
  points: number;
  description: string;
  type: 'multiple-choice' | 'true-false' | 'fill-in-the-blank';
  options?: string[];
  answers: string[];
}

interface Quiz {
  _id: string;
  points: number;
}

export default function QuizQuestionEditor() {
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<Que[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const fetchedQuestion = await client.findAllQuestionsByQuizId(
          qid as string);
        setQuestions(fetchedQuestion);
      } catch (error) {
        console.error('Error in fetching question:', error);
      }
    }

    const fetchQuiz = async () => {
      try {
        const fetchedQuizzes = await quizClient.findQuizById(qid as string)
        setQuiz(fetchedQuizzes);
      } catch (error) {
        console.error('Error in fetching quiz:', error);
      }
    }

    fetchQuestion()
    fetchQuiz()
  }, [qid]);

  const renderEditor = (question: Que, index: number) => {
    const handleEditorChange = (updatedQuestion: Que) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = updatedQuestion;
      setQuestions(updatedQuestions);
    }

    switch (question.type) {
      case 'multiple-choice':
        return <MCQEditor question={question} onChange={handleEditorChange} />

      case 'fill-in-the-blank':
        return (
          <FIBEditor
            question={question}
            onChange={handleEditorChange} />)

      case 'true-false':
        return <TFQEditor question={question} onChange={handleEditorChange} />

      default:
        return <MCQEditor question={question} onChange={handleEditorChange} />
    }
  }

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: '',
        _id: '',
        text: '',
        points: 0,
        description: '',
        type: 'multiple-choice',
        answers: []
      }])
  }

  const handleSaveChanges = async () => {
    const fetchedQuestion = await client.findAllQuestionsByQuizId(
      qid as string);
    setQuestions(fetchedQuestion);
    try {
      for (const question of questions) {
        if (question._id) {
          await client.updateQuestion(question);
        } else {
          await client.createQuestion(qid as string, question)
        }
      }

      const fetchedQuestion = await client.findAllQuestionsByQuizId(
        qid as string);
      setQuestions(fetchedQuestion);

      const totalPoints = questions.reduce(
        (acc, question) => acc + question.points, 0)
      if (quiz) {
        await quizClient.updateQuiz({
          ...quiz,
          points: totalPoints
        });
      }
      alert('Changes saved successfully');
    } catch (error) {
      console.error('Error in saving the changes:', error);
    }
  }

  const handleDeleteClick = async (_id: string) => {
    try {
      if (_id) {
        await client.deleteQuestion(_id);
      }
      setQuestions(questions.filter(question => question._id !== _id));
    } catch (error) {
      console.error('Error in deleting the question:', error);
      alert('Failed to delete question. Please try again.');
    }
  }

  if (questions.length === 0) {
    return (
      <div className='d-flex justify-content-center'>
        <button className='btn btn-danger mb-2' type='button'
          onClick={handleAddQuestion} >
          + Add Question </button>
      </div>)
  }

  return (
    <div><br />
      <h1>Quiz Question Editor</h1>
      <hr /><br />
      {questions.map((question, index) => (
        <div key={index} className='card mb-4'>
          <div className='card-header align-items-center d-flex'>
            <div className=' flex-grow-1 me-4'>
              <input className='form-control' placeholder='Question Title'
                type='text' value={question.title}
                onChange={e => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].title = e.target.value;
                  setQuestions(updatedQuestions);
                }} />
            </div>

            <div id='wd-css-style-dropdowns' className='me-2'>
              <select className='form-select'
                value={question.type}
                onChange={e => {
                  const updatedQuestions = [...questions]
                  updatedQuestions[index].type = e.target.value as
                    | 'multiple-choice'
                    | 'true-false'
                    | 'fill-in-the-blank'
                  setQuestions(updatedQuestions)
                }} >
                <option value='multiple-choice'>Multiple choice</option>
                <option value='fill-in-the-blank'>Fill in the blanks</option>
                <option value='true-false'>True/False</option>
              </select>
            </div>

            <div className=' d-flex align-items-center'>
              <label htmlFor='points' className='form-label me-2 mb-0 '>
                <h6>pts:</h6>  </label>

              <input style={{ height: '40px'  }} className='form-control w-auto d-inline-block' id='question-points'
                type='number' placeholder='0'
                value={question.points}
                onChange={e => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].points = Number(e.target.value);
                  setQuestions(updatedQuestions);
                }}
                min='0' step='1' />

              <div className='ms-3'
                style={{ padding: '20px 30px', fontSize: '1.4rem' }}>
                <IoTrashOutline
                  className='text-danger'
                  onClick={() => handleDeleteClick(question._id)} /> </div>
            </div>
          </div>

          <div className='card-body'>{renderEditor(question, index)}</div>
          <div className='d-flex justify-content-center m-3'>
            <button type='button' className='btn btn-secondary me-3'
              onClick={() => handleDeleteClick(question._id)} >
              Cancel </button>
            <button
              type='button' className='btn btn-primary'
              onClick={handleSaveChanges} >
              Save Question </button>
          </div>  </div>))}

      <div className='d-flex justify-content-center'>
        <button
          type='button'
          className='btn btn-primary mb-2'
          onClick={handleAddQuestion} >
          + Add Question </button>
      </div></div>)
}