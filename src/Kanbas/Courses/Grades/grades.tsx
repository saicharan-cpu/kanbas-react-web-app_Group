import React from 'react';
import { FaSearch, FaFilter, FaFileImport, FaFileExport, FaCog, FaCaretDown,FaEdit } from 'react-icons/fa';
import { HiClipboardCopy } from "react-icons/hi";
import { LiaFileExportSolid } from "react-icons/lia";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export default function Grades() {
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
              <th>A1 SETUP <br /> Out of 100</th>
              <th>A2 HTML <br /> Out of 100</th>
              <th>A3 CSS <br /> Out of 100</th>
              <th>A4 BOOTSTRAP <br /> Out of 100</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="text-danger">Jane Adams</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>92.18%</td>
              <td>66.22%</td>
            </tr>
            <tr className="bg-light">
              <td className="text-danger">Christina Allen</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr className="bg-white">
              <td className="text-danger">Samreen Ansari</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr className="bg-light">
                <td className="text-danger">Han Bao</td>
              <td>100%</td>
              <td>100%</td>
              <td className="small-height">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className='input-cell'>
                    <input 
                        type="text"
                        className="input-edit"
                        defaultValue="88.03%"
                    />
                </div>
                <div className="input-icon-container">
                    <LiaFileExportSolid className="input-icon" />
                </div>
             </div>
              </td>
              <td>98.99%</td>
            </tr>
            <tr className="bg-white">
                <td className="text-danger">Mahi Sai Srinivas Bobbili</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>98.37%</td>
              <td>100%</td>
            </tr>
            <tr className="bg-light">
                <td className="text-danger">Siran Cao</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
