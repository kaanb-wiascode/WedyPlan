// app/lcv/[id]/page.tsx
'use client';

import { useEffect, useState, useTransition, use } from 'react';
import { getPublicInvitation, submitPublicRsvp } from '@/lib/actions/invitation';

export default function PublicRsvpPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [invitationData, setInvitationData] = useState<{
    coupleName: string;
    weddingDate: any;
    venueName: string;
    venueAddress: string;
    message: string;
    coupleId: string;
  } | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'ATTENDING' | 'DECLINED'>('ATTENDING');
  const [plusOne, setPlusOne] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getPublicInvitation(resolvedParams.id);
      if (res.success && res.data) {
        setInvitationData(res.data);
      }
      setLoading(false);
    }
    load();
  }, [resolvedParams.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !invitationData) return;

    setErrorMessage('');
    startTransition(async () => {
      const res = await submitPublicRsvp({
        coupleId: invitationData.coupleId,
        fullName,
        phone,
        status,
        plusOne,
        notes,
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.error || 'Bir hata oluştu.');
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
        <p className="text-sm animate-pulse">Davetiye yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
        
        {/* Davetiye Başlığı & Mesajı */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-indigo-300 font-semibold">
            Düğün Davetiyesi
          </span>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-rose-200 via-pink-100 to-indigo-200 bg-clip-text text-transparent">
            {invitationData?.coupleName}
          </h1>
          <p className="text-sm text-slate-200 italic leading-relaxed">
            "{invitationData?.message}"
          </p>
        </div>

        {/* Detay Bilgileri */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 text-xs text-slate-300 text-center">
          {invitationData?.weddingDate && (
            <p className="font-semibold text-rose-300 text-sm">
              🗓️ {new Date(invitationData.weddingDate).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
          <p className="font-medium text-slate-200">📍 {invitationData?.venueName}</p>
          {invitationData?.venueAddress && (
            <p className="text-slate-400">{invitationData.venueAddress}</p>
          )}
        </div>

        {/* LCV Yanıt Formu veya Teşekkür Mesajı */}
        {submitted ? (
          <div className="p-6 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center space-y-2">
            <h3 className="text-xl font-bold text-emerald-300">Yanıtınız Alındı!</h3>
            <p className="text-xs text-emerald-100">
              Katılım durumunuz çiftimize başarıyla iletildi. Bu mutlu günümüzde yanımızda olacağınız için teşekkür ederiz.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <h2 className="text-sm font-semibold text-slate-200 border-b border-white/10 pb-2">
              Katılım Durumunuzu Bildirin (LCV)
            </h2>

            {errorMessage && (
              <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded border border-rose-500/20">
                {errorMessage}
              </p>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Adınız Soyadınız *</label>
                <input
                  type="text"
                  required
                  placeholder="Ad Soyad"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Telefon Numaranız</label>
                <input
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStatus('ATTENDING')}
                  className={`py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                    status === 'ATTENDING'
                      ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/50'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  ✓ Katılıyorum
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('DECLINED')}
                  className={`py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                    status === 'DECLINED'
                      ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-900/50'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  ✕ Katılamıyorum
                </button>
              </div>

              {status === 'ATTENDING' && (
                <label className="flex items-center space-x-2 text-xs text-slate-300 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={plusOne}
                    onChange={(e) => setPlusOne(e.target.checked)}
                    className="rounded bg-white/10 border-white/20 text-indigo-500 focus:ring-0"
                  />
                  <span>Yanımda +1 Misafir Getireceğim</span>
                </label>
              )}

              <div>
                <label className="block text-xs text-slate-300 mb-1">Çiftimize Notunuz</label>
                <textarea
                  rows={2}
                  placeholder="Tebrik mesajınız veya özel notunuz..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white font-semibold text-sm rounded-xl transition-all shadow-lg disabled:opacity-50 mt-2"
            >
              {isPending ? 'Yanıtınız Gönderiliyor...' : 'LCV Yanıtını Gönder'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}