'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Button } from '@/components/shared/ui/Button';
import { 
  ImageIcon, 
  Video, 
  UploadCloud, 
  Star, 
  Trash2, 
  HelpCircle, 
  Plus, 
  Check, 
  Sparkles,
  Save,
  Tag,
  PlayCircle
} from 'lucide-react';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  tag: string;
  isFeatured: boolean;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Sektörde En Çok Sorulan Hazır SSS Şablonları
const PRESET_FAQS = [
  {
    q: 'Kötü hava koşullarına karşı ne gibi önlemleriniz var?',
    a: 'Açık hava alanlarımızda gerçekleşecek organizasyonlar için aynı kapasitede yedek kapalı balo salonumuz tahsis edilmektedir.',
  },
  {
    q: 'Ön ödeme ve taksit seçenekleriniz nelerdir?',
    a: 'Sözleşme aşamasında %30 kapora alınmakta, kalan tutar düğün haftasına kadar taksitlendirilebilmektedir.',
  },
  {
    q: 'Menü tadımı etkinliği ne zaman yapılıyor?',
    a: 'Düğün tarihinizden 1 ay önce 4 kişilik menü tadım davetimize katılarak menü içeriğinizi kişiselleştirebilirsiniz.',
  },
];

const GALLERY_TAGS = ['Genel', 'Masa Düzeni', 'Gelin Yolu', 'Giriş & Lobi', 'Yemek Sunumu', 'Gece / Işıklandırma'];

