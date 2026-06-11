'use client'

import { Navigation, MapPin, Clock, Trash2 } from 'lucide-react'
import { useRouteStore } from '@/store/route-store'
import { formatPrice, formatDuration } from '@/lib/utils'
import { useEffect } from 'react'
import { loadRouteHistory } from '@/lib/supabase'

export function RoutesTab() {
  const { routeHistory, setActiveTab, setRoute, addToHistory } = useRouteStore()

  useEffect(() => {
    if (routeHistory.length === 0) {
      loadRouteHistory().then(routes => {
        routes.forEach(r => addToHistory(r))
      })
    }
  }, [])

  if (routeHistory.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <Navigation size={40} className="text-[#252B3B] mb-4" />
        <div className="text-[#8B92A5] text-sm mb-2">История маршрутов пуста</div>
        <div className="text-[#4A5168] text-xs mb-6">Постройте первый маршрут на главном экране</div>
        <button
          onClick={() => setActiveTab('home')}
          className="px-4 py-2 bg-[#00D4B4] text-black text-sm font-semibold rounded-xl"
        >
          Построить маршрут
        </button>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="text-white font-semibold text-base mb-6">История маршрутов</h2>
      <div className="space-y-3">
        {routeHistory.map((route, i) => {
          const rec = route.variants.find(v => v.tag === 'recommended') ?? route.variants[0]
          return (
            <button
              key={i}
              onClick={() => { setRoute(route); setActiveTab('home') }}
              className="w-full text-left bg-[#141720] border border-[#252B3B] rounded-xl p-4 hover:border-[#00D4B4] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <MapPin size={12} className="text-[#00D4B4]" />
                    {route.from}
                    <span className="text-[#4A5168]">→</span>
                    <MapPin size={12} className="text-[#FF4B6E]" />
                    {route.to}
                  </div>
                  <div className="text-[#4A5168] text-[10px] mt-1">{route.departureDate}</div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm font-semibold">{formatPrice(rec?.price ?? 0)}</div>
                  <div className="flex items-center gap-1 text-[#8B92A5] text-[10px] mt-0.5">
                    <Clock size={9} />
                    {formatDuration(rec?.duration ?? 0)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {(rec?.steps ?? []).map((step, j) => (
                  <span key={j} className="text-[10px] text-[#4A5168] bg-[#1A1E2A] px-2 py-0.5 rounded-full">{step}</span>
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
