
export type TransportType = 'taxi' | 'flight' | 'train' | 'hotel' | 'transfer'

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
  tag: 'recommended' | 'fastest' | 'cheapest' | 'comfortable'
  duration: number // minutes
  price: number
  steps: TransportType[]
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
