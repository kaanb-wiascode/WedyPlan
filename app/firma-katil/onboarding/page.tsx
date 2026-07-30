"use client";

import React, { useState } from "react";
import PublicNavbar from "@/components/public/PublicNavbar";

export default function FirmaOnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 antialiased">
      <PublicNavbar mode="vendor" />

      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto space-y-8">
        {/* Adım Göstergesi (Stepper) */}
        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-neutral-500">
          <span className={`px-3 py-1 rounded-full ${step >= 1 ? "bg-neutral-900 text-white" : "bg-neutral-200"}`}>
            1. İşletme Bilgileri
          </span>
          <span className="text-neutral-300">—</span>
          <span className={`px-3 py-1 rounded-full ${step >= 2 ? "bg-neutral-900 text-white" : "bg-neutral-200"}`}>
            2. Hizmet & Kategori
          </span>
          <span className="text-neutral-300">—</span>
          <span className={`px-3 py-1 rounded-full ${step >= 3 ? "bg-neutral-900 text-white" : "bg-neutral-200"}`}>
            3. Onay & Tamamlama
          </span>
        </div>

        {/* Ana Form Kartı - Modern Glass & Border Stili */}
        <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-neutral-200/80 shadow-2xl shadow-black/5 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">
              PARTNER ONBOARDING
            </span>
            <h1 className="text-3xl md:text-4xl font-serif text-neutral-900">
              WedyPlan Ekosistemine Katılın
            </h1>
            <p className="text-neutral-600 text-sm max-w-lg mx-auto">
              İşletmenizi dijitalleştirin, çiftlerle anında buluşun ve tüm operasyonunuzu WOS ile yönetin.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Yetkili Adı Soyadı</label>
                    <input
                      type="text"
                      placeholder="Ahmet Yılmaz"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-sm bg-neutral-50/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">İşletme Ticari Unvanı</label>
                    <input
                      type="text"
                      placeholder="Grand Bosphorus Davet A.Ş."
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-sm bg-neutral-50/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">E-posta Adresi</label>
                    <input
                      type="email"
                      placeholder="kurumsal@isletmeniz.com"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-sm bg-neutral-50/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Telefon Numarası</label>
                    <input
                      type="tel"
                      placeholder="0532 000 00 00"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-sm bg-neutral-50/50"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-4 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-lg hover:shadow-xl mt-4"
                >
                  Devam Et →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Hizmet Kategorisi</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-sm bg-neutral-50/50 text-neutral-700">
                    <option>Düğün Salonu / Mekan</option>
                    <option>Fotoğraf & Video Stüdyosu</option>
                    <option>Organizasyon & Süsleme</option>
                    <option>Gelinlik & Moda Evi</option>
                    <option>Müzik & DJ Hizmetleri</option>
                    <option>Catering & İkram</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Şehir / Bölge</label>
                  <input
                    type="text"
                    placeholder="İstanbul / Beşiktaş"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-sm bg-neutral-50/50"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-4 text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all"
                  >
                    ← Geri
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-2/3 py-4 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    Başvuruyu İncele →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-neutral-900">Başvurunuz Alınmaya Hazır</h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto">
                    Aşağıdaki butona tıkladığınızda başvurunuz değerlendirilmek üzere uzman ekibimize iletilecektir.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-4 text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all"
                  >
                    ← Geri
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-4 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    Başvuruyu Tamamla & Gönder →
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}