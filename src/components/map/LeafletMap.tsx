'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const POINTS = {
  novodvinsk:   [64.41, 40.82] as [number, number],
  arkhangelsk:  [64.60, 40.72] as [number, number],
  moscow:       [55.75, 37.62] as [number, number],
  tokyo:        [35.55, 139.78] as [number, number],
}

function dotIcon(color = '#00D4B4', size = 12) {
  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 10px ${color}88"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    className: '',
  })
}

function labelIcon(text: string) {
  return L.divIcon({
    html: `<div style="background:#1A1E2A;border:1px solid #00D4B488;border-radius:6px;padding:3px 7px;font-size:11px;color:#00D4B4;white-space:nowrap;font-family:Inter,sans-serif">${text}</div>`,
    iconAnchor: [30, -6],
    className: '',
  })
}

export default function LeafletMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [55, 70],
      zoom: 3,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map)

    // Маршрутная линия через все точки
    L.polyline(
      [POINTS.novodvinsk, POINTS.arkhangelsk, POINTS.moscow, POINTS.tokyo],
      { color: '#00D4B4', weight: 2, dashArray: '7 5', opacity: 0.85 }
    ).addTo(map)

    // Маркеры
    L.marker(POINTS.novodvinsk, { icon: dotIcon('#00D4B4', 10) }).addTo(map)
    L.marker(POINTS.arkhangelsk, { icon: dotIcon('#ffffff', 8) }).addTo(map)
    L.marker(POINTS.moscow, { icon: dotIcon('#ffffff', 8) }).addTo(map)
    L.marker(POINTS.tokyo, { icon: dotIcon('#FF4B6E', 12) }).addTo(map)

    // Подписи
    L.marker(POINTS.arkhangelsk, { icon: labelIcon('✈ ARH'), zIndexOffset: 100 }).addTo(map)
    L.marker(POINTS.moscow, { icon: labelIcon('✈ SVO'), zIndexOffset: 100 }).addTo(map)
    L.marker(POINTS.tokyo, { icon: labelIcon('✈ HND · Токио'), zIndexOffset: 100 }).addTo(map)

    mapRef.current = map
    return () => { map.remove(); mapRef.current = null }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full" style={{ background: '#0D0F14' }} />
  )
}
