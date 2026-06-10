import { Sidebar } from '@/components/layout/Sidebar'
import { MapPanel } from '@/components/map/MapPanel'
import { RoutePanel } from '@/components/route/RoutePanel'
import { RoutesBar } from '@/components/route/RoutesBar'
import { TravelCards } from '@/components/travel/TravelCards'
import { SearchBar } from '@/components/search/SearchBar'

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0D0F14]">
      <Sidebar />
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
    </div>
  )
}
