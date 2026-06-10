
import { Car, Plane, Building2, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockTravelCards } from '@/lib/mock-data'
import type { TransportType } from '@/lib/types'
import Image from 'next/image'

const iconMap: Record<TransportType, React.ElementType> = {
  taxi: Car,
  flight: Plane,
  train: Car,
  hotel: Building2,
  transfer: Car,
}

const statusColorMap = {
  green: 'text-[#00C48C]',
  blue: 'text-[#4A9EFF]',
  yellow: 'text-yellow-400',
}

export function TravelCards() {
  return (
    <div className="bg-[#0D0F14] border-t border-[#252B3B] px-4 py-3">
      <h3 className="text-white text-sm font-semibold mb-3">Ваше путешествие</h3>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {mockTravelCards.map((card) => {
          const Icon = iconMap[card.type]

          return (
            <div
              key={card.id}
              className="flex-shrink-0 w-[220px] bg-[#141720] border border-[#252B3B] rounded-xl p-3 relative overflow-hidden"
            >
              {card.hasCamera && card.imageUrl ? (
                // Hotel with camera
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} className="text-[#8B92A5]" />
                    <span className="text-white text-xs font-medium">{card.title}</span>
                  </div>
                  <div className="text-[#8B92A5] text-[10px] mb-1">{card.subtitle}</div>
                  <div className={cn('text-[10px] font-medium mb-1', statusColorMap[card.statusColor])}>
                    {card.status}
                  </div>
                  {card.detail && (
                    <div className={cn('text-[10px] font-medium mb-2', statusColorMap[card.statusColor])}>
                      {card.detail}
                    </div>
                  )}
                  <div className="relative rounded-lg overflow-hidden h-20">
                    <div className="absolute top-1.5 left-1.5 z-10 flex items-center gap-1 bg-red-500 rounded px-1.5 py-0.5">
                      <Wifi size={8} className="text-white" />
                      <span className="text-white text-[8px] font-bold">LIVE</span>
                    </div>
                    <Image
                      src={card.imageUrl}
                      alt="Hotel view"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : (
                // Regular card
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} className="text-[#8B92A5]" />
                    <span className="text-white text-xs font-medium">{card.title}</span>
                  </div>
                  <div className="text-[#8B92A5] text-[10px] mb-2">{card.subtitle}</div>
                  <div className={cn('text-xs font-medium mb-1', statusColorMap[card.statusColor])}>
                    {card.status}
                  </div>
                  {card.detail && (
                    <div className="text-[#8B92A5] text-[10px]">{card.detail}</div>
                  )}
                  {card.type === 'taxi' && (
                    <div className="mt-2 bg-[#0D0F14] rounded-lg h-14 flex items-center justify-center overflow-hidden">
                      <div className="text-4xl">🚗</div>
                    </div>
                  )}
                  {card.type === 'flight' && (
                    <div className="mt-2 bg-[#0D0F14] rounded-lg h-14 flex items-center justify-center">
                      <div className="text-4xl">✈️</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
