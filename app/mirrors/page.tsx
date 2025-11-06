import { getContentByType } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';

export default async function MirrorsPage() {
  const mirrors = await getContentByType('mirrors');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Mirrors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mirrors.map((mirror) => (
          <Link
            key={mirror.slug}
            href={`/mirrors/${mirror.slug}`}
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
                      day: 'numeric'
                    })}
                  </time>
                )}

                {mirror.excerpt && (
                  <p className="text-gray-700">{mirror.excerpt}</p>
                )}

                {mirror.downloadable && (
                  <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Downloadable
                  </span>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {mirrors.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          No mirrors available yet.
        </p>
      )}
    </div>
  );
}
