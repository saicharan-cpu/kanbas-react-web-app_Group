import React from 'react';
import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import { FaAlignJustify } from 'react-icons/fa';
import Grades from './Grades/grades';
import Quizzes from './Quizzes'
import QuizEditor from './Quizzes/QuizEditor'
import QuizDetailsEditor from './Quizzes/QuizEditor/QuizDetailsEditor'
import QuizQuestionEditor from './Quizzes/QuizEditor/QuestionsEditor'
import QuizEditorTOC from './Quizzes/QuizEditorTOC'
import QuizPreviewScreen from './Quizzes/QuizPreviewScreen'
import QuizDetails from './Quizzes/QuizDetails/QuizDetails'
import Quiz from './Quizzes'
import PeopleTable from './People/Table'
import QuizResults from './Quizzes/QuizResults'

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams<{ cid: string }>();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className='text-danger'>
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path='/Quizzes' element={<Quiz />} />
            <Route path='/Quizzes/:qid' element={<QuizDetails />} />
            <Route path='/Quizzes/:qid/editor' element={<QuizEditor />} />
            <Route path='/Quizzes/:qid/editor' element={<QuizEditor />} />
            <Route path='/Quizzes/New' element={<QuizEditor />} />
            <Route
              path='/Quizzes/:qid/questions'
              element={<QuizPreviewScreen />}
            />
            <Route path='/Quizzes/:qid/results' element={<QuizResults />} />
            <Route path="Grades" element={<Grades />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="People/:uid" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
