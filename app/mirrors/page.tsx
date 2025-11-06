import { Metadata } from 'next';
import { getContentMetadata } from '@/lib/content';
import { ContentGrid } from '@/components/ContentGrid';
import { H1 } from '@/components/typography/Heading';

export const metadata: Metadata = {
  title: 'Mirrors | Ziggy Bent',
  description: 'Explore the Mirrors collection - reflections and insights from Ziggy Bent',
};

export default function MirrorsPage() {
  const mirrors = getContentMetadata('mirrors');

  return (
    <div className="w-full min-h-screen pt-40 pb-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <H1 className="mb-12 text-center">Mirrors</H1>
        <ContentGrid items={mirrors} basePath="/mirrors" columns={2} />
      </div>
    </div>
  );
}
