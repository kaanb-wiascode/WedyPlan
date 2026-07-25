export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, userContext } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'GROQ_API_KEY ortam değişkeni bulunamadı!' }),
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
4. GÖRSELLİK VE BİÇİM: Paragrafları düzenli, maddeli ve şık başlıklar kullanarak sun.
    `;

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
        stream: true,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      return new Response(
        JSON.stringify({ error: `Groq API Hatası: ${errText}` }),
        { status: groqRes.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(groqRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Sunucu hatası oluştu.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}