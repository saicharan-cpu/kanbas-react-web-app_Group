import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, updateQuiz, setQuiz } from './reducer';
import * as quizzesClient from './client';
import "./index.css";

export default function QuizzesEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);

  const initialQuiz = {
    _id: "",
    title: "",
    description: "",
    points: 100,
    assignmentGroup: "QUIZZES",
    displayGradeAs: "PERCENTAGE",
    submissionType: "ONLINE",
    onlineEntryOptions: {
      textEntry: false,
      websiteURL: false,
      mediaRecordings: false,
      studentAnnotation: false,
      fileUpload: false
    },
    assignTo: "Everyone",
    dueDate: "",
    availableFrom: "",
    notAvailableUntil: "2024-03-15",
    course: cid,
    availableUntil:""
  };

  const [quiz, setQuiz] = useState<any>(initialQuiz);

  useEffect(() => {
    if (existingQuiz) {
      setQuiz({
        ...initialQuiz,
        ...existingQuiz,
        onlineEntryOptions: {
          ...initialQuiz.onlineEntryOptions,
          ...existingQuiz.onlineEntryOptions,
        }
      });
    }
  }, [existingQuiz]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setQuiz({
        ...quiz,
        onlineEntryOptions: {
          ...quiz.onlineEntryOptions,
          [id]: e.target.checked
        }
      });
    } else {
      setQuiz({ ...quiz, [id]: value });
    }
  };

  const handleSave = async () => {
    if (!quiz.title) {
      alert("Quiz name cannot be empty");
      return;
    }
    try {
      if (existingQuiz) {
        await quizzesClient.updateQuiz({ ...quiz, _id: qid });
        dispatch(updateQuiz({ ...quiz, _id: qid }));
      } else {
        const newQuiz = await quizzesClient.createQuiz({ ...quiz, course: cid });
        dispatch(addQuiz(newQuiz));
      }
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Failed to save quiz", error);
    }
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Quiz Name</label>
        <input id="title" className="form-control" value={quiz.title} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Quiz Description</label>
        <textarea id="description" className="form-control" rows={5} value={quiz.description} onChange={handleInputChange} />
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="points" className="form-label">Points</label>
        </div>
        <div className="col-md-9">
          <input id="points" className="form-control" type="number" value={quiz.points} onChange={handleInputChange} />
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
        </div>
        <div className="col-md-9">
          <select id="assignmentGroup" className="form-select" value={quiz.assignmentGroup} onChange={handleInputChange}>
            <option value="PROJECTS">Projects</option>
            <option value="ASSIGNMENTS">Assignments</option>
          </select>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="displayGradeAs" className="form-label">Display Grade as:</label>
        </div>
        <div className="col-md-9">
          <select id="displayGradeAs" className="form-select" value={quiz.displayGradeAs} onChange={handleInputChange}>
            <option value="POINTS">Points</option>
            <option value="PERCENTAGE">Percentage</option>
          </select>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="submissionType" className="form-label">Submission Type:</label>
        </div>
        <div className="col-md-9">
          <div className="card p-3">
            <select id="submissionType" className="form-select mb-3" value={quiz.submissionType} onChange={handleInputChange}>
              <option value="ONLINE">Online</option>
              <option value="PRESENTATION">Presentation</option>
            </select>
            <div className="form-label"><b>Online Entry Options:</b></div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="textEntry" checked={quiz.onlineEntryOptions.textEntry} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="textEntry">Text Entry</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="websiteURL" checked={quiz.onlineEntryOptions.websiteURL} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="websiteURL">Website URL</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="mediaRecordings" checked={quiz.onlineEntryOptions.mediaRecordings} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="mediaRecordings">Media Recordings</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="studentAnnotation" checked={quiz.onlineEntryOptions.studentAnnotation} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="studentAnnotation">Student Annotation</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="fileUpload" checked={quiz.onlineEntryOptions.fileUpload} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="fileUpload">File Uploads</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="assignTo" className="form-label">Assign:</label>
        </div>
        <div className="col-md-9">
          <div className="card p-3">
            <label htmlFor="assignTo" className="form-label"><b>Assign to</b></label>
            <input id="assignTo" className="form-control mb-2" value={quiz.assignTo} onChange={handleInputChange} />
            <label htmlFor="dueDate" className="form-label"><b>Due</b></label>
            <input type="date" id="dueDate" className="form-control mb-2" value={quiz.dueDate} onChange={handleInputChange} />
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="availableFrom" className="form-label"><b>Available from</b></label>
                <input type="date" id="availableFrom" className="form-control mb-2" value={quiz.availableFrom} onChange={handleInputChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="availableUntil" className="form-label"><b>Until</b></label>
                <input type="date" id="availableUntil" className="form-control mb-2" value={quiz.availableUntil} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-9 text-end">
          <Link to={`/Kanbas/Courses/${cid}/Quizzes`} className="btn btn-secondary me-2">Cancel</Link>
          <button onClick={handleSave} className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
