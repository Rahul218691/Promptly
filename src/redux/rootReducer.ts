import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other slices here as needed (e.g., formBuilder: formBuilderReducer)
});

export type RootState = ReturnType<typeof rootReducer>;

// Correct way to export as default
export default rootReducer;