import { NextResponse } from 'next/server';
import { getContentMetadata } from '@/lib/content';

export async function GET() {
  try {
    const mirrors = getContentMetadata('mirrors');
    return NextResponse.json(mirrors);
  } catch (error) {
    console.error('Error fetching mirrors:', error);
    return NextResponse.json({ error: 'Failed to fetch mirrors' }, { status: 500 });
  }
}
