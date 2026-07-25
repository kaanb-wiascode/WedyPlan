import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Front-end'den gelen mesajlar VE kullanıcı/firma özel verileri (userContext)
    const { messages, userContext } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY bulunamadı!' },
        { status: 500 }
      );
    }

    // Dinamik Sistem Metni: Kullanıcının rolüne göre özelleşir
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

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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
        temperature: 0.5, // Daha tutarlı ve kurumsal yanıtlar için sıcaklığı biraz düşürdük
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'API Hatası');

    return NextResponse.json({ text: data.choices?.[0]?.message?.content || 'Yanıt oluşturulamadı.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Hata oluştu.' }, { status: 500 });
  }
}