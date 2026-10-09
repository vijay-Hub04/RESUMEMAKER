import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import { fetchMyResume } from './features/resume/resumeSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If user is authenticated, automatically fetch their saved resume from MongoDB
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMyResume());
    }
  }, [dispatch, isAuthenticated]);

  return <AppRoutes />;
}

export default App;
