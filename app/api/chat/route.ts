import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY bulunamadı! Lütfen .env.local dosyanızı kontrol edin.' },
        { status: 500 }
      );
    }
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile', //
        messages: [
          {
            role: 'system',
            content: `Sen WedyPlan platformunun resmi ve uzman Yapay Zeka Düğün Asistanısın (WedyAI). Türkçe konuşmalısın.
Görevin: Çiftlere düğün hazırlık süreçlerinde rehberlik etmek.
Uzmanlık Alanların: Bütçe planlaması, mekan seçimi, LCV takibi ve zaman yönetimi.
Üslubun: Nazik, samimi, çözüm odaklı. Metinlerinde bol bol emoji ve kısa okunabilir paragraflar kullan.`,
          },
          ...messages,
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Groq API Hatası');
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