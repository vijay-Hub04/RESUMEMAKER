import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  FileCheck,
  TrendingUp,
  Briefcase,
  ArrowRight,
  Shield,
  Zap,
  Target,
  CheckCircle,
  Cpu,
  Layers,
  Star,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { APP_TAGLINE, APP_SUBTITLE, PLATFORM_STATS } from '../utils/constants';
import StatsCard from '../components/dashboard/StatsCard';
import UserGrowthChart from '../components/dashboard/UserGrowthChart';
import ResumeUploader from '../components/resume/ResumeUploader';
import Button from '../components/common/Button';
import { setMockDemoResume } from '../features/resume/resumeSlice';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const uploadSectionRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTryDemo = () => {
    dispatch(setMockDemoResume());
    scrollToUpload();
    toast.success('Loaded sample resume into the scanner below!');
  };

  const handleExploreJobsClick = () => {
    if (isAuthenticated) {
      navigate('/jobs');
    } else {
      toast('Signing in gives you full access to all verified listings.', { icon: '💼' });
      navigate('/login', { state: { from: '/jobs' } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Subtle decorative background gradient blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-cyan-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-300 shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span>AI Resume Optimization & Job Intelligence 2.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            Your Career, <span className="gradient-text">Optimized for Success.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {APP_SUBTITLE}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              variant="gradient"
              size="lg"
              onClick={scrollToUpload}
              rightIcon={ArrowRight}
              className="shadow-glow"
            >
              Analyze My Resume Free
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleExploreJobsClick}
              leftIcon={Briefcase}
            >
              Explore Tech Jobs
            </Button>

            <button
              type="button"
              onClick={handleTryDemo}
              className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline px-2 py-1"
            >
              Try Instant Demo Sample
            </button>
          </motion.div>

          {/* Value Props Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400"
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Free Instant ATS Scoring
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Role-Specific Keyword Matching
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Privacy First & Encrypted
            </span>
          </motion.div>
        </div>
      </section>

      {/* PLATFORM METRICS CARDS */}
      <section className="py-8 -mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLATFORM_STATS.map((stat, idx) => (
              <StatsCard key={stat.id} stat={stat} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* USER GROWTH ANALYTICS SECTION (Section 4 Requirements) */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UserGrowthChart />
        </div>
      </section>

      {/* RESUME ATS CHECKER SECTION (Section 5 Requirements) */}
      <section
        id="resume-upload"
        ref={uploadSectionRef}
        className="py-16 sm:py-24 bg-gradient-to-b from-transparent via-indigo-50/40 dark:via-indigo-950/20 to-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>ATS Compatibility Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Is Your Resume Ready to Beat the ATS?
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              Upload your resume and discover how well it performs against modern Applicant Tracking Systems before applying to your dream companies.
            </p>
          </div>

          {/* Modern Drag and Drop Resume Uploader with 2 Option Cards */}
          <ResumeUploader />
        </div>
      </section>

      {/* HOW IT WORKS / ABOUT SECTION */}
      <section id="about" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-2">
              Simple 3-Step Process
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              How CareerAI Powers Your Job Search
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Transform your resume from generic to high-converting with our AI parser and live matching system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="rounded-3xl p-8 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl font-heading mb-6">
                01
              </div>
              <h4 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Upload & Instant Parsing
              </h4>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Drop your PDF or DOCX file. Our engine scans format consistency, margins, heading readability, and core skill keywords without needing an account.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-3xl p-8 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xl font-heading mb-6">
                02
              </div>
              <h4 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Diagnose ATS Score & Gaps
              </h4>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Get a comprehensive 0–100 ATS compatibility rating with exact highlights of missing tech keywords, weak phrasing, and formatting errors.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-3xl p-8 bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xl font-heading mb-6">
                03
              </div>
              <h4 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Match Against Live Roles
              </h4>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Authenticate to search verified tech positions and run targeted ATS comparisons against specific job descriptions before you apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Ready to land more interviews?
              </h3>
              <p className="text-indigo-200 text-sm sm:text-base mt-2">
                Join thousands of candidates using CareerAI to beat ATS screening and find high-compatibility opportunities.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="gradient"
                size="lg"
                onClick={scrollToUpload}
                rightIcon={ArrowRight}
              >
                Scan Resume Free
              </Button>
              <Link to="/register">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
