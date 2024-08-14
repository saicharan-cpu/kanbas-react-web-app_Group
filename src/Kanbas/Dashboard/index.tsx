import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "../Courses/client";
import "./index.css";

interface Course {
  _id: string;
  name: string;
  description: string;
  enrolled?: string[];
}

interface DashboardProps {
  courses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}

export default function Dashboard({
  courses: initialCourses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse
}: DashboardProps) {
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const userRole = currentUser?.role;

  const [courses, setCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);

  const fetchCourses = async () => {
    try {
      const fetchedCourses = await client.fetchAllCourses();
      console.log("Fetching courses in own Dashboard:", JSON.stringify(fetchedCourses));
      setCourses(fetchedCourses);
    } catch (error: any) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (currentUser && Array.isArray(courses)) {
      const enrolled = courses.filter((c) => c.enrolled?.includes(currentUser._id));
      setEnrolledCourses(enrolled);

      if (userRole === 'STUDENT') {
        const available = courses.filter((c) => !c.enrolled?.includes(currentUser._id));
        setAvailableCourses(available);
      }
    }
  }, [courses, currentUser, userRole]);

  const handleEnroll = async (courseId: string) => {
    try {
      await client.enrollInCourse(courseId, currentUser._id);
      fetchCourses();
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleAddNewCourse = async () => {
    try {
      const newCourse = { ...course, enrolled: [currentUser._id] };
      await client.createCourse(newCourse);
      fetchCourses();
    } catch (error) {
      console.error("Error adding new course:", error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  console.log("Enrolled Courses: " + JSON.stringify(enrolledCourses));
  console.log("Available Courses: " + JSON.stringify(availableCourses));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {userRole === 'FACULTY' && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
            <button
              className="btn btn-primary float-end me-2"
              id="wd-add-new-course-click"
              onClick={handleAddNewCourse}
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
      <h2 id="wd-dashboard-enrolled">Enrolled Courses ({enrolledCourses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        {enrolledCourses.map((course) => {
          const img2 = course._id.length > 5 ? "/images/reactjs.jpg" : `/images/${course._id}.jpg`;
          return (
            <div className="wd-dashboard-course col-12 col-md-4 col-lg-2 col-xl-1" style={{ width: "300px" }} key={course._id}>
              <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">
                <div className="card rounded-3 overflow-hidden">
                  <img src={img2} height="145" alt={course.name} />
                  <div className="card-body" style={{width:"100%", height:"180px"}}>
                    <span
                      className="wd-dashboard-course-link"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}
                    >
                      {course.name}
                    </span>
                    <p
                      className="wd-dashboard-course-title card-text"
                      style={{ maxHeight: 50, overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                      Go
                    </Link>
                    {userRole === 'FACULTY' && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            handleDeleteCourse(course._id);
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
      {userRole === 'STUDENT' && (
        <>
          <h2 id="wd-dashboard-available">Courses Available to Enroll ({availableCourses.length})</h2>
          <hr />
          <div id="wd-dashboard-courses" className="row">
            {availableCourses.map((course) => {
              const img2 = course._id.length > 5 ? "/images/reactjs.jpg" : `/images/${course._id}.jpg`;
              return (
                <div className="wd-dashboard-course col-12 col-md-4 col-lg-2 col-xl-1" style={{ width: "350px" }} key={course._id}>
                  <div className="card rounded-3 overflow-hidden">
                    <img src={img2} height="145" alt={course.name} />
                    <div className="card-body" style={{width:"100%", height:"180px"}}>
                      <span
                        className="wd-dashboard-course-link"
                        style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}
                      >
                        {course.name}
                      </span>
                      <p
                        className="wd-dashboard-course-title card-text" 
                        style={{ maxHeight: 50, overflow: "hidden" }}
                      >
                        {course.description}
                      </p>
                      <button className="btn btn-primary" onClick={() => handleEnroll(course._id)}>
                        Enroll
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
