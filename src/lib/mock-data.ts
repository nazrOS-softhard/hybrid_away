
import type { RouteStep, RouteVariant, TravelCard } from './types'

export const mockRouteSteps: RouteStep[] = [
  {
    id: '1',
    type: 'taxi',
    title: 'Такси',
    subtitle: 'Новодвинск, ул. Двинская 55',
    time: '08:30',
    date: '12 мая',
  },
  {
    id: '2',
    type: 'transfer',
    title: 'Аэропорт Архангельск (ARH)',
    subtitle: 'Регистрация на рейс',
    time: '09:30',
    date: '12 мая',
  },
  {
    id: '3',
    type: 'flight',
    title: 'Рейс Архангельск (ARH) — Москва (SVO)',
    subtitle: 'SU 1333',
    time: '11:20',
    date: '12 мая',
  },
  {
    id: '4',
    type: 'transfer',
    title: 'Пересадка в Москве',
    subtitle: 'Ожидание 2 ч 15 мин',
    time: '13:50',
    date: '12 мая',
  },
  {
    id: '5',
    type: 'flight',
    title: 'Рейс Москва (SVO) — Токио (HND)',
    subtitle: 'SU 262',
    time: '16:05',
    date: '12 мая',
  },
  {
    id: '6',
    type: 'taxi',
    title: 'Такси',
    subtitle: 'Tokyo International Airport (HND) → Отель в Токио',
    time: '07:40',
    date: '13 мая',
  },
  {
    id: '7',
    type: 'hotel',
    title: 'Отель',
    subtitle: 'Shinagawa Prince Hotel · 1 ночь',
    time: '08:00',
    date: '13 мая',
  },
]

export const mockRouteVariants: RouteVariant[] = [
  {
    id: 'recommended',
    label: 'Рекомендуемый',
    tag: 'recommended',
    duration: 560,
    price: 142850,
    steps: ['taxi', 'flight', 'transfer', 'flight', 'taxi', 'hotel'],
  },
  {
    id: 'fastest',
    label: 'Самый быстрый',
    tag: 'fastest',
    duration: 485,
    price: 168300,
    steps: ['taxi', 'flight', 'flight', 'taxi', 'hotel'],
  },
  {
    id: 'cheapest',
    label: 'Самый дешёвый',
    tag: 'cheapest',
    duration: 820,
    price: 98740,
    steps: ['taxi', 'train', 'flight', 'transfer', 'flight', 'taxi', 'hotel'],
  },
]

export const mockTravelCards: TravelCard[] = [
  {
    id: 'taxi-1',
    type: 'taxi',
    title: 'Такси',
    subtitle: 'А 123 ВС 29 · Toyota Camry, чёрный',
    status: 'Через 4 мин приедет',
    statusColor: 'green',
  },
  {
    id: 'flight-1',
    type: 'flight',
    title: 'Рейс SU 1333',
    subtitle: 'ARH → SVO',
    status: 'В воздухе',
    statusColor: 'blue',
    detail: 'Высота 10 668 м',
  },
  {
    id: 'flight-2',
    type: 'flight',
    title: 'Рейс SU 262',
    subtitle: 'SVO → HND',
    status: 'В воздухе',
    statusColor: 'blue',
    detail: 'До посадки 3 ч 25 мин',
  },
  {
    id: 'hotel-1',
    type: 'hotel',
    title: 'Отель',
    subtitle: 'Shinagawa Prince Hotel',
    status: 'Заселение с 14:00',
    statusColor: 'green',
    detail: 'Номер готов',
    hasCamera: true,
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
  },
]
