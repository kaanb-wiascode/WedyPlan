'use client';

import React, { useState, useTransition } from 'react';
import { useConfirm } from '@/context/ConfirmContext';
import { Star, MessageSquare, CheckCircle2, Sparkles, Send, Trash2 } from 'lucide-react';

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  vendorReply?: string;
}

export default function VendorReviewsPage() {
  const confirm = useConfirm();
  const [isPending, startTransition] = useTransition();

  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: '1',
      author: 'Eda & Mert Yılmaz',
      rating: 5,
      comment: 'Düğünümüz tam hayal ettiğimiz gibi geçti. Organizasyon ekibine ve yemek servis hızına sonsuz teşekkürler!',
      date: '12 Temmuz 2026',
      vendorReply: 'Sizlerin bu mutlu gününe tanıklık etmek bizim için büyük bir onurdu. Bir ömür boyu mutluluklar dileriz!'
    },
    {
      id: '2',
      author: 'Ayşe & Ali Kaya',
      rating: 5,
      comment: 'Ses ve ışık düzeni harikaydı, tüm misafirlerimiz çok memnun kaldı.',
      date: '02 Ağustos 2026'
    }
  ]);

  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendReply = (id: string) => {
    if (!replyText.trim()) return;

    startTransition(() => {
      setReviews(prev =>
        prev.map(r => (r.id === id ? { ...r, vendorReply: replyText } : r))
      );
      setReplyingId(null);
      setReplyText('');
      showToast('Yorum yanıtınız yayınlandı.');
    });
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
      
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="p-8 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <Star className="w-3.5 h-3.5 text-zinc-500" />
            <span>Müşteri İtibarı</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Değerlendirmeler & Yorumlar
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Hizmet verdiğiniz çiftlerin bıraktığı değerlendirmeleri inceleyin ve kurumsal yanıtlarınızı iletin.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-50/80 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/50">
          <Star className="w-6 h-6 fill-zinc-900 dark:fill-white text-zinc-900 dark:text-white" />
          <div>
            <div className="text-xl font-extrabold text-zinc-900 dark:text-white">4.9 / 5.0</div>
            <span className="text-[10px] text-zinc-400 font-medium">28 Çift Değerlendirmesi</span>
          </div>
        </div>
      </div>

      {/* YORUM LİSTESİ */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-6 rounded-3xl apple-glass shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{rev.author}</h3>
                <span className="text-[10px] text-zinc-400">{rev.date}</span>
              </div>
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full text-xs font-bold text-zinc-900 dark:text-white">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{rev.rating}.0</span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              &quot;{rev.comment}&quot;
            </p>

            {rev.vendorReply ? (
              <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 space-y-1">
                <span className="text-[10px] font-bold text-zinc-900 dark:text-white block uppercase tracking-wider">Firma Yanıtınız</span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{rev.vendorReply}</p>
              </div>
            ) : (
              replyingId === rev.id ? (
                <div className="space-y-2 pt-2">
                  <textarea
                    rows={2}
                    placeholder="Kurumsal yanıtınızı yazın..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setReplyingId(null)} className="px-3 py-1.5 rounded-lg border text-xs font-semibold">İptal</button>
                    <button onClick={() => handleSendReply(rev.id)} className="px-4 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold">Yanıtla</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setReplyingId(rev.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Cevap Yaz
                </button>
              )
            )}
          </div>
        ))}
      </div>

    </div>
  );
}