import { MdOutlineModeEditOutline } from 'react-icons/md'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './index.css'
import * as client from '../client'
import { setQuizzes } from '../reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { AiOutlineStop } from 'react-icons/ai'
import { FaPlus, FaArrowLeft } from 'react-icons/fa6'
import { findAllQuestionsByQuizId } from '../QuestionClient'
import * as quizClient from '../client';
import { addAnswer, updateAnswer } from '../AnswerReducer';

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
  [key: string]: string;
}

interface Quiz {
  title: string;
  multipleAttempts: boolean;
  attempts: number;
  timeLimit: number;
  userAttempts: string[];
  accessCode?: string; // Make accessCode optional
}

export default function QuizDetails () {
  const { cid, qid } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPoints, setTotalPoints] = useState<number | null>(null) // State to store total points
  const [showAccessCodeForm, setShowAccessCodeForm] = useState(false) // State to control form visibility
  const [enteredCode, setEnteredCode] = useState('') // State to store the entered access code
  const [accessCodeError, setAccessCodeError] = useState<string | null>(null) // State to store access code error message
  const [incorrectQuestions, setIncorrectQuestions] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [quizDetails, setQuizDetails] = useState<Quiz | null>(null);
  const [submitCount, setSubmitCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [highestScore, setHighestScore] = useState<number>(0);
  const [highestScoreAnswers, setHighestScoreAnswers] = useState<Answers>({});
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
        const quiz = await client.findQuiz(cid as string, qid as string)
        console.log('Fetched quiz:', quiz) // Debug log
        dispatch(setQuizzes([quiz]))
        const questions = await findAllQuestionsByQuizId(qid as string)
        const points = questions.reduce(
          (total: Number, question: any) => total + (question.points || 0),
          0
        )
        setTotalPoints(points)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchQuizDetails = async () => {
    try {
      const fetchedQuizDetails = await quizClient.findQuiz(
        cid as string,
        qid as string
      );
      setQuizDetails(fetchedQuizDetails);
      const attemptsCheck = await quizClient.checkAttempts(qid as string, currentUser?._id);
      console.log("attempts check is:"+JSON.stringify(attemptsCheck));
      setCanAttempt(attemptsCheck.canAttempt);
      setUserHasAttempted(attemptsCheck.attempts > 0);
      console.log("checking user has attempted:"+userHasAttempted);
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
    if (!quiz) return

    const updatedQuiz = { ...quiz, published: !quiz.published }
    try {
      await client.updateQuiz(updatedQuiz)
      dispatch(setQuizzes([updatedQuiz]))
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchQuiz()
    fetchQuizDetails()
  }, [cid, qid])

  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  )

  const formatDateForInput = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const formattedDate = date.toISOString().slice(0, 16)
      return formattedDate
    } catch (error) {
      console.error('Error formatting date for input:', error)
      return dateString
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "MMM d 'at' h a")
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateString
    }
  }

  console.log('Quiz from state:', quiz) // Debug log
  const { currentUser } = useSelector((state: any) => state.accountReducer)
  console.log('USER ' + currentUser.role)

  const handleTakeQuiz = () => {
    if (quiz?.accessCode) { // Show access code form only if accessCode is not empty
      setShowAccessCodeForm(true)
    } else {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`)
    }
  }

  const handleAccessCodeSubmit = () => {
    if (enteredCode === quiz?.accessCode) {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`)
    } else {
      setAccessCodeError('Invalid access code. Please try again.')
    }
  }

  const handleViewResults = () => {
    console.log('Viewing results');
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/results`);
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
        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/`)}
      >
        <FaArrowLeft /> Go Back
      </button>
      <div
        id='wd-quiz-control-buttons'
        className='text-nowrap align-self-center'
      >
        {currentUser.role === 'STUDENT' ? (
          <>
            {userHasAttempted && (
              <div className='alert alert-warning' role='alert'>
                {userHasAttempted && (
                  <button
                    className='btn btn-primary me-1 text-center'
                    onClick={handleViewResults}
                  >
                    View Results
                  </button>
                )}
              </div>
            )}
            <div>
              <button
                id='wd-take-quiz-btn'
                className='btn btn-lg btn-primary me-1 text-center'
                onClick={handleTakeQuiz}
              >
                Take Quiz
              </button>
            </div>
            {showAccessCodeForm && quiz.accessCode && (
              <div className='card mt-3' style={{ width: '18rem' }}>
                <div className='card-body'>
                  <h5 className='card-title'>Enter Access Code</h5>
                  <form>
                    <div className='mb-3'>
                      <input
                        type='text'
                        className={`form-control ${
                          accessCodeError ? 'is-invalid' : ''
                        }`}
                        value={enteredCode}
                        onChange={e => setEnteredCode(e.target.value)}
                        placeholder='Enter Access Code'
                      />
                      {accessCodeError && (
                        <div className='invalid-feedback'>
                          {accessCodeError}
                        </div>
                      )}
                    </div>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={handleAccessCodeSubmit}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              id='wd-publish-btn'
              className={`btn btn-lg me-1 ${
                quiz.published ? 'btn-success' : 'btn-danger'
              }`}
              onClick={togglePublish}
            >
              {quiz.published ? <FaPlus /> : <AiOutlineStop />}
              {quiz.published ? ' Published' : ' Unpublished'}
            </button>
            <Link
              id='wd-preview-btn'
              className='btn btn-lg btn-secondary me-1 text-center'
              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`}
            >
              Preview
            </Link>
            <Link
              id='wd-quiz-edit-btn'
              className='btn btn-lg btn-secondary me-1 text-center'
              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}
            >
              <MdOutlineModeEditOutline />
              Edit
            </Link>
          </>
        )}
      </div>
      <br />
      <hr />
      <div id='wd-quiz-details' className='text-nowrap'>
        <h1>{quiz.title}</h1>
        <div className='table-responsive custon-quiz-table'>
          <table className='table table-borderless'>
            <tbody>
              <tr>
                <th>Quiz Type</th>
                <td>{quiz.quizType}</td>
              </tr>
              <tr>
                <th>Points</th>
                <td>{totalPoints !== null ? totalPoints : quiz.points}</td>{' '}
                {/* Display total points */}
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
                <th>Due</th>
                <th>For</th>
                <th>Available From</th>
                <th>Until</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formatDate(quiz.dueDate)}</td>
                <td>Everyone</td>
                <td>{formatDate(quiz.availableDate)}</td>
                <td>{formatDate(quiz.untilDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
