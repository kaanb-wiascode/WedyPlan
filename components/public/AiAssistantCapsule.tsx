'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, ShieldCheck, ArrowUpRight } from 'lucide-react';

const AI_PROMPTS = [
  "İstanbul Boğazı manzaralı, 400 kişilik kır bahçesi ve orkestra dahil 3 opsiyon hazırladım.",
  "Haziran ayı için çakışmasız ve bütçenize uygun 5 düğün salonu tarihlerini doğruladım.",
  "Catering ve dış çekim fotoğrafçısı dahil paketlerde %15 WedyAI avantajı tanımlandı."
];

export const AiAssistantCapsule: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % AI_PROMPTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-xl mx-auto"
    >
      {/* Outer Glow Sheen */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/30 via-[#0071e3]/30 to-purple-500/30 rounded-[32px] blur-xl opacity-50 animate-pulse" />

      {/* Glass Capsule Container */}
      <div className="relative bg-white/40 backdrop-blur-2xl border border-white/80 p-5 rounded-[28px] shadow-[0_16px_40px_rgba(0,0,0,0.06)] flex items-start gap-4 text-left">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1D1D1F] to-slate-800 flex items-center justify-center shrink-0 shadow-md">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
        </div>

        <div className="flex-1 space-y-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-[#1D1D1F] uppercase flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-[#0071e3]" />
              WedyPlan Assist
            </span>
            <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200">
              Canlı Zeka
            </span>
          </div>

          <div className="h-10 flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="text-[13px] text-[#1D1D1F]/80 font-medium leading-snug line-clamp-2"
              >
                "{AI_PROMPTS[index]}"
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="self-center p-2 rounded-xl bg-white/60 hover:bg-white text-[#1D1D1F] transition cursor-pointer border border-white/80">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};