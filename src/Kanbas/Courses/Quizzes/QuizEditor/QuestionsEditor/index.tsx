// import React, { useState, useEffect } from 'react'
// import FillInTheBlanksEditor from './FillInTheBlanksEditor'
// import MCEditor from './MCEditor'
// import TFEditor from './TFEditor'
// import * as client from '../../QuestionClient' // Adjust the import as necessary
// import { useParams } from 'react-router'
// import { FaTrash } from 'react-icons/fa6'

// interface Question {
//   title: string
//   _id: string
//   text: string
//   points: number
//   description: string
//   type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false'
//   options?: string[]
//   answers: string[]
// }

// export default function QuizQuestionEditor () {
//   const { qid } = useParams<{ qid: string }>()
//   const [questions, setQuestions] = useState<Question[]>([])

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const fetchedQuestions = await client.findAllQuestionsByQuizId(
//           qid as string
//         )
//         setQuestions(fetchedQuestions)
//       } catch (error) {
//         console.error('Error fetching questions:', error)
//       }
//     }

//     fetchQuestions()
//   }, [qid])

//   const renderEditor = (question: Question) => {
//     switch (question.type) {
//       case 'multiple-choice':
//         return <MCEditor question={question} />
//       case 'true-false':
//         return <TFEditor question={question} />
//       case 'fill-in-the-blank':
//         return <FillInTheBlanksEditor question={question} />
//       default:
//         return <MCEditor question={question} />
//     }
//   }

//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         title: '',
//         _id: '',
//         text: '',
//         points: 0,
//         description: '',
//         type: 'multiple-choice',
//         answers: []
//       }
//     ])
//   }

//   const handleSaveChanges = async () => {
//     try {
//       await Promise.all(
//         questions.map(question =>
//           question._id
//             ? client.updateQuestion(question)
//             : client.createQuestion(qid as string, question)
//         )
//       )
//       alert('Changes saved successfully!')
//     } catch (error) {
//       console.error('Error saving changes:', error)
//       alert('Failed to save changes. Please try again.')
//     }
//   }

//   const handleDeleteClick = async (_id: string) => {
//     try {
//       if (_id) {
//         await client.deleteQuestion(_id)
//       }
//       setQuestions(questions.filter(question => question._id !== _id))
//     } catch (error) {
//       console.error('Error deleting question:', error)
//       alert('Failed to delete question. Please try again.')
//     }
//   }

//   if (questions.length === 0) {
//     return (
//       <div className='d-flex justify-content-center'>
//         <button
//           type='button'
//           className='btn btn-danger mb-2'
//           onClick={handleAddQuestion}
//         >
//           + Add Question
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h1>Quiz Question Editor</h1>
//       <hr />
//       {questions.map((question, index) => (
//         <div key={index} className='card mb-3'>
//           <div className='card-header d-flex align-items-center justify-content-between'>
//             <div className='me-2 flex-grow-1'>
//               <input
//                 type='text'
//                 className='form-control'
//                 placeholder='Question Title'
//                 value={question.title}
//                 onChange={e => {
//                   const updatedQuestions = [...questions]
//                   updatedQuestions[index].title = e.target.value
//                   setQuestions(updatedQuestions)
//                 }}
//               />
//             </div>

//             <div id='wd-css-styling-dropdowns' className='me-2'>
//               <select
//                 className='form-select'
//                 value={question.type}
//                 onChange={e => {
//                   const updatedQuestions = [...questions]
//                   updatedQuestions[index].type = e.target.value as
//                     | 'multiple-choice'
//                     | 'fill-in-the-blank'
//                     | 'true-false'
//                   setQuestions(updatedQuestions)
//                 }}
//               >
//                 <option value='multiple-choice'>Multiple choice</option>
//                 <option value='true-false'>True/False</option>
//                 <option value='fill-in-the-blank'>Fill in the blanks</option>
//               </select>
//             </div>

//             <div className='d-flex align-items-center'>
//               <label htmlFor='points' className='form-label mb-0 me-2'>
//                 <strong>pts:</strong>
//               </label>
//               <input
//                 id='question-point'
//                 type='number'
//                 className='form-control d-inline-block w-auto'
//                 placeholder='0'
//                 value={question.points}
//                 onChange={e => {
//                   const updatedQuestions = [...questions]
//                   updatedQuestions[index].points = Number(e.target.value)
//                   setQuestions(updatedQuestions)
//                 }}
//                 min='0'
//                 step='1'
//               />
//               <div className='ms-3'>
//                 <FaTrash
//                   className='text-danger'
//                   onClick={() => handleDeleteClick(question._id)}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className='card-body'>{renderEditor(question)}</div>
//           <div className='d-flex justify-content-end m-3'>
//             <button type='button' className='btn btn-secondary me-2'>
//               Cancel
//             </button>
//             <button
//               type='button'
//               className='btn btn-danger'
//               onClick={handleSaveChanges}
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       ))}
//       <div className='d-flex justify-content-center'>
//         <button
//           type='button'
//           className='btn btn-danger mb-2'
//           onClick={handleAddQuestion}
//         >
//           + Add Question
//         </button>
//       </div>
//     </div>
//   )
// }
// // import React, { useState, useEffect } from 'react'
// // import FillInTheBlanksEditor from './FillInTheBlanksEditor'
// // import MCEditor from './MCEditor'
// // import TFEditor from './TFEditor'
// // import * as client from '../../QuestionClient' // Adjust the import as necessary
// // import { useParams } from 'react-router'
// // import { FaTrash } from 'react-icons/fa6'

