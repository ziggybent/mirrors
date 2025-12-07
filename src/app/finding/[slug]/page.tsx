import { getPostBySlug, getAllPosts } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = getAllPosts('findings', ['slug']);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function FindingPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug('findings', slug, [
        'title',
        'date',
        'slug',
        'content',
    ]);

    if (!post) {
        return notFound();
    }

    const content = await markdownToHtml(post.content || '');

    return (
        <article className="max-w-2xl mx-auto py-12 md:py-20 px-6">
            <header className="mb-12">
                <h1 className="text-3xl md:text-4xl font-medium mb-4 leading-tight">{post.title}</h1>
                <div className="text-sm text-gray-400">{post.date}</div>
            </header>

            <div
                className="prose prose-lg prose-neutral prose-headings:font-sans prose-headings:font-medium prose-p:text-gray-500 prose-a:text-gray-900 prose-a:no-underline hover:prose-a:text-gray-600"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="mt-24 pt-12 border-t border-gray-100">
                <Link href="/finding" className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors">
                    &larr; More Findings
                </Link>
            </div>
        </article>
    );
}
