import Link from 'next/link';
import { notFound } from 'next/navigation';
import EmailSignup from '@/components/EmailSignup';
import { getMirrorBySlug, getRandomArtefact, getArtefactBySlug, getArtefactImageUrl } from '@/lib/supabase';
import Image from 'next/image';

export const dynamic = 'force-dynamic'

export default async function MirrorPage({ 
    params, 
    searchParams 
}: { 
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ artefact?: string }>;
}) {
    const { slug } = await params
    const { artefact: artefactParam } = await searchParams
    
    const mirror = await getMirrorBySlug(slug)

    if (!mirror) {
        return notFound()
    }

    // Wind Chime logic: pair mirror with artefact
    let artefact = null
    
    if (artefactParam) {
        artefact = await getArtefactBySlug(artefactParam)
    } else {
        artefact = await getRandomArtefact()
    }

    return (
        <article className="py-20 md:py-32 px-6">
            <header className="max-w-[650px] mx-auto text-center space-y-8 mb-16">
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">Mirror</div>
                <h1 className="text-5xl md:text-6xl font-medium leading-tight tracking-tight text-gray-900">
                    {mirror.title}
                </h1>
            </header>

            {artefact && (
                <>
                    <div className="mb-6 max-w-[1000px] mx-auto">
                        <Link href={`/artefact/${artefact.slug}`} className="block group">
                            <div className="relative w-full aspect-[3/2] overflow-hidden bg-gray-100">
                                <Image
                                    src={getArtefactImageUrl(artefact.image_path)}
                                    alt={artefact.alt_text || artefact.title}
                                    fill
                                    className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                                    sizes="(max-width: 1000px) 100vw, 1000px"
                                />
                            </div>
                        </Link>
                    </div>

                    <div className="max-w-[1000px] mx-auto mb-24 flex justify-between items-center">
                        <Link 
                            href={`/artefact/${artefact.slug}`} 
                            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            View Artefact
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
