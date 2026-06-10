import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { from, to, fromCoords, toCoords } = await req.json()

  const prompt = `Ты — система планирования маршрутов. Построй оптимальный маршрут из "${from}" в "${to}".

Координаты отправления: [${fromCoords[0]}, ${fromCoords[1]}]
Координаты назначения: [${toCoords[0]}, ${toCoords[1]}]

Верни ТОЛЬКО валидный JSON без markdown, без пояснений, строго в этом формате:
{
  "from": "${from}",
  "to": "${to}",
  "fromCoords": [${fromCoords[0]}, ${fromCoords[1]}],
  "toCoords": [${toCoords[0]}, ${toCoords[1]}],
  "waypointCoords": [[lat, lon], ...],
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
          "title": "Такси",
          "subtitle": "От адреса до аэропорта",
          "time": "08:30",
          "date": "сегодня"
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

Правила:
- waypointCoords: промежуточные точки (пересадки, аэропорты) между from и to
- Цены в рублях, реалистичные для маршрута
- Время в минутах, реалистичное
- stepsDetail заполни только для варианта "recommended", для остальных оставь []
- Типы транспорта: taxi, flight, train, hotel, transfer
- Если маршрут внутри одного города — только taxi/train, без flight`

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://hybrid-away.vercel.app',
        'X-Title': 'Hybrid В Пути',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4-5',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content ?? ''
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Route generation error:', err)
    return NextResponse.json({ error: 'Ошибка генерации маршрута' }, { status: 500 })
  }
}
