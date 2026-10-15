import axiosInstance from '../../services/axiosInstance';
import { API_ENDPOINTS } from '../../services/apiEndpoints';
import { MOCK_JOBS } from '../../utils/constants';

export const jobService = {
  /**
   * Fetch live jobs from backend, ranked by candidate's resume match
   * @param {Object} filters - Search, location, type, experience
   * @param {string} resumeId - Optional resume ID for guest ranking
   */
  getJobs: async (filters = {}, resumeId = null) => {
    try {
      const params = { ...filters };
      if (resumeId) params.resumeId = resumeId;

      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.GET_ALL, { params });
      return response.data?.data || [];
    } catch (err) {
      console.warn('[jobService] Falling back to local catalog:', err.message);
      // Fallback in case of server disconnect
      return MOCK_JOBS;
    }
  },

  /**
   * Fetch single job details with tailored match breakdown
   */
  getJobById: async (id, resumeId = null) => {
    try {
      const params = {};
      if (resumeId) params.resumeId = resumeId;

      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.GET_BY_ID(id), { params });
      return response.data?.data;
    } catch (err) {
      console.warn('[jobService] Falling back for job ID:', id);
      const fallback = MOCK_JOBS.find((j) => j.id === id);
      if (!fallback) throw new Error('Job listing not found');
      return fallback;
    }
  },

  /**
   * Deep ATS comparison between active resume and target job
   */
  analyzeJobATS: async (jobId, resumeId = null) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.JOBS.MATCH(jobId), { resumeId });
      return response.data?.data;
    } catch (err) {
      console.warn('[jobService] ATS comparison error:', err.message);
      throw err;
    }
  },

  /**
   * Apply to job (Authentication Required)
   */
  applyToJob: async (jobId, notes = '') => {
    const response = await axiosInstance.post(API_ENDPOINTS.JOBS.APPLY(jobId), { notes });
    return response.data;
  },

  /**
   * Get user's applied jobs history
   */
  getMyApplications: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.JOBS.GET_APPLIED);
    return response.data?.data || [];
  },
};

export default jobService;
