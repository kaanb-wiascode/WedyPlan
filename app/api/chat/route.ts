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
- Konum: İstanbul (Geçerli şehir)

GÖREVLERİN VE ARAÇ KULLANIM KURALLARI:
1. Kullanıcı genel tavsiye istediğinde HİÇBİR ARAÇ (TOOL) ÇALIŞTIRMA.
2. SADECE kullanıcı açık bir bütçe işlemi istediğinde "add_budget_item" aracını kullan.
3. Kullanıcı konsept önerisi, renk paleti önerisi veya tema istediğinde (Örn: "kır düğünü renk paleti") "generate_theme_board" aracını kullan.
4. LÜTFEN DİKKAT: Araçları çağırırken <function> etiketlerini DOĞRUDAN METİN İÇİNE YAZMA. API'nin JSON formatındaki tool_call özelliğini kullan.
    `;

    const tools = [
      {
        type: 'function',
        function: {
          name: 'add_budget_item',
          description: 'Sadece bütçeye harcama eklemek istenildiğinde kullanılır.',
          parameters: {
            type: 'object',
            properties: {
              category: { type: 'string', description: 'Harcama kategorisi' },
              amount: { type: 'number', description: 'Sadece ham sayı (Örn: 25000)' },
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
          description: 'Düğün konsepti ve renk paleti (hex kodlarıyla) oluşturur.',
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
        temperature: 0.3,
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

    // 1. KAÇAK FONKSİYON YAKALAYICI (Llama Model Text-Leak Fix)
    // Eğer yapay zeka fonksiyonu metin içine <function=isim>{json}</function> şeklinde sızdırırsa bunu yakalarız.
    const regex = /<function=(\w+)>([\s\S]*?)<\/function>/;
    const match = responseText.match(regex);

    if (match) {
      const fnName = match[1];
      const fnArgsStr = match[2];
      
      try {
        const fnArgs = JSON.parse(fnArgsStr);
        if (fnName === 'add_budget_item') {
          const parsedAmount = Number(fnArgs.amount) || 0;
          actionExecuted = { type: 'BUDGET_ADDED', data: { ...fnArgs, amount: parsedAmount } };
        } else if (fnName === 'generate_theme_board') {
          actionExecuted = { type: 'THEME_GENERATED', data: fnArgs };
        }
        // Metin içindeki o çirkin <function> kodunu silip temiz metni bırakıyoruz
        responseText = responseText.replace(regex, '').trim();
      } catch (e) {
        console.error("Regex parse hatası:", e);
      }
    } 
    // 2. NORMAL (STANDART) FONKSİYON ÇAĞRISI YAKALAYICI
    else if (choice?.tool_calls && choice.tool_calls.length > 0) {
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
        actionExecuted = { type: 'BUDGET_ADDED', data: { ...fnArgs, amount: parsedAmount } };
        if (!responseText) responseText = `${fnArgs.category} harcaması (${parsedAmount.toLocaleString('tr-TR')} TL) bütçenize eklendi.`;
      } else if (fnName === 'generate_theme_board') {
        actionExecuted = { type: 'THEME_GENERATED', data: fnArgs };
        if (!responseText) responseText = `Sizin için "${fnArgs.themeName}" konsepti ve renk paleti oluşturuldu.`;
      }
    }

    // Eğer responseText tamamen boşaldıysa ve bir aksiyon alındıysa standart yanıt ver
    if (!responseText.trim() && actionExecuted) {
       responseText = actionExecuted.type === 'THEME_GENERATED' 
         ? "İşte sizin için hazırladığım renk paleti ve konsept önerisi: ✨"
         : "İşleminiz başarıyla gerçekleştirildi. ✨";
    }

    return NextResponse.json({ text: responseText, action: actionExecuted });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}