import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    accountReducer
  },
});
export default store;