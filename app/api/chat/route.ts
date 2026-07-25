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
Sen WedyPlan platformunun VIP Kurumsal Düğün ve Organizasyon Asistanısın (WedyAI Concierge).

Kullanıcı Profili:
- İsim: ${userContext?.name || 'Değerli Misafirimiz'}
- Düğün Tarihi: ${userContext?.weddingDate || 'Henüz Belirlenmedi'}
- Seçilen Mekan/Konsept: ${userContext?.venue || 'Henüz Seçilmedi'}

GÖREVLERİN:
1. Bütçe ve davetli yönetimi için ilgili araçları (add_budget_item vb.) kullan.
2. Çiftler düğün konsepti, renk paleti veya teması hakkında öneri istediğinde KESİNLİKLE "generate_theme_board" aracını çalıştırarak onlara görsel bir renk paleti sun.

ÜSLUP: Kurumsal, elit, çözüm odaklı ve yapıcı (Siz/Biz dili).
    `;

    // Yeni: Konsept ve Renk Paleti Aracı Eklendi
    const tools = [
      {
        type: 'function',
        function: {
          name: 'add_budget_item',
          description: 'Çiftin düğün bütçesine yeni bir harcama kalemi ekler.',
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
          description: 'Kullanıcının isteğine göre düğün konsepti ve renk paleti (hex kodlarıyla) oluşturur.',
          parameters: {
            type: 'object',
            properties: {
              themeName: { type: 'string', description: 'Konseptin havalı ismi (Örn: Rustik Sonbahar Rüyası)' },
              description: { type: 'string', description: 'Bu konseptin hissiyatı ve detaylı açıklaması' },
              colors: { 
                type: 'array', 
                items: { type: 'string' },
                description: 'Konsepte uygun 4 adet HEX renk kodu (Örn: ["#8B4513", "#D2B48C", "#F5DEB3", "#556B2F"])'
              }
            },
            required: ['themeName', 'description', 'colors']
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

    if (!groqRes.ok) throw new Error(data.error?.message || 'Groq API yanıt vermedi.');

    const choice = data.choices?.[0]?.message;
    let actionExecuted = null;
    let responseText = choice?.content || '';

    // Fonksiyon Çağrısı Yakalama
    if (choice?.tool_calls && choice.tool_calls.length > 0) {
      const toolCall = choice.tool_calls[0];
      const fnName = toolCall.function.name;
      const fnArgs = JSON.parse(toolCall.function.arguments);

      if (fnName === 'add_budget_item') {
        actionExecuted = { type: 'BUDGET_ADDED', data: fnArgs };
        responseText = `${fnArgs.category} harcaması (${fnArgs.amount.toLocaleString('tr-TR')} TL) başarıyla eklendi.`;
      } else if (fnName === 'generate_theme_board') {
        actionExecuted = { type: 'THEME_GENERATED', data: fnArgs };
        responseText = `Sizin için tasarladığım "${fnArgs.themeName}" konsepti ve renk paleti aşağıdadır. ✨`;
      }
    }

    return NextResponse.json({ text: responseText, action: actionExecuted });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sunucu hatası.' }, { status: 500 });
  }
}