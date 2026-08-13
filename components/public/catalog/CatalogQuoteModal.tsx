"use client";

import React, { useState } from "react";
import { Sparkles, X, ShieldCheck } from "lucide-react";
import { saveCatalogLead } from "@/lib/catalog/quotes";

type CatalogQuoteModalProps = {
  vendorId?: string | null;
  vendorName: string;
  categorySlug: string;
  city: string;
  district?: string;
  onClose: () => void;
};

export function CatalogQuoteModal({
  vendorId = null,
  vendorName,
  categorySlug,
  city,
  district = "",
  onClose,
}: CatalogQuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    coupleNames: "",
    phone: "",
    email: "",
    weddingDate: "",
    guestCount: 200,
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCatalogLead({
      vendorId,
      vendorName,
      categorySlug,
      city,
      district,
      coupleNames: form.coupleNames,
      phone: form.phone,
      email: form.email,
      weddingDate: form.weddingDate,
      guestCount: Number(form.guestCount) || 0,
      note: form.note || `${vendorName} için ücretsiz teklif talebi.`,
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md">
      <div className="apple-panel relative w-full max-w-md rounded-[28px] p-7 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1 text-[#86868b] hover:bg-white/70 hover:text-[#1d1d1f]"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="space-y-3 py-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0071e3]/10 text-[#0071e3]">✓</div>
            <h3 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f]">Talebiniz iletildi</h3>
            <p className="text-[14px] leading-relaxed text-[#86868b]">
              {vendorName} talebinizi firma panosunda görür. WedyPlan çiftlerden komisyon almaz.
            </p>
            <button type="button" onClick={onClose} className="apple-btn mt-2">
              Tamam
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 space-y-1">
              <span className="apple-chip inline-flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Ücretsiz teklif
              </span>
              <h3 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f]">{vendorName}</h3>
              <p className="flex items-center gap-1 text-[12px] text-[#86868b]">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Çiftlerden komisyon yok · ortalama yanıt {city} içinde aynı gün
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                placeholder="Ad Soyad"
                value={form.coupleNames}
                onChange={(e) => setForm({ ...form, coupleNames: e.target.value })}
                className="apple-input"
              />
              <input
                required
                type="tel"
                placeholder="Telefon"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="apple-input"
              />
              <input
                type="email"
                placeholder="E-posta (isteğe bağlı)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="apple-input"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="date"
                  value={form.weddingDate}
                  onChange={(e) => setForm({ ...form, weddingDate: e.target.value })}
                  className="apple-input"
                />
                <input
                  type="number"
                  min={20}
                  placeholder="Davetli"
                  value={form.guestCount}
                  onChange={(e) => setForm({ ...form, guestCount: Number(e.target.value) })}
                  className="apple-input"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Tarih, menü veya konsept notunuz"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="apple-input min-h-[88px] resize-none"
              />
              <button type="submit" className="apple-btn">
                Teklif talebini gönder
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
