import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowUpRight } from 'lucide-react';

const LinkedInIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24M7.86 18.5v-8.37H5.07v8.37h2.79z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-[#0B1120]/80 backdrop-blur-md pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200/60 dark:border-slate-800/60">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Career<span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Empowering job seekers with smarter resume analysis, intelligent ATS score optimization, and high-compatibility career opportunities.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800/80 dark:hover:bg-indigo-950/60 text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 flex items-center justify-center transition-colors"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800/80 dark:hover:bg-indigo-950/60 text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 flex items-center justify-center transition-colors"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800/80 dark:hover:bg-indigo-950/60 text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 flex items-center justify-center transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-heading mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Home & Growth Stats
                </Link>
              </li>
              <li>
                <Link
                  to="/ats-checker"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Resume ATS Scanner
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Explore Jobs
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-heading mb-4">
              Legal & Privacy
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#privacy"
                  onClick={(e) => e.preventDefault()}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  onClick={(e) => e.preventDefault()}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  onClick={(e) => e.preventDefault()}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Data Security & ATS Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 gap-4">
          <p>© 2026 CareerAI. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed with precision for modern job seekers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
