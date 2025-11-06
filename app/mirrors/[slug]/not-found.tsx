import Link from 'next/link';
import { Display } from '@/components/typography/Display';
import { Body } from '@/components/typography';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <Display size="xl" className="mb-4">
          404
        </Display>
        <Display size="md" as="h2" className="mb-6">
          Mirror Not Found
        </Display>
        <Body size="lg" className="mb-8 opacity-70">
          The mirror you&apos;re looking for doesn&apos;t exist or has been moved.
        </Body>
        <Link
          href="/mirrors"
          className="inline-block px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Back to Mirrors
        </Link>
      </div>
    </div>
  );
}
