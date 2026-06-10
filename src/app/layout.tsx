
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hybrid В Пути — Транспортная ОС путешествий',
  description: 'Единая система маршрутов от двери до двери. ИИ строит полный маршрут — такси, самолёт, поезд, отель.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
