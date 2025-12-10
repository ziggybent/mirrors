import Link from 'next/link';
import { notFound } from 'next/navigation';
import EmailSignup from '@/components/EmailSignup';
import { getMirrorBySlug, getRandomEncounter, getEncounterBySlug, getEncounterImageUrl } from '@/lib/supabase';
import Image from 'next/image';

export const dynamic = 'force-dynamic'

export default async function MirrorPage({ 
    params, 
    searchParams 
}: { 
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ encounter?: string }>;
}) {
    const { slug } = await params
    const { encounter: encounterParam } = await searchParams
    
    const mirror = await getMirrorBySlug(slug)

    if (!mirror) {
        return notFound()
    }

    // Wind Chime logic: pair mirror with encounter
    let encounter = null
    
    if (encounterParam) {
        encounter = await getEncounterBySlug(encounterParam)
    } else {
        encounter = await getRandomEncounter()
    }

    return (
        <article className="py-20 md:py-32 px-6">
            <header className="max-w-[650px] mx-auto text-center space-y-8 mb-16">
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
                            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            View Encounter
                        </Link>
                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            Share
                        </button>
                    </div>
                </>
            )}

            <div className="prose prose-lg prose-neutral mx-auto max-w-[650px] prose-headings:font-sans prose-headings:font-medium prose-p:font-sans prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-gray-800 prose-a:text-gray-900 prose-a:no-underline hover:prose-a:text-gray-600">
                <div className="whitespace-pre-wrap">{mirror.content}</div>
            </div>

            <EmailSignup />
        </article>
    )
}
