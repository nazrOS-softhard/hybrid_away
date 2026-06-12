import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { from, to, fromCoords, toCoords, departDateStr, realFlights, realTaxiDistance } = await req.json()

  const depDate = new Date(departDateStr)
  const dep = depDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })

  // Блок реальных данных для промпта
  let realDataBlock = ''

  if (realFlights?.length > 0) {
    realDataBlock += `\nРЕАЛЬНЫЕ РЕЙСЫ (используй эти точные данные, не выдумывай):\n`
    realFlights.forEach((f: any, i: number) => {
      realDataBlock += `${i + 1}. ${f.flightNumber} | ${f.origin}→${f.destination} | цена ${f.price} ₽ | вылет ${f.departureAt} | пересадок: ${f.transfers} | длительность ${f.duration} мин\n`
    })
  } else {
    realDataBlock += `\nРеальные рейсы не найдены — сгенерируй реалистичные номера рейсов и цены сам.\n`
  }

  if (realTaxiDistance?.available) {
    realDataBlock += `\nРЕАЛЬНОЕ РАССТОЯНИЕ НА АВТО: ${realTaxiDistance.distanceKm} км, время в пути: ${realTaxiDistance.durationMin} мин (используй эти точные значения для шага такси).\n`
  }

  const prompt = `Ты — система планирования маршрутов. Построй реалистичный маршрут из "${from}" в "${to}".

Координаты отправления: [${fromCoords[0]}, ${fromCoords[1]}]
Координаты назначения: [${toCoords[0]}, ${toCoords[1]}]
Дата вылета: ${dep}
${realDataBlock}

Верни ТОЛЬКО валидный JSON без markdown:
{
  "from": "${from}",
  "to": "${to}",
  "fromCoords": [${fromCoords[0]}, ${fromCoords[1]}],
  "toCoords": [${toCoords[0]}, ${toCoords[1]}],
  "departureDate": "${dep}",
  "arrivalDate": "дата прибытия",
  "waypointCoords": [[lat, lon]],
  "variants": [
    {
      "id": "recommended",
      "label": "Рекомендуемый",
      "tag": "recommended",
      "duration": 560,
      "price": 142850,
      "steps": ["taxi", "flight", "taxi"],
      "stepsDetail": [
        {
          "id": "1",
          "type": "taxi",
          "title": "Такси до аэропорта",
          "subtitle": "От адреса до терминала",
          "time": "06:30",
          "date": "${dep}",
          "duration": "45 мин"
        },
        {
          "id": "2",
          "type": "flight",
          "title": "Рейс [используй реальный номер если есть]",
          "subtitle": "[Авиакомпания]",
          "time": "08:30",
          "date": "${dep}",
          "flightNumber": "SU 262",
          "duration": "9 ч 30 мин"
        },
        {
          "id": "3",
          "type": "taxi",
          "title": "Такси до отеля",
          "subtitle": "Аэропорт прибытия → Отель",
          "time": "20:00",
          "date": "дата прибытия",
          "duration": "40 мин"
        },
        {
          "id": "4",
          "type": "hotel",
          "title": "Отель [реалистичное название]",
          "subtitle": "Заселение · 1 ночь",
          "time": "21:00",
          "date": "дата прибытия",
          "duration": ""
        }
      ]
    },
    {
      "id": "fastest",
      "label": "Самый быстрый",
      "tag": "fastest",
      "duration": 480,
      "price": 168000,
      "steps": ["taxi", "flight", "taxi"],
      "stepsDetail": []
    },
    {
      "id": "cheapest",
      "label": "Самый дешёвый",
      "tag": "cheapest",
      "duration": 820,
      "price": 95000,
      "steps": ["taxi", "train", "flight", "taxi"],
      "stepsDetail": []
    }
  ]
}

ВАЖНЫЕ ПРАВИЛА:
- Если предоставлены РЕАЛЬНЫЕ РЕЙСЫ — используй ИХ точные номера, цены и время для варианта "recommended". Не придумывай свои.
- Если предоставлено РЕАЛЬНОЕ РАССТОЯНИЕ для такси — используй именно это время в пути (duration) для шага такси.
- Если реальных данных нет — сгенерируй разумные значения сам (коды SVO, DME, ARH, номера SU/DP/U6).
- Цены в рублях.
- waypointCoords — промежуточные аэропорты пересадок.`

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://hybrid-away.vercel.app',
        'X-Title': 'Hybrid V Puti',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4-5',
        max_tokens: 3000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const rawText = await response.text()

    if (!response.ok) {
      console.error('OpenRouter HTTP error', response.status, rawText.slice(0, 1000))
      return NextResponse.json({ error: 'OpenRouter error', status: response.status, detail: rawText }, { status: 500 })
    }

    let data: any
    try {
      data = JSON.parse(rawText)
    } catch {
      console.error('OpenRouter non-JSON response', rawText.slice(0, 1000))
      return NextResponse.json({ error: 'Non-JSON response from OpenRouter', detail: rawText.slice(0, 500) }, { status: 500 })
    }

    const text = data.choices?.[0]?.message?.content ?? ''
    if (!text) {
      console.error('OpenRouter empty content', JSON.stringify(data).slice(0, 1000))
      return NextResponse.json({ error: 'Empty content from AI', raw: data }, { status: 500 })
    }

    const clean = text.replace(/```json|```/g, '').trim()

    let parsed: any
    try {
      parsed = JSON.parse(clean)
    } catch {
      console.error('Failed to parse AI JSON', clean.slice(0, 1000))
      return NextResponse.json({ error: 'AI returned invalid JSON', detail: clean.slice(0, 500) }, { status: 500 })
    }

    return NextResponse.json(parsed)
  } catch (err: any) {
    console.error('Route error:', err?.message ?? err)
    return NextResponse.json({ error: 'Ошибка генерации маршрута', detail: String(err) }, { status: 500 })
  }
  }