// // interface Question {
// //   title: string
// //   _id: string
// //   text: string
// //   points: number
// //   description: string
// //   type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false'
// //   options?: string[]
// //   answers: string[]
// // }

// // export default function QuizQuestionEditor () {
// //   const { qid } = useParams<{ qid: string }>()
// //   const [questions, setQuestions] = useState<Question[]>([])
// //   const [points, setPoints] = useState(0)

// //   useEffect(() => {
// //     const fetchQuestions = async () => {
// //       try {
// //         const fetchedQuestions = await client.findAllQuestionsByQuizId(
// //           qid as string
// //         )
// //         setQuestions(fetchedQuestions)
// //       } catch (error) {
// //         console.error('Error fetching questions:', error)
// //       }
// //     }

// //     fetchQuestions()
// //   }, [qid])

// //   const renderEditor = (question: Question) => {
// //     switch (question.type) {
// //       case 'multiple-choice':
// //         return <MCEditor question={question} />
// //       case 'true-false':
// //         return <TFEditor question={question} />
// //       case 'fill-in-the-blank':
// //         return <FillInTheBlanksEditor question={question} />
// //       default:
// //         return <MCEditor question={question} />
// //     }
// //   }

// //   const handleAddQuestion = () => {
// //     setQuestions([
// //       ...questions,
// //       {
// //         title: '',
// //         _id: '',
// //         text: '',
// //         points: 0,
// //         description: '',
// //         type: 'multiple-choice',
// //         answers: []
// //       }
// //     ])
// //   }

// //   const handleSaveChanges = async () => {
// //     try {
// //       for (const question of questions) {
// //         if (question._id) {
// //           await client.updateQuestion(question)
// //         } else {
// //           await client.createQuestion(qid as string, question)
// //         }
// //       }
// //       alert('Changes saved successfully!')
// //     } catch (error) {
// //       console.error('Error saving changes:', error)
// //       alert('Failed to save changes. Please try again.')
// //     }
// //   }

// //   const handleDeleteClick = async (_id: string) => {
// //     try {
// //       await client.deleteQuestion(_id)
// //       setQuestions(questions.filter(question => question._id !== _id))
// //       alert('Question deleted successfully!')
// //     } catch (error) {
// //       console.error('Error deleting question:', error)
// //       alert('Failed to delete question. Please try again.')
// //     }
// //   }

