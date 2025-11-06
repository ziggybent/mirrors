import { getContentItem, getAllSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface MirrorPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('mirrors');
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function MirrorPage({ params }: MirrorPageProps) {
  const mirror = await getContentItem('mirrors', params.slug);

  if (!mirror) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
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
              day: 'numeric'
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
