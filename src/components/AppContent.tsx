'use client'

import { useRouteStore } from '@/store/route-store'
import { MapPanel } from '@/components/map/MapPanel'
import { RoutePanel } from '@/components/route/RoutePanel'
import { RoutesBar } from '@/components/route/RoutesBar'
import { TravelCards } from '@/components/travel/TravelCards'
import { SearchBar } from '@/components/search/SearchBar'
import { RoutesTab } from '@/components/tabs/RoutesTab'
import { TripsTab } from '@/components/tabs/TripsTab'
import { BookingsTab } from '@/components/tabs/BookingsTab'
import { NotificationsTab } from '@/components/tabs/NotificationsTab'
import { CamerasTab } from '@/components/tabs/CamerasTab'
import { SettingsTab } from '@/components/tabs/SettingsTab'
import { SupportTab } from '@/components/tabs/SupportTab'

export function AppContent() {
  const { activeTab } = useRouteStore()

  // Вкладки с полным экраном
  if (activeTab === 'routes') return <div className="flex flex-1 overflow-hidden"><RoutesTab /></div>
  if (activeTab === 'trips') return <div className="flex flex-1 overflow-hidden"><TripsTab /></div>
  if (activeTab === 'bookings') return <div className="flex flex-1 overflow-hidden"><BookingsTab /></div>
  if (activeTab === 'notifications') return <div className="flex flex-1 overflow-hidden"><NotificationsTab /></div>
  if (activeTab === 'cameras') return <div className="flex flex-1 overflow-hidden"><CamerasTab /></div>
  if (activeTab === 'settings') return <div className="flex flex-1 overflow-hidden"><SettingsTab /></div>
  if (activeTab === 'support') return <div className="flex flex-1 overflow-hidden"><SupportTab /></div>

  // Главный экран
  return (
    <main className="flex flex-col flex-1 overflow-hidden">
      <SearchBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden">
          <MapPanel />
          <RoutesBar />
        </div>
        <RoutePanel />
      </div>
      <TravelCards />
    </main>
  )
}
