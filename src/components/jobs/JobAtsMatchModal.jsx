import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Briefcase,
  Building2,
  MapPin,
  ArrowRight,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { checkJobMatchATS, clearJobAtsResult, applyToJobAsync } from '../../features/jobs/jobSlice';
import { setMockDemoResume } from '../../features/resume/resumeSlice';
import { getScoreColor } from '../../utils/helpers';
import toast from 'react-hot-toast';

export const JobAtsMatchModal = ({ isOpen, onClose, job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { uploadedFile } = useSelector((state) => state.resume);
  const { jobAtsResult, isMatching, isApplying } = useSelector((state) => state.jobs);

  const handleRunMatch = async () => {
    if (!uploadedFile) {
      toast.error('Please upload or load a resume first.');
      return;
    }
    try {
      await dispatch(checkJobMatchATS(job)).unwrap();
      toast.success(`Matched resume against ${job.title}!`);
    } catch (err) {
      toast.error(err || 'Failed to match against job');
    }
  };

  const handleUseDemoResume = async () => {
    dispatch(setMockDemoResume());
    toast.success('Loaded sample resume. Ready to match!');
    setTimeout(() => {
      dispatch(checkJobMatchATS(job));
    }, 200);
  };

  const handleApplyClick = async () => {
    if (!isAuthenticated) {
      toast('Please sign in to submit your job application.', { icon: '🔒' });
      onClose();
      navigate('/login', { state: { from: `/jobs/${job?.id}` } });
      return;
    }

    try {
      await dispatch(applyToJobAsync({ jobId: job.id })).unwrap();
      toast.success(`Application recorded for ${job.title} at ${job.company}!`);
      
      const destinationUrl = job.applyUrl || job.linkedinSearchUrl || job.naukriSearchUrl;
      if (destinationUrl) {
        window.open(destinationUrl, '_blank', 'noopener,noreferrer');
      }
      onClose();
    } catch (err) {
      toast.error(err || 'Application could not be submitted');
    }
  };

  // Normalize match metrics across mock and live backend endpoints
  const score = jobAtsResult?.matchScore ?? jobAtsResult?.overallScore ?? job?.matchScore ?? 82;
  const scoreConfig = getScoreColor(score);
  const compatibilityStatus =
    jobAtsResult?.matchLevel || jobAtsResult?.compatibilityStatus || job?.matchLevel || 'Good Match';
  const matchedKeywords =
    jobAtsResult?.matchingSkills || jobAtsResult?.matchedKeywords || job?.matchingSkills || [];
  const missingKeywords =
    jobAtsResult?.missingSkills || jobAtsResult?.missingKeywords || job?.missingSkills || [];
  const recommendations =
    jobAtsResult?.actionRecommendations ||
    (jobAtsResult?.matchSummary
      ? [jobAtsResult.matchSummary, `Tailor your bullet points specifically for ${job?.company || 'this role'}.`]
      : [
          `Incorporate keywords: ${missingKeywords.slice(0, 3).join(', ')} into your resume experience section.`,
          `Highlight quantifiable metrics relating to ${job?.title || 'this position'}.`,
        ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        dispatch(clearJobAtsResult());
        onClose();
      }}
      title="Job-Specific ATS Compatibility Match"
      subtitle={`Comparing your resume against ${job?.company || 'Target Company'}`}
      maxWidth="max-w-3xl"
    >
      {job && (
        <div className="space-y-6">
          {/* Target Job Header Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-start gap-4">
            <img
              src={job.logo || job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                {job.title}
              </h4>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                  {job.company}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </span>
                <span>•</span>
                <span>{job.salary}</span>
              </div>
            </div>
          </div>

          {/* Resume Selection State */}
          {!uploadedFile ? (
            <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center">
              <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                No Resume Active in Session
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Upload your resume or load our sample resume to benchmark your compatibility.
              </p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <Button variant="secondary" size="sm" onClick={handleUseDemoResume}>
                  Use Sample Resume
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/ats-checker')}>
                  Upload Resume
                </Button>
              </div>
            </div>
          ) : !jobAtsResult && !job?.matchScore ? (
            /* Pre-Match Trigger View */
            <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-center">
              <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                Ready to benchmark against "{job.title}"
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Active candidate resume: <strong>{uploadedFile.fileName || uploadedFile.originalName}</strong>
              </p>
              <Button
                variant="gradient"
                size="md"
                className="mt-4"
                isLoading={isMatching}
                onClick={handleRunMatch}
                leftIcon={Sparkles}
              >
                Calculate ATS Job Match
              </Button>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6">
              {/* Score header */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#1a263d] border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl ${scoreConfig.bg} ${scoreConfig.border} border-2 flex flex-col items-center justify-center`}
                  >
                    <span className={`text-2xl font-black font-heading ${scoreConfig.text}`}>
                      {score}%
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 -mt-1">
                      Match
                    </span>
                  </div>
                  <div>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${scoreConfig.badge}`}>
                      {compatibilityStatus}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      Resume to Job Compatibility
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Evaluated against: {uploadedFile?.fileName || uploadedFile?.originalName || 'Candidate Resume'}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  isLoading={isMatching}
                  onClick={handleRunMatch}
                  leftIcon={TrendingUp}
                >
                  Re-evaluate
                </Button>
              </div>

              {/* Matched vs Missing Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Matched Keywords */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <h6 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Matched Job Keywords ({matchedKeywords.length})
                  </h6>
                  <div className="flex flex-wrap gap-1.5">
                    {matchedKeywords.length > 0 ? (
                      matchedKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        >
                          {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">None detected yet.</span>
                    )}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <h6 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mb-2.5">
                    <AlertTriangle className="w-4 h-4" />
                    Missing Required Keywords ({missingKeywords.length})
                  </h6>
                  <div className="flex flex-wrap gap-1.5">
                    {missingKeywords.length > 0 ? (
                      missingKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                        >
                          +{kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-emerald-600 font-medium">All required keywords detected!</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actionable Tailoring Recommendations */}
              <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
                <h6 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-4 h-4" />
                  Tailoring Checklist for {job.company}
                </h6>
                <ul className="space-y-2">
                  {recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-500 mt-1 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {job.linkedinSearchUrl && (
                <a
                  href={job.linkedinSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>Search on LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {job.naukriSearchUrl && (
                <>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <a
                    href={job.naukriSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>Search on Naukri</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={isApplying}
                onClick={handleApplyClick}
              >
                Apply to {job.company}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default JobAtsMatchModal;
