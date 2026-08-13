'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PublicNavbar from '@/components/public/PublicNavbar';
import { CATALOG_CATEGORIES } from '@/lib/catalog/taxonomy';

export default function FirmaOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    contactName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    categorySlug: 'dugun-mekanlari',
    city: 'İstanbul',
  });

  const steps = ['İşletme', 'Hizmet', 'Hesap'];

  const submit = async () => {
    setPending(true);
    setError('');
    const res = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: form.contactName,
        businessName: form.businessName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        categorySlug: form.categorySlug,
        city: form.city,
        role: 'VENDOR',
      }),
    });
    const json = await res.json().catch(() => ({}));
    setPending(false);
    if (!res.ok || !json.success) {
      setError(json.error || 'Kayıt tamamlanamadı.');
      return;
    }
    router.push(json.redirectUrl || '/firma/vitrin');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <PublicNavbar mode="vendor" />
      <main className="mx-auto max-w-[560px] px-5 py-16">
        <div className="mb-8 flex items-center justify-center gap-2">
          {steps.map((label, index) => (
            <span
              key={label}
              className={`rounded-full px-3 py-1 text-[12px] ${
                step >= index + 1 ? 'bg-[#1d1d1f] text-white' : 'bg-black/5 text-[#86868b]'
              }`}
            >
              {index + 1}. {label}
            </span>
          ))}
        </div>
        <div className="apple-panel rounded-[28px] px-7 py-9 sm:px-9">
          <div className="mb-8 text-center">
            <p className="mb-2 text-[12px] tracking-[0.08em] text-[#86868b]">Partner kaydı</p>
            <h1 className="text-[28px] font-semibold tracking-tight">WedyPlan’e katılın</h1>
            <p className="mt-3 text-[15px] text-[#86868b]">Vitrin, teklif ve çift mesajı aynı günde açılır.</p>
          </div>
          <div className="space-y-4">
            {step === 1 && (
              <>
                <input className="apple-input" placeholder="Yetkili adı" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
                <input className="apple-input" placeholder="Ticari unvan" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} />
                <input className="apple-input" placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <button type="button" className="apple-btn" onClick={() => setStep(2)} disabled={!form.contactName || !form.businessName}>Devam et</button>
              </>
            )}
            {step === 2 && (
              <>
                <select className="apple-input" value={form.categorySlug} onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}>
                  {CATALOG_CATEGORIES.filter((c) => !c.parentSlug).map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
                <input className="apple-input" placeholder="Şehir" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                <div className="flex gap-3">
                  <button type="button" className="apple-btn-secondary w-1/3" onClick={() => setStep(1)}>Geri</button>
                  <button type="button" className="apple-btn w-2/3" onClick={() => setStep(3)}>Hesap oluştur</button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <input className="apple-input" type="email" placeholder="İş e-postası" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="apple-input" type="password" placeholder="Şifre (en az 8 karakter)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                {error ? <p className="text-[13px] text-rose-600">{error}</p> : null}
                <div className="flex gap-3">
                  <button type="button" className="apple-btn-secondary w-1/3" onClick={() => setStep(2)}>Geri</button>
                  <button type="button" className="apple-btn w-2/3" disabled={pending} onClick={submit}>
                    {pending ? 'Kaydediliyor…' : 'Panele gir'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
