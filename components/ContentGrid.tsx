'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { H3, Body } from '@/components/typography';
import type { ContentMetadata } from '@/lib/content';

interface ContentGridProps {
  items: (ContentMetadata & { slug: string })[];
  type: string;
}

export const ContentGrid: React.FC<ContentGridProps> = ({ items, type }) => {
  const { theme } = useTheme();

  // Empty state
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <Body size="lg" className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
          No content yet
        </Body>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/${type}/${item.slug}`}
          className="group block"
        >
          <article
            className={`
              h-full flex flex-col rounded-lg overflow-hidden
              transition-all duration-300 ease-in-out
              ${
                theme === 'dark'
                  ? 'bg-gray-900 border border-gray-800 hover:border-gray-700 hover:shadow-2xl'
                  : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl'
              }
              group-hover:scale-[1.02]
            `}
          >
            {/* Image */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div
                  className={`
                    w-full h-full flex items-center justify-center
                    ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}
                  `}
                >
                  <Body
                    size="sm"
                    className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}
                  >
                    No image
                  </Body>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-6">
              {/* Title */}
              <H3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                {item.title}
              </H3>

              {/* Date */}
              <Body
                size="sm"
                className={`mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}
              >
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Body>

              {/* Excerpt */}
              <Body
                size="default"
                className={`
                  mt-3 flex-1
                  line-clamp-3
                  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}
                `}
              >
                {item.excerpt}
              </Body>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};
