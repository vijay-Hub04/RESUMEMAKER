// Auth service handles simulated API calls with persistence in localStorage

const STORAGE_KEY_TOKEN = 'careerai_token';
const STORAGE_KEY_USER = 'careerai_user';

export const authService = {
  login: async ({ email, password }) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Basic mock authentication validation
    if (!email || !password) {
      throw new Error('Please provide both email and password.');
    }

    const mockUser = {
      id: 'usr-101',
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Alex Morgan',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: 'Full Stack Engineer',
      location: 'San Francisco, CA',
      joinedDate: 'September 2026',
      resumesUploaded: 3,
      savedJobs: ['job-1', 'job-2'],
    };

    const mockToken = `mock-jwt-token-${Date.now()}`;
    localStorage.setItem(STORAGE_KEY_TOKEN, mockToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(mockUser));

    return { user: mockUser, token: mockToken };
  },

  register: async ({ name, email, password }) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!name || !email || !password) {
      throw new Error('All registration fields are required.');
    }

    const mockUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      title: 'Aspiring Candidate',
      location: 'Remote',
      joinedDate: 'September 2026',
      resumesUploaded: 0,
      savedJobs: [],
    };

    const mockToken = `mock-jwt-token-${Date.now()}`;
    localStorage.setItem(STORAGE_KEY_TOKEN, mockToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(mockUser));

    return { user: mockUser, token: mockToken };
  },

  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
    return true;
  },

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
