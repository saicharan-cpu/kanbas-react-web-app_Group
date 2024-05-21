import { Link } from "react-router-dom";

export default function CoursesNavigation() {
    console.log('called course navigation');
    return (
        <ul id="wd-courses-navigation">
            <li><Link id="wd-course-home-link"    to="Home">Home</Link></li>
            <li><Link id="wd-course-modules-link" to="Modules">Modules</Link></li>
            <li><Link id="wd-course-piazza-link"  to="Piazza">Piazza</Link></li>
            <li><Link id="wd-course-zoom-link"    to="Zoom">Zoom</Link></li>
            <li><Link id="wd-course-assignments-link" to="Assignments">Assignments</Link></li>
            <li><Link id="wd-course-quizzes-link" to="Quizzes">Quizzes</Link></li>
            <li><Link id="wd-course-grades-link"  to="Grades">Grades</Link></li>
        </ul>
    );
}