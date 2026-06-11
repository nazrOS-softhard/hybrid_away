'use client'

import { User, Bell, Globe, Shield, CreditCard, ChevronRight } from 'lucide-react'

const sections = [
  {
    title: 'Профиль',
    items: [
      { icon: User, label: 'Личные данные', sub: 'Александра Смирнова' },
      { icon: CreditCard, label: 'Баланс и платежи', sub: '24 560 ₽' },
    ],
  },
  {
    title: 'Приложение',
    items: [
      { icon: Bell, label: 'Уведомления', sub: 'Все включены' },
      { icon: Globe, label: 'Язык', sub: 'Русский' },
      { icon: Shield, label: 'Безопасность', sub: 'PIN-код включён' },
    ],
  },
]

export function SettingsTab() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Profile card */}
      <div className="bg-[#141720] border border-[#252B3B] rounded-xl p-4 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0" />
        <div>
          <div className="text-white font-semibold text-sm">Александра Смирнова</div>
          <div className="text-[#8B92A5] text-xs">Hybrid ID: 768 432</div>
          <div className="text-[#00D4B4] text-xs mt-0.5">Сотрудник · Архангельск</div>
        </div>
      </div>

      {sections.map(section => (
        <div key={section.title} className="mb-6">
          <div className="text-[#4A5168] text-[10px] uppercase tracking-widest mb-2 px-1">{section.title}</div>
          <div className="bg-[#141720] border border-[#252B3B] rounded-xl overflow-hidden">
            {section.items.map((item, i) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1A1E2A] transition-colors text-left ${i > 0 ? 'border-t border-[#1A1E2A]' : ''}`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#1A1E2A] flex items-center justify-center flex-shrink-0">
                  <item.icon size={14} className="text-[#8B92A5]" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-xs font-medium">{item.label}</div>
                  <div className="text-[#4A5168] text-[10px]">{item.sub}</div>
                </div>
                <ChevronRight size={14} className="text-[#4A5168]" />
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-4">
        <div className="text-[#4A5168] text-[10px]">Hybrid В Пути · v1.0.0</div>
        <div className="text-[#252B3B] text-[10px] mt-0.5">© 2024 Конгломерат Гибрид</div>
      </div>
    </div>
  )
}
