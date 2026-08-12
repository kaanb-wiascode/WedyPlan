'use client';

import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

interface QuickOfferModalProps {
  companyName: string;
  onClose: () => void;
}

export const QuickOfferModal: React.FC<QuickOfferModalProps> = ({ companyName, onClose }) => {
  const [form, setForm] = useState({ fullName: '', phone: '', weddingDate: '', guestCount: 300 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tebrikler! ${companyName} firmasına WedyAI teklif talebiniz başarıyla iletildi.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] max-w-md w-full p-8 space-y-4 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-[10px] font-bold text-[#0071e3] bg-pink-50 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> WedyAI Teklif İste
          </span>
          <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F]">{companyName}</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <input
            type="text"
            required
            placeholder="Ad Soyad"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full p-3.5 border border-slate-200 rounded-2xl text-xs outline-none focus:border-[#0071e3]"
          />
          <input
            type="tel"
            required
            placeholder="Telefon Numarası"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full p-3.5 border border-slate-200 rounded-2xl text-xs outline-none focus:border-[#0071e3]"
          />
          <input
            type="date"
            required
            value={form.weddingDate}
            onChange={(e) => setForm({ ...form, weddingDate: e.target.value })}
            className="w-full p-3.5 border border-slate-200 rounded-2xl text-xs outline-none focus:border-[#0071e3]"
          />
          <button
            type="submit"
            className="w-full bg-[#1D1D1F] text-white text-xs font-bold py-4 rounded-full hover:bg-black transition shadow-md cursor-pointer"
          >
            WedyAI İle Teklif Talebini Gönder
          </button>
        </form>
      </div>
    </div>
  );
};