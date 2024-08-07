// // import axios from "axios";
// // const axiosWithCredentials = axios.create({ withCredentials: true });
// // export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// // export const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`
// // export const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

// // export const createAnswer = async (questionId: string, answer: any) => {
// //   try {
// //     const response = await axios.post(`${REMOTE_SERVER}/${questionId}`, answer);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error creating answer:', error);
// //     throw error;
// //   }
// // };
 
// // export const updateAnswer = async (answer: any) => {
// //   try {
// //     const response = await axios.put(`${ANSWERS_API}/${answer._id}`, answer);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error updating answer:', error);
// //     throw error;
// //   }
// // };
 
// // export const fetchAnswer = async (userId: string, quizId: string, questionId: string) => {
// //   try {
// //     const response = await axios.get(`${ANSWERS_API}/answers/${userId}/${quizId}/${questionId}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching answer:', error);
// //     throw error;
// //   }
// // };

// // import axios from "axios";
// // const axiosWithCredentials = axios.create({ withCredentials: true });
// // export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// // export const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`
// // export const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

// // export const createAnswer = async (userId: string, quizId: string, questionId: string, answer: any) => {
// //   try {
// //     const response = await axios.post(`${ANSWERS_API}`, { userId, quizId, questionId, answer });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error creating answer:', error);
// //     throw error;
// //   }
// // };

// // export const updateAnswer = async (userId: string, quizId: string, questionId: string, answer: any) => {
// //   try {
// //     const response = await axios.put(`${ANSWERS_API}/${userId}/${quizId}/${questionId}`, answer);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error updating answer:', error);
// //     throw error;
// //   }
// // };

// // export const fetchAnswer = async (userId: string, quizId: string, questionId: string) => {
// //   try {
// //     const response = await axios.get(`${ANSWERS_API}/${userId}/${quizId}/${questionId}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching answer:', error);
// //     throw error;
// //   }
// // };
// // import axios from 'axios';
// // export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

// // export const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

// // export const createAnswer = async (answer : any) => {
// //   const response = await axios.post(`${ANSWERS_API}/answers`, answer);
// //   return response.data;
// // };

// // export const updateAnswer = async (userId : string, questionId : string, answer :any) => {
// //   const response = await axios.put(`${ANSWERS_API}/answers/${userId}/${questionId}`, answer);
// //   return response.data;
// // };

// // export const fetchAnswer = async (userId: string, questionId: string) => {
// //   const response = await axios.get(`${ANSWERS_API}/answers/${userId}/${questionId}`);
// //   return response.data;
// // };

// // export const fetchAllAnswersForQuiz = async (userId: string, quizId : string) => {
// //   const response = await axios.get(`${ANSWERS_API}/answers/${userId}/quiz/${quizId}`);
// //   return response.data;
// // };
// import axios from "axios";

// const axiosWithCredentials = axios.create({ withCredentials: true });
// export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// export const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

// export const createAnswer = async (userId: string, quizId: string, questionId: string, answer: any) => {
//   try {
//     const response = await axios.post(`${ANSWERS_API}`, { userId, quizId, questionId, answer });
//     return response.data;
//   } catch (error) {
//     console.error('Error creating answer:', error);
//     throw error;
//   }
// };

// export const updateAnswer = async (answerId: string, answer: any) => {
//   try {
//     const response = await axios.put(`${ANSWERS_API}/${answerId}`, answer);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating answer:', error);
//     throw error;
//   }
// };

// export const fetchAnswer = async (userId: string, quizId: string, questionId: string) => {
//   try {
//     const response = await axios.get(`${ANSWERS_API}/${userId}/${questionId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching answer:', error);
//     throw error;
//   }
// };
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
export const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

export const createAnswer = async (questionId: string, answer: any) => {
    const response = await axios.post(`${ANSWERS_API}/${questionId}/answers`, answer);
    return response.data;
  
};

export const updateAnswer = async (answer: any, questionId: string, userId: string) => {
    // if (!answer._id) {
    //     throw new Error("Answer ID is missing!")
    // }
    try {
    console.log("updating: " + questionId + ", userId: " + userId)
    const response = await axios.put(`${ANSWERS_API}/${userId}/${questionId}/stored`, answer);
    return response.data;
  } catch (error) {
    console.error('Error updating answer:', error);
    throw error;
  }
};

export const fetchAnswer = async (userId: string, questionId: string) => {
    try {
      console.log("User ID in findAnswer client:" + userId)
    const response = await axios.get(`${ANSWERS_API}/${userId}/${questionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching answer:', error);
    throw error;
  }
};

export const fetchAllAnswersForQuiz = async (userId: string, quizId: string) => {
  const response = await axios.get(`${ANSWERS_API}/${userId}/quiz/${quizId}`);
  return response.data;
};
