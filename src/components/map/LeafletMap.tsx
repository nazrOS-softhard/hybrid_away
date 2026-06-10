'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useRouteStore } from '@/store/route-store'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function dotIcon(color = '#00D4B4', size = 12) {
  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 10px ${color}88"></div>`,
    iconSize: [size, size], iconAnchor: [size / 2, size / 2], className: '',
  })
}

function labelIcon(text: string) {
  return L.divIcon({
    html: `<div style="background:#1A1E2A;border:1px solid #00D4B488;border-radius:6px;padding:3px 7px;font-size:11px;color:#00D4B4;white-space:nowrap;font-family:Inter,sans-serif">${text}</div>`,
    iconAnchor: [30, -6], className: '',
  })
}

export default function LeafletMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const layersRef = useRef<L.Layer[]>([])
  const { route } = useRouteStore()

  // Инициализация карты
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    const map = L.map(containerRef.current, {
      center: [55, 40], zoom: 4,
      zoomControl: false, attributionControl: false,
    })
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map)
    mapRef.current = map
    return () => { map.remove(); mapRef.current = null }
  }, [])

  // Обновление маршрута на карте
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Чистим старые слои
    layersRef.current.forEach(l => map.removeLayer(l))
    layersRef.current = []

    if (!route) return

    const allPoints: [number, number][] = [
      route.fromCoords,
      ...route.waypointCoords,
      route.toCoords,
    ]

    // Линия маршрута
    const line = L.polyline(allPoints, {
      color: '#00D4B4', weight: 2, dashArray: '7 5', opacity: 0.9,
    }).addTo(map)
    layersRef.current.push(line)

    // Маркеры
    const fromDot = L.marker(route.fromCoords, { icon: dotIcon('#00D4B4', 12) }).addTo(map)
    const fromLabel = L.marker(route.fromCoords, { icon: labelIcon(route.from), zIndexOffset: 100 }).addTo(map)
    const toDot = L.marker(route.toCoords, { icon: dotIcon('#FF4B6E', 12) }).addTo(map)
    const toLabel = L.marker(route.toCoords, { icon: labelIcon(route.to), zIndexOffset: 100 }).addTo(map)
    layersRef.current.push(fromDot, fromLabel, toDot, toLabel)

    // Промежуточные точки
    route.waypointCoords.forEach(([lat, lon]) => {
      const dot = L.marker([lat, lon], { icon: dotIcon('#ffffff', 7) }).addTo(map)
      layersRef.current.push(dot)
    })

    // Подогнать карту под маршрут
    map.fitBounds(line.getBounds(), { padding: [40, 40] })
  }, [route])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full" style={{ background: '#0D0F14' }} />
  )
}
