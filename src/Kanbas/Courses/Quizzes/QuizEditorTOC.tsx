import { Navigate, Routes, Route } from 'react-router'
import QuizDetailsEditor from './QuizEditor/QuizDetailsEditor'
import QuizQuestionEditor from './QuizEditor/QuestionsEditor'
import QuizEditor from './QuizEditor'

export default function QuizEditorTOC () {
  return (
    <Routes>
      {/* <Route path='/' element={<Navigate to='/quizzes/e' />} />
      <Route path='/quizzes/editor/*' element={<QuizEditor />} /> */}
    </Routes>
  )
}
