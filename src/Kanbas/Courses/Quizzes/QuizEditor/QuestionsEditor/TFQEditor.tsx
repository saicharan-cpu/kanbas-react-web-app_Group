
import React, { useState, useEffect } from 'react';
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

interface TFQEditorProps {
  question: Que;
  onChange: (updatedQuestion: Que) => void;
}

export default function TFQEditor({
  question: initialQuestion,
  onChange
}: TFQEditorProps) {
  const [editorValue, setEditorValue] = useState('');
  const [description, setDescription] = useState( initialQuestion.description || '' );
  const [answer, setAnswer] = useState(initialQuestion.answers[0] || 'false');

  useEffect(() => {
    setEditorValue(initialQuestion.description || '');
  }, [initialQuestion.description]);

  useEffect(() => {
    const updatedQuestion = {
      ...initialQuestion, description, answers: [answer] }
    onChange(updatedQuestion)
  }, [description, answer]);

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
    setDescription(value);
  }

  const handleAnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  }

  return (
    <div>
      <p> Enter your question text, then select if True or False is the correct answer. </p>
      <div className='mb-3'>
        <label htmlFor='question' className='form-label'>
          <h6>Question:</h6> </label>
        <RichTextEditor value={editorValue} onChange={handleEditorChange} /> </div>
      <div className='mb-3'>
        <label className='form-label'>Answers:</label> <div className='form-check'>
          <input className='form-check-input' type='radio' id='true' 
          name='answer' value='true' checked={answer === 'true'}
             onChange={handleAnsChange}/>
          <label htmlFor='true' className='form-check-label'>
            True </label> </div>
            
        <div className='form-check'>
          <input className='form-check-input' type='radio' id='false'
           name='answer' value='false' checked={answer === 'false'}
            onChange={handleAnsChange} />
          <label htmlFor='false' className='form-check-label'>
            False</label>
        </div> </div>
    </div>
  )}