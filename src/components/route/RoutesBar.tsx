
'use client'

import { useState } from 'react'
import { Car, Plane, ArrowRight, Building2, Star, Zap, TrendingDown, HelpCircle } from 'lucide-react'
import { cn, formatPrice, formatDuration } from '@/lib/utils'
import { mockRouteVariants } from '@/lib/mock-data'

const tagConfig = {
  recommended: { icon: Star, color: 'text-yellow-400', label: 'Рекомендуемый', sub: 'Оптимальный баланс' },
  fastest: { icon: Zap, color: 'text-red-400', label: 'Самый быстрый', sub: 'Минимум времени' },
  cheapest: { icon: TrendingDown, color: 'text-green-400', label: 'Самый дешёвый', sub: 'Экономия бюджета' },
  comfortable: { icon: Star, color: 'text-blue-400', label: 'Комфортный', sub: 'Максимум удобства' },
}

const stepIcons = {
  taxi: Car,
  flight: Plane,
  train: Car,
  hotel: Building2,
  transfer: ArrowRight,
}

export function RoutesBar() {
  const [selected, setSelected] = useState('recommended')

  return (
    <div className="bg-[#0D0F14] border-t border-[#252B3B] px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-sm font-semibold">Выберите оптимальный вариант</h3>
        <button className="flex items-center gap-1 text-[#8B92A5] text-xs hover:text-white transition-colors">
          Как это работает? <HelpCircle size={12} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {mockRouteVariants.map((variant) => {
          const config = tagConfig[variant.tag]
          const Icon = config.icon
          const isSelected = selected === variant.id

          return (
            <button
              key={variant.id}
              onClick={() => setSelected(variant.id)}
              className={cn(
                'text-left p-3 rounded-xl border transition-all',
                isSelected
                  ? 'bg-[#1A1E2A] border-[#00D4B4]'
                  : 'bg-[#141720] border-[#252B3B] hover:border-[#2E3548]'
              )}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={12} className={config.color} />
                <span className="text-white text-xs font-medium">{config.label}</span>
              </div>
              <div className="text-[#8B92A5] text-[10px] mb-2">{config.sub}</div>
              <div className="text-[#8B92A5] text-[10px] mb-2">{formatDuration(variant.duration)} в пути</div>

              {/* Steps */}
              <div className="flex items-center gap-1 mb-2 flex-wrap">
                {variant.steps.map((step, i) => {
                  const StepIcon = stepIcons[step] || Car
                  return (
                    <span key={i} className="flex items-center gap-0.5">
                      <StepIcon size={10} className="text-[#8B92A5]" />
                      {i < variant.steps.length - 1 && (
                        <ArrowRight size={8} className="text-[#4A5168]" />
                      )}
                    </span>
                  )
                })}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-semibold">{formatPrice(variant.price)}</span>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    isSelected
                      ? 'bg-[#00D4B4] text-black font-medium'
                      : 'bg-[#1A1E2A] text-[#8B92A5] border border-[#252B3B]'
                  )}
                >
                  {isSelected ? '✓' : 'Выбрать'}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
