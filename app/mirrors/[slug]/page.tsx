import { getContentItem, getAllSlugs } from '@/lib/content';
import { redirect } from 'next/navigation';

interface MirrorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('mirrors');
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function MirrorPage({ params }: MirrorPageProps) {
  const { slug } = await params;
  const mirror = await getContentItem('mirrors', slug);

  if (!mirror) {
    redirect('/mirror');
  }

  // Redirect to the new URL structure with sequence
  const sequence = (mirror as any).sequence || 'recognition';
  redirect(`/mirror/${sequence}/${slug}`);
}
