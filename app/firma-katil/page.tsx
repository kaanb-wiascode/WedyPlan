import React from "react";
import PublicNavbar from "@/components/public/PublicNavbar";

export default function FirmaKatilPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 antialiased selection:bg-rose-100 selection:text-rose-900">
      {/* Güncellenmiş B2B Menü */}
      <PublicNavbar mode="vendor" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-xs font-semibold text-rose-700 shadow-sm">
            <span>✨ WedyPlan Partner Ekosistemi & WOS</span>
          </div>

          {/* Başlık */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.15]">
            Sadece Müşteri Bulmayın. <br />
            <span className="italic bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 bg-clip-text text-transparent">
              Düğün İşletmenizi Dijitalleştirin.
            </span>
          </h1>

          {/* Açıklama */}
          <p className="max-w-2xl mx-auto text-base md:text-lg text-neutral-600 font-normal leading-relaxed">
            Binlerce evlenecek çiftle anında buluşun; kaporadan çakışmasız saat
            slotu takvimine ve e-imza sözleşmelere kadar tüm operasyonunuzu tek
            platformdan yönetin.
          </p>

          {/* CTA Buton - Onboarding Sayfasına Yönlendirir */}
          <div className="pt-4">
            <a
              href="/firma-katil/onboarding"
              className="inline-flex items-center gap-3 px-8 py-4 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Hemen Ücretsiz Başvurun
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Başarı Hikayeleri - Bento Glassmorphism */}
      <section id="referanslar" className="py-20 bg-neutral-900 text-white relative">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              BAŞARI HİKAYELERİ
            </span>
            <h2 className="text-3xl md:text-5xl font-serif">
              Partnerlerimiz Neler Söyledi?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">★★★★★</div>
              <p className="text-neutral-300 text-sm leading-relaxed">
                "WedyPlan sayesinde rezervasyon takvimimiz %40 oranında doldu. Otomatik teklif ve e-sözleşme modülü işimizi muazzam kolaylaştırdı."
              </p>
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-semibold text-white">Grand Bosphorus Davet</h4>
                <p className="text-xs text-neutral-400">İstanbul — Düğün Salonu</p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">★★★★★</div>
              <p className="text-neutral-300 text-sm leading-relaxed">
                "Çiftlerle mesajlaşma ve depozito ödemelerini tek yerden almak operasyon maliyetlerimizi yarı yarıya düşürdü."
              </p>
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-semibold text-white">Lumière Photography</h4>
                <p className="text-xs text-neutral-400">İzmir — Fotoğraf Stüdyosu</p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">★★★★★</div>
              <p className="text-neutral-300 text-sm leading-relaxed">
                "Gelen talepler doğrudan nitelikli çiftlerden oluşuyor. Dönüşüm oranlarımız hiç olmadığı kadar yüksek."
              </p>
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-semibold text-white">Green Garden Kır Bahçesi</h4>
                <p className="text-xs text-neutral-400">Ankara — Kır Mekanı</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}