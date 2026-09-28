import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  FileCheck2,
  Briefcase,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  LogIn,
  UserPlus,
  Info,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../common/ThemeToggle';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'ATS Checker', path: '/ats-checker' },
    { name: 'Job Search', path: '/jobs' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-heading tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Career<span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1 hidden sm:block">
                ATS & Job Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <a
              href="#about"
              onClick={(e) => {
                if (location.pathname !== '/') {
                  navigate('/#about');
                }
              }}
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              About
            </a>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            {isAuthenticated ? (
              /* User Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-colors"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={user?.name || 'User'}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200 max-w-[120px] truncate">
                    {user?.name || 'My Profile'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      profileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#151F32] shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {user?.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <User className="w-4 h-4 text-indigo-500" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/jobs"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <Briefcase className="w-4 h-4 text-cyan-500" />
                          <span>Browse Jobs</span>
                        </Link>
                        <Link
                          to="/ats-checker"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <FileCheck2 className="w-4 h-4 text-emerald-500" />
                          <span>ATS Scanner</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Guest Auth Buttons */
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-glow transition-all flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                About
              </a>

              <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <img
                        src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-400">{user?.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                      Profile Settings
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link
                      to="/login"
                      className="w-full py-2.5 text-center text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
