import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '14px',
            background: 'var(--toast-bg, #1e293b)',
            color: 'var(--toast-color, #f8fafc)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '14px',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
          },
        }}
      />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
