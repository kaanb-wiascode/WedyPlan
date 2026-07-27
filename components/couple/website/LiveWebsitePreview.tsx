"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LiveWebsitePreview({
  settings,
  sections,
  previewDevice,
}: {
  settings: any;
  sections: any[];
  previewDevice: "DESKTOP" | "MOBILE";
}) {
  return (
    <div className="flex justify-center items-start h-full">
      <motion.div
        layout
        className={"bg-white text-slate-900 shadow-2xl overflow-y-auto transition-all rounded-3xl border border-slate-200 dark:border-slate-800 " +
          (previewDevice === "MOBILE" ? "w-[375px] h-[700px] border-8 border-slate-900 rounded-[40px]" : "w-full max-w-4xl h-[750px]")
        }
      >
        {/* Mock Browser Header */}
        <div className="sticky top-0 z-10 px-4 py-2.5 bg-slate-100/90 backdrop-blur-md border-b text-[10px] text-slate-500 flex justify-between items-center">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="font-mono">https://wed.yplan.com/{settings.slug}</span>
          <span>🔒 SSL</span>
        </div>

        {/* Canlı Web Sitesi Tasarımı */}
        <div className="p-8 space-y-12 text-center font-serif">
          {/* HERO */}
          {sections.find((s) => s.id === "hero")?.isVisible && (
            <div className="space-y-4 py-8 border-b border-slate-100">
              <span className="text-xs font-sans tracking-widest text-rose-600 uppercase font-bold">Düğün Davetimize Hoş Geldiniz</span>
              <h1 className="text-4xl font-serif font-light text-slate-900">{settings.coupleNames}</h1>
              <p className="text-xs font-sans text-slate-500">{settings.weddingDate} • {settings.venueLocation}</p>
              <div className="inline-block px-4 py-2 rounded-full bg-slate-900 text-white font-sans text-xs font-bold mt-2">
                ⏳ Geri Sayım: 325 Gün Kaldı
              </div>
            </div>
          )}

          {/* OUR STORY */}
          {sections.find((s) => s.id === "story")?.isVisible && (
            <div className="space-y-3 py-6 border-b border-slate-100 max-w-md mx-auto">
              <span className="text-xs font-sans tracking-widest text-amber-600 uppercase font-bold">Bizim Masalımız</span>
              <h2 className="text-2xl font-serif">{settings.storyTitle}</h2>
              <p className="text-xs font-sans text-slate-600 leading-relaxed italic">{settings.storyContent}</p>
            </div>
          )}

          {/* TIMELINE */}
          {sections.find((s) => s.id === "timeline")?.isVisible && (
            <div className="space-y-4 py-6 border-b border-slate-100 max-w-md mx-auto font-sans text-xs">
              <span className="text-xs font-sans tracking-widest text-indigo-600 uppercase font-bold">Düğün Günü Programı</span>
              <div className="space-y-2 text-left">
                <div className="p-3 rounded-2xl bg-slate-50 flex justify-between">
                  <span>18:30 Nikah Seremonisi</span>
                  <span className="text-slate-400">Sahil Alanı</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 flex justify-between">
                  <span>20:00 Yemek & Kutlama</span>
                  <span className="text-slate-400">Ana Balo Binası</span>
                </div>
              </div>
            </div>
          )}

          {/* RSVP FORM */}
          {sections.find((s) => s.id === "rsvp")?.isVisible && (
            <div className="space-y-4 py-6 max-w-md mx-auto font-sans text-xs">
              <span className="text-xs tracking-widest text-rose-600 uppercase font-bold">Katılım Bildirimi (LCV)</span>
              <div className="p-5 rounded-3xl bg-slate-50 border space-y-3">
                <input type="text" placeholder="Adınız Soyadınız" className="w-full p-2.5 rounded-xl border text-xs" readOnly />
                <select className="w-full p-2.5 rounded-xl border text-xs text-slate-500">
                  <option>Katılıyorum (1 Kişi)</option>
                  <option>Katılamıyorum</option>
                </select>
                <button className="w-full py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs">LCV Gönder</button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
