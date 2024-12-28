import { useEffect } from 'react';

export function useTheme() {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return { theme: 'dark' };
}