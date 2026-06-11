'use client'

import { Briefcase, MapPin, Clock, CheckCircle, Circle, AlertCircle } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const mockTrips = [
  {
    id: '1', status: 'active' as const,
    from: 'Новодвинск', to: 'Токио',
    departureDate: '12 мая 2024', arrivalDate: '13 мая 2024',
    price: 142850,
    steps: ['такси', 'ARH→SVO', 'SVO→HND', 'такси', 'отель'],
  },
  {
    id: '2', status: 'upcoming' as const,
    from: 'Москва', to: 'Санкт-Петербург',
    departureDate: '20 мая 2024', arrivalDate: '20 мая 2024',
    price: 4200,
    steps: ['Сапсан'],
  },
  {
    id: '3', status: 'completed' as const,
    from: 'Архангельск', to: 'Москва',
    departureDate: '3 апреля 2024', arrivalDate: '3 апреля 2024',
    price: 8900,
    steps: ['такси', 'SU 1333', 'такси'],
  },
]

const statusConfig = {
  active: { label: 'В пути', color: 'text-[#00C48C]', bg: 'bg-[#00C48C20]', icon: Circle },
  upcoming: { label: 'Предстоит', color: 'text-[#4A9EFF]', bg: 'bg-[#4A9EFF20]', icon: Clock },
  completed: { label: 'Завершено', color: 'text-[#4A5168]', bg: 'bg-[#1A1E2A]', icon: CheckCircle },
}

export function TripsTab() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="text-white font-semibold text-base mb-6">Мои поездки</h2>

      {(['active', 'upcoming', 'completed'] as const).map(status => {
        const trips = mockTrips.filter(t => t.status === status)
        if (trips.length === 0) return null
        const cfg = statusConfig[status]
        return (
          <div key={status} className="mb-8">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-4 ${cfg.color} ${cfg.bg}`}>
              <cfg.icon size={10} />
              {cfg.label}
            </div>
            <div className="space-y-3">
              {trips.map(trip => (
                <div key={trip.id} className="bg-[#141720] border border-[#252B3B] rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-white text-sm font-medium">
                        <MapPin size={12} className="text-[#00D4B4]" />
                        {trip.from}
                        <span className="text-[#4A5168]">→</span>
                        <MapPin size={12} className="text-[#FF4B6E]" />
                        {trip.to}
                      </div>
                      <div className="text-[#4A5168] text-[10px] mt-1">
                        {trip.departureDate}
                        {trip.arrivalDate !== trip.departureDate && ` — ${trip.arrivalDate}`}
                      </div>
                    </div>
                    <div className="text-white text-sm font-semibold">{formatPrice(trip.price)}</div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {trip.steps.map((step, j) => (
                      <span key={j} className="text-[10px] text-[#8B92A5] bg-[#1A1E2A] px-2 py-0.5 rounded-full">{step}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
