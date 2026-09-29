import type { SuggestedPrompt, AiSearchFaqItem } from '@/types/ai-search';

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { id: 'p-1', text: "İstanbul'da 300 kişilik lüks kır bahçesi", category: 'Düğün Salonu' },
  { id: 'p-2', text: 'Kadıköy bölgesinde 4K drone çekimli fotoğrafçı', category: 'Fotoğrafçı' },
  { id: 'p-3', text: 'Bütçesi 150.000 ₺ altı kokteyl mekanları', category: 'Düğün Salonu' },
  { id: 'p-4', text: 'Açık hava canlı orkestra ve DJ ekibi', category: 'Müzik & DJ' },
  { id: 'p-5', text: 'Haute couture gelinlik ve özel tasarım evi', category: 'Gelinlik' },
];

export const POPULAR_SEARCH_CATEGORIES = [
  { id: 'all', title: 'Tüm Kategoriler' },
  { id: 'dugun-salonlari', title: 'Düğün Salonları & Kır Bahçeleri' },
  { id: 'fotografcilar', title: 'Fotoğraf & Düğün Hikayesi' },
  { id: 'muzik-dj', title: 'Müzik & Orkestra' },
  { id: 'gelinlik', title: 'Gelinlik & Modaevleri' },
  { id: 'organizasyon', title: 'Organizasyon & Süsleme' },
];

export const AI_SEARCH_FAQS: AiSearchFaqItem[] = [
  {
    id: 'faq-ai-1',
    question: 'WedyAI Doğal Dil Araması nasıl çalışır?',
    answer: 'Arama ifadenizdeki konum, bütçe, kapasite ve hizmet kriterleri yayındaki gerçek WedyPlan firma kayıtlarıyla karşılaştırılır. Sonuçlar veri eşleşmesine göre sıralanır.',
  },
  {
    id: 'faq-ai-2',
    question: 'Arama sonuçlarındaki % Uyum Skoru neyi ifade eder?',
    answer: 'Uyum skoru; arama ifadesi, kategori, şehir, bütçe, kapasite ve doğrulanmış firma kriterlerinin gerçek firma kaydıyla ne ölçüde eşleştiğini gösterir.',
  },
  {
    id: 'faq-ai-3',
    question: 'Arama sonuçlarını daha sonra kaydedebilir miyim?',
    answer: 'Çift Paneline giriş yaptıktan sonra firmaları favorilerinize ekleyebilir ve ilgili firma ile görüşme sürecini WedyPlan üzerinden sürdürebilirsiniz.',
  },
];