// //   if (questions.length === 0) {
// //     return (
// //       <div className='d-flex justify-content-center'>
// //         <button
// //           type='button'
// //           className='btn btn-danger mb-2'
// //           onClick={handleAddQuestion}
// //         >
// //           + Add Question
// //         </button>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div>
// //       <h1>Quiz Question Editor</h1>
// //       <hr />
// //       {questions.map((question, index) => (
// //         <div key={index} className='card mb-3'>
// //           <div className='card-header d-flex align-items-center justify-content-between'>
// //             <div className='me-2 flex-grow-1'>
// //               <input
// //                 type='text'
// //                 className='form-control'
// //                 placeholder='Question Title'
// //                 value={question.title}
// //                 onChange={e => {
// //                   const updatedQuestions = [...questions]
// //                   updatedQuestions[index].title = e.target.value
// //                   setQuestions(updatedQuestions)
// //                 }}
// //               />
// //             </div>

// //             <div id='wd-css-styling-dropdowns' className='me-2'>
// //               <select
// //                 className='form-select'
// //                 value={question.type}
// //                 onChange={e => {
// //                   const updatedQuestions = [...questions]
// //                   updatedQuestions[index].type = e.target.value as
// //                     | 'multiple-choice'
// //                     | 'fill-in-the-blank'
// //                     | 'true-false'
// //                   setQuestions(updatedQuestions)
// //                 }}
// //               >
// //                 <option value='multiple-choice'>Multiple choice</option>
// //                 <option value='true-false'>True/False</option>
// //                 <option value='fill-in-the-blank'>Fill in the blanks</option>
// //               </select>
// //             </div>

// //             <div className='d-flex align-items-center'>
// //               <label htmlFor='points' className='form-label mb-0 me-2'>
// //                 <strong>pts:</strong>
// //               </label>
// //               <input
// //                 id='question-point'
// //                 type='number'
// //                 className='form-control d-inline-block w-auto'
// //                 placeholder='0'
// //                 value={question.points}
// //                 onChange={e => {
// //                   const updatedQuestions = [...questions]
// //                   updatedQuestions[index].points = Number(e.target.value)
// //                   setQuestions(updatedQuestions)
// //                 }}
// //                 min='0'
// //                 step='1'
// //               />
// //               <div className='ms-3'>
// //                 <FaTrash
// //                   className='text-danger'
// //                   onClick={() => handleDeleteClick(question._id)}
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //           <div className='card-body'>{renderEditor(question)}</div>
// //           <div className='d-flex justify-content-end m-3'>
// //             <button type='button' className='btn btn-secondary me-2'>
// //               Cancel
// //             </button>
// //             <button
// //               type='button'
// //               className='btn btn-danger'
// //               onClick={handleSaveChanges}
// //             >
// //               Save Changes
// //             </button>
// //           </div>
// //         </div>
// //       ))}
// //       <div className='d-flex justify-content-center'>
// //         <button
// //           type='button'
// //           className='btn btn-danger mb-2'
// //           onClick={handleAddQuestion}
// //         >
// //           + Add Question
// //         </button>
// //       </div>
// //     </div>
// //   )
// // }
// import React, { useState, useEffect } from 'react'
// import FillInTheBlanksEditor from './FillInTheBlanksEditor'
// import MCEditor from './MCEditor'
// import TFEditor from './TFEditor'
// import * as client from '../../QuestionClient' // Adjust the import as necessary
// import { useParams } from 'react-router'
// import { FaTrash } from 'react-icons/fa6'

// interface Question {
//   title: string
//   _id: string
//   text: string
//   points: number
//   description: string
//   type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false'
//   options?: string[]
//   answers: string[]
// }

