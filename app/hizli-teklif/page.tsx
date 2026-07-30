"use client";

import React, { useState } from "react";
import PublicNavbar from "@/components/public/PublicNavbar";

export default function SihirliTeklifPage() {
  const [submitted, setStepSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStepSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 font-sans antialiased">
      <PublicNavbar mode="public" />

      <main className="pt-32 pb-20 px-4 max-w-3xl mx-auto space-y-8">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-neutral-200/80 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">
              HIZLI TEKLİF FORMU
            </span>
            <h1 className="text-3xl md:text-4xl font-serif text-neutral-900">
              Tek Tıkla Özel Fiyat Teklifleri Alın
            </h1>
            <p className="text-neutral-600 text-xs md:text-sm max-w-lg mx-auto">
              İhtiyacınızı seçin, seçkin firmalar size özel teklifler sunsun. Formu tamamladığınızda hesabınız otomatik oluşturulacaktır.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Adınız Soyadınız</label>
                  <input
                    type="text"
                    placeholder="Elif Yılmaz"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">E-posta Adresiniz</label>
                  <input
                    type="email"
                    placeholder="elif@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Telefon Numarası</label>
                  <input
                    type="tel"
                    placeholder="0532 000 00 00"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Hizmet Şehri</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-700">
                    <option>İstanbul</option>
                    <option>Ankara</option>
                    <option>İzmir</option>
                    <option>Bursa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Aradığınız İhtiyaçlar</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-neutral-700 pt-1">
                  {["Düğün Mekanları", "Düğün Hikayesi & Fotoğraf", "Gelinlik & Moda", "Organizasyon & Süsleme", "Çeyiz Ürünleri", "Canlı Müzik & DJ"].map((service, i) => (
                    <label key={i} className="flex items-center gap-2 p-3 border border-neutral-200 rounded-xl cursor-pointer hover:bg-rose-50/50">
                      <input type="checkbox" className="accent-rose-600" />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-lg mt-4"
              >
                Teklif İstiyorum & Hesabımı Oluştur →
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-serif text-neutral-900">Talebiniz Başarıyla Alındı</h3>
              <p className="text-xs text-neutral-600 max-w-md mx-auto">
                Hesabınız otomatik oluşturuldu. Şifreniz e-posta adresinize gönderildi. Firmalardan gelen teklifleri panellerinizden takip edebilirsiniz.
              </p>
              <div className="pt-4">
                <a href="/giris" className="px-6 py-3 bg-neutral-900 text-white rounded-full text-xs font-semibold inline-block">
                  Çift Paneline Giriş Yap →
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}