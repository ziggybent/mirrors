import { getPostBySlug, getAllPosts } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Placeholder from '@/components/Placeholder';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';

export async function generateStaticParams() {
    const posts = getAllPosts('surfaces', ['slug']);

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = getPostBySlug('surfaces', params.slug, ['title', 'caption']);

    if (!post) {
        return notFound();
    }

    return {
        title: `${post.title} | Ziggy Bent`,
        description: post.caption,
    };
}

export default async function SurfacePage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = getPostBySlug('surfaces', params.slug, [
        'title',
        'date',
        'slug',
        'image',
        'caption',
    ]);

    if (!post) {
        return notFound();
    }

    return (
        <article className="min-h-screen flex flex-col justify-center py-12 md:py-20 px-6">
            <div className="w-full max-w-[1200px] mx-auto mb-6">
                <Placeholder
                    height="h-auto"
                    text="Surface Hero Image"
                    className="w-full bg-gray-100 text-gray-400 aspect-[3/2]"
                />
            </div>

            <div className="w-full max-w-[1200px] mx-auto mb-12 flex justify-between items-center">
                <Link href="/" className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Mirror</span>
                </Link>
                <button className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    <span>Share</span>
                    <LinkIcon className="w-4 h-4" />
                </button>
            </div>

            <div className="w-full max-w-[1200px] mx-auto">
                <div className="space-y-1">
                    <div className="text-sm text-gray-900">
                        <span className="font-medium">Edge of Awakening,</span> 2025
                    </div>
                    <div className="text-sm text-gray-500">Inkjet print and brass</div>
                    <div className="text-sm text-gray-500">61 × 44 in | 154.9 × 111.8 cm</div>
                    <div className="text-sm text-gray-500">Edition of 5 + 1AP</div>
                    <div className="text-sm text-gray-900 pt-1">$2,500</div>
                </div>
            </div>
        </article>
    );
}
