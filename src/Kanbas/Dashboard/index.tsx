import { Link } from "react-router-dom";
import "./index.css";

export default function Dashboard() {
  const courses = [
    { id: 1, title: "CS1234 React JS", term: "Spring", year: 2024, section: "A", image: "/images/React.jpg", link: "/Kanbas/Courses/1234/Home" },
    { id: 2, title: "CS5800 Algos", term: "Spring", year: 2024, section: "B", image: "/images/Algos.jpg", link: "/Kanbas/Courses/1234/Home" },
    { id: 3, title: "CS5010 PDP", term: "Spring", year: 2024, section: "C", image: "/images/pdp.jpg", link: "/Kanbas/Courses/1234/Home" },
    { id: 4, title: "CS5550 DBMS", term: "Spring", year: 2024, section: "D", image: "/images/dbms.jpg", link: "/Kanbas/Courses/1234/Home" },
    { id: 5, title: "CS6650 BSDS", term: "Spring", year: 2024, section: "E", image: "/images/bsds.jpg", link: "/Kanbas/Courses/1234/Home" },
    { id: 6, title: "CS7150 Cloud", term: "Spring", year: 2024, section: "F", image: "/images/cloud.jpg", link: "/Kanbas/Courses/1234/Home" },
    { id: 7, title: "CS7250 ML", term: "Spring", year: 2024, section: "G", image: "/images/ml.jpg", link: "/Kanbas/Courses/1234/Home" },
  ];

  return (
    <div id="wd-dashboard" className="container">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        {courses.map(course => (
          <div key={course.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card wd-dashboard-course">
              <img src={course.image} className="card-img-top" alt={course.title} />
              <div className="card-body">
                <Link className="wd-dashboard-course-link" to={course.link}>
                  {course.title}
                </Link>
                <p className="wd-dashboard-course-title">
                  {course.term} {course.year} - Section {course.section}
                </p>
                <Link to={course.link} className="btn btn-primary">Go</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}