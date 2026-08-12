'use client';

import React, { useState } from 'react';
import PublicNavbar from '@/components/public/PublicNavbar';

export default function FirmaOnboardingPage() {
  const [step, setStep] = useState(1);

  const steps = ['İşletme', 'Hizmet', 'Onay'];

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <PublicNavbar mode="vendor" />

      <main className="mx-auto max-w-[560px] px-5 py-16">
        <div className="mb-8 flex items-center justify-center gap-2">
          {steps.map((label, index) => {
            const n = index + 1;
            const active = step >= n;
            return (
              <span
                key={label}
                className={`rounded-full px-3 py-1 text-[12px] ${
                  active ? 'bg-[#1d1d1f] text-white' : 'bg-black/5 text-[#86868b]'
                }`}
              >
                {n}. {label}
              </span>
            );
          })}
        </div>

        <div className="apple-glass rounded-[28px] px-7 py-9 sm:px-9">
          <div className="mb-8 text-center">
            <p className="mb-2 text-[12px] tracking-[0.08em] text-[#86868b]">Partner başvurusu</p>
            <h1 className="text-[32px] font-semibold tracking-[-0.03em] sm:text-[40px]">
              WedyPlan’e katılın
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#86868b]">
              Birkaç sade adımda işletmenizi platforma alın.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="apple-label">Yetkili adı</label>
                    <input type="text" placeholder="Ahmet Yılmaz" className="apple-input" required />
                  </div>
                  <div>
                    <label className="apple-label">Ticari unvan</label>
                    <input type="text" placeholder="Grand Bosphorus Davet" className="apple-input" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="apple-label">E-posta</label>
                    <input type="email" placeholder="kurumsal@isletmeniz.com" className="apple-input" required />
                  </div>
                  <div>
                    <label className="apple-label">Telefon</label>
                    <input type="tel" placeholder="0532 000 00 00" className="apple-input" required />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)} className="apple-btn mt-2">
                  Devam et
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="apple-label">Hizmet kategorisi</label>
                  <select className="apple-input">
                    <option>Düğün Salonu / Mekan</option>
                    <option>Fotoğraf & Video Stüdyosu</option>
                    <option>Organizasyon & Süsleme</option>
                    <option>Gelinlik & Moda Evi</option>
                    <option>Müzik & DJ Hizmetleri</option>
                    <option>Catering & İkram</option>
                  </select>
                </div>
                <div>
                  <label className="apple-label">Şehir / bölge</label>
                  <input type="text" placeholder="İstanbul / Beşiktaş" className="apple-input" required />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(1)} className="apple-btn-secondary w-1/3">
                    Geri
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="apple-btn w-2/3">
                    İncele
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-6 py-2 text-center">
                <p className="text-[17px] font-medium tracking-[-0.02em]">Başvurunuz hazır</p>
                <p className="text-[14px] leading-relaxed text-[#86868b]">
                  Gönderdiğinizde ekibimiz başvuruyu inceler.
                </p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="apple-btn-secondary w-1/3">
                    Geri
                  </button>
                  <button type="submit" className="apple-btn w-2/3">
                    Gönder
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
