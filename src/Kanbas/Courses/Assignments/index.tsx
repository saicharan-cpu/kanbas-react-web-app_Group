import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { BsGripVertical, BsPlus, BsTrash } from 'react-icons/bs';
import { TfiWrite } from "react-icons/tfi";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoEllipsisVertical } from 'react-icons/io5';
import LessonControlButtons from '../Modules/LessonControlButtons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAssignment } from './reducer';
import './index.css';

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const courseAssignments = assignments.filter((assignment: any) => assignment.course === cid);

  const handleDelete = (assignmentId: string) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div id="wd-assignments" className="container mt-4">
      <div className="row mb-3 align-items-center">
        <div className="col-md-6 mb-2 mb-md-0">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><FaSearch /></span>
            <input
              id="wd-search-assignment"
              type="text"
              className="form-control border-start-0"
              placeholder="Search for Assignments"
            />
          </div>
        </div>
        <div className="col-md-6 text-md-end">
          <button id="wd-add-assignment-group" className="btn btn-outline-secondary me-2">
            <FaPlus className="me-1" /> Group
          </button>
          <button
            id="wd-add-assignment"
            className="btn btn-danger"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/new`)}
          >
            <FaPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>
      <div className="assignment-section">
        <div className="assignment-title d-flex align-items-center p-3 bg-light">
          <div>
            <BsGripVertical className="me-2 fs-3" />
            <BiSolidDownArrow />
          </div>
          <div className="flex-grow-1">
            <b>ASSIGNMENTS</b>
          </div>
          <div className="d-flex align-items-center">
            <span className="badge bg-secondary ms-2">40% of Total</span>
          </div>
          <div>
            <BsPlus className="fs-4" />
            <IoEllipsisVertical className="fs-4" />
          </div>
        </div>
        <ul id="wd-assignment-list" className="list-unstyled">
          {courseAssignments.map((assignment: any) => (
            <li key={assignment._id} className="wd-assignment-list-item d-flex align-items-center">
              <div><BsGripVertical className="me-2 fs-3" /></div>
              <div className="assignment-icon me-2">
                <TfiWrite />
              </div>
              <div className="assignment-details flex-grow-1">
                <Link
                  to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                  className="wd-assignment-link d-block mb-1"
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  <b>{assignment.title}</b>
                </Link>
                <span className="details">
                  <span style={{ color: 'red' }}>Multiple Modules</span> | <b>Not Available until</b> {assignment.notAvailableUntil} | <b>Due</b> {assignment.dueDate} | 100 pts.
                </span>
              </div>
              <div className="d-flex align-items-center">
                <LessonControlButtons />
                <button className="btn btn-link text-danger" onClick={() => handleDelete(assignment._id)}>
                  <BsTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
