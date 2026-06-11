import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { from, to, fromCoords, toCoords } = await req.json()

  const today = new Date()
  const depDate = new Date(today)
  depDate.setDate(today.getDate() + 3)
  const dep = depDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })

  const prompt = `Ты — система планирования маршрутов. Построй реалистичный маршрут из "${from}" в "${to}".

Координаты отправления: [${fromCoords[0]}, ${fromCoords[1]}]
Координаты назначения: [${toCoords[0]}, ${toCoords[1]}]
Дата вылета: ${dep}

Верни ТОЛЬКО валидный JSON без markdown, без комментариев:
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
          "type": "transfer",
          "title": "Регистрация и посадка",
          "subtitle": "Аэропорт отправления",
          "time": "07:30",
          "date": "${dep}",
          "duration": "1 ч"
        },
        {
          "id": "3",
          "type": "flight",
          "title": "Рейс [АВИАКОМПАНИЯ] [ОТКУДА]—[КУДА]",
          "subtitle": "[АВИАКОМПАНИЯ]",
          "time": "08:30",
          "date": "${dep}",
          "flightNumber": "SU 262",
          "duration": "9 ч 30 мин"
        },
        {
          "id": "4",
          "type": "taxi",
          "title": "Такси до отеля",
          "subtitle": "Аэропорт прибытия → Отель",
          "time": "20:00",
          "date": "дата прибытия",
          "duration": "40 мин"
        },
        {
          "id": "5",
          "type": "hotel",
          "title": "Отель [РЕАЛИСТИЧНОЕ НАЗВАНИЕ]",
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

Правила:
- Используй реальные коды аэропортов (SVO, DME, ARH, HND, NRT и т.д.)
- Номера рейсов реалистичные: SU (Аэрофлот), DP (Победа), S7, U6 (Уральские)
- Если маршрут через Москву — добавь пересадку отдельным шагом
- Время реалистичное с учётом часовых поясов
- Цены в рублях, реалистичные для 2024 года
- waypointCoords — промежуточные аэропорты`

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
        max_tokens: 3000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content ?? ''
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Route error:', err)
    return NextResponse.json({ error: 'Ошибка генерации маршрута' }, { status: 500 })
  }
}
