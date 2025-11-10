'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Twitter, Youtube, Instagram, Globe, Menu, X } from 'lucide-react';
import { H3, Body } from '@/components/typography';
import Background from '@/components/Background';
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Background theme={theme} />

      {/* Logo - fixed top-left */}
      <Link href="/" className="fixed top-10 left-6 lg:left-[50px] z-50">
        <H3
          className={`transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          ZIGGY BENT
        </H3>
      </Link>

      {/* Hamburger Menu - mobile only (top-right) */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className={`fixed top-10 right-6 z-50 lg:hidden transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden lg:block" data-desktop-sidebar>
        {/* Nav items - fixed left, vertically centered */}
        <nav className="fixed left-[50px] top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
          <Link href="/mirror">
            <Body className={`transition-colors duration-300 hover:opacity-70 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              Mirror
            </Body>
          </Link>
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
      </div>

      {/* Mobile Flyout Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Flyout Panel */}
          <div
            className={`fixed top-0 left-0 h-full w-64 z-[70] lg:hidden transition-colors duration-300 ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            {/* Close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`absolute top-10 right-6 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Nav items */}
            <nav className="flex flex-col gap-6 px-8 pt-24">
              <Link href="/mirror" onClick={() => setIsMobileMenuOpen(false)}>
                <Body className={`transition-colors duration-300 hover:opacity-70 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  Mirror
                </Body>
              </Link>
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

            {/* Social icons in mobile menu */}
            <div className="absolute bottom-8 left-8 flex gap-4">
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
          </div>
        </>
      )}

      {/* Sign up button - fixed top-right (desktop only, moved left on mobile) */}
      <button
        className={`fixed top-10 right-6 lg:right-[50px] z-50 hidden lg:block rounded-full px-6 py-2 transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        Sign up for Mirrors
      </button>

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Main content - centered with proper spacing */}
      <main className="w-full min-h-screen lg:pl-[200px]">
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
