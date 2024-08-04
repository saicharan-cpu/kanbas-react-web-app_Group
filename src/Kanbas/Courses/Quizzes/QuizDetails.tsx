import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchQuiz } from "./client";

interface Quiz {
  _id: string;
  title: string;
  description: string;
  courseId: string;
  points: number;
  quizType: string;
  timeLimit: number;
  assignmentGroup: string;
  isShuffled: boolean;
  ismultipleAttempts: boolean;
  isPublished: boolean;
  viewResponse: string;
  showCorrectAnswers: string;
  accessCode: string;
  onQuestionAtaTime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availabilityDate: string;
  untilDate: string;
}

const QuizDetailsScreen = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const user = useSelector((state: any) => state.accountReducer.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuiz = async () => {
      if (quizId) {
        const quizData = await fetchQuiz(quizId);
        setQuiz(quizData);
      }
    };
    getQuiz();
  }, [quizId]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <button onClick={() => navigate(`/Kanbas/Courses/${quiz.courseId}/Quizzes/${quiz._id}/preview`)}>Preview</button>
      {user?.role === "FACULTY" && (
        <button onClick={() => navigate(`/Kanbas/Courses/${quiz.courseId}/Quizzes/${quiz._id}/edit`)}>Edit</button>
      )}
      <div>
        <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
        <p><strong>Points:</strong> {quiz.points}</p>
        <p><strong>Assignment Group:</strong> {quiz.assignmentGroup}</p>
        <p><strong>Shuffle Answers:</strong> {quiz.isShuffled ? "Yes" : "No"}</p>
        <p><strong>Time Limit:</strong> {quiz.timeLimit} Minutes</p>
        <p><strong>Multiple Attempts:</strong> {quiz.ismultipleAttempts ? "Yes" : "No"}</p>
        <p><strong>View Responses:</strong> {quiz.viewResponse}</p>
        <p><strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}</p>
        <p><strong>Access Code:</strong> {quiz.accessCode || "None"}</p>
        <p><strong>One Question at a Time:</strong> {quiz.onQuestionAtaTime ? "Yes" : "No"}</p>
        <p><strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}</p>
        <p><strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</p>
        <p><strong>Due date:</strong> {new Date(quiz.dueDate).toLocaleString()}</p>
        <p><strong>Available date:</strong> {new Date(quiz.availabilityDate).toLocaleString()}</p>
        <p><strong>Until date:</strong> {new Date(quiz.untilDate).toLocaleString()}</p>
      </div>
      {user?.role === "STUDENT" && (
        <button onClick={() => navigate(`/Kanbas/Courses/${quiz.courseId}/Quizzes/${quiz._id}/start`)}>Start Quiz</button>
      )}
    </div>
  );
};

export default QuizDetailsScreen;
