import { Link } from "react-router-dom";
import React from "react";
import "./index.css";

export default function Dashboard(
  { courses, course, setCourse, addNewCourse, deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (courseId: any) => void;
    updateCourse: () => void; }) {

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-warning float-end me-2"
          onClick={updateCourse}
          id="wd-update-course-click"
        >
          Update
        </button>
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={addNewCourse}
        >
          Add
        </button>
      </h5>
      <hr />
      <input
        value={course.name}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <textarea
        value={course.description}
        className="form-control"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        {courses.map((course) => {
          const img2 =  `/images/${course._id}.jpg`|| "/images/reactjs.jpg";
          return (
            <div className="wd-dashboard-course col-12 col-md-4 col-lg-2 col-xl-1" key={course._id}>
              <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">
                <div className="card rounded-3 overflow-hidden">
                  <img src={img2} height="160" alt={course.name} />
                  <div className="card-body">
                    <span
                      className="wd-dashboard-course-link"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}
                    >
                      {course.name}
                    </span>
                    <p
                      className="wd-dashboard-course-title card-text"
                      style={{ maxHeight: 53, overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                      Go
                    </Link>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning float-end me-2"
                      id="wd-edit-course-click"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
