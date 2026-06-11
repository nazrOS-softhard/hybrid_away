export type TransportType = 'taxi' | 'flight' | 'train' | 'hotel' | 'transfer'
export type RouteTag = 'recommended' | 'fastest' | 'cheapest' | 'comfortable'
export type TripStatus = 'active' | 'completed' | 'upcoming'

export interface RouteStep {
  id: string
  type: TransportType
  title: string
  subtitle: string
  time: string
  date: string
  flightNumber?: string
  duration?: string
}

export interface RouteVariant {
  id: string
  label: string
  tag: RouteTag
  duration: number
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
  departureDate: string
  arrivalDate: string
}

export interface Trip {
  id: string
  from: string
  to: string
  status: TripStatus
  departureDate: string
  arrivalDate: string
  price: number
  route_data: GeneratedRoute
  created_at: string
}

export interface Booking {
  id: string
  trip_id: string
  type: TransportType
  title: string
  reference: string
  status: 'confirmed' | 'pending' | 'cancelled'
  date: string
  details: string
}

export interface Notification {
  id: string
  type: 'flight' | 'hotel' | 'taxi' | 'system'
  title: string
  message: string
  time: string
  read: boolean
}

export interface GeoSuggestion {
  name: string
  displayName: string
  lat: number
  lon: number
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
