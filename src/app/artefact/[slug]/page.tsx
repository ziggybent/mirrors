import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { getArtefactBySlug, getArtefactImageUrl } from '@/lib/supabase';
import Image from 'next/image';

export const dynamic = 'force-dynamic'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const artefact = await getArtefactBySlug(params.slug)

    if (!artefact) {
        return {
            title: 'Artefact Not Found | Ziggy Bent',
        }
    }

    return {
        title: `${artefact.title} | Ziggy Bent`,
        description: `${artefact.title} - ${artefact.year || ''}`,
    }
}

function formatPrice(cents: number | null): string {
    if (cents === null) return ''
    const dollars = cents / 100
    return `$${dollars.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export default async function ArtefactPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const artefact = await getArtefactBySlug(slug)

    if (!artefact) {
        return notFound()
    }

    return (
        <article className="min-h-screen flex flex-col justify-center py-12 md:py-20 px-6">
            <div className="w-full max-w-[1200px] mx-auto mb-6">
                <div className="relative w-full aspect-[3/2] overflow-hidden bg-gray-100">
                    <Image
                        src={getArtefactImageUrl(artefact.image_path)}
                        alt={artefact.alt_text || artefact.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority
                    />
                </div>
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
                        <span className="font-medium">{artefact.title},</span> {artefact.year}
                    </div>
                    {artefact.medium && (
                        <div className="text-sm text-gray-500">{artefact.medium}</div>
                    )}
                    {artefact.dimensions && (
                        <div className="text-sm text-gray-500">{artefact.dimensions}</div>
                    )}
                    {artefact.edition_info && (
                        <div className="text-sm text-gray-500">{artefact.edition_info}</div>
                    )}
                    {artefact.price && (
                        <div className="text-sm text-gray-900 pt-1">{formatPrice(artefact.price)}</div>
                    )}
                </div>
            </div>
        </article>
    )
}
