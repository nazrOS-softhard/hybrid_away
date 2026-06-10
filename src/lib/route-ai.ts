
import type { GeneratedRoute } from './types'

export async function generateRoute(
  from: string,
  to: string,
  fromCoords: [number, number],
  toCoords: [number, number]
): Promise<GeneratedRoute> {
  const res = await fetch('/api/generate-route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, fromCoords, toCoords }),
  })
  if (!res.ok) throw new Error('Ошибка генерации маршрута')
  return res.json()
}
