import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from './reducer';
import "./index.css";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const existingAssignment = assignments.find((assignment: any) => assignment._id === aid);

  const initialAssignment = {
    _id: "",
    title: "",
    description: "",
    points: 100,
    assignmentGroup: "ASSIGNMENTS",
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

  const [assignment, setAssignment] = useState<any>(initialAssignment);

  useEffect(() => {
    if (existingAssignment) {
      setAssignment({
        ...initialAssignment,
        ...existingAssignment,
        onlineEntryOptions: {
          ...initialAssignment.onlineEntryOptions,
          ...existingAssignment.onlineEntryOptions,
        }
      });
    }
  }, [existingAssignment]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setAssignment({
        ...assignment,
        onlineEntryOptions: {
          ...assignment.onlineEntryOptions,
          [id]: e.target.checked
        }
      });
    } else {
      setAssignment({ ...assignment, [id]: value });
    }
  };

  const handleSave = () => {
    if(!assignment.title)
      {
        alert("Assignment name cannot be empty");
      }
      else
      {
        if (existingAssignment) {
          dispatch(updateAssignment({ ...assignment, _id: aid }));
        } else {
          dispatch(addAssignment({ ...assignment, _id: new Date().getTime().toString() }));
        }
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
      }
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Assignment Name</label>
        <input id="title" className="form-control" value={assignment.title} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Assignment Description</label>
        <textarea id="description" className="form-control" rows={5} value={assignment.description} onChange={handleInputChange} />
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="points" className="form-label">Points</label>
        </div>
        <div className="col-md-9">
          <input id="points" className="form-control" type="number" value={assignment.points} onChange={handleInputChange} />
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
        </div>
        <div className="col-md-9">
          <select id="assignmentGroup" className="form-select" value={assignment.assignmentGroup} onChange={handleInputChange}>
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
          <select id="displayGradeAs" className="form-select" value={assignment.displayGradeAs} onChange={handleInputChange}>
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
            <select id="submissionType" className="form-select mb-3" value={assignment.submissionType} onChange={handleInputChange}>
              <option value="ONLINE">Online</option>
              <option value="PRESENTATION">Presentation</option>
            </select>
            <div className="form-label"><b>Online Entry Options:</b></div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="textEntry" checked={assignment.onlineEntryOptions.textEntry} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="textEntry">Text Entry</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="websiteURL" checked={assignment.onlineEntryOptions.websiteURL} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="websiteURL">Website URL</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="mediaRecordings" checked={assignment.onlineEntryOptions.mediaRecordings} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="mediaRecordings">Media Recordings</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="studentAnnotation" checked={assignment.onlineEntryOptions.studentAnnotation} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="studentAnnotation">Student Annotation</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="fileUpload" checked={assignment.onlineEntryOptions.fileUpload} onChange={handleInputChange} />
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
            <input id="assignTo" className="form-control mb-2" value={assignment.assignTo} onChange={handleInputChange} />
            <label htmlFor="dueDate" className="form-label"><b>Due</b></label>
            <input type="date" id="dueDate" className="form-control mb-2" value={assignment.dueDate} onChange={handleInputChange} />
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="availableFrom" className="form-label"><b>Available from</b></label>
                <input type="date" id="availableFrom" className="form-control mb-2" value={assignment.availableFrom} onChange={handleInputChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="availableUntil" className="form-label"><b>Until</b></label>
                <input type="date" id="availableUntil" className="form-control mb-2" value={assignment.availableUntil} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-9 text-end">
          <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
          <button onClick={handleSave} className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
