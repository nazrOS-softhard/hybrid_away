
import type { GeoSuggestion } from './types'

export async function searchPlaces(query: string): Promise<GeoSuggestion[]> {
  if (query.length < 2) return []

  const url = new URL('https://nominatim.openstreetmap.org/search')
  url.searchParams.set('q', query)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', '5')
  url.searchParams.set('addressdetails', '1')
  url.searchParams.set('accept-language', 'ru')

  const res = await fetch(url.toString(), {
    headers: { 'User-Agent': 'HybridVPuti/1.0' },
  })
  if (!res.ok) return []

  const data = await res.json()
  return data.map((item: any) => ({
    name: item.name || item.display_name.split(',')[0],
    displayName: item.display_name,
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
  }))
}
