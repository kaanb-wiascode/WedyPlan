"use client";

import React from "react";
import { motion } from "framer-motion";
import AIMatchWidget from "./AIMatchWidget";

export default function VendorCard({
  vendor,
  onToggleFavorite,
  onCompare,
  isCompared,
}: {
  vendor: any;
  onToggleFavorite: (id: string) => void;
  onCompare: (vendor: any) => void;
  isCompared: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Görsel Header */}
        <div className="relative h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover" />

          {/* Rozetler */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {vendor.isVerified && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-sm">
                ✓ Verified
              </span>
            )}
            {vendor.isPremium && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-sm">
                ★ Premium
              </span>
            )}
            {vendor.campaign && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-sm">
                🔥 %15 İndirim
              </span>
            )}
          </div>

          {/* Favori Butonu */}
          <button
            onClick={() => onToggleFavorite(vendor.id)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-rose-500 hover:scale-110 transition"
          >
            {vendor.isFavorite ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Kart Gövdesi */}
        <div className="p-5 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{vendor.name}</h3>
              <p className="text-xs text-slate-400">📍 {vendor.city} • {vendor.categoryName}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-amber-500">★ {vendor.rating}</span>
              <span className="text-[10px] text-slate-400 block">({vendor.reviewCount} yorum)</span>
            </div>
          </div>

          {/* Fiyat & Kapasite */}
          <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300 font-medium pt-1">
            <span>Fiyat: <strong className="text-slate-800 dark:text-slate-100">{vendor.priceRange}</strong></span>
            <span>Kapasite: <strong className="text-slate-800 dark:text-slate-100">{vendor.capacity} Kişi</strong></span>
          </div>

          {/* AI Perfect Match Widget */}
          <AIMatchWidget matchScore={vendor.aiMatchScore} style={vendor.styleTag} budget="Tam Uyumlu" />
        </div>
      </div>

      {/* Kart Altı Aksiyonlar */}
      <div className="p-5 pt-0 flex gap-2">
        <button
          onClick={() => onCompare(vendor)}
          className={"flex-1 py-2 rounded-xl text-xs font-semibold transition border " +
            (isCompared
              ? "bg-rose-50 border-rose-500 text-rose-600 dark:bg-rose-950/40"
              : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50")
          }
        >
          {isCompared ? "✓ Karşılaştırılıyor" : "+ Karşılaştır"}
        </button>
        <button className="flex-1 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition">
          Teklif Al
        </button>
      </div>
    </motion.div>
  );
}
