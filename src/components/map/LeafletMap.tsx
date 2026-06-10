
'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'

// Фиксим иконки Leaflet (known issue с webpack)
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function LeafletMap() {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    // Архангельск координаты
    const map = L.map(containerRef.current, {
      center: [64.5401, 40.5433],
      zoom: 7,
      zoomControl: false,
      attributionControl: false,
    })

    // Тёмная тема тайлов — CartoDB Dark Matter (бесплатно, без ключа)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map)

    // Точка старта — Новодвинск
    const startIcon = L.divIcon({
      html: `<div style="width:12px;height:12px;border-radius:50%;background:#00D4B4;border:2px solid #fff;box-shadow:0 0 8px #00D4B4"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
      className: '',
    })

    // Аэропорт Архангельск
    const airportIcon = L.divIcon({
      html: `<div style="background:#1A1E2A;border:1px solid #252B3B;border-radius:6px;padding:4px 6px;font-size:11px;color:#8B92A5;white-space:nowrap">✈ ARH</div>`,
      iconSize: [60, 26],
      iconAnchor: [30, 13],
      className: '',
    })

    L.marker([64.3, 40.73]).addTo(map)          // Новодвинск
    L.marker([64.6, 40.72], { icon: airportIcon }).addTo(map)  // Аэропорт

    // Пунктирная линия маршрута
    const routeLine = L.polyline(
      [[64.3, 40.73], [64.6, 40.72], [55.97, 37.41]],
      {
        color: '#00D4B4',
        weight: 2,
        dashArray: '6 5',
        opacity: 0.8,
      }
    ).addTo(map)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#0D0F14' }}
    />
  )
}
