import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
// import authReducer from "./reducers/authReducers"; // Import your reducers

const store = configureStore({
  reducer: rootReducer,
});

export default store;
