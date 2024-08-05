import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;


export const deleteQuiz = async (quizID : string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizID}`);
  return response.data;
};

export const createQuizzes = async (courseId: string, quiz: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};


export const findQuizzesForCourse = async (courseId : string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/Quizzes`);
  return response.data;
};

export const findQuiz = async (courseId: string, qid: string) => { // Changed from findQuizzes to findQuiz
  try {
    const response = await axios.get(`${COURSES_API}/${courseId}/Quizzes/${qid}`);
    return response.data;
  } catch (error : any) {
        throw new Error('Error fetching quiz details: ' + error.message);

  }
 
};
export const findQuizById = async (id: string) => {
  const response = await axios.get(`${QUIZZES_API}/${id}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  if (!quiz._id) {
    throw new Error('Quiz ID is missing.');
  }
  console.log(`Updating quiz with ID: ${quiz._id}`);
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

// export const findQuizQuestions = async (quizId : any) => {
//   const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
//   return response.data;
// };

// ///QUESTIONS
// export const findAllQuestionsByQuizId= async (quizId : string) => {
//   const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
//   return response.data;
// };

// export const deleteQuestion = async (questionId : string) => {
//   const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
//   return response.data;
// };

// export const createQuestion = async (quizId : string, question : any) => {
//   const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
//   return response.data;
// };

// export const updateQuestion = async (question : any) => {
//   const response = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
//   return response.data;
// };


