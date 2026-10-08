import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  // If already authenticated, redirect logged-in users away from auth pages (login/register) to previous page or dashboard
  if (isAuthenticated && !isLoading) {
    const redirectPath = location.state?.from || '/';
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;
