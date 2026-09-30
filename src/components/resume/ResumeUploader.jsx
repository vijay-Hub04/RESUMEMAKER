import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  FileText,
  Trash2,
  CheckCircle2,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import {
  uploadResumeFile,
  removeResume,
  analyzeGeneralATS,
  setMockDemoResume,
} from '../../features/resume/resumeSlice';
import { validateResumeFile, formatFileSize } from '../../utils/helpers';
import Button from '../common/Button';
import toast from 'react-hot-toast';

export const ResumeUploader = ({ onAnalysisComplete }) => {
  debugger
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uploadedFile, uploadStatus, uploadProgress, analysisStatus } = useSelector(
    (state) => state.resume
  );
  console.log("uploadedfile", uploadedFile)
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection
  const processFile = async (file) => {
    const validation = validateResumeFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    try {
      toast.loading('Uploading and scanning resume...', { id: 'resume-upload' });
      await dispatch(uploadResumeFile(file)).unwrap();
      toast.success('Resume uploaded successfully!', { id: 'resume-upload' });
    } catch (err) {
      toast.error(err || 'Failed to upload resume', { id: 'resume-upload' });
    }
  };

  const handleFileChange = (e) => {

    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemove = () => {
    dispatch(removeResume());
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Resume removed');
  };

  // Option 1: General ATS Check (Works for guest and authenticated users)
  const handleGeneralCheck = async () => {

    if (!uploadedFile) {
      toast.error('Please upload a resume first.');
      return;
    }

    try {
      toast.loading('Analyzing resume structure & ATS metrics...', { id: 'ats-analysis' });
      await dispatch(analyzeGeneralATS()).unwrap();
      toast.success('ATS Analysis ready!', { id: 'ats-analysis' });
      navigate('/ats-results');
      if (onAnalysisComplete) onAnalysisComplete();
    } catch (err) {
      toast.error(err || 'Analysis failed', { id: 'ats-analysis' });
    }
  };

  // Option 2: Job-Specific ATS Check (Requires authentication)
  const handleJobSpecificCheck = () => {
    if (!uploadedFile) {
      toast.error('Please upload a resume first.');
      return;
    }

    if (isAuthenticated) {
      toast.success('Redirecting to job catalog with your uploaded resume.');
      navigate('/jobs');
    } else {
      toast('Please sign in or create an account to match against specific jobs.', {
        icon: '🔒',
      });
      navigate('/login', { state: { from: '/jobs' } });
    }
  };

  const handleLoadSampleResume = () => {
    dispatch(setMockDemoResume());
    toast.success('Sample Senior FullStack resume loaded!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Box if no file */}
      {!uploadedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer ${isDragging
              ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 scale-[1.01]'
              : 'border-slate-300 dark:border-slate-700/80 bg-white/70 dark:bg-[#151F32]/70 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50/80 dark:hover:bg-[#151F32]'
            }`}
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

          <div className="relative flex flex-col items-center">
            {/* Animated cloud icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
              className="w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 shadow-inner"
            >
              <UploadCloud className="w-10 h-10" />
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Drag & Drop your resume here
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md">
              Supports <strong className="text-slate-700 dark:text-slate-200">PDF, DOC, DOCX</strong> up to 10MB. We parse standard layouts, headings, and keywords instantly.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                leftIcon={UploadCloud}
              >
                Browse Files
              </Button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLoadSampleResume();
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
              >
                Try Sample Resume (Demo)
              </button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                100% Confidential
              </span>
              <span>•</span>
              <span>Instant Parsing</span>
              <span>•</span>
              <span>No Login Required for Base ATS</span>
            </div>
          </div>
        </div>
      ) : (
        /* File Uploaded Card + Options */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Active File Details Pill */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-md">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                    {uploadedFile.fileName}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-medium">
                    Ready
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Size: {formatFileSize(uploadedFile.fileSize)} • Type: {uploadedFile.fileType.split('/')[1]?.toUpperCase() || 'DOCUMENT'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="text-xs font-semibold px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </div>

          {/* TWO ATS CHECKING OPTIONS (Section 5 Requirements) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Option 1: General ATS Check */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white dark:bg-[#151F32] border-2 border-indigo-200 dark:border-indigo-900/60 p-6 sm:p-7 shadow-xl shadow-indigo-100/50 dark:shadow-none flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-3.5 py-1 rounded-bl-2xl bg-indigo-600 text-[11px] font-bold tracking-wider uppercase text-white">
                Public • No Login
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Check My Resume
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Analyze your resume's ATS compatibility, layout formatting, keyword density, and overall resume quality against industry standards.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    Overall ATS Compatibility (0-100)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    Layout, Fonts & Section Parser check
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    Strengths, weaknesses & keyword gaps
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={analysisStatus === 'analyzing'}
                  onClick={handleGeneralCheck}
                  rightIcon={ArrowRight}
                >
                  Check ATS Score
                </Button>
              </div>
            </motion.div>

            {/* Option 2: Job-Specific ATS Check */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xl shadow-slate-100 dark:shadow-none flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-3.5 py-1 rounded-bl-2xl bg-slate-800 dark:bg-slate-700 text-[11px] font-bold tracking-wider uppercase text-slate-200">
                {isAuthenticated ? 'Authenticated' : 'Login Required'}
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Check Against a Job
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Compare your resume against a specific job description to understand keyword matching, identify missing skills, and calculate targeted fit.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                    Job-to-Resume relevance score
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                    Specific missing technical requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                    Personalized tailored recommendations
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  onClick={handleJobSpecificCheck}
                  rightIcon={Search}
                >
                  Search Jobs
                </Button>
                {/* {!isAuthenticated && (
                  <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2">
                    Redirects to login for job search access
                  </p>
                )} */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResumeUploader;
