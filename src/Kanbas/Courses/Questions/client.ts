import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/quizzes`;

export const fetchQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUESTIONS_API}/${quizId}/questions`);
  return response.data;
};

export const fetchQuestion = async (quizId: string, questionId: string) => {
  const response = await axios.get(`${QUESTIONS_API}/${quizId}/questions/${questionId}`);
  return response.data;
};

export const createQuestion = async (quizId: string, question: any) => {
  const response = await axios.post(`${QUESTIONS_API}/${quizId}/questions`, question);
  return response.data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const response = await axios.delete(`${QUESTIONS_API}/${quizId}/questions/${questionId}`);
  return response.data;
};

export const updateQuestion = async (quizId: string, question: any) => {
  const response = await axios.put(`${QUESTIONS_API}/${quizId}/questions/${question._id}`, question);
  return response.data;
};
