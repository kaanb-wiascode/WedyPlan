import React from "react";
import { BrandLogo } from "@/components/ui/brand-logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF7] text-neutral-900 font-sans antialiased">
      {/* Şık Arka Plan Bulanıklığı ve Cam Kart */}
      <div className="p-10 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-2xl flex flex-col items-center space-y-6 text-center max-w-sm mx-auto">
        
        {/* Marka Logosu & Yavaş Nabız Animasyonu */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full bg-rose-100/60 animate-ping opacity-75" />
          <div className="relative z-10 p-2">
            <BrandLogo />
          </div>
        </div>

        {/* Minimal Yükleme Çubuğu */}
        <div className="w-36 h-1 bg-neutral-200/80 rounded-full overflow-hidden relative">
          <div className="w-1/2 h-full bg-neutral-900 rounded-full animate-[shimmer_1.5s_infinite_linear] bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800" />
        </div>

        {/* Metin */}
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-widest text-neutral-800 uppercase">
            Güvenli Bağlantı
          </p>
          <p className="text-[11px] text-neutral-400 font-medium">
            Sayfa hazırlanıyor...
          </p>
        </div>
      </div>
    </div>
  );
}