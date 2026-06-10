
import { Sidebar } from '@/components/layout/Sidebar'
import { MapPanel } from '@/components/map/MapPanel'
import { RoutePanel } from '@/components/route/RoutePanel'
import { RoutesBar } from '@/components/route/RoutesBar'
import { TravelCards } from '@/components/travel/TravelCards'

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0D0F14]">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-col flex-1 overflow-hidden">
        {/* Top: Map + Route Panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* Center: Map */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <MapPanel />
            <RoutesBar />
          </div>

          {/* Right: Route Timeline */}
          <RoutePanel />
        </div>

        {/* Bottom: Travel Cards */}
        <TravelCards />
      </main>
    </div>
  )
}
