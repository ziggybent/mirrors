'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { H1, Body } from '@/components/typography';
import { getContentItem, getAllSlugs } from '@/lib/content';

// Generate static params for all mirrors
export async function generateStaticParams() {
  const slugs = getAllSlugs('mirrors');
  return slugs.map((slug) => ({ slug }));
}

export default function MirrorDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { theme } = useTheme();

  // Fetch the mirror content
  const [mirror, setMirror] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadMirror() {
      const item = await getContentItem('mirrors', slug);
      if (!item) {
        notFound();
      }
      setMirror(item);
      setLoading(false);
    }
    loadMirror();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Body size="lg" className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
          Loading...
        </Body>
      </div>
    );
  }

  if (!mirror) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Hero Image (optional) */}
      {mirror.image && (
        <div className="relative w-full aspect-[21/9] mb-8 rounded-lg overflow-hidden">
          <Image
            src={mirror.image}
            alt={mirror.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Title */}
      <H1 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
        {mirror.title}
      </H1>

      {/* Date */}
      <Body
        size="default"
        className={`mt-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}
      >
        {new Date(mirror.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Body>

      {/* Content */}
      <div
        className={`
          mt-8 prose prose-lg max-w-none
          ${
            theme === 'dark'
              ? 'prose-invert prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white'
              : 'prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600'
          }
        `}
        dangerouslySetInnerHTML={{ __html: mirror.content }}
      />
    </article>
  );
}
