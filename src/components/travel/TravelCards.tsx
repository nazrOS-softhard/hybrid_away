'use client'

import { Car, Plane, Building2, Wifi, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouteStore } from '@/store/route-store'
import type { TransportType } from '@/lib/types'
import Image from 'next/image'

const iconMap: Record<TransportType, React.ElementType> = {
  taxi: Car, flight: Plane, train: Car, hotel: Building2, transfer: MapPin,
}

const statusColorMap: Record<'green' | 'blue' | 'yellow', string> = { green: 'text-[#00C48C]', blue: 'text-[#4A9EFF]', yellow: 'text-yellow-400' }

const bgGradient: Record<TransportType, string> = {
  taxi:     'from-[#0f2027] to-[#141720]',
  flight:   'from-[#0a1628] to-[#141720]',
  train:    'from-[#0f1a10] to-[#141720]',
  hotel:    'from-[#1a0f20] to-[#141720]',
  transfer: 'from-[#141720] to-[#141720]',
}

function TaxiIllustration() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-full" fill="none">
      <rect x="15" y="25" width="90" height="28" rx="8" fill="#1e293b"/>
      <rect x="25" y="14" width="55" height="22" rx="6" fill="#334155"/>
      <rect x="28" y="16" width="22" height="16" rx="3" fill="#0ea5e9" opacity="0.7"/>
      <rect x="53" y="16" width="22" height="16" rx="3" fill="#0ea5e9" opacity="0.7"/>
      <circle cx="35" cy="53" r="8" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
      <circle cx="35" cy="53" r="4" fill="#475569"/>
      <circle cx="85" cy="53" r="8" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
      <circle cx="85" cy="53" r="4" fill="#475569"/>
      <rect x="100" y="30" width="8" height="6" rx="2" fill="#fbbf24" opacity="0.9"/>
      <rect x="12" y="30" width="8" height="6" rx="2" fill="#f87171" opacity="0.9"/>
    </svg>
  )
}

function FlightIllustration() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-full" fill="none">
      <path d="M10 45 Q40 35 80 28" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3"/>
      <ellipse cx="88" cy="26" rx="22" ry="7" fill="#1e293b"/>
      <path d="M66 26 L58 18 L66 22Z" fill="#0f172a"/>
      <path d="M75 26 L55 38 L70 28Z" fill="#334155"/>
      <path d="M82 26 L80 14 L85 24Z" fill="#334155"/>
      <circle cx="80" cy="23" r="2" fill="#0ea5e9" opacity="0.8"/>
      <circle cx="87" cy="22" r="2" fill="#0ea5e9" opacity="0.8"/>
      <circle cx="94" cy="23" r="2" fill="#0ea5e9" opacity="0.8"/>
      <ellipse cx="72" cy="30" rx="5" ry="3" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
      <circle cx="20" cy="15" r="1" fill="#ffffff" opacity="0.4"/>
      <circle cx="40" cy="8"  r="1" fill="#ffffff" opacity="0.3"/>
    </svg>
  )
}

export function TravelCards() {
  const { route, selectedVariantId } = useRouteStore()
  const variant = route?.variants.find(v => v.id === selectedVariantId)
  const steps = variant?.stepsDetail ?? []

  // Строим карточки из шагов маршрута
  const cards = steps
    .filter(s => ['taxi', 'flight', 'train', 'hotel'].includes(s.type))
    .map(step => ({
      id: step.id,
      type: step.type as TransportType,
      title: step.title,
      subtitle: step.subtitle,
      status: step.time,
      statusColor: step.type === 'hotel' ? 'green' : 'blue' as const,
      detail: step.date,
    }))

  if (cards.length === 0) return null

  return (
    <div className="bg-[#0D0F14] border-t border-[#252B3B] px-4 py-3">
      <h3 className="text-white text-sm font-semibold mb-3">Ваше путешествие</h3>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {cards.map((card) => {
          const Icon = iconMap[card.type]
          return (
            <div
              key={card.id}
              className={cn(
                'flex-shrink-0 w-[200px] bg-gradient-to-br border border-[#252B3B] rounded-xl p-3 relative overflow-hidden',
                bgGradient[card.type]
              )}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <Icon size={13} className="text-[#8B92A5]" />
                <span className="text-white text-xs font-semibold">{card.title}</span>
              </div>
              <div className="text-[#8B92A5] text-[10px] mb-1.5">{card.subtitle}</div>
              <div className={cn('text-[11px] font-medium', statusColorMap[card.statusColor])}>
                {card.status}
              </div>
              {card.detail && <div className="text-[#4A5168] text-[10px] mt-0.5">{card.detail}</div>}
              <div className="mt-2 rounded-lg overflow-hidden bg-[#0D0F14]/60 h-14 flex items-center justify-center">
                {card.type === 'taxi' ? <TaxiIllustration /> : <FlightIllustration />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
