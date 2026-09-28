import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

// Core Application Pages (Dashboard, Login, Register)
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Primary Published Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect other routes to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
