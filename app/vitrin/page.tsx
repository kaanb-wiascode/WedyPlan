'use client';

import React from 'react';
import { Store, ExternalLink, Image as ImageIcon, Package, Check } from 'lucide-react';

export default function VitrinPage() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased pb-24">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[11px] font-medium">
            <Store className="w-3.5 h-3.5" /> <span>Pazar Yeri Vitrini</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">Vitrin & Medya Yönetimi</h1>
          <p className="text-sm text-zinc-500">Pazar yerinde çiftlerin göreceği kapak fotoğraflarınızı, galerinizi ve paket fiyatlarınızı düzenleyin.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold flex items-center gap-2 hover:bg-zinc-800 transition-colors">
          Canlı Vitrinimi Gör <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Galeri Section */}
      <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800 space-y-6">
        <h2 className="text-sm font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
          <ImageIcon className="w-4 h-4 text-zinc-500" /> Vitrin Galeri Fotoğrafları
        </h2>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Fotoğraf URL ekleyin (https://...)" 
            className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white text-zinc-900 dark:text-white"
          />
          <button className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold rounded-xl hover:bg-zinc-800 transition-colors">
            Ekle
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Hizmet Paketleri Section */}
      <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800 space-y-6">
        <h2 className="text-sm font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
          <Package className="w-4 h-4 text-zinc-500" /> Hizmet Paketleri & Fiyatlandırma
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Paket 1 */}
          <div className="p-6 rounded-2xl bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Standart Kır Düğün Paketi</h3>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">₺120.000</div>
            </div>
            <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-700/50">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-4 h-4 text-emerald-500" /> 250 Kişilik Menü
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-4 h-4 text-emerald-500" /> Standart Süsleme
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-4 h-4 text-emerald-500" /> Ses & Müzik Düzeni
              </div>
            </div>
          </div>

          {/* Paket 2 */}
          <div className="p-6 rounded-2xl bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">VIP Premium Düğün Paketi</h3>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">₺180.000</div>
            </div>
            <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-700/50">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-4 h-4 text-emerald-500" /> 350 Kişilik Özel Menü
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-4 h-4 text-emerald-500" /> Lüks Bohem Dekorasyon
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-4 h-4 text-emerald-500" /> Orkestra & DJ Hizmeti
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-4 h-4 text-emerald-500" /> Dış Çekim Hediyesi
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}