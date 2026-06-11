'use client'

import { Camera, Wifi, Building2, Plane, Train } from 'lucide-react'

const cameras = [
  { id: '1', location: 'Отель · Shinagawa Prince', type: 'hotel', label: 'Лобби', live: true, preview: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=60' },
  { id: '2', location: 'Отель · Shinagawa Prince', type: 'hotel', label: 'Вид из номера', live: true, preview: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=60' },
  { id: '3', location: 'Аэропорт Архангельск (ARH)', type: 'airport', label: 'Терминал А', live: false, preview: null },
  { id: '4', location: 'Аэропорт Токио (HND)', type: 'airport', label: 'Выход 28', live: false, preview: null },
  { id: '5', location: 'Аэропорт Москва (SVO)', type: 'airport', label: 'Перрон D', live: false, preview: null },
]

const typeIcon = { hotel: Building2, airport: Plane, station: Train }

export function CamerasTab() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="text-white font-semibold text-base mb-2">Камеры</h2>
      <p className="text-[#4A5168] text-xs mb-6">Live-трансляции с объектов вашего маршрута</p>

      <div className="grid grid-cols-2 gap-3">
        {cameras.map(cam => {
          const Icon = typeIcon[cam.type as keyof typeof typeIcon] ?? Camera
          return (
            <div key={cam.id} className="bg-[#141720] border border-[#252B3B] rounded-xl overflow-hidden">
              {/* Preview */}
              <div className="relative h-32 bg-[#0D0F14] flex items-center justify-center">
                {cam.preview ? (
                  <img src={cam.preview} alt={cam.label} className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Camera size={24} className="text-[#252B3B]" />
                    <span className="text-[#252B3B] text-[10px]">Нет сигнала</span>
                  </div>
                )}
                {cam.live && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 rounded px-1.5 py-0.5">
                    <Wifi size={8} className="text-white" />
                    <span className="text-white text-[8px] font-bold">LIVE</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Icon size={11} className="text-[#8B92A5]" />
                  <span className="text-white text-xs font-medium">{cam.label}</span>
                </div>
                <div className="text-[#4A5168] text-[10px]">{cam.location}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
