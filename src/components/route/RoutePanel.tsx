'use client'

import { Car, Plane, Building2, ArrowRight, ChevronDown, Train } from 'lucide-react'
import { useRouteStore } from '@/store/route-store'
import { formatPrice } from '@/lib/utils'
import type { TransportType } from '@/lib/types'

const iconMap: Record<TransportType, React.ElementType> = {
  taxi: Car, flight: Plane, train: Train,
  hotel: Building2, transfer: ArrowRight,
}

export function RoutePanel() {
  const { route, selectedVariantId } = useRouteStore()

  const variant = route?.variants.find(v => v.id === selectedVariantId)
  const steps = variant?.stepsDetail ?? []
  const price = variant?.price ?? 0

  return (
    <aside className="w-[280px] flex-shrink-0 flex flex-col bg-[#0D0F14] border-l border-[#252B3B]">
      <div className="px-4 py-4 border-b border-[#252B3B]">
        <h2 className="text-white font-semibold text-sm">Маршрут</h2>
        {route && (
          <div className="text-[#8B92A5] text-[10px] mt-0.5">
            {route.from} → {route.to}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {steps.length === 0 && (
          <div className="px-4 py-6 text-center text-[#4A5168] text-xs">
            {route ? 'Выберите вариант для деталей' : 'Маршрут появится после поиска'}
          </div>
        )}

        {steps.map((step, i) => {
          const Icon = iconMap[step.type] ?? Car
          const isLast = i === steps.length - 1
          return (
            <div key={step.id} className="flex gap-3 px-4 py-2">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-[#00D4B4] mt-1 flex-shrink-0" />
                {!isLast && <div className="w-px flex-1 bg-[#252B3B] mt-1" style={{ minHeight: 24 }} />}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon size={12} className="text-[#8B92A5] mt-0.5" />
                    <span className="text-white text-xs font-medium leading-snug">{step.title}</span>
                  </div>
                  <div className="text-right ml-2 flex-shrink-0">
                    <div className="text-white text-xs font-mono font-semibold">{step.time}</div>
                    <div className="text-[#4A5168] text-[10px]">{step.date}</div>
                  </div>
                </div>
                <div className="text-[#8B92A5] text-[10px] mt-0.5 ml-[18px]">{step.subtitle}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 border-t border-[#252B3B]">
        <button
          disabled={!route}
          className="w-full bg-[#00D4B4] disabled:bg-[#1A1E2A] disabled:text-[#4A5168] text-black font-semibold text-sm py-3 rounded-xl hover:bg-[#00bfa3] disabled:cursor-not-allowed transition-colors"
        >
          Подтвердить маршрут
        </button>
        {price > 0 && (
          <div className="flex items-center justify-between mt-3">
            <span className="text-[#8B92A5] text-xs">Итого:</span>
            <div className="flex items-center gap-1">
              <span className="text-white font-semibold text-sm">{formatPrice(price)}</span>
              <ChevronDown size={14} className="text-[#8B92A5]" />
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
