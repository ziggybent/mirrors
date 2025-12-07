import Link from 'next/link';
import { getAllPosts } from '@/lib/api';

export const metadata = {
    title: 'Artifacts | Ziggy Bent',
    description: 'Guides and tools for the practice.',
};

export default function ArtifactIndex() {
    const artifacts = getAllPosts('artifacts', ['title', 'date', 'excerpt', 'category', 'slug']);

    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <header className="mb-16">
                <h1 className="text-3xl font-medium mb-4">Artifacts</h1>
                <p className="text-lg text-gray-500">Guides and tools for the practice.</p>
            </header>

            <div className="space-y-16">
                {artifacts.map((artifact) => (
                    <article key={artifact.slug} className="group">
                        <Link href={`/artifact/${artifact.slug}`} className="block space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <span className="uppercase tracking-wider text-xs border border-gray-200 px-2 py-0.5 rounded-full">{artifact.category || 'Guide'}</span>
                                <span>{artifact.date}</span>
                            </div>
                            <h2 className="text-2xl font-medium group-hover:text-gray-900 transition-colors">
                                {artifact.title}
                            </h2>
                            <p className="text-lg text-gray-500 leading-relaxed">
                                {artifact.excerpt}
                            </p>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
