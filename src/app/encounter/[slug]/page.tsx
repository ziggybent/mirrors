import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { getEncounterBySlug, getEncounterImageUrl } from '@/lib/supabase';
import Image from 'next/image';

export const dynamic = 'force-dynamic'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const encounter = await getEncounterBySlug(params.slug)

    if (!encounter) {
        return {
            title: 'Encounter Not Found | Ziggy Bent',
        }
    }

    return {
        title: `${encounter.title} | Ziggy Bent`,
        description: `${encounter.title} - ${encounter.year || ''}`,
    }
}

function formatPrice(cents: number | null): string {
    if (cents === null) return ''
    const dollars = cents / 100
    return `$${dollars.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export default async function EncounterPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const encounter = await getEncounterBySlug(slug)

    if (!encounter) {
        return notFound()
    }

    return (
        <article className="min-h-screen flex flex-col justify-center py-12 md:py-20 px-6">
            <div className="w-full max-w-[1200px] mx-auto mb-6">
                <div className="relative w-full aspect-[3/2] overflow-hidden bg-gray-100">
                    <Image
                        src={getEncounterImageUrl(encounter.image_path)}
                        alt={encounter.alt_text || encounter.title}
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
                        <span className="font-medium">{encounter.title},</span> {encounter.year}
                    </div>
                    {encounter.medium && (
                        <div className="text-sm text-gray-500">{encounter.medium}</div>
                    )}
                    {encounter.dimensions && (
                        <div className="text-sm text-gray-500">{encounter.dimensions}</div>
                    )}
                    {encounter.edition_info && (
                        <div className="text-sm text-gray-500">{encounter.edition_info}</div>
                    )}
                    {encounter.price && (
                        <div className="text-sm text-gray-900 pt-1">{formatPrice(encounter.price)}</div>
                    )}
                </div>
            </div>
        </article>
    )
}
