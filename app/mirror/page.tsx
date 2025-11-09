'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Display, Body, H3 } from '@/components/typography';

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
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* Hero Section */}
      <header>
        <Display size="2xl">Mirrors</Display>
        <Body size="lg" className="mt-4 text-[#858585] mb-12 max-w-3xl">
          A systematic exploration of awareness, construction, and what remains when identification dissolves.
        </Body>
      </header>

      {/* Tabs */}
      <nav className="mb-16 border-b border-gray-800">
        <ul className="flex gap-8">
          {sequences.map((sequence) => (
            <li key={sequence.id}>
              <button
                onClick={() => setActiveTab(sequence.id)}
                className={`
                  pb-4 font-inter text-body-lg font-medium transition-colors
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
        {isLoading ? (
          <div className="text-center py-12">
            <Body className="text-[#858585]">Loading...</Body>
          </div>
        ) : filteredMirrors.length > 0 ? (
          filteredMirrors.map((mirror) => (
            <Link
              key={mirror.slug}
              href={`/mirror/${mirror.sequence}/${mirror.slug}`}
              className="group block mb-12 max-w-4xl"
            >
              <article>
                {/* Category label */}
                <Body size="xs" as="span" className="uppercase tracking-wide text-[#858585] mb-2 block">
                  {sequences.find(s => s.id === mirror.sequence)?.title}
                </Body>

                {/* Date */}
                {mirror.date && (
                  <Body size="sm" as="span" className="text-[#858585] mb-4 block">
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
                <H3 className="text-white mb-3 group-hover:opacity-80 transition-opacity">
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
          ))
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