// export default function QuizQuestionEditor () {
//   const { qid } = useParams<{ qid: string }>()
//   const [questions, setQuestions] = useState<Question[]>([])

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const fetchedQuestions = await client.findAllQuestionsByQuizId(
//           qid as string
//         )
//         setQuestions(fetchedQuestions)
//       } catch (error) {
//         console.error('Error fetching questions:', error)
//       }
//     }

//     fetchQuestions()
//   }, [qid])

//   const renderEditor = (question: Question, index: number) => {
//     const handleEditorChange = (updatedQuestion: Question) => {
//       const updatedQuestions = [...questions]
//       updatedQuestions[index] = updatedQuestion
//       setQuestions(updatedQuestions)
//     }

//     switch (question.type) {
//       case 'multiple-choice':
//         return <MCEditor question={question} onChange={handleEditorChange} />
//       case 'true-false':
//         return <TFEditor question={question} onChange={handleEditorChange} />
//       case 'fill-in-the-blank':
//         return (
//           <FillInTheBlanksEditor
//             question={question}
//             onChange={handleEditorChange}
//           />
//         )
//       default:
//         return <MCEditor question={question} onChange={handleEditorChange} />
//     }
//   }

//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         title: '',
//         _id: '',
//         text: '',
//         points: 0,
//         description: '',
//         type: 'multiple-choice',
//         answers: []
//       }
//     ])
//   }

//   const handleSaveChanges = async () => {
//     try {
//       for (const question of questions) {
//         if (question._id) {
//           await client.updateQuestion(question)
//         } else {
//           await client.createQuestion(qid as string, question)
//         }
//       }
//       alert('Changes saved successfully!')
//     } catch (error) {
//       console.error('Error saving changes:', error)
//       alert('Failed to save changes. Please try again.')
//     }
//   }

//   const handleDeleteClick = async (_id: string) => {
//     try {
//       if (_id) {
//         await client.deleteQuestion(_id)
//       }
//       setQuestions(questions.filter(question => question._id !== _id))
//     } catch (error) {
//       console.error('Error deleting question:', error)
//       alert('Failed to delete question. Please try again.')
//     }
//   }

//   if (questions.length === 0) {
//     return (
//       <div className='d-flex justify-content-center'>
//         <button
//           type='button'
//           className='btn btn-danger mb-2'
//           onClick={handleAddQuestion}
//         >
//           + Add Question
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h1>Quiz Question Editor</h1>
//       <hr />
//       {questions.map((question, index) => (
//         <div key={index} className='card mb-3'>
//           <div className='card-header d-flex align-items-center justify-content-between'>
//             <div className='me-2 flex-grow-1'>
//               <input
//                 type='text'
//                 className='form-control'
//                 placeholder='Question Title'
//                 value={question.title}
//                 onChange={e => {
//                   const updatedQuestions = [...questions]
//                   updatedQuestions[index].title = e.target.value
//                   setQuestions(updatedQuestions)
//                 }}
//               />
//             </div>

//             <div id='wd-css-styling-dropdowns' className='me-2'>
//               <select
//                 className='form-select'
//                 value={question.type}
//                 onChange={e => {
//                   const updatedQuestions = [...questions]
//                   updatedQuestions[index].type = e.target.value as
//                     | 'multiple-choice'
//                     | 'fill-in-the-blank'
//                     | 'true-false'
//                   setQuestions(updatedQuestions)
//                 }}
//               >
//                 <option value='multiple-choice'>Multiple choice</option>
//                 <option value='true-false'>True/False</option>
//                 <option value='fill-in-the-blank'>Fill in the blanks</option>
//               </select>
//             </div>

//             <div className='d-flex align-items-center'>
//               <label htmlFor='points' className='form-label mb-0 me-2'>
//                 <strong>pts:</strong>
//               </label>
//               <input
//                 id='question-point'
//                 type='number'
//                 className='form-control d-inline-block w-auto'
//                 placeholder='0'
//                 value={question.points}
//                 onChange={e => {
//                   const updatedQuestions = [...questions]
//                   updatedQuestions[index].points = Number(e.target.value)
//                   setQuestions(updatedQuestions)
//                 }}
//                 min='0'
//                 step='1'
//               />
//               <div className='ms-3'>
//                 <FaTrash
//                   className='text-danger'
//                   onClick={() => handleDeleteClick(question._id)}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className='card-body'>{renderEditor(question, index)}</div>
//           <div className='d-flex justify-content-end m-3'>
//             <button type='button' className='btn btn-secondary me-2'>
//               Cancel
//             </button>
//             <button
//               type='button'
//               className='btn btn-danger'
//               onClick={handleSaveChanges}
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       ))}
//       <div className='d-flex justify-content-center'>
//         <button
//           type='button'
//           className='btn btn-danger mb-2'
//           onClick={handleAddQuestion}
//         >
//           + Add Question
//         </button>
//       </div>
//     </div>
//   )
// }
// import React, { useState, useEffect } from 'react'
// import FillInTheBlanksEditor from './FillInTheBlanksEditor'
// import MCEditor from './MCEditor'
// import TFEditor from './TFEditor'
// import * as client from '../../QuestionClient' // Adjust the import as necessary
// import { useParams } from 'react-router'
// import { FaTrash } from 'react-icons/fa6'
// import * as quizClient from '../../client' // Assuming you have a client to handle quiz operations

