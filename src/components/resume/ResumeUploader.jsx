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
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Database,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import {
  uploadResumeFile,
  deleteResumeFile,
  removeResume,
  analyzeGeneralATS,
  setMockDemoResume,
} from '../../features/resume/resumeSlice';
import { validateResumeFile, formatFileSize } from '../../utils/helpers';
import Button from '../common/Button';
import toast from 'react-hot-toast';

export const ResumeUploader = ({ onAnalysisComplete }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uploadedFile, uploadStatus, uploadProgress, analysisStatus } = useSelector(
    (state) => state.resume
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection and trigger store upload action
  const processFile = async (file) => {
    const validation = validateResumeFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    try {
      const candidateInfo = user
        ? {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
          }
        : {};

      toast.loading('Uploading resume and saving to MongoDB...', { id: 'resume-upload' });

      // Dispatch Redux store action that calls the backend upload API
      await dispatch(
        uploadResumeFile({
          file,
          candidateInfo,
        })
      ).unwrap();

      toast.success('Resume successfully stored in MongoDB!', { id: 'resume-upload' });
    } catch (err) {
      toast.error(err || 'Failed to upload resume to MongoDB', { id: 'resume-upload' });
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

  const handleRemove = async () => {
    if (uploadedFile?.id && !uploadedFile?.id.startsWith('demo-')) {
      try {
        await dispatch(deleteResumeFile(uploadedFile.id)).unwrap();
        toast.success('Resume deleted from MongoDB');
      } catch {
        dispatch(removeResume());
        toast.success('Resume removed');
      }
    } else {
      dispatch(removeResume());
      toast.success('Resume removed');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

      {/* Uploading Progress State */}
      {uploadStatus === 'uploading' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border-2 border-indigo-500/40 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
            Uploading & Storing Resume in MongoDB...
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
            Saving file binary and metadata directly into your MongoDB database collection.
          </p>
          <div className="w-full max-w-md bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full"
              initial={{ width: '15%' }}
              animate={{ width: `${Math.max(uploadProgress, 25)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-2">
            {uploadProgress}% Completed
          </span>
        </motion.div>
      ) : !uploadedFile ? (
        /* Upload Box if no file */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer ${
            isDragging
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
              Supports <strong className="text-slate-700 dark:text-slate-200">PDF, DOC, DOCX</strong> up to 10MB. Stored securely in MongoDB.
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
                <Database className="w-4 h-4 text-emerald-500" />
                MongoDB Storage
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                100% Confidential
              </span>
              <span>•</span>
              <span>Instant Parsing</span>
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
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                    {uploadedFile.fileName || uploadedFile.originalName}
                  </h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-semibold flex items-center gap-1">
                    <Database className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    Stored in MongoDB
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Size: {formatFileSize(uploadedFile.fileSize || 0)} • Type:{' '}
                  {((uploadedFile.fileType || uploadedFile.mimeType || 'application/pdf').split('/')[1] || 'PDF').toUpperCase()}
                  {uploadedFile.id && (
                    <span className="ml-2 font-mono text-[11px] text-slate-400 dark:text-slate-500">
                      (ID: {uploadedFile.id.slice(-6)})
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
              {(uploadedFile.downloadUrl || uploadedFile.previewUrl) && (
                <a
                  href={uploadedFile.downloadUrl || uploadedFile.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold px-3 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Binary
                </a>
              )}
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

          {/* TWO ATS CHECKING OPTIONS */}
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
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResumeUploader;
