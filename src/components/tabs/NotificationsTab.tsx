'use client'

import { Plane, Building2, Car, Bell } from 'lucide-react'
import { useRouteStore } from '@/store/route-store'
import { cn } from '@/lib/utils'

const typeIcon = { flight: Plane, hotel: Building2, taxi: Car, system: Bell }
const typeColor = { flight: 'text-[#4A9EFF]', hotel: 'text-[#00C48C]', taxi: 'text-yellow-400', system: 'text-[#00D4B4]' }

export function NotificationsTab() {
  const { notifications, markRead } = useRouteStore()
  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-base">Уведомления</h2>
        {unread > 0 && (
          <span className="text-[10px] text-[#8B92A5]">{unread} непрочитанных</span>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map(n => {
          const Icon = typeIcon[n.type] ?? Bell
          const color = typeColor[n.type] ?? 'text-[#8B92A5]'
          return (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={cn(
                'w-full text-left rounded-xl p-4 transition-colors border',
                n.read
                  ? 'bg-[#0D0F14] border-[#1A1E2A]'
                  : 'bg-[#141720] border-[#252B3B]'
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', n.read ? 'bg-[#141720]' : 'bg-[#1A1E2A]')}>
                  <Icon size={14} className={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={cn('text-xs font-medium', n.read ? 'text-[#8B92A5]' : 'text-white')}>{n.title}</span>
                    <span className="text-[10px] text-[#4A5168] flex-shrink-0 ml-2">{n.time}</span>
                  </div>
                  <div className="text-[#8B92A5] text-[11px] leading-relaxed">{n.message}</div>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full bg-[#00D4B4] flex-shrink-0 mt-1" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