// interface Question {
//   title: string
//   _id: string
//   text: string
//   points: number
//   description: string
//   type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false'
//   options?: string[]
//   answers: string[]
// }

// interface Quiz {
//   _id: string
//   points: number
// }

// export default function QuizQuestionEditor () {
//   const { qid } = useParams<{ qid: string }>()
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [quiz, setQuiz] = useState<Quiz | null>(null)

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const fetchedQuestions = await client.findAllQuestionsByQuizId(
//           qid as string
//         )
//         setQuestions(fetchedQuestions)
//       } catch (error) {
//         console.error('Error fetching questions:', error)
//       }
//     }

//     const fetchQuiz = async () => {
//       try {
//         const fetchedQuiz = await quizClient.findQuizById(qid as string)
//         setQuiz(fetchedQuiz)
//       } catch (error) {
//         console.error('Error fetching quiz:', error)
//       }
//     }

//     fetchQuestions()
//     fetchQuiz()
//   }, [qid])

//   const renderEditor = (question: Question, index: number) => {
//     const handleEditorChange = (updatedQuestion: Question) => {
//       const updatedQuestions = [...questions]
//       updatedQuestions[index] = updatedQuestion
//       setQuestions(updatedQuestions)
//     }

//     switch (question.type) {
//       case 'multiple-choice':
//         return <MCEditor question={question} onChange={handleEditorChange} />
//       case 'true-false':
//         return <TFEditor question={question} onChange={handleEditorChange} />
//       case 'fill-in-the-blank':
//         return (
//           <FillInTheBlanksEditor
//             question={question}
//             onChange={handleEditorChange}
//           />
//         )
//       default:
//         return <MCEditor question={question} onChange={handleEditorChange} />
//     }
//   }

//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         title: '',
//         _id: '',
//         text: '',
//         points: 0,
//         description: '',
//         type: 'multiple-choice',
//         answers: []
//       }
//     ])
//   }

//   const handleSaveChanges = async () => {
//     try {
//       for (const question of questions) {
//         if (question._id) {
//           await client.updateQuestion(question)
//         } else {
//           await client.createQuestion(qid as string, question)
//         }
//       }

//       const totalPoints = questions.reduce(
//         (acc, question) => acc + question.points,
//         0
//       )
//       if (quiz) {
//         await quizClient.updateQuiz(qid as string, totalPoints)
//       }

//       alert('Changes saved successfully!')
//     } catch (error) {
//       console.error('Error saving changes:', error)
//       alert('Failed to save changes. Please try again.')
//     }
//   }

//   const handleDeleteClick = async (_id: string) => {
//     try {
//       if (_id) {
//         await client.deleteQuestion(_id)
//       }
//       setQuestions(questions.filter(question => question._id !== _id))
//     } catch (error) {
//       console.error('Error deleting question:', error)
//       alert('Failed to delete question. Please try again.')
//     }
//   }

//   if (questions.length === 0) {
//     return (
//       <div className='d-flex justify-content-center'>
//         <button
//           type='button'
//           className='btn btn-danger mb-2'
//           onClick={handleAddQuestion}
//         >
//           + Add Question
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h1>Quiz Question Editor</h1>
//       <hr />
//       {questions.map((question, index) => (
//         <div key={index} className='card mb-3'>
//           <div className='card-header d-flex align-items-center justify-content-between'>
//             <div className='me-2 flex-grow-1'>
//               <input
//                 type='text'
//                 className='form-control'
//                 placeholder='Question Title'
//                 value={question.title}
//                 onChange={e => {
//                   const updatedQuestions = [...questions]
//                   updatedQuestions[index].title = e.target.value
//                   setQuestions(updatedQuestions)
//                 }}
//               />
//             </div>

//             <div id='wd-css-styling-dropdowns' className='me-2'>
//               <select
//                 className='form-select'
//                 value={question.type}
//                 onChange={e => {
//                   const updatedQuestions = [...questions]
//                   updatedQuestions[index].type = e.target.value as
//                     | 'multiple-choice'
//                     | 'fill-in-the-blank'
//                     | 'true-false'
//                   setQuestions(updatedQuestions)
//                 }}
//               >
//                 <option value='multiple-choice'>Multiple choice</option>
//                 <option value='true-false'>True/False</option>
//                 <option value='fill-in-the-blank'>Fill in the blanks</option>
//               </select>
//             </div>

//             <div className='d-flex align-items-center'>
//               <label htmlFor='points' className='form-label mb-0 me-2'>
//                 <strong>pts:</strong>
//               </label>
//               <input
//                 id='question-point'
//                 type='number'
//                 className='form-control d-inline-block w-auto'
//                 placeholder='0'
//                 value={question.points}
//                 onChange={e => {
//                   const updatedQuestions = [...questions]
//                   updatedQuestions[index].points = Number(e.target.value)
//                   setQuestions(updatedQuestions)
//                 }}
//                 min='0'
//                 step='1'
//               />
//               <div className='ms-3'>
//                 <FaTrash
//                   className='text-danger'
//                   onClick={() => handleDeleteClick(question._id)}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className='card-body'>{renderEditor(question, index)}</div>
//           <div className='d-flex justify-content-end m-3'>
//             <button type='button' className='btn btn-secondary me-2'>
//               Cancel
//             </button>
//             <button
//               type='button'
//               className='btn btn-danger'
//               onClick={handleSaveChanges}
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       ))}
//       <div className='d-flex justify-content-center'>
//         <button
//           type='button'
//           className='btn btn-danger mb-2'
//           onClick={handleAddQuestion}
//         >
//           + Add Question
//         </button>
//       </div>
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react'
import FillInTheBlanksEditor from './FillInTheBlanksEditor'
import MCEditor from './MCEditor'
import TFEditor from './TFEditor'
import * as client from '../../QuestionClient' // Adjust the import as necessary
import { useParams } from 'react-router'
import { FaTrash } from 'react-icons/fa6'
import * as quizClient from '../../client' // Assuming you have a client to handle quiz operations

