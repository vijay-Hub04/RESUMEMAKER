import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Briefcase,
  Share2,
  Bookmark,
  Users,
} from 'lucide-react';
import { fetchJobById } from '../features/jobs/jobSlice';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import JobAtsMatchModal from '../components/jobs/JobAtsMatchModal';
import toast from 'react-hot-toast';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedJob, isLoading } = useSelector((state) => state.jobs);
  const { uploadedFile } = useSelector((state) => state.resume);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  if (isLoading || !selectedJob) {
    return <Loader text="Loading job posting details..." fullScreen={false} />;
  }

  const handleApply = () => {
    toast.success(`Application submitted to ${selectedJob.company}! Check your email for confirmation.`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Job link copied to clipboard!');
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from saved jobs' : 'Saved to your profile!');
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Jobs</span>
        </Link>

        {/* Hero Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
            <div className="flex items-start gap-4 sm:gap-6">
              <img
                src={selectedJob.companyLogo}
                alt={selectedJob.company}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-md shrink-0"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                    {selectedJob.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>{selectedJob.company}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">
                    {selectedJob.department || 'Engineering'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    {selectedJob.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedJob.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {selectedJob.applicantsCount || 28} applicants
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSaveToggle}
                className={`p-3 rounded-xl border transition-colors ${
                  isSaved
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <Button
                variant="gradient"
                size="md"
                onClick={() => setIsModalOpen(true)}
                leftIcon={Sparkles}
              >
                Check ATS Match
              </Button>
              <Button variant="primary" size="md" onClick={handleApply}>
                Apply Now
              </Button>
            </div>
          </div>
        </div>

        {/* ATS Match Prompt Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-200/60 dark:border-indigo-800/60 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Wondering how well your resume matches this specific position?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {uploadedFile
                  ? `Active resume: "${uploadedFile.fileName}". Run instant ATS compatibility.`
                  : 'Compare your resume against required skills, keywords, and qualifications.'}
              </p>
            </div>
          </div>
          <Button variant="gradient" size="sm" onClick={() => setIsModalOpen(true)} leftIcon={Sparkles}>
            Check Match Score
          </Button>
        </div>

        {/* Job Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-3">
                About the Role
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedJob.description}
              </p>
            </div>

            {/* Responsibilities */}
            {selectedJob.responsibilities && (
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-4">
                  Key Responsibilities
                </h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  {selectedJob.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {selectedJob.requirements && (
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-4">
                  Qualifications & Experience
                </h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Required Skills Widget */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-md">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Required Technical Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {selectedJob.niceToHave && (
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Nice to Have
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.niceToHave.map((nth, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {nth}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Application Fast Track */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-xl space-y-4">
              <h4 className="text-base font-bold font-heading">
                Ready to Apply?
              </h4>
              <p className="text-xs text-indigo-200 leading-relaxed">
                Ensure your resume includes top keywords from this posting before submitting to pass recruiter screening.
              </p>
              <Button
                variant="gradient"
                size="md"
                onClick={handleApply}
                className="w-full"
              >
                Submit Application
              </Button>
            </div>
          </div>
        </div>

        {/* ATS Match Modal */}
        <JobAtsMatchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          job={selectedJob}
        />
      </div>
    </div>
  );
};

export default JobDetails;
