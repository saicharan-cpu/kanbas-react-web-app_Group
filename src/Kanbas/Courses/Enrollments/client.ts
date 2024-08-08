import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const createEnrollment = async (courseId: string) => {
  const response = await axiosWithCredentials.post(ENROLLMENTS_API, {
    course: courseId,
  });
  return response.data;
};

export const findMyEnrollments = async () => {
  const response = await axiosWithCredentials.get(ENROLLMENTS_API);
  return response.data;
};

export const deleteEnrollment = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${ENROLLMENTS_API}/course/${courseId}`
  );
  return response.data;
};

export const fetchAllEnrollments = async () => {
  const response = await axiosWithCredentials.get(ENROLLMENTS_API);
  return response.data;
};