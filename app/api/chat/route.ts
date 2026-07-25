import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, userContext } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY ortam değişkeni bulunamadı!' },
        { status: 500 }
      );
    }

    const systemPrompt = `
Sen WedyPlan'ın VIP Düğün Asistanısın (WedyAI Concierge).
Kullanıcı Adı: ${userContext?.name || 'Selin & Kaan'} (Düğün Tarihi: ${userContext?.weddingDate || '15 Ağustos 2026'}, Bütçe: ${userContext?.budget || '350.000 TL'})

MANTIK VE SOHBET KURALLARI:
1. İNSAN GİBİ SOHBET ET: Genel sorularda, tavsiyelerde sadece akıcı metin yanıtı ver.
2. YALNIZCA KULLANICI AÇIKÇA İSTEDİĞİNDE İLGİLİ ARAÇLARI (TOOLS) ÇALIŞTIR:
   - Bütçeye harcama eklemek istenirse: 'add_budget_item'
   - Renk paleti / konsept istenirse: 'generate_theme_board'
   - Mekan veya tedarikçi önerisi istenirse: 'recommend_vendors'
   - Düğün günü akışı / zaman çizelgesi istenirse: 'generate_timeline'
   - Davetli oturma düzeni veya LCV durumu istenirse: 'manage_guests'
    `;

    const tools = [
      {
        type: 'function',
        function: {
          name: 'add_budget_item',
          description: 'Bütçeye yeni harcama kalemi ekler.',
          parameters: {
            type: 'object',
            properties: {
              category: { type: 'string' },
              amount: { type: 'number' },
              notes: { type: 'string' }
            },
            required: ['category', 'amount']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'generate_theme_board',
          description: 'Düğün konsepti ve renk paleti oluşturur.',
          parameters: {
            type: 'object',
            properties: {
              themeName: { type: 'string' },
              description: { type: 'string' },
              colors: { type: 'array', items: { type: 'string' } }
            },
            required: ['themeName', 'description', 'colors']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'recommend_vendors',
          description: 'Kullanıcının kriterlerine uygun onaylı mekan veya tedarikçileri listeler.',
          parameters: {
            type: 'object',
            properties: {
              category: { type: 'string', description: 'Örn: Düğün Mekanı, Fotoğrafçı, Müzik' },
              vendors: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    location: { type: 'string' },
                    priceRange: { type: 'string' },
                    rating: { type: 'number' },
                    imageUrl: { type: 'string' }
                  },
                  required: ['name', 'location', 'priceRange', 'rating']
                }
              }
            },
            required: ['category', 'vendors']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'generate_timeline',
          description: 'Düğün günü için saat saat akış ve zaman çizelgesi oluşturur.',
          parameters: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              schedule: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    time: { type: 'string' },
                    activity: { type: 'string' },
                    note: { type: 'string' }
                  },
                  required: ['time', 'activity']
                }
              }
            },
            required: ['title', 'schedule']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'manage_guests',
          description: 'Davetli listesi ve masa düzeni durumunu günceller.',
          parameters: {
            type: 'object',
            properties: {
              actionSummary: { type: 'string' },
              confirmedCount: { type: 'number' },
              pendingCount: { type: 'number' },
              tableNote: { type: 'string' }
            },
            required: ['actionSummary']
          }
        }
      }
    ];

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        tools: tools,
        tool_choice: 'auto',
        temperature: 0.4,
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Groq API yanıt vermedi.' },
        { status: groqRes.status }
      );
    }

    const choice = data.choices?.[0]?.message;
    let responseText = choice?.content || '';
    let actionExecuted = null;

    // 1. Kaçak Fonksiyon Yakalayıcı (Regex Parse)
    const regex = /<function=(\w+)>([\s\S]*?)(?:<\/function>|$)/;
    const match = responseText.match(regex);

    if (match) {
      const fnName = match[1];
      const fnArgsStr = match[2].trim().replace(/<\/function>$/, '');
      try {
        const fnArgs = JSON.parse(fnArgsStr);
        actionExecuted = processToolAction(fnName, fnArgs);
        responseText = responseText.replace(regex, '').trim();
      } catch (e) {
        console.error('Regex parse error:', e);
      }
    } 
    // 2. Standart Tool Calling
    else if (choice?.tool_calls && choice.tool_calls.length > 0) {
      const toolCall = choice.tool_calls[0];
      const fnName = toolCall.function.name;
      let fnArgs: any = {};
      try {
        fnArgs = typeof toolCall.function.arguments === 'string'
          ? JSON.parse(toolCall.function.arguments)
          : toolCall.function.arguments;
      } catch (e) {
        console.error('Args parse error:', e);
      }

      actionExecuted = processToolAction(fnName, fnArgs);
    }

    if (!responseText.trim() && actionExecuted) {
      responseText = 'İstediğiniz işlem başarıyla gerçekleştirildi. ✨';
    }

    return NextResponse.json({ text: responseText, action: actionExecuted });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}

// Yardımcı İşlem Eşleştirici
function processToolAction(fnName: string, fnArgs: any) {
  if (fnName === 'add_budget_item') {
    return { type: 'BUDGET_ADDED', data: { ...fnArgs, amount: Number(fnArgs.amount) || 0 } };
  }
  if (fnName === 'generate_theme_board') {
    return { type: 'THEME_GENERATED', data: fnArgs };
  }
  if (fnName === 'recommend_vendors') {
    return { type: 'VENDORS_RECOMMENDED', data: fnArgs };
  }
  if (fnName === 'generate_timeline') {
    return { type: 'TIMELINE_GENERATED', data: fnArgs };
  }
  if (fnName === 'manage_guests') {
    return { type: 'GUESTS_MANAGED', data: fnArgs };
  }
  return null;
}