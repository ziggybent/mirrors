import Link from 'next/link';
import { getAllPosts } from '@/lib/api';

export const metadata = {
    title: 'Surfaces | Ziggy Bent',
    description: 'Visual explorations of texture and form.',
};

export default function SurfaceIndex() {
    const surfaces = getAllPosts('surfaces', ['title', 'date', 'image', 'slug']);

    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <header className="mb-16">
                <h1 className="text-3xl font-medium mb-4">Surfaces</h1>
                <p className="text-lg text-gray-500">Visual explorations of texture and form.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {surfaces.map((surface) => (
                    <Link key={surface.slug} href={`/surface/${surface.slug}`} className="block group space-y-4">
                        <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                            {/* In a real app, use Next.js Image */}
                            <div className="w-full h-full bg-gray-200 group-hover:bg-gray-300 transition-colors flex items-center justify-center text-gray-400">
                                {surface.title}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium group-hover:text-gray-900 transition-colors">
                                {surface.title}
                            </h2>
                            <div className="text-sm text-gray-400">{surface.date}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
