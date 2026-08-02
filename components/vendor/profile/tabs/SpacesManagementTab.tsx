'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Button } from '@/components/shared/ui/Button';
import { 
  Plus, 
  Trash2, 
  Users, 
  Ruler, 
  Sparkles, 
  MapPin, 
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { SpaceSchema } from '@/lib/validations/vendor-profile';
import { z } from 'zod';

type SpaceFormValues = z.infer<typeof SpaceSchema>;

const SPACE_TYPES = [
  { id: 'KAPALI_SALON', label: 'Kapalı Balo Salonu' },
  { id: 'AÇIK_HAVA', label: 'Açık Hava / Kır Bahçesi' },
  { id: 'HAVUZ_BAŞI', label: 'Havuz Başı' },
  { id: 'RESTORAN', label: 'Restoran / Teras' },
];

const COMMON_FEATURES = [
  'Kolonsuz Salon',
  'Yüksek Tavan (>5m)',
  'Deniz Manzaralı',
  'Açılır Kapanır Tavan',
  'Şehir Manzaralı',
  'Bahçe / Çim Alan',
  'Ayrı Mescit / Hazırlık Odası',
  'Engelli Girişi',
];

export function SpacesManagementTab() {
  // Örnek başlangıç verisi (Titanic Hotel mantığı)
  const [spaces, setSpaces] = useState<SpaceFormValues[]>([
    {
      id: '1',
      name: 'Karina Balo Salonu',
      type: 'KAPALI_SALON',
      capacityYemekliMin: 100,
      capacityYemekliMax: 800,
      capacityKokteylMax: 1000,
      ceilingHeight: 6.2,
      features: ['Kolonsuz Salon', 'Yüksek Tavan (>5m)', 'Ayrı Mescit / Hazırlık Odası'],
      images: [],
    },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSpace, setNewSpace] = useState<Partial<SpaceFormValues>>({
    name: '',
    type: 'KAPALI_SALON',
    capacityYemekliMin: 50,
    capacityYemekliMax: 500,
    capacityKokteylMax: 600,
    ceilingHeight: 4.5,
    features: [],
    images: [],
  });

  const handleAddSpace = () => {
    if (!newSpace.name) return;
    setSpaces((prev) => [
      ...prev,
      { ...newSpace, id: Date.now().toString() } as SpaceFormValues,
    ]);
    setIsAddingNew(false);
    setNewSpace({
      name: '',
      type: 'KAPALI_SALON',
      capacityYemekliMin: 50,
      capacityYemekliMax: 500,
      features: [],
      images: [],
    });
  };

  const handleRemoveSpace = (id?: string) => {

    setSpaces((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleFeature = (feature: string) => {
    const current = newSpace.features || [];
    if (current.includes(feature)) {
      setNewSpace({
        ...newSpace,
        features: current.filter((f) => f !== feature),
      });
    } else {
      setNewSpace({ ...newSpace, features: [...current, feature] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Üst Bilgi ve Ekle Butonu */}
      <div className="flex justify-between items-center bg-white/40 dark:bg-zinc-900/40 p-5 rounded-2xl border border-slate-200/60 dark:border-zinc-800">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-500" />
            Davet Alanları & Balo Salonları
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Mekanınızda bulunan farklı salon, kır bahçesi veya havuz başı alanlarını tanımlayın.
          </p>
        </div>
        {!isAddingNew && (
          <Button
            onClick={() => setIsAddingNew(true)}
            className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Yeni Salon Ekle
          </Button>
        )}
      </div>

      {/* Yeni Salon Ekleme Formu */}
      {isAddingNew && (
        <GlassCard className="p-6 border-2 border-rose-200/80 dark:border-rose-900/50 space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center border-b pb-3 border-slate-200/60 dark:border-zinc-800">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              Yeni Davet Alanı Tanımla
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddingNew(false)}
              className="text-xs"
            >
              Vazgeç
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Alan Adı */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Salon / Alan Adı
              </label>
              <input
                type="text"
                placeholder="Örn: Karina Balo Salonu, Havuz Başı"
                value={newSpace.name}
                onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Alan Tipi */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Mekan Türü
              </label>
              <select
                value={newSpace.type}
                onChange={(e) => setNewSpace({ ...newSpace, type: e.target.value as any })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {SPACE_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Yemekli Kapasite Min/Max */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Min. Yemekli Kapasite
                </label>
                <input
                  type="number"
                  value={newSpace.capacityYemekliMin}
                  onChange={(e) => setNewSpace({ ...newSpace, capacityYemekliMin: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Max. Yemekli Kapasite
                </label>
                <input
                  type="number"
                  value={newSpace.capacityYemekliMax}
                  onChange={(e) => setNewSpace({ ...newSpace, capacityYemekliMax: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Kokteyl Kapasite & Tavan Yüksekliği */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Max. Kokteyl Kapasitesi
                </label>
                <input
                  type="number"
                  value={newSpace.capacityKokteylMax || ''}
                  onChange={(e) => setNewSpace({ ...newSpace, capacityKokteylMax: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Tavan Yüksekliği (Metre)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Örn: 6.2"
                  value={newSpace.ceilingHeight || ''}
                  onChange={(e) => setNewSpace({ ...newSpace, ceilingHeight: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Özellik Etiketleri */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Salon Özellikleri & İmkanlar
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_FEATURES.map((feat) => {
                const isSelected = newSpace.features?.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-rose-500 text-white border-rose-500 font-medium'
                        : 'bg-white/60 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-slate-200 dark:border-zinc-700 hover:border-rose-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    {feat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/60 dark:border-zinc-800">
            <Button variant="outline" size="sm" onClick={() => setIsAddingNew(false)}>
              İptal
            </Button>
            <Button size="sm" onClick={handleAddSpace} className="bg-rose-600 text-white">
              Salonu Kaydet
            </Button>
          </div>
        </GlassCard>
      )}

      {/* Mevcut Salonların Listesi (Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spaces.map((space) => (
          <GlassCard key={space.id} className="p-5 relative group hover:shadow-md transition-all">
            <button
              onClick={() => handleRemoveSpace(space.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
              title="Salonu Sil"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-rose-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  {space.name}
                </h4>
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md mt-1">
                  {SPACE_TYPES.find((t) => t.id === space.type)?.label || space.type}
                </span>
              </div>
            </div>

            {/* Metrikler */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                <span>
                  <strong>{space.capacityYemekliMin} - {space.capacityYemekliMax}</strong> Kişi (Yemekli)
                </span>
              </div>

              {space.ceilingHeight && (
                <div className="flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-gray-400" />
                  <span>Tavan Yüksekliği: <strong>{space.ceilingHeight}m</strong></span>
                </div>
              )}
            </div>

            {/* Etiketler */}
            {space.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {space.features.map((feat) => (
                  <span
                    key={feat}
                    className="text-[10px] bg-slate-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}