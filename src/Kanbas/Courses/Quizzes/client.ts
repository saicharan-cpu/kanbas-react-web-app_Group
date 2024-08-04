import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${courseId}/quizzes`);
  return response.data;
};

export const fetchQuiz = async (quizId: string) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/quizzes/${quizId}`);
  return response.data;
};

export const createQuiz = async (quiz: any) => {
  const response = await axios.post(`${QUIZZES_API}/${quiz.courseId}/quizzes`, quiz);
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axios.put(`${REMOTE_SERVER}/api/quizzes/${quizId}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${REMOTE_SERVER}/api/quizzes/${quizId}`);
  return response.data;
};

export const publishQuiz = async (quizId: string) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/quizzes/${quizId}/publish`);
  return response.data;
};

export const unpublishQuiz = async (quizId: string) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/quizzes/${quizId}/unpublish`);
  return response.data;
};
