'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-8 right-8 z-50 rounded-full p-3 transition-all duration-300 hover:scale-110 ${
        theme === 'dark'
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
          : 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={24} />
      ) : (
        <Sun size={24} />
      )}
    </button>
  );
};

export default ThemeToggle;
