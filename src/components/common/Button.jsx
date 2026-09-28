import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-md hover:shadow-glow focus:ring-indigo-500',
  gradient:
    'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white shadow-lg hover:shadow-glow focus:ring-purple-500',
  secondary:
    'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:ring-slate-400',
  outline:
    'bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-700/60 focus:ring-indigo-500',
  ghost:
    'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 focus:ring-slate-400',
  danger:
    'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm font-medium rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base font-semibold rounded-xl gap-2.5',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!isLoading && RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
    </motion.button>
  );
};

export default Button;
