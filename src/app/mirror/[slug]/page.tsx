import { getPostBySlug, getAllPosts } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Placeholder from '@/components/Placeholder';
import EmailSignup from '@/components/EmailSignup';

export async function generateStaticParams() {
    const posts = getAllPosts('mirrors', ['slug']);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function MirrorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug('mirrors', slug, [
        'title',
        'date',
        'slug',
        'content',
        'category',
        'description',
    ]);

    if (!post) {
        return notFound();
    }

    const content = await markdownToHtml(post.content || '');

    return (
        <article className="py-20 md:py-32 px-6">
            <header className="max-w-[650px] mx-auto text-center space-y-8 mb-16">
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">{post.category || 'Mirror'}</div>
                <h1 className="text-5xl md:text-6xl font-medium leading-tight tracking-tight text-gray-900">{post.title}</h1>
                {post.description && (
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-[600px] mx-auto">
                        {post.description}
                    </p>
                )}
            </header>

            <div className="mb-6 max-w-[1000px] mx-auto">
                <Link href="/surface/surface-tension" className="block group">
                    <Placeholder height="h-auto" text="Feature Image" className="w-full bg-gray-100 text-gray-400 aspect-[3/2] transition-opacity duration-300 group-hover:opacity-90" />
                </Link>
            </div>

            <div className="max-w-[1000px] mx-auto mb-24 flex justify-between items-center">
                <Link href="/surface/surface-tension" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    View Surface
                </Link>
                <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    Share
                </button>
            </div>


            <div
                className="prose prose-lg prose-neutral mx-auto max-w-[650px] prose-headings:font-sans prose-headings:font-medium prose-p:font-sans prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-gray-800 prose-a:text-gray-900 prose-a:no-underline hover:prose-a:text-gray-600"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <EmailSignup />
        </article>
    );
}
