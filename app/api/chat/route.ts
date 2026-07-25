import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, userContext } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'GROQ_API_KEY bulunamadı! Lütfen .env.local veya Vercel panelini kontrol edin.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
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

KURUMSAL İLETİŞİM İLKELERİ:
1. ÜSLUP: Son derece saygın, elit, çözüm odaklı, yapıcı ve profesyonel bir dil kullan (Siz/Biz dili).
2. VERİ BAĞLILIĞI: Cevaplarını öncelikle yukarıda verilen kullanıcı verilerine ve WedyPlan platform imkanlarına dayandır.
3. DİNAMİK YANIT: Eğer kullanıcı çift ise bütçe yönetimi, zaman çizelgesi ve mekan organizasyonunda premium tavsiyeler ver. Eğer kullanıcı firma ise müşteri ilişkileri, teklif yönetimi ve randevu optimizasyonu konularında kurumsal çözümler sun.
4. GÖRSELLİK VE BİÇİM: Paragrafları düzenli, maddeli ve şık başlıklar kullanarak sun. Gereksiz lakayıt emojilerden kaçın; sadece seçkin ve zarif simgeler (✨, ⚜️, 📋, 🥂) kullan.
    `;

    // Groq API Akış İsteyi (stream: true)
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
        temperature: 0.5,
        stream: true, // Canlı yayın aktif!
      }),
    });

    if (!groqRes.ok) {
      const errData = await groqRes.json();
      return new Response(
        JSON.stringify({ error: errData.error?.message || 'Groq API Hatası' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Server-Sent Events (SSE) verisini düz metin akışına dönüştürüyoruz
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = groqRes.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith(':')) continue;
            if (trimmed === 'data: [DONE]') {
              controller.close();
              return;
            }

            if (trimmed.startsWith('data: ')) {
              try {
                const json = JSON.parse(trimmed.substring(6));
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch (e) {
                // Parçalı JSON hatalarını yutuyoruz
              }
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Bir sunucu hatası oluştu.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}