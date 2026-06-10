
'use client'

import { create } from 'zustand'
import type { GeneratedRoute, GeoSuggestion } from '@/lib/types'

interface RouteStore {
  // Поиск
  fromQuery: string
  toQuery: string
  fromPlace: GeoSuggestion | null
  toPlace: GeoSuggestion | null
  setFromQuery: (v: string) => void
  setToQuery: (v: string) => void
  setFromPlace: (p: GeoSuggestion) => void
  setToPlace: (p: GeoSuggestion) => void

  // Маршрут
  route: GeneratedRoute | null
  selectedVariantId: string
  isLoading: boolean
  error: string | null
  setRoute: (r: GeneratedRoute) => void
  setSelectedVariant: (id: string) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void
  reset: () => void
}

export const useRouteStore = create<RouteStore>((set) => ({
  fromQuery: '',
  toQuery: '',
  fromPlace: null,
  toPlace: null,
  setFromQuery: (v) => set({ fromQuery: v }),
  setToQuery: (v) => set({ toQuery: v }),
  setFromPlace: (p) => set({ fromPlace: p, fromQuery: p.name }),
  setToPlace: (p) => set({ toPlace: p, toQuery: p.name }),

  route: null,
  selectedVariantId: 'recommended',
  isLoading: false,
  error: null,
  setRoute: (r) => set({ route: r, selectedVariantId: r.variants[0]?.id ?? 'recommended' }),
  setSelectedVariant: (id) => set({ selectedVariantId: id }),
  setLoading: (v) => set({ isLoading: v }),
  setError: (e) => set({ error: e }),
  reset: () => set({ route: null, error: null, fromPlace: null, toPlace: null, fromQuery: '', toQuery: '' }),
}))
