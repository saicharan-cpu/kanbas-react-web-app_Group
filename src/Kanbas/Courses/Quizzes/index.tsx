import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import { deleteQuizzes, setQuizzes } from './reducer';
import * as client from './client';
import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineStop } from 'react-icons/ai';
import { BsGripVertical } from 'react-icons/bs';
import { FaCheckCircle, FaPlus } from 'react-icons/fa';
import { FaEllipsisVertical } from "react-icons/fa6";
import { BiSolidCheckCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { IoRocket } from 'react-icons/io5';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import * as questionClient from './QuestionClient';
import * as answerClient from './AnswerClient';

const defaultDate = new Date().toISOString().split('T')[0];

interface Question {
  _id: string;
  points: number;
  answers: string[];
}

interface Answer {
  questionId: string;
  answers: string[];
}

interface QuizDetails {
  score: number;
  numQuestions: number;
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return format(date, "MMM d 'at' h a");
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export default function QuizList() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) =>
    state.quizzesReducer.quizzes.filter((quiz: any) => quiz.course === cid)
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const userRole = currentUser?.role;

  const [showModal, setShowModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<{ [key: string]: boolean }>({});
  const [searchInput, setSearchInput] = useState('');
  const [quizDetailsMap, setQuizDetailsMap] = useState<{ [key: string]: QuizDetails }>({});

  const fetchQuizzes = useCallback(async () => {
    try {
      const quizzes = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
    } catch (error) {
      console.error('Error in fetching quizzes:', error);
    }
  }, [cid, dispatch]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const handleDeleteClick = (quizId: string) => {
    setSelectedQuizId(quizId);
    setShowModal(true);
    setShowPopup({});
  };

  const handleDeleteConfirm = async () => {
    if (selectedQuizId) {
      await client.deleteQuiz(selectedQuizId);
      dispatch(deleteQuizzes(selectedQuizId));
      setShowModal(false);
      setSelectedQuizId(null);
      fetchQuizzes(); 
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setSelectedQuizId(null);
  };

  const togglePopup = (quizId: string) => {
    setShowPopup((prev) => ({
      ...prev,
      [quizId]: !prev[quizId],
    }));
  };

  const handlePublishToggle = async (quiz: any) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    try {
      await client.updateQuiz(updatedQuiz);
      setShowPopup({});
      fetchQuizzes(); 
    } catch (error) {
      console.error('Error in updating quiz:', error);
    }
  };

  const fetchUserAnswers = useCallback(
    async (questions: Question[]): Promise<Answer[]> => {
      try {
        const answers = await Promise.all(
          questions.map(async (question: Question) => {
            const answer = await answerClient.fetchAnswer(
              currentUser?._id,
              question._id
            );
            return { ...answer, questionId: question._id };
          })
        );
        return answers;
      } catch (error) {
        console.error('Error in fetching user answers:', error);
        return [];
      }
    },
    [currentUser?._id]
  );

  const calculateScore = useCallback((questions: Question[], userAnswers: Answer[]): number => {
    let newScore = 0;
    questions.forEach((question) => {
      const userAnswer = userAnswers.find((answer) => answer.questionId === question._id);
      if (
        userAnswer &&
        question.answers.every((correctAnswer, index) => userAnswer.answers[index] === correctAnswer)
      ) {
        newScore += question.points;
      }
    });
    return newScore;
  }, []);

  const getQuizDetails = useCallback(
    async (quizId: string): Promise<QuizDetails> => {
      const questions = await questionClient.findAllQuestionsByQuizId(quizId);
      const answers = await fetchUserAnswers(questions);
      const score = calculateScore(questions, answers);
      return { score, numQuestions: questions.length };
    },
    [fetchUserAnswers, calculateScore]
  );

  const fetchQuizDetails = async (quizId: string) => {
    const details = await getQuizDetails(quizId);
    setQuizDetailsMap((prevDetailsMap: { [key: string]: QuizDetails }) => ({
      ...prevDetailsMap,
      [quizId]: details,
    }));
  };

  const filteredQuizzes =
    userRole === 'STUDENT'
      ? quizzes.filter((quiz: any) => quiz.published)
      : quizzes.filter((quiz: any) =>
        quiz.title.toLowerCase().includes(searchInput.toLowerCase())
      );

  const currentDate = new Date();

  return (
    <div id='wd-quiz-list' className='container'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div className='input-group w-50'>
        </div>

        {userRole === 'FACULTY' && (
          <div className='d-flex'>
            <Link
              to={`/Kanbas/Courses/${cid}/Quizzes/New`}
              className='btn btn-danger me-2'
            >
              <FaPlus className='me-1' />
              Quiz
            </Link>
            <button className='btn btn-secondary me-2'>
              <FaEllipsisVertical  className='fs-5' />
            </button>
          </div>
        )}
      </div>
      <ul className='list-group p-0 mb-5 fs-5 border-gray'>
        <li className='list-group-item'>
          <h3 id='wd-quizzes-title' className='bg-light p-4 ps-2'>
            <BsGripVertical className='me-3' />
            Quizzes
            <div className='d-flex float-end'>
              <button className='percentage-badge border-gray float-end' style={{
                borderRadius
                  :
                  '12px'
              }}>
                20% of Total
              </button>
            </div>
          </h3>

          <div id='wd-quiz-list' className='list-group rounded-0'>
            {filteredQuizzes.map((quiz: any) => {
              const availableFrom = new Date(quiz.availableDate);
              const untilDate = new Date(quiz.untilDate);
              const dueDate = new Date(quiz.dueDate);

              let availabilityStatus;
              if (currentDate < availableFrom) {
                availabilityStatus = (
                  <span>
                    <strong> Not available until </strong>{' '}
                    {formatDate(quiz.availableDate)}
                  </span>
                );
              } else if (currentDate > untilDate) {
                availabilityStatus = <span className='text-danger'>Closed</span>;
              } else {
                availabilityStatus = (
                  <span>
                    <strong> Available from </strong>{' '}
                    {formatDate(quiz.availableDate)} <strong> until </strong>{' '}
                    {formatDate(quiz.untilDate)}
                  </span>
                );
              }

              const isStudentRestricted =
                userRole === 'STUDENT' &&
                (currentDate < availableFrom || currentDate > untilDate);

              if (!quizDetailsMap[quiz._id]) {
                fetchQuizDetails(quiz._id);
              }

              const quizDetails = quizDetailsMap[quiz._id];

              return (
                <li
                  key={quiz._id}
                  className='wd-quiz-list-item list-group-item p-3 ps-1'
                >
                  <div className='d-flex align-items-center'>
                    <div className='icons-wrapper'>
                      <BsGripVertical className='me-2 fs-3 icon-color' />
                      <IoRocket className='me-2 fs-5 icon-color' />
                    </div>
                    <div className='flex-grow-1'>
                      {isStudentRestricted ? (
                        <span className='text-muted'>
                          <strong>{quiz.title}</strong>
                        </span>
                      ) : (
                        <Link
                          className='wd-assignment-link text-green no-underline'
                          to={`/Kanbas/Courses/${cid}/quizzes/${quiz._id}`}
                        >
                          <strong>{quiz.title}</strong>
                        </Link>
                      )}
                      <br />
                      <span className='wd-quiz-details'>
                        {availabilityStatus}
                        <br />
                        <strong> Due</strong>{' '}
                        {formatDate(quiz.dueDate) || defaultDate} |
                        <strong> {quiz.points || 'No'}</strong> pts
                        {quizDetails && (
                          <>
                            <br />
                            <strong>Score:</strong> {quizDetails.score} pts |{' '}
                            <strong>Questions:</strong> {quizDetails.numQuestions}
                          </>
                        )}
                      </span>
                    </div>
                    {userRole === 'FACULTY' && (
                      <div className='d-flex position-relative'>
                        <div className='d-flex'>
                          {quiz.published ? (
                            <BiSolidCheckCircle className='me-5 text-success' />
                          ) : (
                            <AiOutlineStop className='text-danger me-3' />
                          )}
                        </div>
                        <FaEllipsisVertical 
                          className='fs-5'
                          onClick={() => togglePopup(quiz._id)}
                        />
                        {showPopup[quiz._id] && (
                          <div className='popup-menu position-absolute'>
                            <Link
                              id='wd-quiz-edit-btn'
                              className='dropdown-item'
                              to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/editor`}
                              onClick={() => setShowPopup({})}
                            >
                              <MdOutlineModeEditOutline />
                              Edit
                            </Link>
                            <button
                              className='dropdown-item text-danger'
                              onClick={() => {
                                handleDeleteClick(quiz._id);
                                setShowPopup({});
                              }} >
                              <IoTrashOutline />
                              Delete</button>
                            <button
                              id='wd-publish-btn'
                              className={`dropdown-item ${quiz.published ? 'text-success' : 'text-danger'
                                }`}
                              onClick={() => {
                                handlePublishToggle(quiz);
                                setShowPopup({});
                              }}
                            >
                              {quiz.published ? (
                                <>
                                  <FaCheckCircle className='me-2' />
                                  Published
                                </>
                              ) : (
                                <>
                                  <AiOutlineStop className='me-2' />
                                  Unpublished
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </div>
        </li>
      </ul>
      <div
        id='delete-modal'
        className={`modal fade ${showModal ? 'show' : ''}`}
        tabIndex={-1}
        aria-labelledby='deleteModalLabel'
        aria-hidden={!showModal}
        style={{ display: showModal ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='deleteModalLabel'>
                Confirm Delete
              </h5>
              <button
                type='button'
                className='btn-close'
                onClick={handleDeleteCancel}
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              Are you sure you want to delete the quiz?
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
