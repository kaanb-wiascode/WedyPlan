import { MagazineArticle, MagazineCategory, EditorialGuide, MagazineAuthor } from '@/types/wedding-magazine';

export const MAGAZINE_AUTHORS: Record<string, MagazineAuthor> = {
  'selen-arslan': {
    id: 'a-1',
    name: 'Selen Arslan',
    title: 'Vogue Wedding Editörü & Düğün Kreatif Direktörü',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: '10 yılı aşkın süredir lüks düğün trendleri, editoryal konseptler ve haute couture gelinlik stilleri üzerine yazılar kaleme alıyor.',
    articleCount: 42
  },
  'wedy-ai-editorial': {
    id: 'a-2',
    name: 'WedyAI Trend Analisti',
    title: 'Yapay Zeka Sektör & Bütçe Araştırmacısı',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'WedyPlan veri ekosistemindeki binlerce organizasyon trendini ve bütçe sapmalarını analiz ederek rehber içerikler üretiyor.',
    articleCount: 128
  }
};

export const MAGAZINE_CATEGORIES: MagazineCategory[] = [
  { id: 'c-all', name: 'Tüm Konular', slug: '', description: 'Tüm editoryal yazılar ve trendler' },
  { id: 'c-trend', name: '2026 Trendleri', slug: 'trendler', description: 'Geleceğin düğün konseptleri ve renk paletleri' },
  { id: 'c-fashion', name: 'Gelinlik & Stil', slug: 'gelinlik-stil', description: 'Haute couture, makyaj ve aksesuar tüyoları' },
  { id: 'c-venue', name: 'Mekan & Süsleme', slug: 'mekan-susleme', description: 'Kır bahçeleri, cam balo salonları ve çiçek tasarımı' },
  { id: 'c-guide', name: 'Bütçe & Planlama', slug: 'butce-planlama', description: 'Stressiz ve sapmasız düğün yönetimi rehberleri' }
];

export const EDITORIAL_GUIDES: EditorialGuide[] = [
  {
    id: 'g-1',
    title: '12 Aylık Adım Adım Düğün Planlama Rehberi',
    subtitle: 'Nişandan düğün gününe kadar yapılması gereken her şeyin kronolojik listesi.',
    stepCount: 12,
    coverUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    slug: '12-aylik-dugun-planlama-rehberi'
  },
  {
    id: 'g-2',
    title: 'Düğün Bütçesini %20 Korumanın 8 Altın Kuralı',
    subtitle: 'WedyAI tarafından doğrulanmış bütçe tasarrufu ve gizli masraf önleme taktikleri.',
    stepCount: 8,
    coverUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    slug: 'butce-koruma-rehberi'
  }
];

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    id: 'art-101',
    slug: '2026-botanik-kir-dugunu-trendleri',
    title: '2026 Botanik Kır Düğünü Trendleri: Naturel Lüks ve Gece Işıklandırmaları',
    excerpt: 'Yeni sezonda gösterişli süslemeler yerini doğayla bütünleşen botanik konseptlere, canlı Orkide aranjmanlarına ve mimari cam yapılara bırakıyor.',
    contentHtml: `
      <p class="lead text-[18px] font-serif leading-relaxed text-[#1D1D1F]">
        Düğün dünyası hızlı bir estetik dönüşümden geçiyor. Şatafatlı ve yapay detaylar yerini editoryal zarafete, organik dokulara ve kişiselleştirilmiş ışık tasarımlarına bırakıyor.
      </p>
      <h3 class="text-[22px] font-serif font-bold text-[#1D1D1F] mt-6 mb-3">1. Organik Çiçek Mimarisi ve Yüzen Masalar</h3>
      <p class="text-[15px] leading-relaxed text-[#6E6E73] font-light">
        Klasik masa üstü şamdanların yerini tavandan sarkan canlı yeşillikler ve doğal tarla çiçekleri alıyor. Bu yaklaşım, davetlilerin görüş açısını kapatmadan mekana derinlik katıyor.
      </p>
      <h3 class="text-[22px] font-serif font-bold text-[#1D1D1F] mt-6 mb-3">2. Gece Aydınlatmasında Amber ve Mum Sıcaklığı</h3>
      <p class="text-[15px] leading-relaxed text-[#6E6E73] font-light">
        Fotoğraf ve video kalitesini belirleyen en kritik unsur doğru ışıklandırmadır. 2026 kır düğünlerinde sıcak mum tonları ve dimlenebilir mikro LED mimarileri ön planda.
      </p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80',
    category: '2026 Trendleri',
    categorySlug: 'trendler',
    readTimeMinutes: 5,
    publishedAt: '24 Temmuz 2026',
    author: MAGAZINE_AUTHORS['selen-arslan'],
    isFeatured: true,
    isTrending: true,
    tags: ['Kır Düğünü', 'Botanik', '2026 Trendleri', 'Dekorasyon']
  },
  {
    id: 'art-102',
    slug: 'haute-couture-gelinlik-secerken-dikkat-edilmesi-gerekenler',
    title: 'Haute Couture Gelinlik Seçerken Dikkat Edilmesi Gereken 5 İlke',
    excerpt: 'Vücut tipinize, mekanın dokusuna ve düğün konseptinize en uygun özel dikim gelinliği bulmanın editoryal sırları.',
    contentHtml: `
      <p class="text-[15px] leading-relaxed text-[#6E6E73]">
        Gelinlik seçimi bir elbise satın almaktan öte, kişisel tarzınızın ve düğün hikayenizin en güçlü dışa vurumudur.
      </p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1200&q=80',
    category: 'Gelinlik & Stil',
    categorySlug: 'gelinlik-stil',
    readTimeMinutes: 4,
    publishedAt: '20 Temmuz 2026',
    author: MAGAZINE_AUTHORS['selen-arslan'],
    isFeatured: false,
    isTrending: true,
    tags: ['Gelinlik', 'Moda', 'Haute Couture', 'Stil']
  },
  {
    id: 'art-103',
    slug: 'dugun-gunu-zaman-akisi-nasil-planlanir',
    title: 'Düğün Günü Stresini Sıfırlayan Dakika Dakika Zaman Akışı',
    excerpt: 'Kuaför hazırlığından ilk karşılaşmaya, nikah kıyımından after party geçişine kadar saatlik kusursuz akış planı.',
    contentHtml: `
      <p class="text-[15px] leading-relaxed text-[#6E6E73]">
        Düğün gününün en büyük düşmanı zaman yönetimsizliğidir. Doğru bir akış planıyla gününüzü bir koşturmacaya değil, unutulmaz bir festivale dönüştürün.
      </p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
    category: 'Bütçe & Planlama',
    categorySlug: 'butce-planlama',
    readTimeMinutes: 6,
    publishedAt: '18 Temmuz 2026',
    author: MAGAZINE_AUTHORS['wedy-ai-editorial'],
    isFeatured: false,
    isTrending: true,
    tags: ['Zaman Akışı', 'Planlama', 'Düğün Günü']
  }
];