interface Question {
  title: string
  _id: string
  text: string
  points: number
  description: string
  type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false'
  options?: string[]
  answers: string[]
}

interface Quiz {
  _id: string
  points: number
}

export default function QuizQuestionEditor () {
  const { qid } = useParams<{ qid: string }>()
  const [questions, setQuestions] = useState<Question[]>([])
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await client.findAllQuestionsByQuizId(
          qid as string
        )
        setQuestions(fetchedQuestions)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await quizClient.findQuizById(qid as string)
        setQuiz(fetchedQuiz)
      } catch (error) {
        console.error('Error fetching quiz:', error)
      }
    }

    fetchQuestions()
    fetchQuiz()
  }, [qid])

  const renderEditor = (question: Question, index: number) => {
    const handleEditorChange = (updatedQuestion: Question) => {
      const updatedQuestions = [...questions]
      updatedQuestions[index] = updatedQuestion
      setQuestions(updatedQuestions)
    }

    switch (question.type) {
      case 'multiple-choice':
        return <MCEditor question={question} onChange={handleEditorChange} />
      case 'true-false':
        return <TFEditor question={question} onChange={handleEditorChange} />
      case 'fill-in-the-blank':
        return (
          <FillInTheBlanksEditor
            question={question}
            onChange={handleEditorChange}
          />
        )
      default:
        return <MCEditor question={question} onChange={handleEditorChange} />
    }
  }

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: '',
        _id: '',
        text: '',
        points: 0,
        description: '',
        type: 'multiple-choice',
        answers: []
      }
    ])
  }

  const handleSaveChanges = async () => {
    try {
      for (const question of questions) {
        if (question._id) {
          await client.updateQuestion(question)
        } else {
          await client.createQuestion(qid as string, question)
        }
      }

      const totalPoints = questions.reduce(
        (acc, question) => acc + question.points,
        0
      )
      if (quiz) {
        await quizClient.updateQuiz({
          ...quiz,
          points: totalPoints
        })
      }

      alert('Changes saved successfully!')
    } catch (error) {
      console.error('Error saving changes:', error)
      alert('Failed to save changes. Please try again.')
    }
  }

  const handleDeleteClick = async (_id: string) => {
    try {
      if (_id) {
        await client.deleteQuestion(_id)
      }
      setQuestions(questions.filter(question => question._id !== _id))
    } catch (error) {
      console.error('Error deleting question:', error)
      alert('Failed to delete question. Please try again.')
    }
  }

  if (questions.length === 0) {
    return (
      <div className='d-flex justify-content-center'>
        <button
          type='button'
          className='btn btn-danger mb-2'
          onClick={handleAddQuestion}
        >
          + Add Question
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1>Quiz Question Editor</h1>
      <hr />
      {questions.map((question, index) => (
        <div key={index} className='card mb-3'>
          <div className='card-header d-flex align-items-center justify-content-between'>
            <div className='me-2 flex-grow-1'>
              <input
                type='text'
                className='form-control'
                placeholder='Question Title'
                value={question.title}
                onChange={e => {
                  const updatedQuestions = [...questions]
                  updatedQuestions[index].title = e.target.value
                  setQuestions(updatedQuestions)
                }}
              />
            </div>

            <div id='wd-css-styling-dropdowns' className='me-2'>
              <select
                className='form-select'
                value={question.type}
                onChange={e => {
                  const updatedQuestions = [...questions]
                  updatedQuestions[index].type = e.target.value as
                    | 'multiple-choice'
                    | 'fill-in-the-blank'
                    | 'true-false'
                  setQuestions(updatedQuestions)
                }}
              >
                <option value='multiple-choice'>Multiple choice</option>
                <option value='true-false'>True/False</option>
                <option value='fill-in-the-blank'>Fill in the blanks</option>
              </select>
            </div>

            <div className='d-flex align-items-center'>
              <label htmlFor='points' className='form-label mb-0 me-2'>
                <strong>pts:</strong>
              </label>
              <input
                id='question-point'
                type='number'
                className='form-control d-inline-block w-auto'
                placeholder='0'
                value={question.points}
                onChange={e => {
                  const updatedQuestions = [...questions]
                  updatedQuestions[index].points = Number(e.target.value)
                  setQuestions(updatedQuestions)
                }}
                min='0'
                step='1'
              />
              <div className='ms-3'>
                <FaTrash
                  className='text-danger'
                  onClick={() => handleDeleteClick(question._id)}
                />
              </div>
            </div>
          </div>
          <div className='card-body'>{renderEditor(question, index)}</div>
          <div className='d-flex justify-content-end m-3'>
            <button type='button' className='btn btn-secondary me-2'>
              Cancel
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      ))}
      <div className='d-flex justify-content-center'>
        <button
          type='button'
          className='btn btn-danger mb-2'
          onClick={handleAddQuestion}
        >
          + Add Question
        </button>
      </div>
    </div>
  )
}
