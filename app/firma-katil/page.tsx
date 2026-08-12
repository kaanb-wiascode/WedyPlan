import React from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/public/PublicNavbar';

const stories = [
  {
    quote:
      'Rezervasyon takvimimiz doldu. Teklif ve sözleşme adımları sadeleşti.',
    name: 'Grand Bosphorus Davet',
    place: 'İstanbul — Düğün Salonu',
  },
  {
    quote: 'Mesajlaşma ve depozitoyu tek yerden yönetmek operasyonu hızlandırdı.',
    name: 'Lumière Photography',
    place: 'İzmir — Fotoğraf Stüdyosu',
  },
  {
    quote: 'Gelen talepler nitelikli. Dönüşüm oranımız yükseldi.',
    name: 'Green Garden Kır Bahçesi',
    place: 'Ankara — Kır Mekanı',
  },
];

export default function FirmaKatilPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <PublicNavbar mode="vendor" />

      <section className="relative overflow-hidden px-5 pb-24 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#0071e3]/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-[12px] tracking-[0.08em] text-[#86868b]">WedyPlan Partner</p>
          <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] text-[#1d1d1f] sm:text-[56px] md:text-[64px]">
            İşletmenizi
            <br />
            dijitalleştirin.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#86868b] sm:text-[19px]">
            Çiftlerle buluşun. Takvim, kapora ve sözleşmeyi tek yerden yönetin.
          </p>
          <div className="mt-8">
            <Link href="/firma-katil/onboarding" className="apple-btn mx-auto w-auto px-7">
              Ücretsiz başvurun
            </Link>
          </div>
        </div>
      </section>

      <section id="referanslar" className="px-5 pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-center text-[12px] tracking-[0.08em] text-[#86868b]">Hikayeler</p>
          <h2 className="mb-10 text-center text-[32px] font-semibold tracking-[-0.03em] sm:text-[40px]">
            Partnerlerimiz.
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {stories.map((item) => (
              <article key={item.name} className="apple-glass rounded-[28px] p-7">
                <p className="text-[17px] leading-relaxed tracking-[-0.015em] text-[#1d1d1f]">
                  “{item.quote}”
                </p>
                <div className="mt-6 border-t border-black/5 pt-4">
                  <h3 className="text-[14px] font-medium">{item.name}</h3>
                  <p className="text-[12px] text-[#86868b]">{item.place}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
