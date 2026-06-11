import { Sidebar } from '@/components/layout/Sidebar'
import { AppContent } from '@/components/AppContent'

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0D0F14]">
      <Sidebar />
      <AppContent />
    </div>
  )
}
