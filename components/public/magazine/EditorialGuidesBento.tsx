'use client';

import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { EditorialGuide } from '@/types/wedding-magazine';

interface EditorialGuidesBentoProps {
  guides: EditorialGuide[];
}

export const EditorialGuidesBento: React.FC<EditorialGuidesBentoProps> = ({ guides }) => {
  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-[#D4AF37]">
        <BookOpen className="w-5 h-5 text-[#0071e3]" />
        <h2 className="font-serif font-bold text-[26px] text-[#1D1D1F]">Adım Adım Editoryal Düğün Rehberleri</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((g: EditorialGuide) => (
          <div key={g.id} className="relative rounded-[32px] overflow-hidden bg-[#1D1D1F] text-white p-8 border border-white/20 shadow-xl flex flex-col justify-between h-72">
            <img src={g.coverUrl} alt={g.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/60 to-transparent" />

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold bg-[#D4AF37] text-white px-3 py-1 rounded-full uppercase tracking-wider">
                {g.stepCount} Adımlı Özel Rehber
              </span>
              <h3 className="font-serif font-bold text-[24px] text-white leading-tight">{g.title}</h3>
              <p className="text-[13px] text-slate-300 font-light line-clamp-2">{g.subtitle}</p>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between border-t border-white/20">
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> WedyAI Tarafından Onaylandı
              </span>
              <button className="bg-white text-[#1D1D1F] text-[12px] font-bold px-5 py-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
                Rehberi İncele
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};