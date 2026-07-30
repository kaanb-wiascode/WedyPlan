"use client";

import React, { useState } from "react";
import PublicNavbar from "@/components/public/PublicNavbar";

export default function PlanlamaStudyoPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Form tamamlandıktan sonra kullanıcı oturumunu aktifleştirip sayfayı yeniliyoruz
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  const tools = [
    {
      title: "Özel Düğün Web Sitesi",
      badge: "Web Tasarım",
      desc: "Davetlilerinize özel fotoğraflarınız, aşk hikayeniz, etkinlik takvimi ve dijital LCV formu içeren kişisel web sitenizi oluşturun.",
    },
    {
      title: "Bütçe Hesaplayıcı",
      badge: "Finans Yönetimi",
      desc: "Düğün harcamalarınızı kategoriler halinde detaylıca takip edin, limitlerinizi aşmadan akıllıca planlayın.",
    },
    {
      title: "Masa & Oturma Planı",
      badge: "Davetli Düzeni",
      desc: "Masa düzenini ve davetli listelerinizi sürükle-bırak kolaylığıyla saniyeler içinde görselleştirip organize edin.",
    },
    {
      title: "Dijital Davetiye & LCV",
      badge: "İnteraktif Davet",
      desc: "WhatsApp ve sosyal medyadan kolayca gönderebileceğiniz, anlık katılım yanıtı toplayan özel dijital davetiyeler.",
    },
    {
      title: "Düğün Kontrol Listesi",
      badge: "Zaman Tüneli",
      desc: "Aydan aya ve haftadan haftaya yapılması gereken tüm görevleri zamanında tamamlayarak stresi ortadan kaldırın.",
    },
    {
      title: "Sözleşme & Teklif Kasası",
      badge: "Güvenli Depo",
      desc: "Firmalardan aldığınız fiyat tekliflerini, paket detaylarını ve imzalanan e-sözleşmeleri tek bir dijital kasada saklayın.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-900">
      {/* Üst Navigasyon */}
      <PublicNavbar mode="public" />

      {/* Hero Header */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-xs font-semibold text-rose-700 shadow-sm">
            <span>AKILLI DÜĞÜN PLANLAMA STÜDYOSU</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.15] text-neutral-900">
            Düğününüzü Dijital Çağın <br />
            <span className="italic bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 bg-clip-text text-transparent">
              Zarafetiyle Tasarlayın
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-neutral-600 font-normal leading-relaxed">
            Düğün sürecinizi baştan sona organize eden profesyonel planlama araçlarımıza tek bir dokunuşla ücretsiz erişin.
          </p>
        </div>
      </section>

      {/* Şık Araç Kartları Grid */}
      <section className="pb-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-neutral-200/80 shadow-sm hover:shadow-2xl hover:border-rose-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-semibold text-neutral-600 group-hover:bg-rose-50 group-hover:text-rose-700 transition-colors">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-2xl text-neutral-900 group-hover:text-rose-950 transition-colors">
                  {tool.title}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {tool.desc}
                </p>
              </div>

              {/* Tıklandığında Sayfa İçi Apple Stil Modal Açan Buton */}
              <div className="pt-6 mt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTool(tool.title);
                    setIsSubmitted(false);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-rose-600 transition-colors"
                >
                  <span>Kullanmaya Başla</span>
                  <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🍏 APPLE CAM STİLİNDE (GLASSMORPHISM) INTERAKTIF MODAL FORM */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white/85 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-white/60 shadow-2xl space-y-6">
            
            {/* Kapatma Butonu */}
            <button
              onClick={() => setSelectedTool(null)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-colors text-sm"
            >
              ✕
            </button>

            {!isSubmitted ? (
              <>
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                    {selectedTool}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-neutral-900">
                    Hızlıca Başlayın
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Formu doldurarak bu aracı ve tüm WedyPlan stüdyo araçlarını anında kullanmaya başlayın.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Adınız Soyadınız</label>
                    <input
                      type="text"
                      placeholder="Gelin veya Damat Adı"
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">E-posta Adresiniz</label>
                    <input
                      type="email"
                      placeholder="ornek@gmail.com"
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Planlanan Düğün Tarihi (Opsiyonel)</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-2xl transition-all shadow-lg hover:shadow-xl mt-2"
                  >
                    Aracı Kilidini Aç & Kullanmaya Başla →
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-serif text-neutral-900">Erişim Sağlandı!</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Hesabınız oluşturuldu. Tüm stüdyo araçları aktif ediliyor, sayfa yönlendiriliyor...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}