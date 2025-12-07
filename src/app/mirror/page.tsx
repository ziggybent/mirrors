import Link from 'next/link';
import { getAllPosts } from '@/lib/api';

export const metadata = {
    title: 'Mirrors | Ziggy Bent',
    description: 'Reflective content for consciousness exploration.',
};

export default function MirrorIndex() {
    const mirrors = getAllPosts('mirrors', ['title', 'date', 'excerpt', 'slug']);

    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <header className="mb-16">
                <h1 className="text-3xl font-medium mb-4">Mirrors</h1>
                <p className="text-lg text-gray-500">Reflections on the nature of mind and being.</p>
            </header>

            <div className="space-y-16">
                {mirrors.map((mirror) => (
                    <article key={mirror.slug} className="group">
                        <Link href={`/mirror/${mirror.slug}`} className="block space-y-3">
                            <h2 className="text-2xl font-medium group-hover:text-gray-600 transition-colors">
                                {mirror.title}
                            </h2>
                            <div className="text-sm text-gray-400">{mirror.date}</div>
                            <p className="text-lg text-gray-500 leading-relaxed">
                                {mirror.excerpt}
                            </p>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
