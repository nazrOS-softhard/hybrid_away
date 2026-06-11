'use client'

import { create } from 'zustand'
import type { GeneratedRoute, GeoSuggestion, Trip, Notification } from '@/lib/types'

type Tab = 'home' | 'routes' | 'trips' | 'bookings' | 'notifications' | 'cameras' | 'support' | 'settings'

interface RouteStore {
  // Navigation
  activeTab: Tab
  setActiveTab: (t: Tab) => void

  // Search
  fromQuery: string
  toQuery: string
  fromPlace: GeoSuggestion | null
  toPlace: GeoSuggestion | null
  setFromQuery: (v: string) => void
  setToQuery: (v: string) => void
  setFromPlace: (p: GeoSuggestion) => void
  setToPlace: (p: GeoSuggestion) => void

  // Route
  route: GeneratedRoute | null
  selectedVariantId: string
  isLoading: boolean
  error: string | null
  setRoute: (r: GeneratedRoute) => void
  setSelectedVariant: (id: string) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void

  // History
  routeHistory: GeneratedRoute[]
  addToHistory: (r: GeneratedRoute) => void

  // Trips
  trips: Trip[]
  setTrips: (t: Trip[]) => void

  // Notifications
  notifications: Notification[]
  markRead: (id: string) => void
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'flight', title: 'Рейс SU 1333', message: 'Вылет через 2 часа. Гейт B12.', time: '10:30', read: false },
  { id: '2', type: 'hotel', title: 'Shinagawa Prince Hotel', message: 'Номер готов к заселению.', time: '08:00', read: false },
  { id: '3', type: 'taxi', title: 'Такси подъезжает', message: 'Водитель в 3 минутах. Toyota Camry А123ВС.', time: 'вчера', read: true },
  { id: '4', type: 'system', title: 'Маршрут подтверждён', message: 'Все бронирования успешно оформлены.', time: 'вчера', read: true },
]

export const useRouteStore = create<RouteStore>((set) => ({
  activeTab: 'home',
  setActiveTab: (t) => set({ activeTab: t }),

  fromQuery: '', toQuery: '',
  fromPlace: null, toPlace: null,
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

  routeHistory: [],
  addToHistory: (r) => set((s) => ({ routeHistory: [r, ...s.routeHistory].slice(0, 20) })),

  trips: [],
  setTrips: (t) => set({ trips: t }),

  notifications: mockNotifications,
  markRead: (id) => set((s) => ({
    notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
}))
