'use client'

import { MessageCircle, Phone, Mail, FileText, ChevronRight } from 'lucide-react'

const faqs = [
  { q: 'Как изменить маршрут после оплаты?', a: 'Свяжитесь с поддержкой за 24 часа до вылета.' },
  { q: 'Возврат средств при отмене?', a: 'Возврат в течение 5-7 рабочих дней согласно тарифу.' },
  { q: 'Как добавить багаж?', a: 'В разделе Бронирования → рейс → Добавить багаж.' },
]

export function SupportTab() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="text-white font-semibold text-base mb-6">Поддержка</h2>

      {/* Contact options */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: MessageCircle, label: 'Чат', sub: 'Онлайн', color: 'text-[#00D4B4]' },
          { icon: Phone, label: 'Звонок', sub: '+7 800 000-00-00', color: 'text-[#4A9EFF]' },
          { icon: Mail, label: 'Email', sub: 'support@hybrid.ru', color: 'text-yellow-400' },
          { icon: FileText, label: 'База знаний', sub: 'FAQ и гайды', color: 'text-[#8B92A5]' },
        ].map(item => (
          <button key={item.label} className="bg-[#141720] border border-[#252B3B] rounded-xl p-4 text-left hover:border-[#00D4B4] transition-colors">
            <item.icon size={20} className={`${item.color} mb-2`} />
            <div className="text-white text-xs font-medium">{item.label}</div>
            <div className="text-[#4A5168] text-[10px] mt-0.5">{item.sub}</div>
          </button>
        ))}
      </div>

      {/* FAQ */}
      <div className="text-[#4A5168] text-[10px] uppercase tracking-widest mb-3">Частые вопросы</div>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-[#141720] border border-[#252B3B] rounded-xl p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-white text-xs font-medium mb-1">{faq.q}</div>
                <div className="text-[#8B92A5] text-[10px] leading-relaxed">{faq.a}</div>
              </div>
              <ChevronRight size={14} className="text-[#4A5168] flex-shrink-0 mt-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
