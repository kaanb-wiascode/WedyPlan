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

Mevcut Kullanıcı Profili ve Verileri:
- Kullanıcı Tipi: ${userContext?.role === 'firma' ? 'Tedarikçi / Firma' : 'Çift'}
- İsim: ${userContext?.name || 'Değerli Misafirimiz'}
- Düğün Tarihi: ${userContext?.weddingDate || 'Henüz Belirlenmedi'}
- Toplam Bütçe: ${userContext?.budget ? `${userContext.budget} TL` : 'Belirtilmedi'}
- Davetli Sayısı: ${userContext?.guestCount ? `${userContext.guestCount} Kişi` : 'Belirtilmedi'}
- Seçilen Mekan/Konsept: ${userContext?.venue || 'Henüz Seçilmedi'}

YETKİLERİN VE ARAÇLARIN:
Sana tanımlanmış araçları (tools) kullanarak bütçeye harcama kalemi ekleyebilir veya düğün detaylarını güncelleyebilirsin. Kullanıcı bir işlem yapmanı istediğinde ilgili aracı çağır.

KURUMSAL İLETİŞİM İLKELERİ:
1. ÜSLUP: Son derece saygın, elit, çözüm odaklı, yapıcı ve profesyonel bir dil kullan (Siz/Biz dili).
2. VERİ BAĞLILIĞI: Cevaplarını öncelikle verilen kullanıcı verilerine ve WedyPlan platform imkanlarına dayandır.
3. BİÇİM: Düzenli, maddeli ve şık başlıklar kullan.
    `;

    // Yapay Zekanın Kullanabileceği Araçlar (Functions)
    const tools = [
      {
        type: 'function',
        function: {
          name: 'add_budget_item',
          description: 'Çiftin düğün bütçesine yeni bir harcama kalemi ekler.',
          parameters: {
            type: 'object',
            properties: {
              category: { type: 'string', description: 'Harcama kategorisi (örn: Fotoğrafçı, Gelinlik, Mekan, Müzik, Çiçek)' },
              amount: { type: 'number', description: 'Harcama tutarı (TL cinsinden)' },
              notes: { type: 'string', description: 'Harcamaya ait ek not veya açıklama' }
            },
            required: ['category', 'amount']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'update_wedding_info',
          description: 'Çiftin düğün tarihini veya davetli sayısını günceller.',
          parameters: {
            type: 'object',
            properties: {
              guestCount: { type: 'number', description: 'Yeni davetli sayısı' },
              weddingDate: { type: 'string', description: 'Yeni düğün tarihi (örn: 20 Ekim 2026)' }
            }
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
    let actionExecuted = null;
    let responseText = choice?.content || '';

    // Eğer yapay zeka bir araç/fonksiyon çalıştırmak istediyse
    if (choice?.tool_calls && choice.tool_calls.length > 0) {
      const toolCall = choice.tool_calls[0];
      const fnName = toolCall.function.name;
      const fnArgs = JSON.parse(toolCall.function.arguments);

      if (fnName === 'add_budget_item') {
        actionExecuted = {
          type: 'BUDGET_ADDED',
          data: {
            category: fnArgs.category,
            amount: fnArgs.amount,
            notes: fnArgs.notes || 'WedyAI aracılığıyla eklendi'
          }
        };
        responseText = `${fnArgs.category} harcama kalemi (${fnArgs.amount.toLocaleString('tr-TR')} TL) bütçe planlamanıza başarıyla işlendi. ✨`;
      } else if (fnName === 'update_wedding_info') {
        actionExecuted = {
          type: 'INFO_UPDATED',
          data: fnArgs
        };
        responseText = `Düğün detaylarınız başarıyla güncellendi. 📋`;
      }
    }

    return NextResponse.json({
      text: responseText,
      action: actionExecuted
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Bir sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}