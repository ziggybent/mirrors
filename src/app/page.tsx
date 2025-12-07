import { getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import Link from 'next/link';
import Placeholder from '@/components/Placeholder';
import EmailSignup from '@/components/EmailSignup';
import { Search, Link as LinkIcon } from 'lucide-react';

export default async function Home() {
  const post = getPostBySlug('mirrors', 'the-mirror-of-self', [
    'title',
    'date',
    'slug',
    'content',
    'category',
    'description',
  ]);

  const content = await markdownToHtml(post.content || '');

  return (
    <article className="py-20 md:py-32 px-6">
      <header className="max-w-[800px] mx-auto text-center space-y-6 mb-16">
        <div className="text-xs font-medium uppercase tracking-wider text-gray-500">{post.category || 'Mirror'}</div>
        <h1 className="text-5xl md:text-6xl font-medium leading-tight tracking-tight text-gray-900">{post.title}</h1>
        {post.description && (
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-[600px] mx-auto">
            {post.description}
          </p>
        )}
      </header>

      <div className="mb-6 max-w-[1000px] mx-auto">
        <Link href="/mirror/the-mirror-of-self" className="block group">
          <Placeholder
            height="h-auto"
            text="Feature Image"
            className="w-full bg-gray-100 text-gray-400 aspect-[3/2] transition-opacity duration-300 group-hover:opacity-90"
          />
        </Link>
      </div>

      <div className="max-w-[1000px] mx-auto mb-24 flex justify-between items-center">
        <Link href="/surface/surface-tension" className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <Search className="w-4 h-4" />
          <span>View Surface</span>
        </Link>
        <button className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <span>Share</span>
          <LinkIcon className="w-4 h-4" />
        </button>
      </div>

      <div
        className="prose prose-lg prose-neutral mx-auto max-w-[650px] prose-headings:font-sans prose-headings:font-medium prose-p:font-serif prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-gray-800 prose-a:text-gray-900 prose-a:no-underline hover:prose-a:text-gray-600"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <EmailSignup />
    </article>
  );
}
