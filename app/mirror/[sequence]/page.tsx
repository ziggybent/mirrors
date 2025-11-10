import { getContentByType } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface SequencePageProps {
  params: Promise<{
    sequence: string;
  }>;
}

// Valid sequence values
const VALID_SEQUENCES = ['recognition', 'mechanism', 'instrument', 'context', 'possibility'];

// Sequence metadata
const SEQUENCE_INFO: Record<string, { title: string; description: string }> = {
  recognition: {
    title: 'Recognition',
    description: 'The fundamental shift from identification to awareness.',
  },
  mechanism: {
    title: 'Mechanism',
    description: 'Understanding the construction and operation of the self.',
  },
  instrument: {
    title: 'Instrument',
    description: 'Tools and practices for direct observation.',
  },
  context: {
    title: 'Context',
    description: 'The field in which all experience arises.',
  },
  possibility: {
    title: 'Possibility',
    description: 'What becomes available when the mechanism is seen.',
  },
};

export async function generateStaticParams() {
  return VALID_SEQUENCES.map((sequence) => ({
    sequence,
  }));
}

export default async function SequencePage({ params }: SequencePageProps) {
  const { sequence } = await params;

  // Validate sequence
  if (!VALID_SEQUENCES.includes(sequence)) {
    notFound();
  }

  // Get all mirrors and filter by sequence
  const allMirrors = await getContentByType('mirrors');
  const sequenceMirrors = allMirrors.filter(
    (mirror) => (mirror as any).sequence === sequence
  );

  const sequenceInfo = SEQUENCE_INFO[sequence];

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 sm:pt-32 sm:pb-12 lg:py-20">
      <header className="mb-8">
        <Link
          href="/mirror"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to Mirror
        </Link>
        <h1 className="text-4xl font-bold mb-4">{sequenceInfo.title}</h1>
        <p className="text-lg text-gray-600">{sequenceInfo.description}</p>
      </header>

      {sequenceMirrors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sequenceMirrors.map((mirror) => (
            <Link
              key={mirror.slug}
              href={`/mirror/${sequence}/${mirror.slug}`}
              className="group block"
            >
              <article className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {mirror.image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={mirror.image}
                      alt={mirror.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                    {mirror.title}
                  </h2>

                  {mirror.date && (
                    <time className="text-sm text-gray-500 block mb-2">
                      {new Date(mirror.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  )}

                  {mirror.excerpt && (
                    <p className="text-gray-700">{mirror.excerpt}</p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            No mirrors in this sequence yet.
          </p>
          <p className="text-gray-400">
            This sequence is part of the systematic exploration, but content has not been added yet.
          </p>
        </div>
      )}
    </div>
  );
}
