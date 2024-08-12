import React, { useState, useEffect } from 'react';
import RichTextEditor from '../../../../RichTextEditor';
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

interface Ans {
  text: string;
  isCorrect: boolean;
}

interface FIBEditorProps {
  question: Que;
  onChange: (updatedQuestion: Que) => void;
}

export default function FIBEditor({
  question: initialQuestion,
  onChange
}: FIBEditorProps) {
  const [answers, setAnswers] = useState<Ans[]>(
    initialQuestion.answers.map(answer => ({
      text: answer,
      isCorrect: true
    })) || [{ text: '', isCorrect: false }]
  );
  const [questionText] = useState(initialQuestion.text || '');
  const [points] = useState(initialQuestion.points || 0);
  const [description, setDescription] = useState(
    initialQuestion.description || '');

  useEffect(() => {
    const updatedQuestion = {
      ...initialQuestion, text: questionText, points, description,
      answers: answers.map(answer => answer.text)
    };
    onChange(updatedQuestion);
  }, [questionText, points, description, answers]);


  const handleAnswerChange = (
    index: number, e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAnswers = [...answers];
    newAnswers[index].text = e.target.value;
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]);
  };

  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleEditorChange = (value: string) => {
    setDescription(value);
  };

  return (
    <div>
      <p> Enter your question text, then define the correct answer for
        the blank. Students will see the questions followed by a small text box to type their answer.</p>

      <div className='mb-3'>
        <label htmlFor='descriptions' className='form-label'>
          <h6>Question:</h6>
        </label>
        <RichTextEditor value={description} onChange={handleEditorChange} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Answer:</label>
        {answers.map((answer, index) => (
          <div key={index} className='input-group mb-2'>
            <span className='input-group-text'>
              {answer.isCorrect ? (
                <span className='text-success'>Correct Answer</span>
              ) : ('Possible Answer')} </span>
            <input className='form-control'
              type='text' value={answer.text}
              onChange={e => handleAnswerChange(index, e)} />
            <button className='btn btn-outline-secondary'
              type='button' onClick={() => removeAnswer(index)}
              style={{ fontSize: '1.4rem', padding: '10px 30px' }} >
              <IoTrashOutline />
            </button>
          </div> ))}

        <button className='btn btn-outline-primary'
          type='button'
          onClick={addAnswer}>
          + Add Another Answer </button>
      </div></div>)
}