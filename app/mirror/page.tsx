'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Display } from '@/components/typography/Display';
import { Body } from '@/components/typography/Body';
import { H3 } from '@/components/typography/Heading';

// Define the five sequences
const sequences = [
  { id: 'recognition', title: 'Recognition' },
  { id: 'mechanism', title: 'Mechanism' },
  { id: 'instrument', title: 'Instrument' },
  { id: 'context', title: 'Context' },
  { id: 'possibility', title: 'Possibility' },
];

interface Mirror {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  sequence: string;
}

export default function MirrorPage() {
  const [activeTab, setActiveTab] = useState<string>('recognition');
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

  const filteredMirrors = mirrors.filter(mirror => mirror.sequence === activeTab);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <header className="mb-16">
        <Display size="xl" className="mb-4">
          Mirrors
        </Display>
        <Body size="lg" className="opacity-70 max-w-3xl">
          A systematic exploration of awareness, construction, and what remains when identification dissolves.
          Each sequence builds on direct observation rather than belief.
        </Body>
      </header>

      {/* Tabs */}
      <nav className="mb-16 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex gap-8">
          {sequences.map((sequence) => (
            <li key={sequence.id}>
              <button
                onClick={() => setActiveTab(sequence.id)}
                className={`
                  pb-4 transition-colors
                  ${activeTab === sequence.id
                    ? 'opacity-100 border-b-2 border-gray-900 dark:border-gray-100'
                    : 'opacity-50 hover:opacity-70'
                  }
                `}
              >
                <Body size="default" className="font-medium" as="span">
                  {sequence.title}
                </Body>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-12">
            <Body className="opacity-50">Loading...</Body>
          </div>
        ) : filteredMirrors.length > 0 ? (
          filteredMirrors.map((mirror) => (
            <Link
              key={mirror.slug}
              href={`/mirror/${mirror.sequence}/${mirror.slug}`}
              className="group block py-8 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors -mx-4 px-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Left column: Category and Date */}
                <div className="md:col-span-1 space-y-2">
                  <Body size="xs" className="uppercase tracking-wide opacity-50" as="div">
                    {sequences.find(s => s.id === mirror.sequence)?.title}
                  </Body>
                  {mirror.date && (
                    <Body size="sm" className="opacity-50" as="time">
                      {new Date(mirror.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Body>
                  )}
                </div>

                {/* Right column: Title and Description */}
                <div className="md:col-span-3 space-y-2">
                  <H3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {mirror.title}
                  </H3>
                  {mirror.excerpt && (
                    <Body size="default" className="opacity-70">
                      {mirror.excerpt}
                    </Body>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-12">
            <Body className="opacity-50 mb-4">
              No mirrors in this sequence yet.
            </Body>
            <Body size="sm" className="opacity-40">
              This sequence is part of the systematic exploration, but content has not been added yet.
            </Body>
          </div>
        )}
      </div>
    </div>
  );
}
