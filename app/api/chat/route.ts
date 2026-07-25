import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY bulunamadı! Lütfen .env.local dosyanızı veya Vercel panelini kontrol edin.' },
        { status: 500 }
      );
    }

    // Groq API İstegi
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Aktif ve en güncel Groq modeli
        messages: [
          {
            role: 'system',
            content: `Sen WedyPlan platformunun resmi, uzman ve son derece samimi Yapay Zeka Düğün Asistanısın (WedyAI).

ÖNEMLİ KURALLAR:
1. SADECE düğün, nişan, kına, bütçe planlaması, mekan seçimi, davetli yönetimi (LCV), gelinlik/damatlık ve düğün tedarikçileri konularında rehberlik et.
2. Düğün dışındaki genel konularda nazikçe sadece düğün planlama uzmanı olduğunu hatırlatarak konuyu düğün hazırlıklarına getir.
3. Türkçe dilini mükemmel ve akıcı kullan. Bol bol uygun emojiler (✨, 💒, 💍, 💐, 📋) ve kısa, okunabilir paragraflar/maddeler ekle.
4. Çiftlere heyecan verici, motive edici ama aynı zamanda bütçe ve zaman yönetimi açısından ayakları yere basan profesyonel tavsiyeler ver.`,
          },
          ...messages,
        ],
        temperature: 0.6,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API Hata Detayı:', data);
      throw new Error(data.error?.message || 'Groq API yanıt veremedi.');
    }

    const aiText = data.choices?.[0]?.message?.content || 'Yanıt oluşturulamadı.';

    return NextResponse.json({ text: aiText });
  } catch (error: any) {
    console.error('WedyAI Groq Error:', error);
    return NextResponse.json(
      { error: error.message || 'Bir hata oluştu.' },
      { status: 500 }
    );
  }
}