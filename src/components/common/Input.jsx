import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-sm">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <LeftIcon className="w-5 h-5" />
          </div>
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border bg-white dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-all duration-200 py-2.5 outline-none
            ${LeftIcon ? 'pl-11' : 'pl-4'}
            ${isPassword || RightIcon ? 'pr-11' : 'pr-4'}
            ${
              error
                ? 'border-rose-400 dark:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20'
            }
            ${disabled ? 'bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed opacity-75' : ''}
            ${className}`}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        ) : (
          RightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
              <RightIcon className="w-5 h-5" />
            </div>
          )
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-rose-500 dark:text-rose-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
