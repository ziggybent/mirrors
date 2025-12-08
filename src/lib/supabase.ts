import { createClient } from '@/utils/supabase/server'
import type { Artefact, Mirror } from '@/types/supabase'

const STORAGE_URL = 'https://mmjolnasqnsxbwletxzl.supabase.co/storage/v1/object/public/artefacts'

export async function getRandomArtefact(): Promise<Artefact | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('artefacts')
    .select('*')
    .eq('status', 'available')
    .not('image_path', 'is', null)
    .limit(1)
    .order('id', { ascending: false }) // Temporary: will use random()
  
  if (error) {
    console.error('Error fetching random artefact:', error)
    return null
  }
  
  // Get random item from available artefacts
  const { data: allData } = await supabase
    .from('artefacts')
    .select('*')
    .eq('status', 'available')
    .not('image_path', 'is', null)
  
  if (!allData || allData.length === 0) return null
  
  const randomIndex = Math.floor(Math.random() * allData.length)
  return allData[randomIndex]
}

export async function getRandomMirror(): Promise<Mirror | null> {
  const supabase = await createClient()
  
  const { data: allData } = await supabase
    .from('mirrors')
    .select('*')
  
  if (!allData || allData.length === 0) return null
  
  const randomIndex = Math.floor(Math.random() * allData.length)
  return allData[randomIndex]
}

export async function getArtefactBySlug(slug: string): Promise<Artefact | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('artefacts')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching artefact:', error)
    return null
  }
  
  return data
}

export async function getMirrorBySlug(slug: string): Promise<Mirror | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('mirrors')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching mirror:', error)
    return null
  }
  
  return data
}

export function getArtefactImageUrl(imagePath: string): string {
  return `${STORAGE_URL}/${imagePath}`
}

