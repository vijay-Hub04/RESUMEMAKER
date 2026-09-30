import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFound = () => {
  return (
    <div className="py-20 sm:py-32 flex items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md space-y-6"
      >
        <div className="relative inline-block">
          <span className="text-8xl sm:text-9xl font-black font-heading gradient-text">
            404
          </span>
          <div className="absolute -top-2 -right-4 p-2 rounded-2xl bg-indigo-500 text-white shadow-glow">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The page you are looking for doesn't exist, has been moved, or requires different permissions.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={Home}>
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/ats-checker">
            <Button variant="secondary" size="md">
              Try ATS Checker
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
