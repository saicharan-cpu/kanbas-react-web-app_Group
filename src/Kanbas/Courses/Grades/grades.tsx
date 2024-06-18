import React from 'react';
import { useParams } from 'react-router-dom';
import { FaSearch, FaFilter, FaFileImport, FaCaretDown, FaCog } from 'react-icons/fa';
import { HiClipboardCopy } from "react-icons/hi";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as db from '../../Database';
import './index.css';

export default function Grades() {
  const { cid } = useParams<{ cid: string }>();
  
  const courseAssignments = db.assignments.filter((assignment: any) => assignment.course === cid);
  const courseEnrollments = db.enrollments.filter((enrollment: any) => enrollment.course === cid);
  const courseGrades = db.grades;

  const students = courseEnrollments.map((enrollment: any) => {
    return db.users.find((user: any) => user._id === enrollment.user);
  });

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label fw-bold">Student Names</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><FaSearch /></span>
            <input
              type="text"
              className="form-control border-start-0 border-end-0"
              placeholder="Search Students"
            />
            <span className="input-group-text bg-white border-start-0 border-end-0" 
                  style={{ borderTopRightRadius: '.25rem', borderBottomRightRadius: '.25rem' }}>
              <FaCaretDown />
            </span>
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Assignment Names</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><FaSearch /></span>
            <input
              type="text"
              className="form-control border-start-0 border-end-0"
              placeholder="Search Assignments"
            />
            <span className="input-group-text bg-white border-start-0 border-end-0" 
                  style={{ borderTopRightRadius: '.25rem', borderBottomRightRadius: '.25rem' }}>
              <FaCaretDown />
            </span>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <button className="btn btn-outline-secondary text-dark">
            <FaFilter className="me-1" /> Apply Filters
          </button>
        </div>
        <div className="col-md-6 text-md-end">
          <button className="btn btn-outline-secondary me-2 text-dark">
            <FaFileImport className="me-1" /> Import
          </button>
          <button className="btn btn-outline-secondary text-dark me-2">
            <HiClipboardCopy className="me-1" /> Export
            <FaCaretDown className="ms-1" />
          </button>
          <button className="btn btn-outline-secondary text-dark">
            <FaCog />
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>Student Name</th>
              {courseAssignments.map((assignment: any) => (
                <th key={assignment._id}>{assignment.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student: any) => (
              <tr key={student._id}>
                <td className="text-danger">{student.firstName} {student.lastName}</td>
                {courseAssignments.map((assignment: any) => {
                  const grade = courseGrades.find((grade: any) => grade.student === student._id && grade.assignment === assignment._id);
                  return <td key={assignment._id}>{grade ? `${grade.grade}%` : 'N/A'}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
