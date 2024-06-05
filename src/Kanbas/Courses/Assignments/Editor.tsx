import React from 'react';
import "./index.css";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control" value="A1 - ENV + HTML" />
      </div>
      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Assignment Description</label>
        <textarea id="wd-description" className="form-control" rows={5}>
          The assignment is available online. Submit a link to the landing page of the assignment. Deploy it on Netlify.
          This assignment will give hands-on experience with basic HTML code.
        </textarea>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="wd-points" className="form-label">Points</label>
        </div>
        <div className="col-md-9">
          <input id="wd-points" className="form-control" value={100} />
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="wd-AssignmentGroup" className="form-label">Assignment Group</label>
        </div>
        <div className="col-md-9">
          <select id="wd-AssignmentGroup" className="form-select">
            <option value="PROJECTS">Projects</option>
            <option selected value="ASSIGNMENTS">Assignments</option>
          </select>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as:</label>
        </div>
        <div className="col-md-9">
          <select id="wd-display-grade-as" className="form-select">
            <option value="POINTS">Points</option>
            <option selected value="PERCENTAGE">Percentage</option>
          </select>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="wd-submission-type" className="form-label">Submission Type:</label>
        </div>
        <div className="col-md-9">
          <div className="card p-3">
            <select id="wd-submission-type" className="form-select mb-3">
              <option selected value="ONLINE">Online</option>
              <option value="PRESENTATION">Presentation</option>
            </select>
            <div className="form-label"><b>Online Entry Options:</b></div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-textentry" name="textentry" value="textentry" />
              <label className="form-check-label" htmlFor="wd-textentry">Text Entry</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-website-url" name="website-url" value="website-url" />
              <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-media-recordings" name="media-recordings" value="wd-media-recordings" />
              <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-student-annotation" name="student-annotation" value="student-annotation" />
              <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-file-upload" name="file-upload" value="file-upload" />
              <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-end">
          <label htmlFor="wd-assign-to" className="form-label">Assign:</label>
        </div>
        <div className="col-md-9">
          <div className="card p-3">
            <label htmlFor="wd-assign-to" className="form-label"><b>Assign to</b></label>
            <input id="wd-assign-to" className="form-control mb-2" defaultValue="Everyone" />
            <label htmlFor="wd-due-date" className="form-label"><b>Due</b></label>
            <input type="date" id="wd-due-date" className="form-control mb-2" defaultValue="2024-05-13" />
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="wd-available-from" className="form-label"><b>Available from</b></label>
                <input type="date" id="wd-available-from" className="form-control mb-2" defaultValue="2024-05-06" />
              </div>
              <div className="col-md-6">
                <label htmlFor="wd-available-until" className="form-label"><b>Until</b></label>
                <input type="date" id="wd-available-until" className="form-control mb-2" defaultValue="2024-05-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-md-9 text-end">
          <button className="btn btn-secondary me-2">Cancel</button>
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
