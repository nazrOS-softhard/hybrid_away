
'use client'

import { ArrowRight, Sparkles, Loader2 } from 'lucide-react'
import { PlaceInput } from './PlaceInput'
import { useRouteStore } from '@/store/route-store'
import { generateRoute } from '@/lib/route-ai'
import { saveRoute } from '@/lib/supabase'

export function SearchBar() {
  const {
    fromQuery, toQuery,
    fromPlace, toPlace,
    setFromQuery, setToQuery,
    setFromPlace, setToPlace,
    setRoute, setLoading, setError,
    isLoading,
  } = useRouteStore()

  const canSearch = fromPlace && toPlace && !isLoading

  async function handleSearch() {
    if (!canSearch) return
    setLoading(true)
    setError(null)
    try {
      const route = await generateRoute(
        fromPlace.name,
        toPlace.name,
        [fromPlace.lat, fromPlace.lon],
        [toPlace.lat, toPlace.lon],
      )
      setRoute(route)
useRouteStore.getState().addToHistory(route)

      // Сохраняем в Supabase асинхронно
      saveRoute({
        from_name: fromPlace.name,
        to_name: toPlace.name,
        from_coords: [fromPlace.lat, fromPlace.lon],
        to_coords: [toPlace.lat, toPlace.lon],
        route_data: route,
      }).catch(console.error)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-[#0D0F14]/80 backdrop-blur border-b border-[#252B3B]" style={{ position: 'relative', zIndex: 10000 }}>
      <PlaceInput
        placeholder="Откуда"
        value={fromQuery}
        onChange={setFromQuery}
        onSelect={setFromPlace}
      />

      <div className="flex-shrink-0 text-[#4A5168]">
        <ArrowRight size={16} />
      </div>

      <PlaceInput
        placeholder="Куда"
        value={toQuery}
        onChange={setToQuery}
        onSelect={setToPlace}
      />

      <button
        onClick={handleSearch}
        disabled={!canSearch}
        className="flex-shrink-0 flex items-center gap-2 bg-[#00D4B4] disabled:bg-[#1A1E2A] disabled:text-[#4A5168] text-black font-semibold text-sm px-4 py-2 rounded-xl transition-colors hover:bg-[#00bfa3] disabled:cursor-not-allowed"
      >
        {isLoading
          ? <Loader2 size={14} className="animate-spin" />
          : <Sparkles size={14} />
        }
        {isLoading ? 'Строю...' : 'Найти'}
      </button>
    </div>
  )
}
