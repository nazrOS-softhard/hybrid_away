
'use client'

import { Map, Navigation, Briefcase, Calendar, Bell, Camera, HelpCircle, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Map, label: 'Главная', active: true },
  { icon: Navigation, label: 'Маршруты' },
  { icon: Briefcase, label: 'Мои поездки' },
  { icon: Calendar, label: 'Бронирования' },
  { icon: Bell, label: 'Уведомления' },
  { icon: Camera, label: 'Камеры' },
  { icon: HelpCircle, label: 'Поддержка' },
  { icon: Settings, label: 'Настройки' },
]

export function Sidebar() {
  return (
    <aside className="w-[200px] flex-shrink-0 flex flex-col bg-[#0D0F14] border-r border-[#252B3B]">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#252B3B]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00D4B4] flex items-center justify-center font-bold text-black text-sm">
            H
          </div>
          <div className="leading-tight">
            <div className="text-white font-semibold text-sm tracking-wide">HYBRID</div>
            <div className="text-[#8B92A5] text-xs">В ПУТИ</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              'w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors',
              item.active
                ? 'text-white bg-[#1A1E2A] border-r-2 border-[#00D4B4]'
                : 'text-[#8B92A5] hover:text-white hover:bg-[#141720]'
            )}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-[#252B3B]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-xs text-white font-medium truncate">Александра Смирнова</div>
            <div className="text-[10px] text-[#8B92A5]">Hybrid ID: 768 432</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#8B92A5]">Баланс</div>
            <div className="text-sm font-semibold text-[#00D4B4]">24 560 ₽</div>
          </div>
          <button className="text-[#8B92A5] hover:text-white transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