export function MediaAndShowcaseTab() {
  // 1. Kapak & Video State'leri
  const [coverImage, setCoverImage] = useState<string>(
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
  );
  const [promoVideoUrl, setPromoVideoUrl] = useState<string>(
    'https://www.youtube.com/watch?v=sample-wedding-video'
  );

  // 2. Galeri Fotoğrafları State'i
  const [gallery, setGallery] = useState<GalleryItem[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600',
      title: 'Balo Salonu Masa Düzeni',
      tag: 'Masa Düzeni',
      isFeatured: true,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
      title: 'Gelin Yolu Süslemesi',
      tag: 'Gelin Yolu',
      isFeatured: false,
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600',
      title: 'Karşılama Kokteyli',
      tag: 'Yemek Sunumu',
      isFeatured: false,
    },
  ]);

  // 3. SSS (Sıkça Sorulan Sorular) State'i
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      id: '1',
      question: 'Kötü hava koşullarına karşı ne gibi önlemleriniz var?',
      answer: 'Açık hava organizasyonlarımızda olumsuz hava şartlarına karşı kapalı balo salonumuz yedek olarak hazır tutulmaktadır.',
    },
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  // Yıldızlama (Öne Çıkarma)
  const toggleFeatureImage = (id: string) => {
    setGallery((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFeatured: !item.isFeatured } : item
      )
    );
  };

  // Fotoğraf Silme
  const removeImage = (id: string) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  // SSS Ekleme
  const handleAddFaq = (q?: string, a?: string) => {
    const questionToAdd = q || newQuestion;
    const answerToAdd = a || newAnswer;

    if (!questionToAdd || !answerToAdd) return;

    setFaqs((prev) => [
      ...prev,
      { id: Date.now().toString(), question: questionToAdd, answer: answerToAdd },
    ]);

    setNewQuestion('');
    setNewAnswer('');
    setIsAddingFaq(false);
  };

  const removeFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. HERO KAPAK GÖRSELİ VE TANITIM VİDEOSU */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200/60 dark:border-zinc-800 pb-3">
          <ImageIcon className="w-5 h-5 text-rose-500" />
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Vitrin Kapak Görseli & Tanıtım Videosu
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Çiftler profilinizi ziyaret ettiğinde en üstte dönecek olan vitrin medyasını belirleyin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ana Kapak Görseli */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Ana Vitrin Görseli
            </label>
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 dark:border-zinc-700 group bg-slate-50 dark:bg-zinc-800/50 flex items-center justify-center">
              {coverImage ? (
                <>
                  <img
                    src={coverImage}
                    alt="Vitrin Kapak"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="glass"
                      onClick={() => setCoverImage('')}
                      className="text-white border-white/40"
                    >
                      Görseli Değiştir
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <UploadCloud className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Kapak görseli yüklemek için tıklayın
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">Önerilen boyut: 1920x1080 (Maks 10MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* Tanıtım Videosu URL */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-rose-500" />
              Tanıtım / Tanıtım Filmi Bağlantısı (YouTube / Vimeo)
            </label>
            <input
              type="text"
              value={promoVideoUrl}
              onChange={(e) => setPromoVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            {promoVideoUrl && (
              <div className="p-3 bg-rose-50/60 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/40 flex items-center gap-2.5 text-xs text-rose-900 dark:text-rose-200">
                <PlayCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Tanıtım videonuz profil sayfasının en üst bölümünde oynatıcı olarak görünecektir.</span>
              </div>
            )}
          </div>
        </div>
      </GlassCard>

      {/* 2. GALERİ VE FOTOĞRAF YÖNETİMİ */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200/60 dark:border-zinc-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-rose-500" />
              Fotoğraf Galerisi ({gallery.length} Görsel)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Yüksek kaliteli fotoğraflar yükleyin ve öne çıkarmak istediklerinizi yıldızlayın.
            </p>
          </div>

          <Button className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 text-xs">
            <UploadCloud className="w-4 h-4" />
            Fotoğraf Yükle
          </Button>
        </div>

        {/* Görsel Grid Listesi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="group relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-700/80 bg-slate-50 dark:bg-zinc-800 shadow-xs"
            >
              <div className="aspect-4/3 overflow-hidden relative">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Yıldızlanmış Rozet */}
                {img.isFeatured && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-current" />
                    Öne Çıkan
                  </div>
                )}

                {/* Aksiyon Butonları */}
                <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => toggleFeatureImage(img.id)}
                    className={`p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                      img.isFeatured
                        ? 'bg-amber-500 text-white'
                        : 'bg-black/50 text-white hover:bg-amber-500'
                    }`}
                    title="Öne Çıkar"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="p-1.5 bg-black/50 hover:bg-rose-600 text-white rounded-lg backdrop-blur-md transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Alt Etiket ve Başlık */}
              <div className="p-3 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {img.title}
                </span>
                <span className="text-[10px] font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Tag className="w-2.5 h-3" />
                  {img.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 3. SIKÇA SORULAN SORULAR (SSS) */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-rose-500" />
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Sıkça Sorulan Sorular (SSS)
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Çiftlerin en çok sorduğu soruları yanıtlayarak hızlı karar vermelerini sağlayın.
              </p>
            </div>
          </div>

          {!isAddingFaq && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingFaq(true)}
              className="text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Soru Ekle
            </Button>
          )}
        </div>

        {/* Hazır Soru Önerileri (Preset Chips) */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Hızlı Ekleme Önerileri:
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESET_FAQS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddFaq(preset.q, preset.a)}
                className="text-[11px] bg-slate-100 hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-rose-950/40 text-gray-700 dark:text-gray-300 hover:text-rose-600 px-3 py-1.5 rounded-full border border-slate-200 dark:border-zinc-700 transition-all flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                {preset.q}
              </button>
            ))}
          </div>
        </div>

        {/* Yeni Soru Formu */}
        {isAddingFaq && (
          <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/40 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Soru
              </label>
              <input
                type="text"
                placeholder="Örn: İptal ve iade koşullarınız nelerdir?"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Cevap
              </label>
              <textarea
                rows={2}
                placeholder="Cevabınızı detaylıca açıklayın..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsAddingFaq(false)}>
                Vazgeç
              </Button>
              <Button size="sm" onClick={() => handleAddFaq()} className="bg-rose-600 text-white">
                Soruyu Ekle
              </Button>
            </div>
          </div>
        )}

        {/* Mevcut SSS Listesi */}
        <div className="space-y-3 pt-2">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white/40 dark:bg-zinc-800/40 flex justify-between items-start gap-4"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  {faq.question}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 pl-5">
                  {faq.answer}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFaq(faq.id)}
                className="text-gray-400 hover:text-rose-600 p-1 rounded-lg transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Genel Kaydet Butonu */}
      <div className="flex justify-end pt-2">
        <Button className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 px-6">
          <Save className="w-4 h-4" />
          Vitrin & Medya Değişikliklerini Kaydet
        </Button>
      </div>

    </div>
  );
}