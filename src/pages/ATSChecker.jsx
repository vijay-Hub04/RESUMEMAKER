import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Sparkles, Check, HelpCircle, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';
import ResumeUploader from '../components/resume/ResumeUploader';

export const ATSChecker = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Free Public ATS Diagnostics</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white"
          >
            Resume ATS Compatibility Scanner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Over 75% of resumes are discarded by Applicant Tracking Systems before a human recruiter even sees them. Check your format, density, and keywords now.
          </motion.p>
        </div>

        {/* The Uploader Area */}
        <div className="mb-16">
          <ResumeUploader />
        </div>

        {/* ATS Best Practice Guidelines */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              What Applicant Tracking Systems Look For
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Follow these foundational principles to maximize your resume parse rate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Clean Linear Formatting
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Avoid tables, text boxes, and complex multi-column grids. Simple single-column layouts parse with 99.4% accuracy across Taleo, Workday, and Greenhouse.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Standard Section Titles
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Use conventional headings like "Experience", "Skills", "Education", and "Projects" so semantic parsers can categorize your data without errors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Exact Skill Terminology
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                ATS engines search for exact matching terms (e.g. "React.js", "Redux", "TypeScript"). Ensure both acronyms and full phrases are present.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSChecker;
