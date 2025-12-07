import { getPostBySlug, getAllPosts } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = getAllPosts('artifacts', ['slug']);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function ArtifactPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug('artifacts', slug, [
        'title',
        'date',
        'slug',
        'content',
        'category',
    ]);

    if (!post) {
        return notFound();
    }

    const content = await markdownToHtml(post.content || '');

    return (
        <article className="max-w-2xl mx-auto py-12 md:py-20 px-6">
            <header className="mb-12">
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                    <span className="uppercase tracking-wider text-xs border border-gray-200 px-2 py-0.5 rounded-full">{post.category || 'Guide'}</span>
                    <span>{post.date}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-medium mb-4 leading-tight">{post.title}</h1>
            </header>

            <div
                className="prose prose-lg prose-neutral prose-headings:font-sans prose-headings:font-medium prose-p:text-gray-500 prose-a:text-gray-900 prose-a:no-underline hover:prose-a:text-gray-600"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="mt-24 pt-12 border-t border-gray-100">
                <Link href="/artifact" className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors">
                    &larr; More Artifacts
                </Link>
            </div>
        </article>
    );
}
