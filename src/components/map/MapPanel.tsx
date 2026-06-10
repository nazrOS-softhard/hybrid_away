
'use client'

import { useState } from 'react'
import { MapPin, Navigation, Plus, Minus, Crosshair, Edit2 } from 'lucide-react'

export function MapPanel() {
  const [destination] = useState('Токио, Япония')

  return (
    <div className="flex-1 relative bg-[#141720] overflow-hidden">
      {/* Map placeholder — заменим на Mapbox после добавления токена */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, #1a2744 0%, #0D0F14 70%)',
        }}
      >
        {/* Имитация карты */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 450">
          {/* Дороги */}
          <path d="M0 200 Q200 180 400 220 Q600 260 800 240" stroke="#334" strokeWidth="2" fill="none" />
          <path d="M0 280 Q150 300 300 280 Q450 260 600 290 Q700 305 800 295" stroke="#334" strokeWidth="1.5" fill="none" />
          <path d="M200 0 Q220 150 240 300 Q250 380 260 450" stroke="#334" strokeWidth="1" fill="none" />
          <path d="M500 0 Q520 100 510 250 Q505 350 520 450" stroke="#334" strokeWidth="1" fill="none" />
          {/* Река */}
          <path d="M0 320 Q100 310 200 330 Q300 350 400 340 Q500 330 600 345 Q700 355 800 350" stroke="#1a3a5c" strokeWidth="8" fill="none" />
        </svg>

        {/* Маршрутная линия */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450">
          <path
            d="M 150 300 Q 300 200 500 180 Q 620 170 720 160"
            stroke="#00D4B4"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6 4"
            opacity="0.8"
          />
          {/* Точка старта */}
          <circle cx="150" cy="300" r="6" fill="#00D4B4" />
          <circle cx="150" cy="300" r="12" fill="#00D4B4" fillOpacity="0.2" />
          {/* Аэропорт */}
          <rect x="315" y="170" width="28" height="28" rx="6" fill="#1A1E2A" stroke="#252B3B" />
          <text x="329" y="189" textAnchor="middle" fill="#8B92A5" fontSize="12">✈</text>
          <text x="329" y="212" textAnchor="middle" fill="#8B92A5" fontSize="8">ARH</text>
        </svg>
      </div>

      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between">
        <div>
          <h2 className="text-white font-semibold text-base">Постройте свой маршрут</h2>
          <p className="text-[#8B92A5] text-xs mt-1 max-w-[200px]">
            AI подберёт для вас оптимальный вариант по времени, стоимости и комфорту
          </p>
        </div>

        {/* Destination chip */}
        <div className="bg-[#1A1E2A] border border-[#252B3B] rounded-xl px-3 py-2 flex items-center gap-2">
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

      {/* Map controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {[
          { icon: Plus, label: 'Zoom in' },
          { icon: Minus, label: 'Zoom out' },
          { icon: Crosshair, label: 'Center' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className="w-8 h-8 bg-[#1A1E2A] border border-[#252B3B] rounded-lg flex items-center justify-center text-[#8B92A5] hover:text-white hover:border-[#00D4B4] transition-colors"
          >
            <Icon size={14} />
          </button>
        ))}
      </div>

      {/* Location button */}
      <div className="absolute bottom-4 left-4">
        <button className="flex items-center gap-2 bg-[#1A1E2A] border border-[#252B3B] rounded-xl px-3 py-2 text-sm text-[#8B92A5] hover:text-white hover:border-[#00D4B4] transition-colors">
          <Navigation size={14} />
          Определить местоположение
        </button>
      </div>
    </div>
  )
}
