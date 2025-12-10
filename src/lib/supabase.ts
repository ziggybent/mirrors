import { createClient } from '@/utils/supabase/server'
import type { Encounter, Mirror } from '@/types/supabase'

const STORAGE_URL = 'https://mmjolnasqnsxbwletxzl.supabase.co/storage/v1/object/public/artefacts'

export async function getRandomEncounter(): Promise<Encounter | null> {
  const supabase = await createClient()
  
  console.log('[getRandomEncounter] Starting query...')
  
  const { data, error } = await supabase
    .from('encounters')
    .select('*')
    .eq('status', 'available')
    .not('image_path', 'is', null)
    .limit(1)
    .order('id', { ascending: false }) // Temporary: will use random()
  
  console.log('[getRandomEncounter] Initial query result:', { data, error })
  
  if (error) {
    console.error('[getRandomEncounter] Error fetching random encounter:', error)
    return null
  }
  
  // Get random item from available encounters
  const { data: allData, error: allError } = await supabase
    .from('encounters')
    .select('*')
    .eq('status', 'available')
    .not('image_path', 'is', null)
  
  console.log('[getRandomEncounter] All encounters query result:', { 
    count: allData?.length || 0, 
    error: allError,
    firstItem: allData?.[0]
  })
  
  if (!allData || allData.length === 0) {
    console.log('[getRandomEncounter] No encounters found, returning null')
    return null
  }
  
  const randomIndex = Math.floor(Math.random() * allData.length)
  const selectedEncounter = allData[randomIndex]
  
  console.log('[getRandomEncounter] Selected encounter:', {
    randomIndex,
    slug: selectedEncounter.slug,
    title: selectedEncounter.title,
    image_path: selectedEncounter.image_path
  })
  
  return selectedEncounter
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

export async function getEncounterBySlug(slug: string): Promise<Encounter | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('encounters')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching encounter:', error)
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

export function getEncounterImageUrl(imagePath: string): string {
  return `${STORAGE_URL}/${imagePath}`
}
