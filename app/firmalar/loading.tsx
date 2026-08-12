import React from "react";
import { BrandLogo } from "@/components/ui/brand-logo";

export default function Loading() {
  return (
    <div className="apple-page fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="apple-glass apple-card mx-auto flex max-w-sm flex-col items-center space-y-6 p-10 text-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-20 w-20 animate-ping rounded-full bg-[#0071e3]/15 opacity-75" />
          <div className="relative z-10 p-2">
            <BrandLogo />
          </div>
        </div>

        <div className="relative h-1 w-36 overflow-hidden rounded-full bg-black/8">
          <div className="h-full w-1/2 rounded-full bg-[#0071e3]" />
        </div>

        <div className="space-y-1">
          <p className="apple-kicker">Güvenli bağlantı</p>
          <p className="text-[12px] text-[#86868b]">Sayfa hazırlanıyor...</p>
        </div>
      </div>
    </div>
  );
}
