import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import resumeReducer from '../features/resume/resumeSlice';
import jobReducer from '../features/jobs/jobSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    jobs: jobReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Allows File object references in resume preview
    }),
});

export default store;
