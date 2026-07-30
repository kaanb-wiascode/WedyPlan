import React from "react";
import Link from "next/link";
import PublicNavbar from "@/components/public/PublicNavbar";

export default function PlanlamaStudyoPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 font-sans antialiased">
      <PublicNavbar mode="public" />

      <section className="pt-36 pb-20 px-4 max-w-5xl mx-auto text-center space-y-6">
        <span className="px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 uppercase tracking-wider">
          Düğün Planlama Stüdyosu
        </span>
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight">
          Düğününüzü Dijitalde Tasarlayın
        </h1>
        <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto">
          Düğün sürecinizi baştan sona yöneten akıllı stüdyo araçlarımıza ücretsiz üye olarak anında erişin.
        </p>
      </section>

      {/* Araç Kartları */}
      <section className="pb-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Özel Düğün Web Sitesi", desc: "Davetlilerinize özel fotoğraflarınız, hikayeniz ve LCV formu içeren web sitesi oluşturun." },
          { title: "Bütçe Hesaplayıcı", desc: "Düğün harcamalarınızı kalem kalem takip edin, bütçenizi aşmadan plan yapın." },
          { title: "Masa & Oturma Planı", desc: "Davetli listelerinizi masalara sürükle-bırak yöntemiyle kolayca yerleştirin." },
          { title: "Dijital Davetiye & LCV", desc: "WhatsApp ve sosyal medyadan gönderebileceğiniz interaktif LCV davetiyeleri." },
          { title: "Kontrol Listesi", desc: "Aydan aya yapmanız gereken tüm görevleri zamanında tamamlayın." },
          { title: "Sözleşme & Teklif Kasası", desc: "Firmalardan aldığınız teklifleri ve imzalanan sözleşmeleri tek yerde saklayın." },
        ].map((tool, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-white border border-neutral-200/80 space-y-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-neutral-900">{tool.title}</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">{tool.desc}</p>
            <div className="pt-2">
              <Link
                href="/kayit"
                className="inline-block text-xs font-semibold text-rose-600 hover:underline"
              >
                Kullanmak İçin Ücretsiz Üye Ol →
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}