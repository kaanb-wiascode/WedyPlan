'use client';

import React, { useState } from 'react';
import { Button } from '@/components/shared/ui/Button';
import { Zap, X, Sparkles, Euro, Send, Gift, Check } from 'lucide-react';
import { LeadFormValues } from '@/lib/validations/vendor-leads';
import { sendInstantOfferAction } from '@/lib/actions/vendor-leads';

interface InstantOfferModalProps {
  lead: LeadFormValues | null;
  onClose: () => void;
}

export function InstantOfferModal({ lead, onClose }: InstantOfferModalProps) {
  const [offerPrice, setOfferPrice] = useState(lead?.budgetAmount || 12000);
  const [selectedBonus, setSelectedInclusions] = useState<string[]>([
    'Gelin & Damat Süit Konaklama',
    'Menü Tadımı Davetiye'
  ]);
  const [customNote, setCustomNote] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSentSuccess, setIsSentSuccess] = useState(false);

  if (!lead) return null;

  const handleSendOffer = async () => {
    setIsSending(true);
    await sendInstantOfferAction(lead.id, {
      amount: offerPrice,
      notes: customNote
    });
    setIsSending(false);
    setIsSentSuccess(true);
    setTimeout(() => {
      setIsSentSuccess(false);
      onClose();
    }, 1200);
  };

  const toggleBonus = (bonus: string) => {
    if (selectedBonus.includes(bonus)) {
      setSelectedInclusions(selectedBonus.filter((b) => b !== bonus));
    } else {
      setSelectedInclusions([...selectedBonus, bonus]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-zinc-800 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-transparent border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-600 text-white rounded-xl shadow-xs">
              <Zap className="w-4 h-4 text-amber-300 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Anlık Özel Teklif Oluşturucu
              </h3>
              <p className="text-[11px] text-gray-500">
                {lead.coupleName} çiftinin ekranına canlı teklif kartı gönderin.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal İçerik */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">AI Teklif Tavsiyesi:</span> Çiftin bütçesi <strong>{lead.budgetAmount?.toLocaleString()} EUR</strong>. Erken rezervasyon hediyesi eklerseniz kabul edilme olasılığı %92.
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Özel Fiyat Teklifi ({lead.currency})
            </label>
            <div className="relative">
              <input
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                className="w-full pl-9 pr-4 py-2.5 text-sm font-bold rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Euro className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
              <Gift className="w-3.5 h-3.5 text-rose-500" />
              Teklife Dahil Edilecek Hızlı Hediyeler
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Gelin & Damat Süit Konaklama',
                'Ücretsiz Menü Tadımı (4 Kişi)',
                'Karşılama Kokteyli İkramı',
                '%5 Erken Ödeme İndirimi',
                'DJ & Ses Sistemi Dahil'
              ].map((bonus) => {
                const isSelected = selectedBonus.includes(bonus);
                return (
                  <button
                    key={bonus}
                    type="button"
                    onClick={() => toggleBonus(bonus)}
                    className={`text-[11px] px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-600 font-medium'
                        : 'bg-slate-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-slate-200 dark:border-zinc-700 hover:border-rose-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    {bonus}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Çifte Özel Not / Mesaj
            </label>
            <textarea
              rows={2}
              placeholder="Sevgili Zeynep & Can, mekanımızda sizinle harika bir düğün planlayabiliriz..."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 border-t border-slate-100 dark:border-zinc-800 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            İptal
          </Button>

          <Button
            size="sm"
            onClick={handleSendOffer}
            isLoading={isSending}
            className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 px-5"
          >
            {isSentSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                Teklif İletildi!
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Canlı Teklifi Gönder
              </>
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}

export default InstantOfferModal;