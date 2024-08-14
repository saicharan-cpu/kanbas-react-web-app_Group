import React from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa';
import "./index.css";

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades","People"];

export default function CoursesNavigation() {
    const { cid } = useParams();

    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
            {links.map((link) => (
                <NavLink
                    key={link}
                    id={`wd-course-${link.toLowerCase()}-link`}
                    to={`/Kanbas/Courses/${cid}/${link}`}
                    className={({ isActive }) => `list-group-item border border-0 ${isActive ? 'active' : 'text-danger'}`}>
                    {link}
                </NavLink>
            ))}
        </div>
    );
}
