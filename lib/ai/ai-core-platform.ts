'use server';

interface GenerateAiResponseInput {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
}

/**
 * Groq AI API (Llama-3.3-70b) üzerinden yüksek hızlı yapay zekâ yanıtı üretir.
 */
export async function generateAiResponseAction(input: GenerateAiResponseInput) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error('GROQ_API_KEY ortam değişkeni tanımlanmamış.');
    }

    const messages = [
      {
        role: 'system',
        content:
          input.systemInstruction ||
          'Sen WedyPlan düğün platformunun uzman, nazik ve yardımsever yapay zekâ asistanısın. Çiftlere ve tedarikçilere düğün planlama konusunda profesyonel tavsiyeler verirsin.',
      },
      {
        role: 'user',
        content: input.prompt,
      },
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: input.temperature ?? 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Groq API Hatası:', errorData);
      throw new Error('AI yanıtı oluşturulurken bir hata meydana geldi.');
    }

    const data = await response.json();
    const resultText = data.choices?.[0]?.message?.content || 'Yanıt alınamadı.';

    return {
      success: true,
      text: resultText,
    };
  } catch (error: any) {
    console.error('❌ generateAiResponseAction hatası:', error);
    return {
      success: false,
      error: error.message || 'AI servisine ulaşılamadı.',
      text: 'Şu anda yapay zekâ servisine ulaşılamıyor. Lütfen daha sonra tekrar deneyiniz.',
    };
  }
}