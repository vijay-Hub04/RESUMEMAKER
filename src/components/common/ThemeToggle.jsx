import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <motion.div
          key={theme}
          initial={{ y: isDark ? -20 : 20, opacity: 0, rotate: isDark ? -90 : 90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: isDark ? 20 : -20, opacity: 0, rotate: isDark ? 90 : -90 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400 stroke-[2.2]" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600 stroke-[2.2]" />
          )}
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
