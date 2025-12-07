import Link from 'next/link';
import { getAllPosts } from '@/lib/api';

export const metadata = {
    title: 'Findings | Ziggy Bent',
    description: 'Discoveries from the edge of perception.',
};

export default function FindingIndex() {
    const findings = getAllPosts('findings', ['title', 'date', 'excerpt', 'slug']);

    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <header className="mb-16">
                <h1 className="text-3xl font-medium mb-4">Findings</h1>
                <p className="text-lg text-gray-500">Discoveries from the edge of perception.</p>
            </header>

            <div className="space-y-16">
                {findings.map((finding) => (
                    <article key={finding.slug} className="group">
                        <Link href={`/finding/${finding.slug}`} className="block space-y-3">
                            <h2 className="text-2xl font-medium group-hover:text-gray-600 transition-colors">
                                {finding.title}
                            </h2>
                            <div className="text-sm text-gray-400">{finding.date}</div>
                            <p className="text-lg text-gray-500 leading-relaxed">
                                {finding.excerpt}
                            </p>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
