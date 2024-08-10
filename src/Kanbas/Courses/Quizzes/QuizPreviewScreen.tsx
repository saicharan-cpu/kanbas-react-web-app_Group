import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as questionService from './QuestionClient';
import * as answerService from './AnswerClient';
import * as quizService from './client';
import { setQuestions as setQuestionsAction } from './QuestionsReducer';
import { addAnswer, updateAnswer } from './AnswerReducer';
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

interface Answers {
  [key: string]: string | string[];
}

interface Quiz {
  title: string;
  multipleAttempts: boolean;
  attempts: number;
  timeLimit: number;
  userAttempts: string[];
}

export default function QuizPreview() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState<Answers>({});
  const [score, setScore] = useState<number | null>(null);
  const [incorrectQuestions, setIncorrectQuestions] = useState<string[]>([]);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [quizInfo, setQuizInfo] = useState<Quiz | null>(null);
  const [submissionCount, setSubmissionCount] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | null>(null);
  const [allScores, setAllScores] = useState<number[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<{
    [key: string]: string[];
  }>({});
  const [isEligibleToAttempt, setIsEligibleToAttempt] = useState<boolean>(true);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const questions = useSelector((state: any) =>
    state.questionsReducer.questions.filter(
      (question: any) => question.quiz === qid
    )
  );

  const loadQuestions = async () => {
    try {
      const retrievedQuestions = await questionService.findAllQuestionsByQuizId(
        qid as string
      );
      const formattedQuestions = retrievedQuestions.map(
        (question: Question) => {
          if (
            question.type === 'true-false' &&
            (!question.options || question.options.length === 0)
          ) {
            return { ...question, options: ['True', 'False'] };
          }
          return question;
        }
      );
      dispatch(setQuestionsAction(formattedQuestions));
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  const loadQuizInfo = async () => {
    try {
      const retrievedQuizInfo = await quizService.findQuiz(
        cid as string,
        qid as string
      );
      setQuizInfo(retrievedQuizInfo);
      const attemptsStatus = await quizService.checkAttempts(qid as string, currentUser?._id);
      setIsEligibleToAttempt(attemptsStatus.canAttempt);
      if (retrievedQuizInfo.multipleAttempts) {
        setRemainingAttempts(retrievedQuizInfo.attempts - attemptsStatus.attempts);
      } else {
        setRemainingAttempts(1 - attemptsStatus.attempts);
      }
      if (retrievedQuizInfo.timeLimit) {
        setTimeRemaining(retrievedQuizInfo.timeLimit * 60);
      }
    } catch (error) {
      console.error('Error loading quiz details:', error);
    }
  };

  const formatTimeDisplay = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    loadQuestions();
    loadQuizInfo();
  }, [qid]);

  useEffect(() => {
    if (timeRemaining > 0 && isEligibleToAttempt && submissionCount === 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      setActiveTimer(intervalId);
      return () => clearInterval(intervalId);
    } else if (timeRemaining === 0) {
      handleSubmission();
    }
  }, [timeRemaining, isEligibleToAttempt, submissionCount]);

  const handleAnswerUpdate = (questionId: string, index: number, answer: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      if (Array.isArray(updatedAnswers[questionId])) {
        (updatedAnswers[questionId] as string[])[index] = answer;
      } else {
        updatedAnswers[questionId] = [answer];
      }
      return updatedAnswers;
    });
  };

  const handleSimpleAnswerUpdate = (questionId: string, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmission = async () => {
    if (activeTimer) {
      clearInterval(activeTimer);
      setActiveTimer(null);
    }

    let calculatedScore = 0;
    const incorrectList: string[] = [];
    const incorrectAnswerMap: { [key: string]: string[] } = {};
    const answersPayload: any[] = [];

    questions.forEach((question: Question) => {
      const userAnswers = Array.isArray(answers[question._id])
        ? (answers[question._id] as string[])
        : [answers[question._id] as string];

      let isCorrect = true;
      question.answers.forEach((correctAnswer, index) => {
        if (userAnswers[index] !== correctAnswer) {
          isCorrect = false;
        }
      });

      if (isCorrect) {
        calculatedScore += question.points;
      } else {
        incorrectList.push(question._id);
        incorrectAnswerMap[question._id] = userAnswers;
      }

      const answerData = {
        userId: currentUser?._id,
        quizId: qid as string,
        questionId: question._id,
        answer: userAnswers,
        score: calculatedScore,
        attemptNumber: submissionCount + 1,
        submittedAt: new Date(),
      };

      answersPayload.push(answerData);
    });

    try {
      for (const answerData of answersPayload) {
        try {
          const existingAnswer = await answerService.fetchAnswer(
            answerData.userId,
            answerData.questionId
          );
          if (existingAnswer) {
            await answerService.updateAnswer(
              answerData,
              answerData.questionId,
              currentUser._id
            );
            dispatch(updateAnswer(answerData));
          } else {
            await answerService.createAnswer(
              answerData.questionId as string,
              answerData as any
            );
            dispatch(addAnswer(answerData));
          }
        } catch (error: any) {
          if (error.response && error.response.status === 404) {
            await answerService.createAnswer(
              answerData.questionId as string,
              answerData as any
            );
            dispatch(addAnswer(answerData));
          } else {
            console.error('Error processing answer:', error);
          }
        }
      }

      const updatedQuiz = {
        ...quizInfo,
        userAttempts: [...(quizInfo?.userAttempts || []), currentUser?._id],
      } as Quiz;
      await quizService.updateQuiz(updatedQuiz);

    } catch (error) {
      console.error('Error saving answers:', error);
    }

    setScore(calculatedScore);
    setAllScores([...allScores, calculatedScore]);
    setIncorrectQuestions(incorrectList);
    setWrongAnswers(incorrectAnswerMap);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setSubmissionCount((prevCount) => prevCount + 1);

    setTimeRemaining(60);
  };

  const handleRetryQuiz = () => {
    setAnswers({});
    setScore(null);
    setIncorrectQuestions([]);
    setTimeRemaining(60);
  };

  const generateScoreComment = (percentage: number) => {
      return 'Here is your Score!!!';
  };

  const handleResultsView = async () => {
    try {
      if (quizInfo?.multipleAttempts) {
        const updatedQuiz: Quiz = {
          ...quizInfo,
          userAttempts: Array(quizInfo.attempts).fill(currentUser?._id),
        } as Quiz;
        await quizService.updateQuiz(updatedQuiz);
        setQuizInfo(updatedQuiz);
      } else {
        const updatedQuiz: Quiz = {
          ...quizInfo,
          userAttempts: [currentUser?._id],
        } as Quiz;
        await quizService.updateQuiz(updatedQuiz);
        setQuizInfo(updatedQuiz);
      }
      setRemainingAttempts(0);
      setIsEligibleToAttempt(false);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/results`);
    } catch (error) {
      console.error('Error updating quiz attempts:', error);
    }
  };

  const handleQuizEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`);
  };

  const totalPointsAvailable = questions.reduce(
    (acc: number, q: Question) => acc + q.points,
    0
  );
  const percentageScore = score !== null ? (score / totalPointsAvailable) * 100 : 0;
  const scoreCommentary = generateScoreComment(percentageScore);

  useEffect(() => {
    if (quizInfo) {
      if (!quizInfo.multipleAttempts) {
        setRemainingAttempts(1);
        setSubmissionCount(0);
        localStorage.setItem(`quiz-${qid}-remainingAttempts`, '1');
      } else {
        const storedAttempts = localStorage.getItem(
          `quiz-${qid}-remainingAttempts`
        );
        setRemainingAttempts(
          storedAttempts ? parseInt(storedAttempts) : quizInfo.attempts
        );
      }
    }
  }, [quizInfo?.multipleAttempts]);

  return (
    <div className='container mt-5'>
      {score !== null && (
        <div className='mt-4'>
          <div className='card text-center'>
            <div className='card-header'>
              <h3 className='card-title'>Total Score</h3>
            </div>
            <div className='card-body'>
              <h1 className='display-4'>{score}</h1>
              <p className='card-text'>
                You scored {score} points out of a possible {totalPointsAvailable}.<br />
              </p>
            </div>
            <div className='card-footer text-muted'>{scoreCommentary}</div>
          </div>
        </div>
      )}
      <h1>{quizInfo?.title}</h1>
      {!isEligibleToAttempt ? (
        <div className='alert alert-warning' role='alert'>
          Unable to take the quiz. You have used all your attempts.
          <button
            className='btn btn-danger view-results-btn mt-3'
            onClick={handleResultsView}
          >
            View Results
          </button>
        </div>
      ) : (
        remainingAttempts !== null && remainingAttempts > 0 && submissionCount === 0 ? (
          <>
            {submissionCount <
              (quizInfo?.multipleAttempts ? quizInfo.attempts : 1) && (
                <div className='alert alert-info' role='alert'>
                  Time left: {formatTimeDisplay(timeRemaining)}
                </div>
              )}
            {quizInfo?.multipleAttempts ? (
              remainingAttempts > 0 ? (
                <div className='alert alert-warning' role='alert'>
                  This quiz allows multiple attempts. Attempts left: {remainingAttempts}
                </div>
              ) : (
                <div className='alert alert-warning' role='alert'>
                  Unable to retake the quiz. You have used all your attempts.
                </div>
              )
            ) : (
              <div className='alert alert-warning' role='alert'>
                You are only allowed to take this quiz once.
              </div>
            )}
            {currentUser?.role !== 'STUDENT' && (
              <div className='alert alert-info' role='alert'>
                This is a preview of the published version of the quiz.
              </div>
            )}
            <h2>Quiz Instructions</h2>
            {questions.map((question: Question, index: number) => (
              <div
                key={question._id}
                className={`card mb-3 ${
                  incorrectQuestions.includes(question._id) ? 'border-danger' : ''
                }`}
              >
                <div className='card-header d-flex justify-content-between'>
                  <h3>Question {index + 1}</h3>
                  <span>{question.points} pts</span>
                </div>
                <div className='card-body'>
                  <h4>{question.title}</h4>
                  <p>{question.text}</p>
                  {question.type === 'multiple-choice' && (
                    <div className='list-group'>
                      {question.options?.map((option) => (
                        <label
                          key={option}
                          className='list-group-item d-flex align-items-center'
                        >
                          <input
                            type='radio'
                            name={`question-${question._id}`}
                            value={option}
                            checked={answers[question._id] === option}
                            onChange={() => handleSimpleAnswerUpdate(question._id, option)}
                            className='me-2'
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                  {question.type === 'true-false' && (
                    <div className='list-group'>
                      <label className='list-group-item d-flex align-items-center'>
                        <input
                          type='radio'
                          name={`question-${question._id}`}
                          value='true'
                          checked={answers[question._id] === 'true'}
                          onChange={() => handleSimpleAnswerUpdate(question._id, 'true')}
                          className='me-2'
                        />
                        True
                      </label>
                      <label className='list-group-item d-flex align-items-center'>
                        <input
                          type='radio'
                          name={`question-${question._id}`}
                          value='false'
                          checked={answers[question._id] === 'false'}
                          onChange={() => handleSimpleAnswerUpdate(question._id, 'false')}
                          className='me-2'
                        />
                        False
                      </label>
                    </div>
                  )}
                  {question.type === 'fill-in-the-blank' && (
                    <div className='mb-3'>
                      {question.answers.map((_, index) => (
                        <input
                          key={index}
                          type='text'
                          className='form-control my-2'
                          value={
                            Array.isArray(answers[question._id])
                              ? (answers[question._id] as string[])[index] || ''
                              : ''
                          }
                          onChange={(e) =>
                            handleAnswerUpdate(question._id, index, e.target.value)
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className='d-flex justify-content-between mt-3'>
              {currentUser?.role !== 'STUDENT' && (
                <button onClick={handleQuizEdit} className='btn btn-secondary'>
                  Keep Editing This Quiz
                </button>
              )}
              {(quizInfo?.multipleAttempts
                  ? submissionCount < quizInfo.attempts
                  : submissionCount < 1) && timeRemaining > 0 ? (
                <button onClick={handleSubmission} className='btn btn-primary'>
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleRetryQuiz}
                  className='btn btn-warning'
                  disabled
                >
                  You Can't Retake Quiz (Attempts left: 0)
                </button>
              )}
              {submissionCount > 0 && (
                <button
                  className='btn btn-danger view-results-btn'
                  onClick={handleResultsView}
                >
                  View Results
                </button>
              )}
            </div>
          </>
        ) : (
          <div className='alert alert-warning' role='alert'>
            <button
              className='btn btn-danger view-results-btn mt-3'
              onClick={handleResultsView}
            >
              View Results
            </button>
          </div>
        )
      )}
      {score !== null && (
        <>
          {score > 0 && (
            <div className='mt-5'>
              <h3> Score: {score}</h3>
              <ul className='list-group'>
                {Object.entries(answers).map(([questionId, userAnswer]) => (
                  <li key={questionId} className='list-group-item'>
                    <strong>
                      Question{' '}
                      {questions.findIndex((q: any) => q._id === questionId) + 1}
                      :
                    </strong>{' '}
                    {Array.isArray(userAnswer)
                      ? userAnswer.map((answer, i) => <div key={i}>{answer}</div>)
                      : userAnswer}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {Object.keys(wrongAnswers).length > 0 && (
            <div className='mt-5'>
              <h3>Incorrect Answers and Correct Answers:</h3>
              <ul className='list-group'>
                {Object.entries(wrongAnswers).map(
                  ([questionId, userAnswers]) => (
                    <li key={questionId} className='list-group-item'>
                      <strong>
                        Question{' '}
                        {questions.findIndex((q: any) => q._id === questionId) + 1}
                        :
                      </strong>{' '}
                      Your answers:{' '}
                      <ul>
                        {userAnswers.map((answer, i) => (
                          <li key={i}>{answer}</li>
                        ))}
                      </ul>
                      Correct answers:
                      <ul>
                        {questions
                          .find((q: any) => q._id === questionId)
                          ?.answers.map((correctAnswer: string, i: number) => (
                            <li key={i}>{correctAnswer}</li>
                          ))}
                      </ul>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
