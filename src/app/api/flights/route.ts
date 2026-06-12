import { NextRequest, NextResponse } from 'next/server'
import { findIATA } from '@/lib/iata-codes'

export async function POST(req: NextRequest) {
  const { from, to, departDate } = await req.json()

  const origin = findIATA(from)
  const destination = findIATA(to)

  if (!origin || !destination) {
    return NextResponse.json({ flights: [], available: false })
  }

  // Travelpayouts: цены на билеты (календарь низких цен)
  const url = new URL('https://api.travelpayouts.com/aviasales/v3/prices_for_dates')
  url.searchParams.set('origin', origin)
  url.searchParams.set('destination', destination)
  url.searchParams.set('departure_at', departDate) // YYYY-MM-DD
  url.searchParams.set('currency', 'rub')
  url.searchParams.set('token', process.env.TRAVELPAYOUTS_TOKEN!)
  url.searchParams.set('limit', '5')
  url.searchParams.set('sorting', 'price')

  try {
    const res = await fetch(url.toString())
    const data = await res.json()

    if (!data.success || !data.data?.length) {
      return NextResponse.json({ flights: [], available: false })
    }

    const flights = data.data.map((f: any) => ({
      origin: f.origin,
      destination: f.destination,
      price: f.price,
      airline: f.airline,
      flightNumber: `${f.airline} ${f.flight_number}`,
      departureAt: f.departure_at,
      returnAt: f.return_at,
      transfers: f.transfers,
      duration: f.duration,
    }))

    return NextResponse.json({ flights, available: true })
  } catch (err) {
    console.error('Flights API error:', err)
    return NextResponse.json({ flights: [], available: false })
  }
}
