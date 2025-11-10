'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Display, Body, H2, H3 } from '@/components/typography';

// Define the five sequences with descriptions
const sequences = [
  {
    id: 'recognition',
    title: 'Recognition',
    description: 'The first step: distinguishing awareness from constructed identity'
  },
  {
    id: 'mechanism',
    title: 'Mechanism',
    description: 'How constructions form, persist, and dissolve'
  },
  {
    id: 'instrument',
    title: 'Instrument',
    description: 'Tools and practices for working with awareness'
  },
  {
    id: 'context',
    title: 'Context',
    description: 'The larger framework: culture, language, and shared reality'
  },
  {
    id: 'possibility',
    title: 'Possibility',
    description: 'What becomes available when identification loosens'
  },
];

interface Mirror {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  sequence: string;
}

export default function MirrorPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [mirrors, setMirrors] = useState<Mirror[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch mirrors data
    fetch('/api/mirrors')
      .then(res => res.json())
      .then(data => {
        setMirrors(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching mirrors:', err);
        setIsLoading(false);
      });
  }, []);

  const filteredMirrors = activeTab ? mirrors.filter(mirror => mirror.sequence === activeTab) : [];

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-8 sm:pt-32 sm:pb-12 lg:py-20">
      {/* Hero Section */}
      <header className="mb-12 lg:mb-16">
        <Display size="md">Mirrors</Display>
        <Body size="lg" className="mt-6 text-[#858585] max-w-2xl">
          A systematic exploration of awareness, construction, and what remains when identification dissolves.
        </Body>
      </header>

      {/* Horizontal Tabs - Always visible */}
      <nav className="mb-12 lg:mb-16 border-b border-gray-800 overflow-x-auto">
        <ul className="flex gap-6 lg:gap-8 min-w-max pb-px">
          {sequences.map((sequence) => (
            <li key={sequence.id}>
              <button
                onClick={() => setActiveTab(activeTab === sequence.id ? null : sequence.id)}
                className={`
                  pb-3 lg:pb-4 font-inter text-body font-medium transition-colors whitespace-nowrap
                  ${activeTab === sequence.id
                    ? 'text-white border-b-2 border-white'
                    : 'text-[#858585] hover:text-gray-300'
                  }
                `}
              >
                {sequence.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content List */}
      <div>
        {!activeTab ? (
          /* Section Cards - Show when no tab is selected */
          <div className="space-y-0">
            {sequences.map((sequence) => (
              <button
                key={sequence.id}
                onClick={() => setActiveTab(sequence.id)}
                className="group block w-full text-left"
              >
                <article className="py-6 lg:py-8 border-b border-gray-800 hover:border-gray-700 transition-colors">
                  {/* Section Title */}
                  <H2 className="text-white mb-3 lg:mb-4 group-hover:opacity-80 transition-opacity">
                    {sequence.title}
                  </H2>

                  {/* Section Description */}
                  <Body className="text-[#d0d0d0]">
                    {sequence.description}
                  </Body>
                </article>
              </button>
            ))}
          </div>
        ) : isLoading ? (
          <div className="text-center py-12">
            <Body className="text-[#858585]">Loading...</Body>
          </div>
        ) : filteredMirrors.length > 0 ? (
          /* Individual Mirrors - Show when a tab is selected */
          <div className="space-y-10 lg:space-y-12">
            {filteredMirrors.map((mirror) => (
              <Link
                key={mirror.slug}
                href={`/mirror/${mirror.sequence}/${mirror.slug}`}
                className="group block"
              >
                <article>
                  {/* Category label */}
                  <Body size="xs" as="span" className="uppercase tracking-wide text-[#858585] mb-2 block">
                    {sequences.find(s => s.id === mirror.sequence)?.title}
                  </Body>

                  {/* Date */}
                  {mirror.date && (
                    <Body size="sm" as="span" className="text-[#858585] mb-3 lg:mb-4 block">
                      <time>
                        {new Date(mirror.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </Body>
                  )}

                  {/* Title */}
                  <H3 className="text-white mb-3 lg:mb-4 group-hover:opacity-80 transition-opacity">
                    {mirror.title}
                  </H3>

                  {/* Description */}
                  {mirror.excerpt && (
                    <Body className="text-[#d0d0d0]">
                      {mirror.excerpt}
                    </Body>
                  )}
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Body className="text-[#858585] mb-4">
              No mirrors in this sequence yet.
            </Body>
            <Body size="sm" className="text-[#858585]">
              This sequence is part of the systematic exploration, but content has not been added yet.
            </Body>
          </div>
        )}
      </div>
    </div>
  );
}
