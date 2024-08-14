import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import * as questionService from './QuestionClient';
import * as answerService from './AnswerClient';
import * as quizService from './client';
import './style.css';

interface Question {
  title: string;
  _id: string;
  text: string;
  points: number;
  type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false';
  options?: string[];
  answers: string[];
}

interface Answer {
  questionId: string;
  answers: string[];
  score: number;
  quizId: string;
}

interface Quiz {
  title: string;
}

const getUserAnswerForQuestion = async (userId: string, questionId: string) => {
  const response = await answerService.fetchAnswer(userId, questionId);
  return response;
};

const selectCurrentUser = createSelector(
  (state: any) => state.accountReducer,
  (accountReducer) => accountReducer.currentUser
);

export default function QuizResults() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState<number>(0);
  const [quizDetails, setQuizDetails] = useState<Quiz | null>(null);
  const currentUser = useSelector(selectCurrentUser);

  const loadQuestions = async () => {
    try {
      const retrievedQuestions = await questionService.findAllQuestionsByQuizId(qid as string);
      setQuestions(retrievedQuestions);
    } catch (error) {
      console.error('Error retrieving questions:', error);
    }
  };

  const loadQuizDetails = async () => {
    try {
      const retrievedQuizDetails = await quizService.findQuiz(cid as string, qid as string);
      setQuizDetails(retrievedQuizDetails);
    } catch (error) {
      console.error('Error retrieving quiz details:', error);
    }
  };

  const loadUserAnswers = async () => {
    try {
      const answers = await Promise.all(
        questions.map(async (question) => {
          const answer = await getUserAnswerForQuestion(currentUser?._id, question._id);
          return { ...answer, questionId: question._id };
        })
      );
      setUserAnswers(answers);
    } catch (error) {
      console.error('Error retrieving user answers:', error);
    }
  };

  useEffect(() => {
    loadQuestions();
    loadQuizDetails();
  }, [qid]);

  useEffect(() => {
    if (questions.length > 0) {
      loadUserAnswers();
    }
  }, [questions]);

  const computeScore = () => {
    let calculatedScore = 0;
    questions.forEach((question: Question) => {
      const userAnswer = userAnswers.find((answer: Answer) => answer.questionId === question._id);
      if (userAnswer) {
        const isAnswerCorrect = question.answers.every(
          (correctAnswer, index) => userAnswer.answers[index] === correctAnswer
        );
        if (isAnswerCorrect) {
          calculatedScore += question.points;
        }
      }
    });
    setScore(calculatedScore);
  };

  useEffect(() => {
    if (questions.length > 0 && userAnswers.length > 0) {
      computeScore();
    }
  }, [questions, userAnswers]);

  return (
    <div className='container mt-4'>
      <b>You cannot retake this quiz since you have viewed the results.</b>
      <br />
      <h2 className='quiz-title text-center'>{quizDetails?.title}</h2>
      <h3 className='score text-center'>Your Score: {score}</h3>
      {questions.map((question: Question) => {
        const userAnswer = userAnswers.find((answer: Answer) => answer.questionId === question._id);
        const isCorrect =
          userAnswer &&
          question.answers.every(
            (correctAnswer, index) => userAnswer.answers[index] === correctAnswer
          );

        return (
          <div key={question._id} className='card my-3'>
            <div className='card-header'>
              <h3>{question.title}</h3>
            </div>
            <div className='card-body'>
              <p>{question.text}</p>
              {question.type === 'multiple-choice' ? (
                <ul className='list-group'>
                  {question.options?.map((option) => (
                    <li key={option} className='list-group-item'>
                      <label className='form-check-label'>
                        <input
                          type='radio'
                          name={question._id}
                          value={option}
                          checked={userAnswer?.answers[0] === option}
                          readOnly
                          className='form-check-input me-2'
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : question.type === 'fill-in-the-blank' ? (
                <>
                  {question.answers.map((_, index) => (
                    <div key={index}>
                      <p>Blank {index + 1}:</p>
                      <input
                        type='text'
                        value={userAnswer?.answers[index] || ''}
                        readOnly
                        className='form-control mb-2'
                      />
                    </div>
                  ))}
                </>
              ) : (
                <ul className='list-group'>
                  {['True', 'False'].map((option) => (
                    <li key={option} className='list-group-item'>
                      <label className='form-check-label'>
                        <input
                          type='radio'
                          name={question._id}
                          value={option}
                          checked={userAnswer?.answers[0] === option}
                          readOnly
                          className='form-check-input me-2'
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              <p className='mt-3'>
                Your Answers: {userAnswer?.answers.join(', ')} <br />
                {isCorrect ? (
                  <span className='text-success'>Correct!</span>
                ) : (
                  <span className='text-danger'>
                    Correct Answers: {question.answers.join(', ')}
                  </span>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
