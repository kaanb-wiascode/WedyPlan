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
- İsim: ${userContext?.name || 'Selin & Kaan'}
- Düğün Tarihi: ${userContext?.weddingDate || '15 Ağustos 2026'}
- Bütçe: ${userContext?.budget || '350.000 TL'}

GÖREVLERİN VE ARAÇ KULLANIM KURALLARI:
1. Kullanıcı genel sorular sorduğunda (Örn: "neler yapabiliriz", "merhaba", "bana yardımcı ol") HİÇBİR ARAÇ (TOOL) ÇALIŞTIRMA. Sadece yeteneklerini ve yapabileceklerini maddeler halinde anlat.
2. SADECE kullanıcı açık bir işlem komutu verdiğinde (Örn: "30000 TL fotoğrafçı ekle", "renk paleti öner") ilgili aracı çalıştır.
3. Araçları çalıştırırken 'amount' gibi sayısal parametrelerde KESİNLİKLE tırnak işareti veya metin kullanma! Tırnaksız ham sayı gönder (Örn: "amount": 30000).
    `;

    const tools = [
      {
        type: 'function',
        function: {
          name: 'add_budget_item',
          description: 'Sadece kullanıcı açıkça bütçeye harcama eklemek istediğinde çalıştırılır.',
          parameters: {
            type: 'object',
            properties: {
              category: { type: 'string', description: 'Harcama kategorisi (örn: Fotoğrafçı, Gelinlik)' },
              amount: { type: 'number', description: 'Sadece ham sayısal değer, tırnaksız. (Örn: 25000)' },
              notes: { type: 'string', description: 'Harcama notu' }
            },
            required: ['category', 'amount']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'generate_theme_board',
          description: 'Sadece kullanıcı düğün konsepti veya renk paleti istediğinde çalıştırılır.',
          parameters: {
            type: 'object',
            properties: {
              themeName: { type: 'string' },
              description: { type: 'string' },
              colors: { 
                type: 'array', 
                items: { type: 'string' } 
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
        temperature: 0.2,
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
    let actionExecuted = null;
    let responseText = choice?.content || '';

    // Tool çağrısı kontrolü
    if (choice?.tool_calls && choice.tool_calls.length > 0) {
      const toolCall = choice.tool_calls[0];
      const fnName = toolCall.function.name;
      
      let fnArgs: any = {};
      try {
        fnArgs = typeof toolCall.function.arguments === 'string' 
          ? JSON.parse(toolCall.function.arguments) 
          : toolCall.function.arguments;
      } catch (e) {
        console.error('Args parse hatası:', e);
      }

      if (fnName === 'add_budget_item') {
        const parsedAmount = Number(fnArgs.amount) || 0;
        actionExecuted = { 
          type: 'BUDGET_ADDED', 
          data: { ...fnArgs, amount: parsedAmount } 
        };
        if (!responseText) {
          responseText = `${fnArgs.category} harcaması (${parsedAmount.toLocaleString('tr-TR')} TL) bütçenize eklendi. ✨`;
        }
      } else if (fnName === 'generate_theme_board') {
        actionExecuted = { type: 'THEME_GENERATED', data: fnArgs };
        if (!responseText) {
          responseText = `Sizin için "${fnArgs.themeName}" konsepti ve renk paleti oluşturuldu. ✨`;
        }
      }
    }

    return NextResponse.json({ text: responseText, action: actionExecuted });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}