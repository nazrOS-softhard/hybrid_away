export type TransportType = 'taxi' | 'flight' | 'train' | 'hotel' | 'transfer'

export type RouteTag = 'recommended' | 'fastest' | 'cheapest' | 'comfortable'

export interface RouteStep {
  id: string
  type: TransportType
  title: string
  subtitle: string
  time: string
  date: string
}

export interface RouteVariant {
  id: string
  label: string
  tag: RouteTag
  duration: number // minutes
  price: number
  steps: TransportType[]
  stepsDetail: RouteStep[]
}

export interface GeneratedRoute {
  from: string
  to: string
  fromCoords: [number, number]
  toCoords: [number, number]
  waypointCoords: [number, number][]
  variants: RouteVariant[]
}

export interface TravelCard {
  id: string
  type: TransportType
  title: string
  subtitle: string
  status: string
  statusColor: 'green' | 'blue' | 'yellow'
  detail?: string
  hasCamera?: boolean
  imageUrl?: string
}

export interface GeoSuggestion {
  name: string
  displayName: string
  lat: number
  lon: number
}
