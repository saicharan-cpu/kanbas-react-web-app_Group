import { BsGripVertical, BsPlus } from 'react-icons/bs';
import {
  FaCheckCircle,
  FaPlus,
  FaSearch,
  FaTrash,
  FaRegSmileWink,
} from 'react-icons/fa';
import { IoIosRocket } from 'react-icons/io';
import { IoEllipsisVertical } from 'react-icons/io5';
import { VscNotebook } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import { addQuizzes, deleteQuizzes, updateQuizzes, setQuizzes } from './reducer';
import * as client from './client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineStop } from 'react-icons/ai';
import { MdOutlineModeEditOutline } from 'react-icons/md';

const defaultDate = new Date().toISOString().split('T')[0];

export default function Quiz() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) =>
    state.quizzesReducer.quizzes.filter((quiz: any) => quiz.course === cid)
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const userRole = currentUser.role;

  const fetchQuizzes = async () => {
    try {
      console.log('Fetching courses for id:' + cid);
      const quizzes = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid, dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<{ [key: string]: boolean }>({});
  const [searchInput, setSearchInput] = useState('');

  const handleDeleteClick = (quizId: string) => {
    setSelectedQuizId(quizId);
    setShowModal(true);
    setShowPopup({});
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d 'at' h a");
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedQuizId) {
      await client.deleteQuiz(selectedQuizId);
      dispatch(deleteQuizzes(selectedQuizId));
      setShowModal(false);
      setSelectedQuizId(null);
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
      dispatch(updateQuizzes(updatedQuiz));
      setShowPopup({});
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
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
          <span className='input-group-text bg-white border-end-0'>
            <FaSearch />
          </span>
          <input
            id='wd-search-quizzes'
            className='form-control border-start-0'
            placeholder='Search for Quizzes'
            value={searchInput}
            onChange={handleSearchChange}
          />
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
              <IoEllipsisVertical className='fs-4' />
            </button>
          </div>
        )}
      </div>
      <ul className='list-group p-0 mb-5 fs-5 border-gray'>
        <li className='list-group-item'>
          <h3 id='wd-quizzes-title' className='bg-light p-3 ps-2'>
            <BsGripVertical className='me-2 fs-3' />
            Quizzes <FaRegSmileWink className='ms-2' />
            <div className='d-flex float-end'>
              <button className='percentage-badge border-gray float-end'>
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

              return (
                <li
                  key={quiz._id}
                  className='wd-quiz-list-item list-group-item p-3 ps-1'
                >
                  <div className='d-flex align-items-center'>
                    <div className='icons-wrapper'>
                      <BsGripVertical className='me-2 fs-3 icon-color' />
                      <IoIosRocket className='me-2 fs-5 icon-color' />
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
                      </span>
                    </div>
                    {userRole === 'FACULTY' && (
                      <div className='d-flex position-relative'>
                        <div className='d-flex'>
                          {quiz.published ? (
                            <FaCheckCircle className='text-success me-2' />
                          ) : (
                            <AiOutlineStop className='text-danger me-2' />
                          )}
                        </div>
                        <IoEllipsisVertical
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
                              onClick={() => handleDeleteClick(quiz._id)}
                            >
                              <FaTrash />
                              Delete
                            </button>
                            <button
                              id='wd-publish-btn'
                              className={`dropdown-item ${
                                quiz.published ? 'text-success' : 'text-danger'
                              }`}
                              onClick={() => handlePublishToggle(quiz)}
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
              Are you sure you want to delete this quiz?
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
