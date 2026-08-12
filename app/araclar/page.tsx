"use client";

import React, { useState } from "react";
import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/homepage/PublicFooter";

export default function PlanlamaStudyoPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  const tools = [
    { title: "Özel Düğün Web Sitesi", badge: "Web Tasarım", desc: "Davetlilerinize özel fotoğraflarınız, aşk hikayeniz, etkinlik takvimi ve dijital LCV formu içeren kişisel web sitenizi oluşturun." },
    { title: "Bütçe Hesaplayıcı", badge: "Finans Yönetimi", desc: "Düğün harcamalarınızı kategoriler halinde detaylıca takip edin, limitlerinizi aşmadan akıllıca planlayın." },
    { title: "Masa & Oturma Planı", badge: "Davetli Düzeni", desc: "Masa düzenini ve davetli listelerinizi sürükle-bırak kolaylığıyla saniyeler içinde görselleştirip organize edin." },
    { title: "Dijital Davetiye & LCV", badge: "İnteraktif Davet", desc: "WhatsApp ve sosyal medyadan kolayca gönderebileceğiniz, anlık katılım yanıtı toplayan özel dijital davetiyeler." },
    { title: "Düğün Kontrol Listesi", badge: "Zaman Tüneli", desc: "Aydan aya ve haftadan haftaya yapılması gereken tüm görevleri zamanında tamamlayarak stresi ortadan kaldırın." },
    { title: "Sözleşme & Teklif Kasası", badge: "Güvenli Depo", desc: "Firmalardan aldığınız fiyat tekliflerini, paket detaylarını ve imzalanan e-sözleşmeleri tek bir dijital kasada saklayın." },
  ];

  return (
    <div className="apple-page">
      <PublicNavbar mode="public" />

      <section className="relative overflow-hidden px-4 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <p className="apple-kicker">Planlama stüdyosu</p>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-[#1d1d1f] md:text-6xl">
            Düğününüzü dijital çağın
            <br />
            zarafetiyle tasarlayın.
          </h1>
          <p className="mx-auto max-w-2xl text-[17px] font-normal leading-relaxed text-[#86868b] md:text-[21px]">
            Düğün sürecinizi baştan sona organize eden profesyonel planlama araçlarımıza tek bir dokunuşla ücretsiz erişin.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div key={tool.title} className="apple-glass apple-card group relative flex flex-col justify-between p-8">
              <div className="space-y-4">
                <span className="apple-chip">{tool.badge}</span>
                <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">{tool.title}</h3>
                <p className="text-[14px] font-normal leading-relaxed text-[#86868b]">{tool.desc}</p>
              </div>
              <div className="mt-4 border-t border-black/8 pt-6">
                <button
                  type="button"
                  onClick={() => { setSelectedTool(tool.title); setIsSubmitted(false); }}
                  className="apple-link inline-flex items-center gap-2 text-[14px]"
                >
                  <span>Kullanmaya başla</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-md">
          <div className="apple-glass apple-card relative w-full max-w-lg space-y-6 p-8 md:p-10">
            <button
              onClick={() => setSelectedTool(null)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-sm text-[#86868b] hover:bg-black/10"
            >
              ✕
            </button>

            {!isSubmitted ? (
              <>
                <div className="space-y-2">
                  <span className="apple-chip">{selectedTool}</span>
                  <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] md:text-3xl">Hızlıca başlayın</h3>
                  <p className="text-[13px] leading-relaxed text-[#86868b]">Formu doldurarak bu aracı ve tüm WedyPlan stüdyo araçlarını anında kullanmaya başlayın.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="apple-label">Adınız Soyadınız</label>
                    <input type="text" placeholder="Gelin veya Damat Adı" required className="apple-input" />
                  </div>
                  <div>
                    <label className="apple-label">E-posta Adresiniz</label>
                    <input type="email" placeholder="ornek@gmail.com" required className="apple-input" />
                  </div>
                  <div>
                    <label className="apple-label">Planlanan Düğün Tarihi (Opsiyonel)</label>
                    <input type="date" className="apple-input" />
                  </div>
                  <button type="submit" className="apple-btn mt-2">
                    Aracı kilidini aç ve kullanmaya başla
                  </button>
                </form>
              </>
            ) : (
              <div className="space-y-4 py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0071e3]/10 text-xl font-semibold text-[#0071e3]">✓</div>
                <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">Erişim sağlandı</h3>
                <p className="mx-auto max-w-xs text-[13px] text-[#86868b]">Hesabınız oluşturuldu. Tüm stüdyo araçları aktif ediliyor, sayfa yönlendiriliyor...</p>
              </div>
            )}
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
