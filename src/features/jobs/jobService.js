import { MOCK_JOBS } from '../../utils/constants';
import { generateJobMatchAnalysis } from '../../utils/helpers';

export const jobService = {
  getJobs: async (filters = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    let filtered = [...MOCK_JOBS];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (filters.company) {
      const c = filters.company.toLowerCase();
      filtered = filtered.filter((job) => job.company.toLowerCase().includes(c));
    }

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(loc));
    }

    if (filters.type && filters.type !== 'All') {
      filtered = filtered.filter((job) => job.type.toLowerCase() === filters.type.toLowerCase());
    }

    if (filters.experience && filters.experience !== 'All') {
      filtered = filtered.filter((job) => job.experience.toLowerCase().includes(filters.experience.toLowerCase()));
    }

    return filtered;
  },

  getJobById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const job = MOCK_JOBS.find((j) => j.id === id);
    if (!job) throw new Error('Job listing not found');
    return job;
  },

  analyzeJobATS: async (resume, job) => {
    // Simulate AI parsing between resume and job spec
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return generateJobMatchAnalysis(resume, job);
  },
};
