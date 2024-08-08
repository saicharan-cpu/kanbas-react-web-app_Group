import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import * as enrollmentClient from "../Courses/Enrollments/client";
import * as client from "../Courses/client";

export default function Dashboard(
  { courses, course, setCourse, addNewCourse, deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (courseId: any) => void;
    updateCourse: () => void; }) {

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const userRole = currentUser?.role;
  const [publishedCourses, setPublishedCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  
  const enrollInCourse = async (id: string) => {
    await enrollmentClient.createEnrollment(id);
    fetchEnrolledCourses();
  };
  const unenrollFromCourse = async (id: string) => {
    await enrollmentClient.deleteEnrollment(id);
    fetchEnrolledCourses();
  };
  const fetchEnrolledCourses = async () => {
    const courses = await enrollmentClient.findMyEnrollments();
    setEnrolledCourses(courses);

    const fetchPublishedCourses = async () => {
      const courses = await client.fetchPublishedCourses();
      setPublishedCourses(courses);
    };
    
    
    useEffect(() => {
      fetchPublishedCourses();
      fetchEnrolledCourses();
    }, []);
  };
  return (
    <div>
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <br />
      <hr />
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-3">
          {publishedCourses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <Link
                to={`/Kanbas/Courses/${course._id}/Home`}
                className="text-decoration-none"
              >
                <div className="card rounded-3 overflow-hidden">
                  {" "}
                  <img src="/images/reactjs.jpg" />
                  <div className="card-body">
                    <span
                      className="wd-dashboard-course-link"
                      style={{
                        textDecoration: "none",
                        color: "navy",
                        fontWeight: "bold",
                      }}
                    >
                      {course.name}
                    </span>

                    <p
                      className="wd-dashboard-course-title card-text"
                      style={{ maxHeight: 53, overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                    <a
                      href="#/Kanbas/Courses/1234/Home"
                      className="btn btn-primary"
                    >
                      {" "}
                      Go{" "}
                    </a>
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
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <h2 id="wd-dashboard-published">
        Courses I'm enrolled in ({enrolledCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-3">
          {enrolledCourses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <Link
                to={`/Kanbas/Courses/${course._id}/Home`}
                className="text-decoration-none"
              >
                <div className="card rounded-3 overflow-hidden">
                  <img src="/images/reactjs.jpg" />
                  <div className="card-body">
                    <span
                      className="wd-dashboard-course-link"
                      style={{
                        textDecoration: "none",
                        color: "navy",
                        fontWeight: "bold",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          unenrollFromCourse(course._id);
                        }}
                        className="btn btn-danger float-end"
                      >
                        Unenroll
                      </button>
                      {course.name}
                    </span>

                    <p
                      className="wd-dashboard-course-title card-text"
                      style={{ maxHeight: 53, overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                    <a
                      href="#/Kanbas/Courses/1234/Home"
                      className="btn btn-primary"
                    >
                      Go
                    </a>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <hr />
      <div id="wd-dashboard">
      <hr />
      {userRole === 'FACULTY' && (
        <>
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
          <br />
        </>
      )}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        {courses.map((course) => {
          const img2 = course._id.length > 5 ? "/images/reactjs.jpg" : `/images/${course._id}.jpg`;
          console.log("The course id is:" + course._id);
          console.log("Image is:" + img2);
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
                    {userRole === 'STUDENT' && (
                    <button
                      onClick={() => enrollInCourse(course._id)}
                      className="btn btn-success float-end"
                    >
                      Enroll
                    </button>
                    /* <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                      Go
                    </Link> */)}
                    {userRole === 'FACULTY' && (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}