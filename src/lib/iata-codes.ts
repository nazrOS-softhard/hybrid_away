// Базовая карта городов → IATA коды
// Расширяется по мере необходимости
export const cityToIATA: Record<string, string> = {
  'москва': 'MOW',
  'санкт-петербург': 'LED',
  'архангельск': 'ARH',
  'новодвинск': 'ARH', // ближайший аэропорт
  'токио': 'TYO',
  'нью-йорк': 'NYC',
  'париж': 'PAR',
  'лондон': 'LON',
  'дубай': 'DXB',
  'стамбул': 'IST',
  'пекин': 'BJS',
  'сочи': 'AER',
  'екатеринбург': 'SVX',
  'новосибирск': 'OVB',
  'казань': 'KZN',
  'краснодар': 'KRR',
}

// Находит IATA-код по названию города (регистронезависимо, частичное совпадение)
export function findIATA(cityName: string): string | null {
  const normalized = cityName.toLowerCase().trim()

  // Точное совпадение
  if (cityToIATA[normalized]) return cityToIATA[normalized]

  // Частичное совпадение (например "Москва, Россия" → "москва")
  for (const [city, code] of Object.entries(cityToIATA)) {
    if (normalized.includes(city) || city.includes(normalized)) {
      return code
    }
  }

  return null
}
