import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY bulunamadı! Lütfen .env.local dosyanızı kontrol edin.' },
        { status: 500 }
      );
    }

    // OpenAI formatındaki rolleri Gemini formatına (user / model) çeviriyoruz
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    // WedyAI Sistem Talimatı
    const systemPrompt = `Sen WedyPlan platformunun resmi ve uzman Yapay Zeka Düğün Asistanısın (WedyAI).
Görevin: Çiftlere düğün hazırlık süreçlerinde rehberlik etmek.
Uzmanlık Alanların: Bütçe planlaması, mekan seçimi, tedarikçi pazarlık tüyoları, LCV takibi ve zaman yönetimi.
Üslubun: Nazik, samimi, çözüm odaklı ve profesyonel olmalı. Metinlerinde emojiler ve kısa okunabilir paragraflar kullan.`;

    // Google Gemini 1.5 Flash REST Endpoint'ine İstek Atıyoruz
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: formattedContents,
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Gemini API Hatası');
    }

    // Gemini yanıtını çek
    const aiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Yanıt oluşturulamadı.';

    return NextResponse.json({ text: aiText });
  } catch (error: any) {
    console.error('WedyAI Gemini Error:', error);
    return NextResponse.json(
      { error: error.message || 'Bir hata oluştu.' },
      { status: 500 }
    );
  }
}