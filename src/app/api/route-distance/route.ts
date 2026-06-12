import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { from, to } = await req.json() as {
    from: [number, number] // [lat, lon]
    to: [number, number]
  }

  // OSRM использует формат lon,lat (не lat,lon!)
  const coords = `${from[1]},${from[0]};${to[1]},${to[0]}`
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=false`

  try {
    const res = await fetch(url)
    const data = await res.json()

    if (data.code !== 'Ok' || !data.routes?.length) {
      return NextResponse.json({ available: false })
    }

    const route = data.routes[0]
    return NextResponse.json({
      available: true,
      distanceKm: Math.round(route.distance / 1000),
      durationMin: Math.round(route.duration / 60),
    })
  } catch (err) {
    console.error('OSRM error:', err)
    return NextResponse.json({ available: false })
  }
}
