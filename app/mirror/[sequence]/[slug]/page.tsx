import { getContentItem, getAllSlugs, getContentByType } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { H1, Body } from '@/components/typography';

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
    <article className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-8 sm:pt-32 sm:pb-12 lg:py-20">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 lg:mb-12 flex items-center gap-2">
        <Link href="/mirror" className="hover:opacity-70 transition-opacity">
          <Body size="sm" className="text-[#858585]">Mirror</Body>
        </Link>
        <Body size="sm" className="text-[#858585]">/</Body>
        <Link
          href={`/mirror#${sequence}`}
          className="hover:opacity-70 transition-opacity"
        >
          <Body size="sm" className="text-[#858585]">{sequenceInfo.title}</Body>
        </Link>
      </nav>

      {/* Feature Image */}
      {mirror.image && (
        <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-8 lg:mb-12 rounded-lg overflow-hidden">
          <Image
            src={mirror.image}
            alt={mirror.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-10 lg:mb-12">
        <H1 className="text-white mb-4 lg:mb-6">{mirror.title}</H1>

        {mirror.date && (
          <time className="block mb-4">
            <Body size="sm" className="text-[#858585]">
              {new Date(mirror.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Body>
          </time>
        )}

        {mirror.downloadable && (
          <span className="inline-block">
            <Body size="sm" className="bg-white/10 text-white px-3 py-1.5 rounded">
              Downloadable Content
            </Body>
          </span>
        )}
      </header>

      {/* Content */}
      <div
        className="prose prose-lg prose-invert max-w-none
          prose-headings:text-white prose-headings:font-semibold
          prose-p:text-[#d0d0d0] prose-p:leading-relaxed
          prose-a:text-white prose-a:underline hover:prose-a:opacity-70
          prose-strong:text-white prose-strong:font-semibold
          prose-ul:text-[#d0d0d0] prose-ol:text-[#d0d0d0]
          prose-li:marker:text-[#858585]
          prose-blockquote:border-l-white/20 prose-blockquote:text-[#d0d0d0]
          prose-code:text-white prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10"
        dangerouslySetInnerHTML={{ __html: mirror.content }}
      />
    </article>
  );
}
