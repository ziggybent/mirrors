'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Twitter, Youtube, Instagram, Globe, Menu, X } from 'lucide-react';
import { H3, Body } from '@/components/typography';
import Background from '@/components/Background';
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    // Ensure body overflow is reset on route change
    document.body.style.overflow = '';
  }, [pathname]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <Background theme={theme} />

      {/* Logo - fixed top-left */}
      <Link href="/" className="fixed top-8 left-6 lg:left-12 z-50">
        <H3
          className={`transition-colors duration-300 hover:opacity-70 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          ZIGGY BENT
        </H3>
      </Link>

      {/* Hamburger Menu - mobile only (top-right) */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className={`fixed top-8 right-6 z-50 lg:hidden transition-colors duration-300 ${
          isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden lg:block" data-desktop-sidebar>
        {/* Nav items - fixed left, vertically centered */}
        <nav className="fixed left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
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
        <div className="fixed bottom-10 left-12 z-50 flex gap-5">
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
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Flyout Panel */}
          <div
            className={`fixed top-0 left-0 h-full w-72 z-[70] lg:hidden transition-all duration-300 ease-out transform shadow-2xl ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}
            style={{ animation: 'slideInLeft 0.3s ease-out' }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`absolute top-8 right-6 transition-colors duration-300 hover:opacity-70 ${
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

      {/* Sign up button - fixed top-right (desktop only) */}
      <button
        className={`fixed top-8 right-12 z-50 hidden lg:block rounded-full px-6 py-2.5 transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-white text-black hover:bg-gray-200 hover:shadow-lg'
            : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
        }`}
      >
        Sign up for Mirrors
      </button>

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Main content - with proper responsive spacing */}
      <main className="w-full min-h-screen pt-24 lg:pt-0 lg:pl-[240px] lg:pr-[80px]">
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
