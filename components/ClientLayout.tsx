'use client';

import React from 'react';
import Link from 'next/link';
import { Twitter, Youtube, Instagram, Globe } from 'lucide-react';
import { Display, Body } from '@/components/typography';
import Background from '@/components/Background';
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <>
      <Background theme={theme} />

      {/* Logo - fixed top-left */}
      <Link href="/" className="fixed top-10 left-[50px] z-50">
        <Display
          size="md"
          className={`transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          ZIGGY BENT
        </Display>
      </Link>

      {/* Nav items - fixed left, vertically centered */}
      <nav className="fixed left-[50px] top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        <Body className={`transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Mirrors
        </Body>
        <Body className={`transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Field Notes
        </Body>
        <Body className={`transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Vanitas
        </Body>
        <Body className={`transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Resources
        </Body>
        <Body className={`transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          News
        </Body>
      </nav>

      {/* Social icons - fixed bottom-left */}
      <div className="fixed bottom-8 left-[50px] z-50 flex gap-4">
        <a
          href="#"
          className={`transition-colors duration-300 ${
            theme === 'dark'
              ? 'text-white hover:text-gray-300'
              : 'text-gray-700 hover:text-gray-900'
          }`}
          aria-label="X (Twitter)"
        >
          <Twitter size={18} />
        </a>
        <a
          href="#"
          className={`transition-colors duration-300 ${
            theme === 'dark'
              ? 'text-white hover:text-gray-300'
              : 'text-gray-700 hover:text-gray-900'
          }`}
          aria-label="YouTube"
        >
          <Youtube size={18} />
        </a>
        <a
          href="#"
          className={`transition-colors duration-300 ${
            theme === 'dark'
              ? 'text-white hover:text-gray-300'
              : 'text-gray-700 hover:text-gray-900'
          }`}
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>
        <a
          href="#"
          className={`transition-colors duration-300 ${
            theme === 'dark'
              ? 'text-white hover:text-gray-300'
              : 'text-gray-700 hover:text-gray-900'
          }`}
          aria-label="Website"
        >
          <Globe size={18} />
        </a>
      </div>

      {/* Sign up button - fixed top-right */}
      <button
        className={`fixed top-10 right-[50px] z-50 rounded-full px-6 py-2 transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        Sign up for Mirrors
      </button>

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Main content - full width */}
      <main className="w-full min-h-screen">
        {children}
      </main>
    </>
  );
};

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
};

export default ClientLayout;
