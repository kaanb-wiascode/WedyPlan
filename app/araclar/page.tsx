import React from "react";
import Link from "next/link";
import PublicNavbar from "@/components/public/PublicNavbar";

export default function PlanlamaStudyoPage() {
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
            Düğün sürecinizi baştan sona organize eden profesyonel planlama araçlarımıza tek bir üyelikle anında erişin.
          </p>
        </div>
      </section>

      {/* Şık Araç Kartları Grid */}
      <section className="pb-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Özel Düğün Web Sitesi",
              badge: "Web Tasarım",
              desc: "Davetlilerinize özel fotoğraflarınız, aşk hikayeniz, etkinlik takvimi ve dijital LCV formu içeren kişisel web sitenizi oluşturun.",
              link: "/kayit"
            },
            {
              title: "Bütçe Hesaplayıcı",
              badge: "Finans Yönetimi",
              desc: "Düğün harcamalarınızı kategoriler halinde detaylıca takip edin, limitlerinizi aşmadan akıllıca planlayın.",
              link: "/kayit"
            },
            {
              title: "Masa & Oturma Planı",
              badge: "Davetli Düzeni",
              desc: "Masa düzenini ve davetli listelerinizi sürükle-bırak kolaylığıyla saniyeler içinde görselleştirip organize edin.",
              link: "/kayit"
            },
            {
              title: "Dijital Davetiye & LCV",
              badge: "İnteraktif Davet",
              desc: "WhatsApp ve sosyal medyadan kolayca gönderebileceğiniz, anlık katılım yanıtı toplayan özel dijital davetiyeler.",
              link: "/kayit"
            },
            {
              title: "Düğün Kontrol Listesi",
              badge: "Zaman Tüneli",
              desc: "Aydan aya ve haftadan haftaya yapılması gereken tüm görevleri zamanında tamamlayarak stresi ortadan kaldırın.",
              link: "/kayit"
            },
            {
              title: "Sözleşme & Teklif Kasası",
              badge: "Güvenli Depo",
              desc: "Firmalardan aldığınız fiyat tekliflerini, paket detaylarını ve imzalanan e-sözleşmeleri tek bir dijital kasada saklayın.",
              link: "/kayit"
            },
          ].map((tool, idx) => (
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

              {/* Güncellenen Buton: Kullanmaya Başla → */}
              <div className="pt-6 mt-4 border-t border-neutral-100">
                <Link
                  href={tool.link}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 group-hover:text-rose-600 transition-colors"
                >
                  <span>Kullanmaya Başla</span>
                  <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alt Banners / Çağrı Alanı */}
      <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
            HIZLI & KOLAY BAŞLANGIÇ
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Planlamaya Ücretsiz Başlayın
          </h2>
          <p className="text-neutral-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Hesabınızı saniyeler içinde oluşturun, tüm düğün stüdyo araçlarına sınırsız ve ücretsiz erişim sağlayın.
          </p>
          <div className="pt-4">
            <Link
              href="/kayit"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-full transition-all shadow-xl"
            >
              Ücretsiz Hesap Oluştur →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}