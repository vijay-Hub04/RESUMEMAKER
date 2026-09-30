import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  Briefcase,
  Filter,
  X,
  FileCheck2,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { fetchJobs, setFilters, clearFilters, setSelectedJob } from '../features/jobs/jobSlice';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Loader from '../components/common/Loader';
import JobAtsMatchModal from '../components/jobs/JobAtsMatchModal';

export const JobSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobs, filters, isLoading } = useSelector((state) => state.jobs);
  const { uploadedFile } = useSelector((state) => state.resume);

  const [activeJobForModal, setActiveJobForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs(filters));
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    dispatch(setFilters({ [key]: value }));
    dispatch(fetchJobs(newFilters));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchJobs(filters));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(fetchJobs({}));
  };

  const handleOpenAtsMatch = (job) => {
    setActiveJobForModal(job);
    setIsModalOpen(true);
  };

  const handleViewDetails = (job) => {
    dispatch(setSelectedJob(job));
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Targeted AI Job Match Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Discover High-Match Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Search roles, benchmark your resume ATS score against real requirements, and apply with confidence.
            </p>
          </div>

          {/* Active resume badge indicator */}
          {uploadedFile ? (
            <div className="px-4 py-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                  Active Resume
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px] block">
                  {uploadedFile.fileName}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Filter Bar and Search Box */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Job Title / Keywords */}
              <div className="md:col-span-1">
                <Input
                  placeholder="Job title or keywords (e.g. React)..."
                  leftIcon={Search}
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>

              {/* Company Search */}
              <div>
                <Input
                  placeholder="Company name (e.g. NovaTech)..."
                  leftIcon={Building2}
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                />
              </div>

              {/* Location */}
              <div>
                <Input
                  placeholder="Location (e.g. San Francisco or Remote)..."
                  leftIcon={MapPin}
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
            </div>

            {/* Dropdown Filters & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-3">
                {/* Employment Type */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Type:</span>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 py-2 px-3 outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Experience Level */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Experience:</span>
                  <select
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 py-2 px-3 outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Levels</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="4-6">4-6 Years</option>
                    <option value="5+">5+ Years</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Clear Filters
                </button>
                <Button variant="primary" size="sm" type="submit" leftIcon={Search}>
                  Search Jobs
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Showing <strong className="text-slate-900 dark:text-white">{jobs.length}</strong> available positions
          </p>
          <span className="text-xs text-slate-400">Click "Check ATS Match" to benchmark your resume</span>
        </div>

        {/* Job Listings Grid */}
        {isLoading ? (
          <Loader text="Finding matching jobs..." />
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#151F32] rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              No jobs found matching your criteria
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your keyword search, removing location restrictions, or clearing filters.
            </p>
            <div className="mt-5">
              <Button variant="secondary" size="sm" onClick={handleClearFilters}>
                Reset All Filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Left: Company & Job Details */}
                <div className="flex items-start gap-4 sm:gap-5 flex-1">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700/80 shadow-sm shrink-0"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        onClick={() => handleViewDetails(job)}
                        className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                      >
                        {job.title}
                      </h3>
                      {job.featured && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1 text-slate-800 dark:text-slate-200 font-semibold">
                        <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {job.experience}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {job.type}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 max-w-2xl leading-relaxed">
                      {job.description}
                    </p>

                    {/* Required Skills tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {job.skills?.slice(0, 5).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills?.length > 5 && (
                        <span className="text-[11px] text-slate-400">
                          +{job.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={() => handleOpenAtsMatch(job)}
                    leftIcon={Sparkles}
                    className="w-full sm:w-auto"
                  >
                    Check ATS Match
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewDetails(job)}
                    rightIcon={ChevronRight}
                    className="w-full sm:w-auto"
                  >
                    View Details
                  </Button>

                  <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:block text-center mt-1">
                    Posted {job.postedDate}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ATS Match Modal */}
        <JobAtsMatchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          job={activeJobForModal}
        />
      </div>
    </div>
  );
};

export default JobSearch;
