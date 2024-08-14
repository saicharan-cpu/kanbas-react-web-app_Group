import React, { useState, useEffect } from 'react';
import { IoTrashOutline } from "react-icons/io5";
import RichTextEditor from '../../../../RichTextEditor';

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

interface Ans {
  text: string;
  isCorrect: boolean;
}

interface MCQEditorProps {
  question: Que;
  onChange: (updatedQuestion: Que) => void;
}

export default function MCQEditor({
  question: initialQuestion,
  onChange
}: MCQEditorProps) {
  const [questionText] = useState(initialQuestion.text || '')
  const [points] = useState(initialQuestion.points || 0)
  const [description, setDescription] = useState(
    initialQuestion.description || ''
  );
  const [answers, setAnswers] = useState<Ans[]>(
    initialQuestion.options?.map(option => ({
      text: option, isCorrect: initialQuestion.answers.includes(option)
    })) || [{ text: '', isCorrect: false }]
  );

  useEffect(() => {
    const updatedQuestion = { ...initialQuestion, text: questionText,  points, description,
      options: answers.map(answer => answer.text), answers: answers
        .filter(answer => answer.isCorrect)
        .map(answer => answer.text)
    };
    onChange(updatedQuestion)
  }, [questionText, points, description, answers]);

  const handleFontChange = (value: string) => {
    setDescription(value);};

  const addAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]); };

  const handleCorrectAnsChange = (index: number) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer, isCorrect: i === index ? !answer.isCorrect : false 
    }))
    setAnswers(newAnswers); };

  const handleAnsChange = (
    index: number, e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAnswers = [...answers]
     newAnswers[index].text = e.target.value
     setAnswers(newAnswers); };

  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index)); };

  return (
    <div className='mcq-editor'>
      <div>
        <p> Enter your question and possible answers, then select the which is the correct one.</p>
      </div>
      <div>
        <label htmlFor='description' className='form-label'>
          <h6>Question:</h6>
        </label>
        <RichTextEditor value={description} onChange={handleFontChange} />
      </div>

      <div className='mb-3'>
        <label className='form-label'>Answers:</label>
        {answers.map((answer, index) => (
          <div key={index} className='input-group mb-2'>
            <span className='input-group-text'>
              {answer.isCorrect ? (
                <span className='text-success' style={{ marginRight: '0.9ch' }}> Correct Answer </span>
              ) : ('Possible Answer')}</span>
            <input
              className='form-control' type='text' value={answer.text}
              onChange={e => handleAnsChange(index, e)} />
            <button
              type='button' className={`btn rounded ${answer.isCorrect ? 'btn-success' : 'btn-outline-secondary'  }`}
              onClick={() => handleCorrectAnsChange(index)} >
              Correct answer </button>
            <button
              className='btn btn-outline-secondary' type='button'
              onClick={() => removeAnswer(index)}
              style={{ fontSize: '1.4rem', padding: '10px 30px' }} >
              <IoTrashOutline />
            </button>
          </div>
        ))}

        <button
          className='btn btn-outline-primary' type='button'
          onClick={addAnswer}>
          + Add Another Answer </button>
      </div>  </div> 
  )}
