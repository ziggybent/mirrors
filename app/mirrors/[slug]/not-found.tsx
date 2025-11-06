'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { H1, Body } from '@/components/typography';

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <H1 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
        Mirror Not Found
      </H1>
      <Body
        size="lg"
        className={`mt-4 mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
      >
        The mirror you're looking for doesn't exist.
      </Body>
      <Link
        href="/mirrors"
        className={`
          px-6 py-3 rounded-lg font-medium transition-colors
          ${
            theme === 'dark'
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }
        `}
      >
        Back to Mirrors
      </Link>
    </div>
  );
}
