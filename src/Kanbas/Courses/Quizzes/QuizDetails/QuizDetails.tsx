import { MdOutlineModeEditOutline } from 'react-icons/md';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './index.css';
import * as client from '../client';
import { setQuizzes } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AiOutlineStop } from 'react-icons/ai';
import { FaPlus, FaArrowLeft } from 'react-icons/fa6';
import { findAllQuestionsByQuizId } from '../QuestionClient';
import * as quizClient from '../client';
import { addAnswer, updateAnswer } from '../AnswerReducer';

interface Que {
  title: string;
  _id: string;
  text: string;
  points: number;
  type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false';
  options?: string[];
  answers: string[];
};

interface Ans {
  [key: string]: string;
};

interface Quiz {
  title: string;
  multipleAttempts: boolean;
  attempts: number;
  timeLimit: number;
  userAttempts: string[];
  accessCode?: string; 
};

export default function QuizDetails () {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState<number | null>(null) ;
  const [showAccessCodeForm, setShowAccessCodeForm] = useState(false) ;
  const [enteredCode, setEnteredCode] = useState('') ;
  const [accessCodeError, setAccessCodeError] = useState<string | null>(null) ;
  const [quizDetails, setQuizDetails] = useState<Quiz | null>(null);
  const [incorrectQuestions, setIncorrectQuestions] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);

  const [submitCount, setSubmitCount] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [highestScoreAnswers, setHighestScoreAnswers] = useState<Ans>({});
  const [highestScore, setHighestScore] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<{
    [key: string]: string;
  }>({});

  const [canAttempt, setCanAttempt] = useState<boolean>(true);
  const [userHasAttempted, setUserHasAttempted] = useState<boolean>(false);
  const questions = useSelector((state: any) =>
    state.questionsReducer.questions.filter(
      (question: any) => question.quiz === qid
    )
  );

  const fetchQuiz = async () => {
    try {
      if (qid !== 'New') {
        const quiz = await client.findQuiz(cid as string, qid as string);
        dispatch(setQuizzes([quiz]));
        const questions = await findAllQuestionsByQuizId(qid as string);
        const points = questions.reduce(
          (total: Number, question: any) => total + (question.points || 0),
          0
        )
        setTotalPoints(points);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const fetchedQuizDetails = await quizClient.findQuiz(
        cid as string,
        qid as string
      );
      setQuizDetails(fetchedQuizDetails);
      const attemptsCheck = await quizClient.checkAttempts(qid as string, currentUser?._id);
      setCanAttempt(attemptsCheck.canAttempt);
      setUserHasAttempted(attemptsCheck.attempts > 0);
      if (fetchedQuizDetails.multipleAttempts) {
        setAttemptsLeft(fetchedQuizDetails.attempts - attemptsCheck.attempts);
      } else {
        setAttemptsLeft(1 - attemptsCheck.attempts);
      }
      if (fetchedQuizDetails.timeLimit) {
        setTimeLeft(fetchedQuizDetails.timeLimit);
      }
    } catch (error) {
      console.error('Error fetching quiz details:', error);
    }
  };

  const togglePublish = async () => {
    if (!quiz) return;

    const updatedQuiz = { ...quiz, published: !quiz.published }
    try {
      await client.updateQuiz(updatedQuiz);
      dispatch(setQuizzes([updatedQuiz]));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchQuiz();
    fetchQuizDetails();
  }, [cid, qid]);

  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const formatDateForInput = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const formattedDate = date.toISOString().slice(0, 16);
      return formattedDate;
    } catch (error) {
      console.error('Error formatting date for input:', error);
      return dateString;
    }
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

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleTakeQuiz = () => {
    if (quiz?.accessCode) { 
      setShowAccessCodeForm(true);
    } else {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`);
    }
  };

  const handleAccessCodeSubmit = () => {
    if (enteredCode === quiz?.accessCode) {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`);
    } else {
      setAccessCodeError('Invalid access code. Try again!');
    }
  };

  const handleViewResults = async () => {
    try {
      if (quizDetails?.multipleAttempts) {
        const updatedQuiz: Quiz = {
          ...quizDetails,
          userAttempts: Array(quizDetails.attempts).fill(currentUser?._id),
        } as Quiz;
        await quizClient.updateQuiz(updatedQuiz);
        setQuizDetails(updatedQuiz);
      } else {
        const updatedQuiz: Quiz = {
          ...quizDetails,
          userAttempts: [currentUser?._id],
        } as Quiz;
        await quizClient.updateQuiz(updatedQuiz);
        setQuizDetails(updatedQuiz);
      }
      setAttemptsLeft(0);
      setCanAttempt(false);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/results`);
    } catch (error) {
      console.error('Error updating quiz attempts:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!quiz) {
    return <div>No quiz found</div>
  }
  if (!currentUser) {
    return <div>No user logged in</div>
  }

  return (
    <div id='wd-quizzes'>
      <button
        className='btn btn-secondary mb-3'
        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/`)} >
        <FaArrowLeft /> Go Back </button>

      <div
        id='wd-quiz-control-buttons'
        className='text-nowrap align-self-center' >
        {currentUser.role === 'STUDENT' ? ( <>
            {userHasAttempted && (
              <div role='alert'>
                {userHasAttempted && (
                  <button className='btn btn-lg btn-primary text-center me-1'
                    onClick={handleViewResults} >
                    View Results </button>)}
              </div> )}
            {canAttempt && (<div>
              <button id='wd-take-quiz-btn'
                className='btn btn-lg btn-primary text-center me-1'
                onClick={handleTakeQuiz} >
                Take Quiz </button>
            </div>)}


            {showAccessCodeForm && quiz.accessCode && (
              <div className='card mt-3' style={{ width: '18rem' }}>
                <div className='card-body'>
                  <h5 className='card-title'>Enter Access Code</h5>
                  <form> <div className='mb-3'>
                      <input
                        type='text' className={`form-control ${ accessCodeError ? 'is-invalid' : '' }`}
                        value={enteredCode} onChange={e => setEnteredCode(e.target.value)}
                        placeholder='Enter Access Code' />
                      {accessCodeError && (
                        <div className='invalid-feedback'>
                          {accessCodeError} </div> )}
                    </div>

                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={handleAccessCodeSubmit} >
                      Submit </button>
                  </form>
                </div>
              </div>
            )} </> ) : ( <>
            <button
              id='wd-publish-btn'
              className={`btn btn-lg me-1 ${
                quiz.published ? 'btn-success' : 'btn-danger'
              }`}
              onClick={togglePublish}>
              {quiz.published ? <FaPlus /> : <AiOutlineStop />}
              {quiz.published ? ' Published' : ' Unpublished'}
            </button>

            <Link
              id='wd-preview-btn'
              className='btn btn-lg btn-secondary text-center me-1'
              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`} >
              Preview
            </Link>

            <Link
              id='wd-quiz-edit-btn'
              className='btn btn-lg btn-secondary me-1 text-center'
              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}>
              <MdOutlineModeEditOutline />
              Edit
            </Link> </>
        )}
      </div> <br /><hr />

      <div id='wd-quiz-details' className='text-nowrap'>
        <h1>{quiz.title}</h1>
        <div className='custon-quiz-table table-responsive'>
          <table className='table table-borderless'>
            <tbody>
              <tr>
                <th>Quiz Type</th>
                <td>{quiz.quizType}</td>
              </tr>
              <tr>
                <th>Points</th>
                <td>{totalPoints !== null ? totalPoints : quiz.points}</td>{' '}
              </tr>
              <tr>
                <th>Assignment Group</th>
                <td>{quiz.assignmentGroup}</td>
              </tr>
              <tr>
                <th>Shuffle Answers</th>
                <td>{quiz.shuffleAnswers ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>Time Limit</th>
                <td>{quiz.timeLimit}</td>
              </tr>
              <tr>
                <th>Multiple Attempts</th>
                <td>{quiz.multipleAttempts ? 'Yes' : 'No'}</td>
              </tr>
              {quiz.multipleAttempts && (
                <tr>
                  <th>Attempts Allowed</th>
                  <td>{quiz.attempts}</td>
                </tr>
              )}

              <tr>
                <th>View Responses</th>
                <td>Always</td>
              </tr>
              <tr>
                <th>Show Correct Answers</th>
                <td>{quiz.showCorrectAnswers ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>One Question at a Time</th>
                <td>{quiz.oneQuestionAtATime ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>Require Respondus Lockdown Browser</th>
                <td>No</td>
              </tr>
              <tr>
                <th>Required to View Quiz Results</th>
                <td>No</td>
              </tr>
              <tr>
                <th>Webcam Required</th>
                <td>{quiz.webcamRequired ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>Lock Questions After Answering</th>
                <td>{quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Due</th> <th>For</th> <th>Available From</th> <th>Until</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{formatDate(quiz.dueDate)}</td> <td>Everyone</td>
                <td>{formatDate(quiz.availableDate)}</td> <td>{formatDate(quiz.untilDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>)}