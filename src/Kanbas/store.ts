import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
import accountReducer from "./Account/reducer";
import questionsReducer from "./Courses/Quizzes/QuestionsReducer"
import answerReducer from "./Courses/Quizzes/AnswerReducer"

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    quizzesReducer,
    accountReducer,
    questionsReducer,
    answerReducer
  },
});
export default store;