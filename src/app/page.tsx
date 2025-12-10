import Link from 'next/link';
import EmailSignup from '@/components/EmailSignup';
import { Search, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { getRandomMirror, getRandomEncounter, getEncounterImageUrl } from '@/lib/supabase';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function refreshChime() {
  'use server'
  redirect('/')
}

export default async function Home() {
  const mirror = await getRandomMirror()
  const encounter = await getRandomEncounter()

  if (!mirror) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No mirrors found</p>
      </div>
    )
  }

  return (
    <article className="py-20 md:py-32 px-6">
      <header className="max-w-[800px] mx-auto text-center space-y-6 mb-16">
        <div className="text-xs font-medium uppercase tracking-wider text-gray-500">Mirror</div>
        <h1 className="text-5xl md:text-6xl font-medium leading-tight tracking-tight text-gray-900">
          {mirror.title}
        </h1>
      </header>

      {encounter && (
        <>
          <div className="mb-6 max-w-[1000px] mx-auto">
            <Link href={`/encounter/${encounter.slug}`} className="block group">
              <div className="relative w-full aspect-[3/2] overflow-hidden bg-gray-100">
                <Image
                  src={getEncounterImageUrl(encounter.image_path)}
                  alt={encounter.alt_text || encounter.title}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                  sizes="(max-width: 1000px) 100vw, 1000px"
                />
              </div>
            </Link>
          </div>

          <div className="max-w-[1000px] mx-auto mb-24 flex justify-between items-center">
            <Link
              href={`/encounter/${encounter.slug}`}
              className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>View Encounter</span>
            </Link>
            <div className="flex items-center gap-4">
              <form action={refreshChime}>
                <button
                  type="submit"
                  className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer hover:opacity-70"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Rotate</span>
                </button>
              </form>
              <button className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                <span>Share</span>
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      <div className="prose prose-lg prose-neutral mx-auto max-w-[650px] prose-headings:font-sans prose-headings:font-medium prose-p:font-serif prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-gray-800 prose-a:text-gray-900 prose-a:no-underline hover:prose-a:text-gray-600">
        <div className="whitespace-pre-wrap">{mirror.content}</div>
      </div>

      <EmailSignup />
    </article>
  );
}
