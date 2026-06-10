
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function saveRoute(route: {
  from_name: string
  to_name: string
  from_coords: [number, number]
  to_coords: [number, number]
  route_data: object
}) {
  const { data, error } = await supabase
    .from('routes')
    .insert([route])
    .select()
    .single()

  if (error) console.error('Supabase error:', error)
  return data
}

export async function getRecentRoutes() {
  const { data } = await supabase
    .from('routes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)
  return data ?? []
}
