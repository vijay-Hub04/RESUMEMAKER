import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, otherwise default to 'light' per requirements
    const savedTheme = localStorage.getItem('careerai_theme');
    if (savedTheme) {
      return savedTheme;
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('careerai_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
};

export default useTheme;
