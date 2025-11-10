import { getContentItem, getAllSlugs, getContentByType } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface MirrorPageProps {
  params: Promise<{
    sequence: string;
    slug: string;
  }>;
}

// Valid sequence values
const VALID_SEQUENCES = ['recognition', 'mechanism', 'instrument', 'context', 'possibility'];

// Sequence metadata
const SEQUENCE_INFO: Record<string, { title: string }> = {
  recognition: { title: 'Recognition' },
  mechanism: { title: 'Mechanism' },
  instrument: { title: 'Instrument' },
  context: { title: 'Context' },
  possibility: { title: 'Possibility' },
};

export async function generateStaticParams() {
  const slugs = getAllSlugs('mirrors');
  const allMirrors = await getContentByType('mirrors');

  const params: { sequence: string; slug: string }[] = [];

  for (const slug of slugs) {
    const mirror = allMirrors.find((m) => m.slug === slug);
    if (mirror && (mirror as any).sequence) {
      params.push({
        sequence: (mirror as any).sequence,
        slug,
      });
    }
  }

  return params;
}

export default async function MirrorPage({ params }: MirrorPageProps) {
  const { sequence, slug } = await params;

  // Validate sequence
  if (!VALID_SEQUENCES.includes(sequence)) {
    notFound();
  }

  const mirror = await getContentItem('mirrors', slug);

  if (!mirror) {
    notFound();
  }

  // Verify the mirror belongs to the requested sequence
  if ((mirror as any).sequence !== sequence) {
    notFound();
  }

  const sequenceInfo = SEQUENCE_INFO[sequence];

  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
      <nav className="mb-8 flex items-center gap-2 text-sm">
        <Link href="/mirror" className="text-blue-600 hover:text-blue-800">
          Mirror
        </Link>
        <span className="text-gray-400">/</span>
        <Link
          href={`/mirror/${sequence}`}
          className="text-blue-600 hover:text-blue-800"
        >
          {sequenceInfo.title}
        </Link>
      </nav>

      {mirror.image && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={mirror.image}
            alt={mirror.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{mirror.title}</h1>

        {mirror.date && (
          <time className="text-gray-500 block mb-2">
            {new Date(mirror.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}

        {mirror.downloadable && (
          <span className="inline-block text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
            Downloadable Content
          </span>
        )}
      </header>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: mirror.content }}
      />
    </article>
  );
}
