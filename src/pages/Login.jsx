import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, resetError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [validationErrors, setValidationErrors] = useState({});

  // Preserve redirected destination (e.g. /jobs or /profile)
  const from = location.state?.from || '/jobs';

  const validate = () => {
    const errs = {};
    if (!formData.email) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetError();
    if (!validate()) return;

    try {
      await login({ email: formData.email, password: formData.password }).unwrap();
      toast.success('Welcome back! Signed in successfully.');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleDemoLogin = async () => {
    const demoCredentials = {
      email: 'alex.morgan@careerai.dev',
      password: 'password123',
    };
    setFormData((prev) => ({ ...prev, ...demoCredentials }));
    try {
      await login(demoCredentials).unwrap();
      toast.success('Logged in with Demo Candidate profile!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error('Demo login failed');
    }
  };

  return (
    <div className="py-12 sm:py-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-500/20 mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
            Sign In to CareerAI
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access job search, targeted ATS matching, and saved positions.
          </p>
        </div>

        {/* Login Card */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-xl">
          {/* Quick Demo Fill button */}
          <div className="mb-6 p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex items-center justify-between">
            <div className="text-xs text-indigo-900 dark:text-indigo-200">
              <span className="font-bold">Fast Review?</span> Use instant demo profile.
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-xl shadow-sm transition-colors"
            >
              1-Click Demo
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              id="login-email"
              type="email"
              placeholder="you@example.com"
              leftIcon={Mail}
              value={formData.email}
              error={validationErrors.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              id="login-password"
              type="password"
              placeholder="••••••••"
              leftIcon={Lock}
              value={formData.password}
              error={validationErrors.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => toast('Password reset link will be sent in production mode.', { icon: '🔑' })}
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-4"
              isLoading={isLoading}
              rightIcon={ArrowRight}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Don't have an account yet?{' '}
              <Link
                to="/register"
                state={{ from }}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>General ATS scanning remains 100% free without signing in</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
