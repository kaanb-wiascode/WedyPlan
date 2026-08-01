'use client';

import React, { useState, useTransition } from 'react';
import { useConfirm } from '@/context/ConfirmContext';
import {
  Store,
  Plus,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  Package,
  X,
  Upload,
  Check
} from 'lucide-react';

interface ServicePackage {
  id: string;
  title: string;
  price: number;
  features: string[];
}

export default function VendorShowcasePage() {
  const confirm = useConfirm();
  const [isPending, startTransition] = useTransition();

  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80');
  const [gallery, setGallery] = useState<string[]>([
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&auto=format&fit=crop&q=60',
  ]);

  const [packages, setPackages] = useState<ServicePackage[]>([
    {
      id: '1',
      title: 'Standart Kır Düğün Paketi',
      price: 120000,
      features: ['250 Kişilik Menü', 'Standart Süsleme', 'Ses & Müzik Düzeni']
    },
    {
      id: '2',
      title: 'VIP Premium Düğün Paketi',
      price: 180000,
      features: ['350 Kişilik Özel Menü', 'Lüks Bohem Dekorasyon', 'Orkestra & DJ Hizmeti', 'Dış Çekim Hediyesi']
    }
  ]);

  const [newImageUrl, setNewImageUrl] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    setGallery(prev => [...prev, newImageUrl]);
    setNewImageUrl('');
    showToast('Galeriye yeni görsel eklendi.');
  };

  const handleDeleteImage = async (index: number) => {
    const isConfirmed = await confirm({
      title: 'Görseli Silmek İstediğinize Emin Misiniz?',
      message: 'Bu fotoğraf vitrin galerinizden kaldırılacaktır.',
      confirmText: 'Evet, Sil',
      cancelText: 'Vazgeç',
      variant: 'danger'
    });

    if (isConfirmed) {
      setGallery(prev => prev.filter((_, i) => i !== index));
      showToast('Görsel vitrinden silindi.');
    }
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
      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <Store className="w-3.5 h-3.5 text-zinc-500" />
            <span>Pazar Yeri Vitrini</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Vitrin & Medya Yönetimi
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Pazar yerinde çiftlerin göreceği kapak fotoğraflarınızı, galerinizi ve paket fiyatlarınızı düzenleyin.
          </p>
        </div>

        <a
          href="/firmalar/1"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs shrink-0"
        >
          <span>Canlı Vitrinimi Gör</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* GALERİ YÖNETİMİ */}
      <div className="p-6 sm:p-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-zinc-500" /> Vitrin Galeri Fotoğrafları
          </h2>
        </div>

        <form onSubmit={handleAddImage} className="flex items-center gap-3">
          <input
            type="url"
            placeholder="Fotoğraf URL ekleyin (https://...)"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
            required
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black transition-all cursor-pointer shrink-0"
          >
            Ekle
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {gallery.map((img, idx) => (
            <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/60">
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button
                onClick={() => handleDeleteImage(idx)}
                className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/60 text-white hover:bg-red-500 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* HİZMET PAKETLERİ */}
      <div className="p-6 sm:p-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
          <Package className="w-4 h-4 text-zinc-500" /> Hizmet Paketleri & Fiyatlandırma
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="p-6 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">{pkg.title}</h3>
                  <div className="text-xl font-black text-zinc-900 dark:text-white mt-1">₺{pkg.price.toLocaleString('tr-TR')}</div>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}