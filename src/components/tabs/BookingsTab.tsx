'use client'

import { Calendar, Plane, Car, Building2, CheckCircle, Clock, XCircle } from 'lucide-react'

const mockBookings = [
  { id: '1', type: 'flight' as const, title: 'Аэрофлот SU 1333', reference: 'ABC123', status: 'confirmed' as const, date: '12 мая 2024, 11:20', details: 'ARH → SVO · Эконом · 1 место' },
  { id: '2', type: 'flight' as const, title: 'Аэрофлот SU 262', reference: 'ABC124', status: 'confirmed' as const, date: '12 мая 2024, 16:05', details: 'SVO → HND · Эконом · 1 место' },
  { id: '3', type: 'hotel' as const, title: 'Shinagawa Prince Hotel', reference: 'HTL789', status: 'confirmed' as const, date: '13 мая 2024', details: 'Стандартный номер · 1 ночь · Токио' },
  { id: '4', type: 'taxi' as const, title: 'Яндекс Такси', reference: 'TX001', status: 'pending' as const, date: '12 мая 2024, 08:30', details: 'Новодвинск → Аэропорт ARH · ~45 мин' },
]

const typeIcon = { flight: Plane, hotel: Building2, taxi: Car, train: Calendar, transfer: Calendar }
const statusConfig = {
  confirmed: { label: 'Подтверждено', color: 'text-[#00C48C]', icon: CheckCircle },
  pending:   { label: 'Ожидание', color: 'text-yellow-400', icon: Clock },
  cancelled: { label: 'Отменено', color: 'text-[#FF4B6E]', icon: XCircle },
}

export function BookingsTab() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="text-white font-semibold text-base mb-6">Бронирования</h2>
      <div className="space-y-3">
        {mockBookings.map(b => {
          const Icon = typeIcon[b.type] ?? Calendar
          const sc = statusConfig[b.status]
          return (
            <div key={b.id} className="bg-[#141720] border border-[#252B3B] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1A1E2A] flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#8B92A5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">{b.title}</span>
                    <span className={`flex items-center gap-1 text-[10px] font-medium ${sc.color}`}>
                      <sc.icon size={10} />
                      {sc.label}
                    </span>
                  </div>
                  <div className="text-[#4A5168] text-[10px] mb-1">{b.date}</div>
                  <div className="text-[#8B92A5] text-[10px]">{b.details}</div>
                  <div className="text-[#4A5168] text-[10px] mt-1 font-mono">№ {b.reference}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
