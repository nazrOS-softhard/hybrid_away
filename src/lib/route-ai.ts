import type { GeneratedRoute, GeoSuggestion } from './types'

interface FlightOption {
  origin: string
  destination: string
  price: number
  airline: string
  flightNumber: string
  departureAt: string
  transfers: number
  duration: number
}

interface DistanceResult {
  available: boolean
  distanceKm?: number
  durationMin?: number
}

async function fetchFlights(from: string, to: string, departDate: string): Promise<FlightOption[]> {
  try {
    const res = await fetch('/api/flights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, departDate }),
    })
    const data = await res.json()
    return data.flights ?? []
  } catch {
    return []
  }
}

async function fetchDistance(from: [number, number], to: [number, number]): Promise<DistanceResult> {
  try {
    const res = await fetch('/api/route-distance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to }),
    })
    return await res.json()
  } catch {
    return { available: false }
  }
}

export async function generateRoute(
  from: string,
  to: string,
  fromCoords: [number, number],
  toCoords: [number, number]
): Promise<GeneratedRoute> {
  // Дата вылета — через 3 дня от сегодня
  const departDate = new Date()
  departDate.setDate(departDate.getDate() + 3)
  const departDateStr = departDate.toISOString().split('T')[0]

  // Параллельно: реальные рейсы + реальное расстояние такси (если расстояние небольшое)
  const directDistance = haversine(fromCoords, toCoords)

  const [flights, taxiDistance] = await Promise.all([
    fetchFlights(from, to, departDateStr),
    directDistance < 1000 ? fetchDistance(fromCoords, toCoords) : Promise.resolve({ available: false }),
  ])

  // Передаём реальные данные в AI для финальной сборки маршрута
  const res = await fetch('/api/generate-route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from, to, fromCoords, toCoords,
      departDateStr,
      realFlights: flights,
      realTaxiDistance: taxiDistance,
    }),
  })

  if (!res.ok) throw new Error('Ошибка генерации маршрута')
  return res.json()
}

// Расстояние по прямой в км (формула гаверсинуса)
function haversine(a: [number, number], b: [number, number]): number {
  const R = 6371
  const dLat = toRad(b[0] - a[0])
  const dLon = toRad(b[1] - a[1])
  const lat1 = toRad(a[0])
  const lat2 = toRad(b[0])
  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}
