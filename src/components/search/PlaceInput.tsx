
'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Loader2, X } from 'lucide-react'
import { searchPlaces } from '@/lib/geocoding'
import type { GeoSuggestion } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  placeholder: string
  value: string
  onChange: (v: string) => void
  onSelect: (p: GeoSuggestion) => void
  icon?: React.ReactNode
}

export function PlaceInput({ placeholder, value, onChange, onSelect, icon }: Props) {
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const timer = useRef<NodeJS.Timeout>()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    clearTimeout(timer.current)
    if (value.length < 2) { setSuggestions([]); return }
    timer.current = setTimeout(async () => {
      setLoading(true)
      const res = await searchPlaces(value)
      setSuggestions(res)
      setOpen(true)
      setLoading(false)
    }, 350)
  }, [value])

  // Закрыть при клике вне
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative flex-1">
      <div className="flex items-center gap-2 bg-[#1A1E2A] border border-[#252B3B] rounded-xl px-3 py-2 focus-within:border-[#00D4B4] transition-colors">
        {icon ?? <MapPin size={14} className="text-[#8B92A5] flex-shrink-0" />}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white text-sm placeholder:text-[#4A5168] outline-none min-w-0"
        />
        {loading && <Loader2 size={13} className="text-[#8B92A5] animate-spin flex-shrink-0" />}
        {value && !loading && (
          <button onClick={() => { onChange(''); setSuggestions([]) }}>
            <X size={13} className="text-[#4A5168] hover:text-white" />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
       <div className="fixed mt-1 bg-[#1A1E2A] border border-[#252B3B] rounded-xl overflow-hidden shadow-xl" style={{ zIndex: 99999, width: ref.current?.offsetWidth, top: (ref.current?.getBoundingClientRect().bottom ?? 0) + 4, left: ref.current?.getBoundingClientRect().left ?? 0 }}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => { onSelect(s); setOpen(false) }}
              className="w-full flex items-start gap-2 px-3 py-2 hover:bg-[#252B3B] transition-colors text-left"
            >
              <MapPin size={12} className="text-[#00D4B4] mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white text-xs font-medium">{s.name}</div>
                <div className="text-[#4A5168] text-[10px] line-clamp-1">{s.displayName}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
