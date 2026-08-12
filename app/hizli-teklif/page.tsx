"use client";

import React, { useState } from "react";
import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/homepage/PublicFooter";

export default function SihirliTeklifPage() {
  const [submitted, setStepSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStepSubmitted(true);
  };

  return (
    <div className="apple-page">
      <PublicNavbar mode="public" />

      <main className="mx-auto max-w-3xl space-y-8 px-4 pb-20 pt-16">
        <div className="apple-glass apple-card space-y-8 p-8 md:p-12">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
              Tek tıkla özel fiyat teklifleri alın
            </h1>
            <p className="mx-auto max-w-lg text-[14px] text-[#86868b]">
              İhtiyacınızı seçin, seçkin firmalar size özel teklifler sunsun. Formu tamamladığınızda hesabınız otomatik oluşturulacaktır.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="apple-label">Adınız Soyadınız</label>
                  <input type="text" placeholder="Elif Yılmaz" className="apple-input" required />
                </div>
                <div>
                  <label className="apple-label">E-posta Adresiniz</label>
                  <input type="email" placeholder="elif@gmail.com" className="apple-input" required />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="apple-label">Telefon Numarası</label>
                  <input type="tel" placeholder="0532 000 00 00" className="apple-input" required />
                </div>
                <div>
                  <label className="apple-label">Hizmet Şehri</label>
                  <select className="apple-input">
                    <option>İstanbul</option>
                    <option>Ankara</option>
                    <option>İzmir</option>
                    <option>Bursa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="apple-label">Aradığınız İhtiyaçlar</label>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[13px] font-medium text-[#1d1d1f]">
                  {["Düğün Mekanları", "Düğün Hikayesi & Fotoğraf", "Gelinlik & Moda", "Organizasyon & Süsleme", "Çeyiz Ürünleri", "Canlı Müzik & DJ"].map((service) => (
                    <label key={service} className="flex cursor-pointer items-center gap-2 rounded-xl border border-black/8 bg-white/40 p-3 hover:bg-white/70">
                      <input type="checkbox" className="accent-[#0071e3]" />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="apple-btn mt-4">
                Teklif istiyorum ve hesabımı oluştur
              </button>
            </form>
          ) : (
            <div className="space-y-4 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0071e3]/10 text-xl font-semibold text-[#0071e3]">✓</div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">Talebiniz başarıyla alındı</h3>
              <p className="mx-auto max-w-md text-[13px] text-[#86868b]">
                Hesabınız otomatik oluşturuldu. Şifreniz e-posta adresinize gönderildi. Firmalardan gelen teklifleri panellerinizden takip edebilirsiniz.
              </p>
              <div className="pt-4">
                <a href="/giris" className="apple-btn apple-btn-inline">Çift paneline giriş yap</a>
              </div>
            </div>
          )}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
