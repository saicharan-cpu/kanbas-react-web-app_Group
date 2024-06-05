import React from 'react';
import { FaPlus, FaSearch,FaEllipsisV } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { TfiWrite } from "react-icons/tfi";
import { BiSolidDownArrow } from "react-icons/bi";
import LessonControlButtons from '../Modules/LessonControlButtons';
import { BsPlus } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';
import "./index.css";

export default function Assignments() {
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
          <button id="wd-add-assignment" className="btn btn-danger">
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
          <li className="wd-assignment-list-item d-flex align-items-center">
            <div><BsGripVertical className="me-2 fs-3" /></div>
            <div className="assignment-icon me-2">
              <TfiWrite />
            </div>
            <div className="assignment-details flex-grow-1">
              <a className="wd-assignment-link d-block mb-1" href="#/Kanbas/Courses/1234/Assignments/123" style={{ color: 'black', textDecoration: 'none' }}>
                <b>A1 - ENV + HTML</b>
              </a>
              <span className="details">
                <span style={{ color: 'red' }}>Multiple Modules</span> | <b>Not Available until</b> May 6 at 12 am | <b>Due</b> May 13 at 11.59 pm | 100 pts.
              </span>
            </div>
            <div><LessonControlButtons /></div>
          </li>
          <li className="wd-assignment-list-item d-flex align-items-center">
            <div><BsGripVertical className="me-2 fs-3" /></div>
            <div className="assignment-icon me-2">
              <TfiWrite />
            </div>
            <div className="assignment-details flex-grow-1">
              <a className="wd-assignment-link d-block mb-1" href="#/Kanbas/Courses/1234/Assignments/124" style={{ color: 'black', textDecoration: 'none' }}>
                <b>A2 - CSS + BootStrap</b>
              </a>
              <span className="details">
                <span style={{ color: 'red' }}>Multiple Modules</span> | <b>Not Available until</b> May 13 at 12 am | <b>Due</b> May 20 at 11.59 pm | 100 pts.
              </span>
            </div>
            <div><LessonControlButtons /></div>
          </li>
          <li className="wd-assignment-list-item d-flex align-items-center">
            <div><BsGripVertical className="me-2 fs-3" /></div>
            <div className="assignment-icon me-2">
              <TfiWrite />
            </div>
            <div className="assignment-details flex-grow-1">
              <a className="wd-assignment-link d-block mb-1" href="#/Kanbas/Courses/1234/Assignments/125" style={{ color: 'black', textDecoration: 'none' }}>
                <b>A3 - JavaScript + React</b>
              </a>
              <span className="details">
                <span style={{ color: 'red' }}>Multiple Modules</span>| <b>Not Available until</b> May 20 at 12 am | <b>Due</b> May 27 at 11.59 pm | 100 pts.
              </span>
            </div>
            <div><LessonControlButtons /></div>
          </li>
        </ul>
      </div>
    </div>
  );
}
