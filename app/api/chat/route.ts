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

    // 1. DÜZELTME: TAMAMEN YENİLENMİŞ VE KISITLANMIŞ SİSTEM BEYNİ
    const systemPrompt = `Sen WedyPlan'ın VIP Düğün Asistanısın (WedyAI Concierge).
Kullanıcı Adı: ${userContext?.name || 'Selin & Kaan'} (Bütçe: ${userContext?.budget})

MANTIK VE SOHBET KURALLARI (KESİNLİKLE UY):
1. DOĞAL İNSAN GİBİ KONUŞ: Kullanıcı sana tavsiye, fikir veya soru soruyorsa (Örn: "Bütçe olarak ne önerirsin?", "Ne yapalım?"), SADECE akıcı ve mantıklı bir METİN cevabı ver.
2. HAFIZA: Önceki mesajları oku. Kullanıcı YENİ soru sorduysa ESKİ KONUYU BIRAK ve sadece yeni soruya odaklan. Eski işlemleri asla tekrarlama.
3. ARAÇ (TOOL) KULLANIMI KISITLAMASI:
   - Kullanıcı AÇIKÇA "Renk paleti oluştur", "Konsept çiz" demediği sürece ASLA 'generate_theme_board' aracını kullanma!
   - Kullanıcı AÇIKÇA "Bütçeme 5000 TL ekle" demediği sürece ASLA 'add_budget_item' aracını kullanma!
4. Eğer bir işlem (tool) yaparsan, cevabını kısa tut (Örn: "İsteğiniz üzerine renk paleti oluşturuldu.").`;

    // 2. DÜZELTME: Sohbet geçmişindeki olası boşlukları doldurup "LLM Looping" hatasını engelliyoruz
    const safeMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content || 'Bir önceki işlem başarıyla ekrana çizildi.'
    }));

    const tools = [
      {
        type: 'function',
        function: {
          name: 'add_budget_item',
          description: 'YALNIZCA KULLANICI BÜTÇEYE HARCAMA EKLEMEK İSTEDİĞİNDE KULLAN.',
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
          description: 'YALNIZCA KULLANICI GÖRSEL BİR RENK PALETİ VEYA KONSEPT TABLOSU İSTEDİĞİNDE KULLAN.',
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
          ...safeMessages, // Temizlenmiş geçmiş
        ],
        tools: tools,
        tool_choice: 'auto',
        temperature: 0.5, // 3. DÜZELTME: Robotik döngüyü kırmak için yaratıcılık artırıldı (0.2 -> 0.5)
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

    // Kaçak Fonksiyon Yakalayıcı 
    const regex = /<function=(\w+)>([\s\S]*?)(?:<\/function>|$)/;
    const match = responseText.match(regex);

    if (match) {
      const fnName = match[1];
      const fnArgsStr = match[2].trim();
      
      try {
        const cleanJson = fnArgsStr.replace(/<\/function>$/, '');
        const fnArgs = JSON.parse(cleanJson);
        
        if (fnName === 'add_budget_item') {
          actionExecuted = { type: 'BUDGET_ADDED', data: { ...fnArgs, amount: Number(fnArgs.amount) || 0 } };
        } else if (fnName === 'generate_theme_board') {
          actionExecuted = { type: 'THEME_GENERATED', data: fnArgs };
        }
        responseText = responseText.replace(regex, '').trim();
      } catch (e) {
        console.error("Regex parse hatası:", e);
      }
    } 
    // Normal Fonksiyon Yakalayıcı
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

    // Metin tamamen boş gelirse koruma
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