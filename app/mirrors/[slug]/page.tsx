import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getContentItem, getAllSlugs } from '@/lib/content';
import { Display } from '@/components/typography/Display';
import { Body } from '@/components/typography';

interface MirrorPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all mirrors
export async function generateStaticParams() {
  const slugs = getAllSlugs('mirrors');
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: MirrorPageProps): Promise<Metadata> {
  const mirror = await getContentItem('mirrors', params.slug);

  if (!mirror) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${mirror.title} | Mirrors | Ziggy Bent`,
    description: mirror.excerpt,
    openGraph: {
      title: mirror.title,
      description: mirror.excerpt,
      images: mirror.image ? [mirror.image] : [],
    },
  };
}

export default async function MirrorPage({ params }: MirrorPageProps) {
  const mirror = await getContentItem('mirrors', params.slug);

  // Handle 404 if mirror not found
  if (!mirror) {
    notFound();
  }

  return (
    <article className="w-full min-h-screen">
      {/* Hero image (if exists) */}
      {mirror.image && (
        <div className="relative w-full aspect-[21/9] overflow-hidden">
          <Image
            src={mirror.image}
            alt={mirror.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Content wrapper */}
      <div className={`max-w-3xl mx-auto px-8 ${mirror.image ? 'py-16' : 'pt-40 pb-16'}`}>
        {/* Title */}
        <Display
          size="lg"
          as="h1"
          className="text-center mb-4"
        >
          {mirror.title}
        </Display>

        {/* Date */}
        <Body
          size="default"
          className="text-center mb-12 opacity-70"
        >
          {new Date(mirror.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Body>

        {/* Content with prose styling */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-inter prose-headings:font-semibold
            prose-p:font-inter prose-p:text-base prose-p:leading-relaxed
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline
            prose-ul:font-inter prose-ol:font-inter
            prose-li:text-base
            prose-strong:font-semibold
            prose-code:font-mono prose-code:text-sm
            prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
            prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: mirror.content }}
        />
      </div>
    </article>
  );
}
