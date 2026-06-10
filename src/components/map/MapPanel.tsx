'use client'

import { useState, useEffect } from 'react'
import { MapPin, Navigation, Edit2 } from 'lucide-react'
import dynamic from 'next/dynamic'

// Leaflet грузим только на клиенте (SSR не поддерживает)
const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

export function MapPanel() {
  const [destination] = useState('Токио, Япония')

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Карта */}
      <LeafletMap />

      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between z-[1000] pointer-events-none">
        <div className="pointer-events-auto">
          <h2 className="text-white font-semibold text-base drop-shadow-lg">Постройте свой маршрут</h2>
          <p className="text-[#8B92A5] text-xs mt-1 max-w-[200px] drop-shadow">
            AI подберёт для вас оптимальный вариант по времени, стоимости и комфорту
          </p>
        </div>

        {/* Destination chip */}
        <div className="pointer-events-auto bg-[#1A1E2A]/90 backdrop-blur border border-[#252B3B] rounded-xl px-3 py-2 flex items-center gap-2">
          <MapPin size={12} className="text-[#00D4B4]" />
          <div>
            <div className="text-[10px] text-[#8B92A5]">Конечная точка</div>
            <div className="text-sm text-white font-medium">{destination}</div>
            <div className="text-[10px] text-[#8B92A5]">Tokyo International Airport (HND)</div>
          </div>
          <button className="text-[#8B92A5] hover:text-white ml-1">
            <Edit2 size={12} />
          </button>
        </div>
      </div>

      {/* Location button */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <button className="flex items-center gap-2 bg-[#1A1E2A]/90 backdrop-blur border border-[#252B3B] rounded-xl px-3 py-2 text-sm text-[#8B92A5] hover:text-white hover:border-[#00D4B4] transition-colors">
          <Navigation size={14} />
          Определить местоположение
        </button>
      </div>
    </div>
  )
}
