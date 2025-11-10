'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-12 z-50 rounded-full p-3 transition-all duration-300 hover:scale-110 active:scale-95 ${
        theme === 'dark'
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
          : 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={22} />
      ) : (
        <Sun size={22} />
      )}
    </button>
  );
};

export default ThemeToggle;
