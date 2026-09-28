import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated && !isLoading) {
    toast('Authentication required to access this feature. Please sign in.', {
      icon: '🔒',
      id: 'auth-required',
    });
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
