'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { H3, H4 } from '@/components/typography/Heading';
import { Body } from '@/components/typography';

interface ContentGridProps {
  items: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    image: string;
  }[];
  basePath: string;
  columns?: 2 | 3;
}

export const ContentGrid: React.FC<ContentGridProps> = ({
  items,
  basePath,
  columns = 3
}) => {
  const { theme } = useTheme();

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Body
          size="lg"
          className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
        >
          No content yet
        </Body>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 ${columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`${basePath}/${item.slug}`}
          className={`group block rounded-lg overflow-hidden transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gray-800/50 hover:bg-gray-800'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          {item.image && (
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="p-6">
            <H4 className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {item.title}
            </H4>
            <Body
              size="sm"
              className={`mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Body>
            <Body
              size="default"
              className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {item.excerpt}
            </Body>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ContentGrid;
