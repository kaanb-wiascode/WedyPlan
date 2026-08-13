'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X } from 'lucide-react';

export function SupportWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const hidden = pathname?.startsWith('/admin') || pathname?.startsWith('/cift') || pathname?.startsWith('/firma') || pathname?.startsWith('/giris') || pathname?.startsWith('/satici');
  if (hidden) return null;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    await fetch('/api/public/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.get('name'),
        email: form.get('email'),
        message: form.get('message'),
        subject: form.get('subject') || 'Canlı destek',
        channel: 'CHAT',
        source: 'ANONYMOUS',
      }),
    });
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="apple-panel mb-3 w-[320px] rounded-[24px] p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[14px] font-semibold">WedyPlan destek</p>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-black/5"><X className="h-4 w-4" /></button>
          </div>
          {sent ? (
            <p className="text-[13px] text-[#86868b]">Mesajınız müşteri hizmetlerine düştü. Kısa süre içinde dönüş yapılır.</p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-2">
              <input name="name" placeholder="Adınız" className="h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
              <input name="email" type="email" placeholder="E-posta" className="h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
              <input name="subject" placeholder="Konu" className="h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
              <textarea name="message" required rows={3} placeholder="Nasıl yardımcı olalım?" className="w-full rounded-xl border border-black/10 px-3 py-2 text-[13px]" />
              <button disabled={loading} className="apple-btn w-full">{loading ? 'Gönderiliyor…' : 'Gönder'}</button>
            </form>
          )}
        </div>
      ) : null}
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0071e3] text-white shadow-lg">
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}
