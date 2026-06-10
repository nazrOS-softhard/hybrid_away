'use client'

import { Navigation } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouteStore } from '@/store/route-store'

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

export function MapPanel() {
  const { route, isLoading, error } = useRouteStore()

  return (
    <div className="flex-1 relative overflow-hidden">
      <LeafletMap />

      {/* Пустое состояние */}
      {!route && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-4xl mb-3">✈️</div>
            <div className="text-[#8B92A5] text-sm">Введите откуда и куда</div>
            <div className="text-[#4A5168] text-xs mt-1">ИИ построит маршрут за секунды</div>
          </div>
        </div>
      )}

      {/* Лоадер */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0D0F14]/60 backdrop-blur-sm z-[500]">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-[#00D4B4] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <div className="text-[#00D4B4] text-sm font-medium">ИИ строит маршрут...</div>
            <div className="text-[#8B92A5] text-xs mt-1">Анализирую рейсы, цены, время</div>
          </div>
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div className="absolute bottom-16 left-4 right-4 bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 z-[500]">
          <div className="text-red-400 text-sm">{error}</div>
        </div>
      )}

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
