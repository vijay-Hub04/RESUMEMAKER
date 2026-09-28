import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Loader = ({ text = 'Loading...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="relative flex items-center justify-center mb-4">
        {/* Pulsing outer ring */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 blur-md"
        />

        {/* Spinning gradient ring */}
        <div className="w-12 h-12 rounded-full border-3 border-transparent border-t-indigo-600 border-r-cyan-400 animate-spin" />

        {/* Central spark */}
        <div className="absolute inset-0 flex items-center justify-center text-indigo-600 dark:text-cyan-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
      </div>

      <p className="text-sm font-medium text-slate-600 dark:text-slate-300 tracking-wide">
        {text}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
