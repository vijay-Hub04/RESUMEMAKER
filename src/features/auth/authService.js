import axiosInstance from '../../services/axiosInstance';
import { API_ENDPOINTS } from '../../services/apiEndpoints';

const STORAGE_KEY_TOKEN = 'careerai_token';
const STORAGE_KEY_USER = 'careerai_user';

export const authService = {
  // Real login API call to backend
  login: async ({ email, password }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      const { user, token } = response.data;

      if (token) {
        localStorage.setItem(STORAGE_KEY_TOKEN, token);
      }
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      }

      return { user, token };
    } catch (error) {
      const message =
        error.customMessage ||
        error.response?.data?.message ||
        error.message ||
        'Failed to sign in. Please verify your credentials.';
      throw new Error(message);
    }
  },

  // Real registration API call to backend
  register: async ({ name, email, password }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, {
        name,
        email,
        password,
      });

      const { user, token } = response.data;

      if (token) {
        localStorage.setItem(STORAGE_KEY_TOKEN, token);
      }
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      }

      return { user, token };
    } catch (error) {
      const message =
        error.customMessage ||
        error.response?.data?.message ||
        error.message ||
        'Registration failed. Please try again.';
      throw new Error(message);
    }
  },

  // Logout action clearing local stored credentials
  logout: async () => {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
    return true;
  },

  // Retrieve user session from localStorage
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem(STORAGE_KEY_USER);
      const token = localStorage.getItem(STORAGE_KEY_TOKEN);
      if (userStr && token) {
        return { user: JSON.parse(userStr), token };
      }
    } catch (e) {
      console.error('Failed to parse stored user:', e);
    }
    return { user: null, token: null };
  },
};

export default authService;
