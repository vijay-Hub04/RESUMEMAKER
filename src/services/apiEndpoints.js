export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  RESUME: {
    UPLOAD: '/resume/upload',
    ANALYZE_GENERAL: '/resume/analyze-general',
    ANALYZE_JOB_MATCH: '/resume/analyze-job-match',
    GET_HISTORY: '/resume/history',
  },
  JOBS: {
    GET_ALL: '/jobs',
    GET_BY_ID: (id) => `/jobs/${id}`,
    SEARCH: '/jobs/search',
  },
  ANALYTICS: {
    USER_GROWTH: '/analytics/user-growth',
    STATS: '/analytics/stats',
  }
};
