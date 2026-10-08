export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  RESUME: {
    UPLOAD: '/uploadResume',
    GET_ALL: '/uploadResume',
    GET_BY_ID: (id) => `/uploadResume/${id}`,
    DOWNLOAD: (id) => `/uploadResume/${id}/download`,
    VIEW: (id) => `/uploadResume/${id}/view`,
    DELETE: (id) => `/uploadResume/${id}`,
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
