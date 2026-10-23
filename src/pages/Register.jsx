import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isLoading, error, resetError } = useAuth();
  const { uploadedFile } = useSelector((state) => state.resume);

  // Clear previous auth errors (e.g. from login page) on mount and unmount
  useEffect(() => {
    resetError();
    return () => resetError();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: true,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const from = location.state?.from || '/jobs';

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }

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

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreedToTerms) {
      errs.terms = 'You must agree to the Terms of Service';
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetError();
    if (!validate()) return;

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        resumeId: uploadedFile?.id || uploadedFile?._id || null,
      }).unwrap();
      toast.success('Account created successfully! Welcome to CareerAI.');
      navigate(from, { replace: true });
    } catch (err) {
      const displayMsg =
        typeof err === 'string' && !err.includes('users.findOne') && !err.includes('buffering timed out')
          ? err
          : 'Registration failed. Please check your details and try again.';
      toast.error(displayMsg);
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
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-xl shadow-indigo-500/25 ring-1 ring-indigo-500/30 mx-auto mb-3 bg-slate-900">
            <img
              src="/assets/careerai_logo.jpg"
              alt="CareerAI Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Unlock job search, saved profiles, and role-specific ATS match checks.
          </p>
        </div>

        {/* Register Card */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              id="register-name"
              placeholder="Alex Morgan"
              leftIcon={User}
              value={formData.name}
              error={validationErrors.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              id="register-email"
              type="email"
              placeholder="alex@example.com"
              leftIcon={Mail}
              value={formData.email}
              error={validationErrors.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              id="register-password"
              type="password"
              placeholder="At least 6 characters"
              leftIcon={Lock}
              value={formData.password}
              error={validationErrors.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Input
              label="Confirm Password"
              id="register-confirm"
              type="password"
              placeholder="Re-enter your password"
              leftIcon={Lock}
              value={formData.confirmPassword}
              error={validationErrors.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            <div className="pt-1">
              <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 mt-0.5"
                />
                <span>
                  I agree to the <a href="#terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</a> and <a href="#privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</a>.
                </span>
              </label>
              {validationErrors.terms && (
                <p className="text-xs text-rose-500 mt-1">{validationErrors.terms}</p>
              )}
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
              Create Free Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                state={{ from }}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
