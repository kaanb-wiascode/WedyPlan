"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VendorCompareModal({
  vendors,
  onRemove,
  onClose,
}: {
  vendors: any[];
  onRemove: (id: string) => void;
  onClose: () => void;
}) {
  if (vendors.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl p-4 backdrop-blur-2xl bg-slate-900/90 text-white border border-slate-800 rounded-3xl shadow-2xl space-y-4"
      >
        <div className="flex justify-between items-center px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            ⚖️ Tedarikçi Karşılaştırma Paneli ({vendors.length} / 3)
          </span>
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white">
            Kapat ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {vendors.map((v) => (
            <div key={v.id} className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs space-y-1 relative">
              <button
                onClick={() => onRemove(v.id)}
                className="absolute top-2 right-2 text-slate-400 hover:text-rose-400 text-xs font-bold"
              >
                ✕
              </button>
              <h4 className="font-bold text-white pr-4">{v.name}</h4>
              <p className="text-[10px] text-slate-400">{v.city} • {v.priceRange}</p>
              <div className="text-[10px] text-emerald-400 font-bold pt-1">%{v.aiMatchScore} AI Uyumu</div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
