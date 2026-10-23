import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
});

// Request interceptor: Attach JWT token if available & properly format headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('careerai_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // If uploading FormData, delete Content-Type so browser sets boundary multipart header correctly
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Global response handling & error extraction
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // Server responded with a status outside of 2xx
      if (error.response.status === 401) {
        localStorage.removeItem('careerai_token');
        localStorage.removeItem('careerai_user');
      }
      const rawMessage = error.response.data?.message || `Error ${error.response.status}: Request failed`;
      
      // Filter out internal database jargon/syntax
      if (
        rawMessage.includes('buffering timed out') ||
        rawMessage.includes('findOne') ||
        rawMessage.includes('MongoServerSelectionError') ||
        rawMessage.includes('MongooseError')
      ) {
        message = 'Database service is temporarily unavailable. Please try again shortly.';
      } else {
        message = rawMessage;
      }
    } else if (error.request) {
      // Request made but no response (network down / backend offline)
      message = 'Network error: Backend server is not reachable. Please ensure the server is running.';
    }

    console.warn('[Axios Interceptor Notice]:', message);
    return Promise.reject({ ...error, customMessage: message, message });
  }
);

export default axiosInstance;
