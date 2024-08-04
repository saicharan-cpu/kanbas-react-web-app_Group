import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuiz, updateQuiz } from "./client";
import QuizQuestionsEditor from "../Questions/Editor";
import './QuizDetailsEditor.css';

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
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  onQuestionAtaTime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availabilityDate: string;
  untilDate: string;
}

const QuizDetailsEditor = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [activeTab, setActiveTab] = useState("details");
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

  const handleSave = async () => {
    if (quiz) {
      await updateQuiz(quiz._id, quiz);
      navigate(`/Kanbas/Courses/${quiz.courseId}/Quizzes/${quiz._id}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let val: any = value;

    if (type === "number") {
      val = parseInt(value, 10);
    } else if (type === "checkbox") {
      val = (e.target as HTMLInputElement).checked;
    } else if (name === "isShuffled" || name === "ismultipleAttempts" || name === "onQuestionAtaTime" || name === "webcamRequired" || name === "lockQuestionsAfterAnswering") {
      val = value === "true";
    }

    setQuiz(prevQuiz => ({
      ...prevQuiz!,
      [name]: val,
    } as Quiz));
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="quiz-details-editor">
      <div className="tabs">
        <button className={activeTab === "details" ? "active" : ""} onClick={() => setActiveTab("details")}>Details</button>
        <button className={activeTab === "questions" ? "active" : ""} onClick={() => setActiveTab("questions")}>Questions</button>
      </div>
      {activeTab === "details" && (
        <div className="details-form">
          <h1>Quiz Details Editor</h1>
          <label>
            Title:
            <input type="text" name="title" value={quiz.title} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={quiz.description} onChange={handleChange} />
          </label>
          <label>
            Quiz Type:
            <select name="quizType" value={quiz.quizType} onChange={handleChange}>
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </label>
          <label>
            Points:
            <input type="number" name="points" value={quiz.points} onChange={handleChange} />
          </label>
          <label>
            Assignment Group:
            <select name="assignmentGroup" value={quiz.assignmentGroup} onChange={handleChange}>
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </label>
          <label>
            Shuffle Answers:
            <select name="isShuffled" value={String(quiz.isShuffled)} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <label>
            Time Limit:
            <input type="number" name="timeLimit" value={quiz.timeLimit} onChange={handleChange} />
          </label>
          <label>
            Multiple Attempts:
            <select name="ismultipleAttempts" value={String(quiz.ismultipleAttempts)} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          {quiz.ismultipleAttempts && (
            <label>
              How Many Attempts:
              <input type="number" name="howManyAttempts" value={quiz.howManyAttempts} onChange={handleChange} />
            </label>
          )}
          <label>
            Show Correct Answers:
            <select name="showCorrectAnswers" value={quiz.showCorrectAnswers} onChange={handleChange}>
              <option value="Immediately">Immediately</option>
              <option value="After all attempts are graded">After all attempts are graded</option>
              <option value="After due date">After due date</option>
            </select>
          </label>
          <label>
            Access Code:
            <input type="text" name="accessCode" value={quiz.accessCode} onChange={handleChange} />
          </label>
          <label>
            One Question at a Time:
            <select name="onQuestionAtaTime" value={String(quiz.onQuestionAtaTime)} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <label>
            Webcam Required:
            <select name="webcamRequired" value={String(quiz.webcamRequired)} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <label>
            Lock Questions After Answering:
            <select name="lockQuestionsAfterAnswering" value={String(quiz.lockQuestionsAfterAnswering)} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <label>
            Due date:
            <input type="datetime-local" name="dueDate" value={quiz.dueDate} onChange={handleChange} />
          </label>
          <label>
            Available date:
            <input type="datetime-local" name="availabilityDate" value={quiz.availabilityDate} onChange={handleChange} />
          </label>
          <label>
            Until date:
            <input type="datetime-local" name="untilDate" value={quiz.untilDate} onChange={handleChange} />
          </label>
          <div className="buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => navigate(`/Kanbas/Courses/${quiz.courseId}/Quizzes/${quiz._id}`)}>Cancel</button>
          </div>
        </div>
      )}
      {activeTab === "questions" && (
        <div>
          <QuizQuestionsEditor />
        </div>
      )}
    </div>
  );
};

export default QuizDetailsEditor;
