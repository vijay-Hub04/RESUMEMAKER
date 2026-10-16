export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    PROFILE: '/auth/profile',
  },
  RESUME: {
    UPLOAD: '/uploadResume',
    GET_MY_RESUME: '/uploadResume/my-resume',
    GET_ALL: '/uploadResume',
    GET_BY_ID: (id) => `/uploadResume/${id}`,
    DOWNLOAD: (id) => `/uploadResume/${id}/download`,
    VIEW: (id) => `/uploadResume/${id}/view`,
    DELETE: (id) => `/uploadResume/${id}`,
    ANALYZE_BY_ID: (id) => `/uploadResume/${id}/analyze`,
    ANALYZE_MY_RESUME: '/uploadResume/my-resume/analyze',
    ANALYZE_GENERAL: '/uploadResume/analyze-general',
    ANALYZE_JOB_MATCH: '/resume/analyze-job-match',
    GET_HISTORY: '/resume/history',
  },
  JOBS: {
    GET_ALL: '/jobs',
    GET_BY_ID: (id) => `/jobs/${id}`,
    MATCH: (id) => `/jobs/${id}/match`,
    APPLY: (id) => `/jobs/${id}/apply`,
    GET_APPLIED: '/jobs/applied/me',
  },
  ANALYTICS: {
    USER_GROWTH: '/analytics/user-growth',
    STATS: '/analytics/stats',
  }
};
