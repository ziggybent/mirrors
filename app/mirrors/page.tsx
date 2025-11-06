import React from 'react';
import { ContentGrid } from '@/components/ContentGrid';
import { getContentMetadata } from '@/lib/content';
import { H1 } from '@/components/typography';

export default function MirrorsPage() {
  const mirrors = getContentMetadata('mirrors');

  return (
    <div className="space-y-8">
      <H1>Mirrors</H1>
      <ContentGrid items={mirrors} type="mirrors" />
    </div>
  );
}
