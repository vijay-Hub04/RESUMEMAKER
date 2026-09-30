import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Upload,
  Search,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  ShieldAlert,
  Award,
  ChevronRight,
  Printer,
} from 'lucide-react';
import { getScoreColor } from '../utils/helpers';
import { DEFAULT_MOCK_ATS_RESULT } from '../utils/constants';
import { removeResume, analyzeGeneralATS, setMockDemoResume } from '../features/resume/resumeSlice';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

export const ATSResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uploadedFile, atsResults, analysisStatus } = useSelector((state) => state.resume);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Fallback to default mock result if user navigates directly to /ats-results
  const results = atsResults || {
    ...DEFAULT_MOCK_ATS_RESULT,
    fileName: uploadedFile?.fileName || 'Alex_Morgan_Senior_FullStack_Resume.pdf',
    analyzedAt: new Date().toISOString(),
    isSimulated: true,
  };

  const score = results.score || 78;
  const scoreConfig = getScoreColor(score);

  // SVG Circular calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const handleUploadAnother = () => {
    dispatch(removeResume());
    navigate('/ats-checker');
  };

  const handleMatchWithJobs = () => {
    if (isAuthenticated) {
      navigate('/jobs');
    } else {
      toast('Please sign in to compare against specific job postings.', { icon: '🔒' });
      navigate('/login', { state: { from: '/jobs' } });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notice of simulated analysis per prompt instructions */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
              <strong className="font-semibold">Simulated ATS Analysis (Frontend Demo Mode):</strong> Results below illustrate comprehensive ATS parsing algorithms and actionable suggestions.
            </p>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-200/70 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300">
            Demo Mode Active
          </span>
        </div>

        {/* Top Header & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ATS Comprehensive Audit</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Resume Diagnostic Report
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>{results.fileName}</span>
              <span>•</span>
              <span>Scanned {new Date(results.analyzedAt || Date.now()).toLocaleDateString()}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              leftIcon={Printer}
              className="hidden sm:inline-flex"
            >
              Export Report
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleUploadAnother}
              leftIcon={Upload}
            >
              Upload Another Resume
            </Button>
            <Button
              variant="gradient"
              size="sm"
              onClick={handleMatchWithJobs}
              rightIcon={ArrowRight}
            >
              Check Against Live Jobs
            </Button>
          </div>
        </div>

        {/* Hero Score Card */}
        <div className="rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Circular Progress Gauge */}
            <div className="flex flex-col items-center justify-center text-center lg:border-r border-slate-100 dark:border-slate-800/80 lg:pr-8">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                  {/* Track circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-slate-100 dark:text-slate-800"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke={scoreConfig.stroke}
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: strokeDashoffset }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-5xl font-black font-heading text-slate-900 dark:text-white"
                  >
                    {score}
                  </motion.span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest -mt-1">
                    out of 100
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <span
                  className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold ${scoreConfig.badge}`}
                >
                  {results.status || scoreConfig.label}
                </span>
              </div>
            </div>

            {/* Score Executive Summary */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Executive Parsing Evaluation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {results.summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">Layout Health</span>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    88% Optimal
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">Keyword Density</span>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-indigo-500" />
                    74% Matched
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-xs text-slate-400 block font-medium">Parser Readability</span>
                  <span className="text-lg font-bold text-emerald-500 flex items-center gap-1.5 mt-0.5">
                    High (Workday/Taleo)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Formatting Analysis */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                Formatting & Layout Analysis
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Score: {results.formatting?.score || 88}/100
              </span>
            </div>

            <ul className="space-y-3.5">
              {results.formatting?.items?.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                >
                  {item.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills & Keyword Analysis */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-500" />
                  Skills & Keyword Analysis
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {results.skillsAnalysis?.matchedPercentage || 74}% Match
                </span>
              </div>

              {/* Detected Skills */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Detected Core Competencies ({results.skillsAnalysis?.topFoundSkills?.length || 0})
                </p>
                <div className="flex flex-wrap gap-2">
                  {results.skillsAnalysis?.topFoundSkills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing High Value Keywords */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Recommended Missing Keywords ({results.skillsAnalysis?.missingKeywords?.length || 0})
                </p>
                <div className="flex flex-wrap gap-2">
                  {results.skillsAnalysis?.missingKeywords?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              ATS engines rank candidates higher when these missing terms appear in context alongside tangible achievements.
            </p>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md">
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              Resume Strengths
            </h3>
            <ul className="space-y-3">
              {results.strengths?.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md">
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 mb-4 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-5 h-5" />
              Areas Needing Attention
            </h3>
            <ul className="space-y-3">
              {results.weaknesses?.map((weak, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step-by-Step Improvement Suggestions */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md mb-12">
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            AI Action Plan: Steps to Reach 90+ Score
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
            Make the following high-priority revisions to maximize your recruiter conversion rate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {results.recommendations?.map((rec, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                    Step {idx + 1}: {rec.category}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                    {rec.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-slate-800/60 dark:to-indigo-950/40 border border-indigo-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
              Want to test this resume against a specific open position?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select any role in our job directory to calculate role-specific ATS match percentage.
            </p>
          </div>
          <Button
            variant="gradient"
            size="lg"
            onClick={handleMatchWithJobs}
            rightIcon={ChevronRight}
          >
            Match With Jobs Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ATSResults;
