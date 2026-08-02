'use client';

import React, { useState } from 'react';
import { Button } from '@/components/shared/ui/Button';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Plus, Check, X, Sparkles, TrendingUp, Users } from 'lucide-react';
import DynamicPricingWidget from './DynamicPricingWidget';
import { PackageFormValues } from '@/lib/validations/vendor-packages';
import { updatePackagePriceAction } from '@/lib/actions/vendor-packages';

export default function VendorPackagesClient({ initialPackages }: { initialPackages: PackageFormValues[] }) {
  const [packages, setPackages] = useState<PackageFormValues[]>(initialPackages);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleAcceptAIPrice = async (pkg: PackageFormValues) => {
    if (!pkg.aiSuggestedPrice) return;
    
    setIsUpdating(pkg.id);
    const res = await updatePackagePriceAction(pkg.id, pkg.aiSuggestedPrice);
    
    if (res.success) {
      setPackages(prev => prev.map(p => 
        p.id === pkg.id ? { ...p, price: pkg.aiSuggestedPrice!, aiSuggestedPrice: undefined } : p
      ));
    }
    setIsUpdating(null);
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      
      {/* 1. Piyasa Radarı */}
      <DynamicPricingWidget />

      {/* 2. Başlık ve Yeni Ekle */}
      <div className="flex justify-between items-center bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-slate-200/60 dark:border-zinc-800">
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Düğün & Etkinlik Paketleriniz</h2>
          <p className="text-[11px] text-gray-500">Müşterilerinize sunduğunuz paketleri ve fiyatları yönetin.</p>
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700 text-white text-xs flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          Yeni Paket Oluştur
        </Button>
      </div>

      {/* 3. Paket Kartları Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <GlassCard key={pkg.id} className="relative flex flex-col p-6 space-y-4 hover:shadow-xl transition-all border-slate-200/80 dark:border-zinc-800">
            
            {/* Popüler Etiketi */}
            {pkg.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                EN ÇOK TERCİH EDİLEN
              </div>
            )}

            {/* Başlık & Kapasite */}
            <div className="text-center pt-2 border-b border-slate-100 dark:border-zinc-800 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{pkg.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{pkg.description}</p>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-slate-100 dark:bg-zinc-800/50 inline-flex px-3 py-1 rounded-full">
                <Users className="w-3.5 h-3.5 text-rose-500" />
                {pkg.minGuests} - {pkg.maxGuests} Kişi
              </div>
            </div>

            {/* Fiyat Alanı */}
            <div className="text-center py-2">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {pkg.price.toLocaleString('tr-TR')} ₺
              </span>
            </div>

            {/* AI Dinamik Fiyat Önerisi (Varsa) */}
            {pkg.aiSuggestedPrice && (
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Yapay Zekâ Önerisi
                </div>
                <p className="text-[10px] text-emerald-900 dark:text-emerald-200 leading-relaxed">
                  {pkg.aiReason}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold line-through text-gray-400">
                    {pkg.price.toLocaleString('tr-TR')} ₺
                  </span>
                  <span className="text-sm font-black text-emerald-600">
                    {pkg.aiSuggestedPrice.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
                <Button 
                  isLoading={isUpdating === pkg.id}
                  onClick={() => handleAcceptAIPrice(pkg)}
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] h-8"
                >
                  Önerilen Fiyatı Uygula
                </Button>
              </div>
            )}

            {/* Paket Özellikleri */}
            <div className="flex-1 pt-2">
              <ul className="space-y-2.5">
                {pkg.features.map(feature => (
                  <li key={feature.id} className="flex items-start gap-2 text-xs">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 dark:text-zinc-700 shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-700 dark:text-gray-300 font-medium' : 'text-gray-400 line-through'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Düzenle Butonu */}
            <Button variant="outline" className="w-full text-xs font-bold mt-4 border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800">
              Paketi Düzenle
            </Button>
          </GlassCard>
        ))}
      </div>

    </div>
  );
}