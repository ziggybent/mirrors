export type Encounter = {
    id: string
    slug: string
    title: string
    image_path: string
    alt_text: string | null
    year: number | null
    medium: string | null
    dimensions: string | null
    edition_info: string | null
    inventory_count: number
    price: number | null
    status: 'available' | 'sold_out' | 'hidden'
    created_at: string
  }
  
  export type Mirror = {
    id: string
    slug: string
    title: string
    content: string
    created_at: string
  }