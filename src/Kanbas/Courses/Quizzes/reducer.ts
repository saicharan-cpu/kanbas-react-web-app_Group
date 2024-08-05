import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
};

const quizzesSlicer = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuizzes: (state, { payload: quiz }) => {
      state.quizzes.push(quiz);
    },
    deleteQuizzes: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (q) => q.id !== quizId
      );
    },
    updateQuizzes: (state, { payload: updatedQuizzes }) => {
      const index = state.quizzes.findIndex((q) => q.id === updatedQuizzes.id);
      if (index !== -1) {
        state.quizzes[index] = updatedQuizzes;
      }
    },
  },
});

export const { addQuizzes, deleteQuizzes, updateQuizzes, setQuizzes } =
  quizzesSlicer.actions;
export default quizzesSlicer.reducer;
