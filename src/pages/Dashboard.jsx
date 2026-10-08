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
  Database,
  ExternalLink,
  User,
  Search,
  Award,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { APP_SUBTITLE, PLATFORM_STATS } from '../utils/constants';
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

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { uploadedFile, generalAtsResult } = useSelector((state) => state.resume);

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
      {/* 1. AUTHENTICATED USER COMMAND CENTER (When Logged In) */}
      {isAuthenticated ? (
        <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* Welcome Candidate Hub Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl soft-3d-card p-6 sm:p-10 relative overflow-hidden mb-10"
          >
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/15 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-500/25 shrink-0">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <span>{user?.name ? user.name[0].toUpperCase() : 'U'}</span>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Active Candidate
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                      ID: {user?.id?.slice(-8) || user?._id?.slice(-8) || 'Authenticated'}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                    Welcome back, <span className="text-indigo-600 dark:text-indigo-400">{user?.name || 'Candidate'}</span>! 👋
                  </h1>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                    Your candidate portal is ready. Check ATS scores, match against active tech openings, and track your job progress.
                  </p>
                </div>
              </div>

              {/* Quick Resume Status Badge */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2 bg-indigo-50/70 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 w-full lg:w-auto">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {uploadedFile
                      ? `Resume: ${uploadedFile.fileName || uploadedFile.originalName}`
                      : 'No Resume Uploaded Yet'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  {uploadedFile ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Saved in MongoDB
                    </span>
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      Upload below to enable live job matching
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Action Cards Grid for Logged-In User */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200/70 dark:border-slate-800/80">
              {/* Card 1: Job Search */}
              <div
                onClick={() => navigate('/jobs')}
                className="group p-5 rounded-2xl bg-white/80 dark:bg-[#151F32]/80 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Explore Tech Jobs
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Compare your uploaded resume against 450+ verified roles.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Browse Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 2: ATS Checker */}
              <div
                onClick={scrollToUpload}
                className="group p-5 rounded-2xl bg-white/80 dark:bg-[#151F32]/80 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    ATS Diagnostic Scanner
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Analyze formatting, section margins, and keyword density.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Run Scan Below</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 3: Profile */}
              <div
                onClick={() => navigate('/profile')}
                className="group p-5 rounded-2xl bg-white/80 dark:bg-[#151F32]/80 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Manage Candidate Profile
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Update your target title, preferred location, and profile info.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      ) : (
     
        /* 2. GUEST HERO SECTION (When Unauthenticated)              */
        
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
          {/* Subtle decorative background gradient blobs */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-500/12 via-purple-500/10 to-cyan-400/12 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headline and Call-to-actions */}
              <div className="lg:col-span-7 text-center lg:text-left">
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
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.1]"
                >
                  Your Career, <span className="gradient-text">Optimized for Success.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0"
                >
                  Scan your resume and get an instant ATS score completely free without creating an account. Sign in when you're ready to search and match against live verified tech roles.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
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
                  className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Free Instant ATS Scoring
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    No Login Needed for Scan
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    MongoDB Private Storage
                  </span>
                </motion.div>
              </div>

              {/* Right Column: Soft 3D Resume Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-5 flex justify-center"
              >
                <div className="relative group max-w-sm sm:max-w-md w-full">
                  {/* Subtle 3D backlight glow */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-cyan-400/20 rounded-[2.5rem] blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />

                  <div className="relative rounded-[2rem] overflow-hidden soft-3d-card p-3 bg-white/90 dark:bg-[#151F32]/90 backdrop-blur-md">
                    <img
                      src="/assets/soft_3d_resume.jpg"
                      alt="AI Resume Optimizer 3D"
                      className="w-full h-auto rounded-[1.5rem] object-cover shadow-inner hover:scale-[1.02] transition-transform duration-300"
                    />

                    {/* Floating Overlay Badge */}
                    <div className="absolute bottom-6 left-6 right-6 p-3.5 rounded-2xl bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            AI Resume Parser 2.0
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            98.4% ATS Compatibility Accuracy
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-2 py-1 rounded-lg">
                        Free Scanner
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

   
      {/* 3. RESUME ATS CHECKER SECTION (Open to All Users)         */}
     
      <section
        id="resume-upload"
        ref={uploadSectionRef}
        className="py-14 sm:py-20 bg-gradient-to-b from-transparent via-indigo-50/40 dark:via-indigo-950/20 to-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>ATS Compatibility Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Is Your Resume Ready to Beat the ATS?
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              Upload your resume and discover how well it performs against modern Applicant Tracking Systems before applying.
            </p>
          </div>

          {/* Modern Drag and Drop Resume Uploader with 2 Option Cards */}
          <ResumeUploader />
        </div>
      </section>

     
      {/* 4. PLATFORM METRICS CARDS                                */}
      
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLATFORM_STATS.map((stat, idx) => (
              <StatsCard key={stat.id} stat={stat} index={idx} />
            ))}
          </div>
        </div>
      </section>

 
      {/* 5. USER GROWTH ANALYTICS SECTION                         */}

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UserGrowthChart />
        </div>
      </section>

      {/* 6. HOW IT WORKS / FEATURE SHOWCASE WITH 3D CAREER ASSET  */}
    
      <section id="about" className="py-14 sm:py-20 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
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

          {/* 3 Steps + Soft 3D Illustration Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Steps in 8 cols */}
            <div className="lg:col-span-7 space-y-5">
              {/* Step 1 */}
              <div className="rounded-2xl p-6 soft-3d-card flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg font-heading shrink-0 shadow-sm">
                  01
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    Upload & Instant Parsing (Free for All)
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Drop your PDF or DOCX file. Our engine scans format consistency, margins, heading readability, and core skill keywords without needing an account.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl p-6 soft-3d-card flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg font-heading shrink-0 shadow-sm">
                  02
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    Diagnose ATS Score & Keyword Gaps
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Get a comprehensive 0–100 ATS compatibility rating with exact highlights of missing tech keywords, weak phrasing, and formatting errors.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl p-6 soft-3d-card flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-lg font-heading shrink-0 shadow-sm">
                  03
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    Match Against Live Roles (Account Required)
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Authenticate to search verified tech positions and run targeted ATS comparisons against specific job descriptions before you apply.
                  </p>
                </div>
              </div>
            </div>

            {/* Soft 3D Career Asset in 5 cols */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-400/20 via-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />
                <div className="relative rounded-[2rem] overflow-hidden soft-3d-card p-3 bg-white/90 dark:bg-[#151F32]/90 backdrop-blur-md">
                  <img
                    src="/assets/soft_3d_career.jpg"
                    alt="Targeted Job Match 3D"
                    className="w-full h-auto rounded-[1.5rem] object-cover shadow-inner hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="p-3 text-center">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Live Job Matching & Targeted ATS Alignment
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Verify compatibility before sending your application
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      {/* 7. BOTTOM CTA BANNER     */}
     
      <section className="py-14">
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
              {!isAuthenticated && (
                <Link to="/register">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    Create Account
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
