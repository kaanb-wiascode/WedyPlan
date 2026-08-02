'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Button } from '@/components/shared/ui/Button';
import { 
  Utensils, 
  Wine, 
  Clock, 
  ShieldAlert, 
  Check, 
  Car, 
  Music, 
  Sparkles, 
  Gift,
  Camera,
  Briefcase,
  Flame,
  Dog,
  CheckCircle2,
  Save
} from 'lucide-react';

// Düğün Paketine Dahil Olabilecek Standart Hizmetler
const PACKAGE_INCLUSIONS = [
  { id: 'gelin_odasi', label: 'Gelin & Damat Hazırlık Odası' },
  { id: 'suit_konaklama', label: 'Gelin & Damata Özel Süit Konaklama' },
  { id: 'ertesi_gun_kahvalti', label: 'Ertesi Gün Odaya Serpme Kahvaltı' },
  { id: 'menu_tadimi', label: 'Etkinlik Öncesi Menü Tadımı' },
  { id: 'karsilama_kokteyli', label: 'Girişte Karşılama Kokteyli' },
  { id: 'dugun_pastasi', label: 'Maket & Gerçek Düğün Pastası' },
  { id: 'volkan_gosterisi', label: 'Volkan & Işık Gösterisi' },
  { id: 'isik_ses_sahne', label: 'Profesyonel Işık & Ses Sistemi' },
  { id: 'dj_orkestra', label: 'DJ / Canlı Müzik Orkestrası' },
  { id: 'valet_service', label: 'Otopark & Vale Hizmeti' },
  { id: 'organizer_host', label: 'Özel Etkinlik Sorumlusu / Hostes' },
  { id: 'after_party_area', label: 'After Party Alanı Kullanımı' },
];

// Menü Tipleri
const CATERING_TYPES = [
  { id: 'kirmizi_et', label: 'Kırmızı Et Menüsü' },
  { id: 'beyaz_et', label: 'Beyaz Et (Tavuk/Balık) Menüsü' },
  { id: 'kokteyl_menu', label: 'Kokteyl & Ordövr Tabakları' },
  { id: 'vegan', label: 'Vegan / Vejetaryen Menü' },
  { id: 'kosher_halal', label: 'Kosher / Özel Dini Menü' },
  { id: 'cocuk_menusu', label: 'Çocuklara Özel Menü' },
  { id: 'diyabet', label: 'Diyabet / Çölyak (Glutensiz) Menü' },
];

export function ServicesAndPackagesTab() {
  // 1. Paket Özellikleri State'i
  const [selectedInclusions, setSelectedInclusions] = useState<string[]>([
    'gelin_odasi',
    'suit_konaklama',
    'menu_tadimi',
    'dugun_pastasi',
    'isik_ses_sahne',
  ]);

  // 2. Menü Tipleri State'i
  const [selectedCatering, setSelectedCatering] = useState<string[]>([
    'kirmizi_et',
    'beyaz_et',
    'kokteyl_menu',
    'vegan',
  ]);

  // 3. Alkol & Kurallar State'i
  const [alcoholService, setAlcoholService] = useState<'VAR' | 'YOK' | 'DIŞARIDAN'>('VAR');
  const [outsideOrgAllowed, setOutsideOrgAllowed] = useState(true);
  const [outsidePhotoAllowed, setOutsidePhotoAllowed] = useState(true);
  const [fireworksAllowed, setFireworksAllowed] = useState(false);
  const [petFriendly, setPetFriendly] = useState(true);
  
  // 4. Kısıtlama Saatleri & Otopark
  const [musicCutoff, setMusicCutoff] = useState('24:00');
  const [serviceCutoff, setServiceCutoff] = useState('24:00');
  const [valetType, setValetPriceType] = useState<'Ücretsiz' | 'Ücretli'>('Ücretli');
  const [parkingCapacity, setValetCapacity] = useState('250-500 Araç');

  const toggleItem = (list: string[], setList: (val: string[]) => void, id: string) => {
    if (list.includes(id)) {
      setList(list.filter((item) => item !== id));
    } else {
      setList([...list, id]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. PAKETE DAHİL HİZMETLER */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200/60 dark:border-zinc-800 pb-3">
          <Gift className="w-5 h-5 text-rose-500" />
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Standart Düğün Paketi İçeriği
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Çiftlere sunduğunuz başlangıç veya standart pakete dahil olan avantajları işaretleyin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {PACKAGE_INCLUSIONS.map((item) => {
            const isChecked = selectedInclusions.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(selectedInclusions, setSelectedInclusions, item.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all text-xs font-medium ${
                  isChecked
                    ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 shadow-xs'
                    : 'bg-white/40 dark:bg-zinc-800/40 border-slate-200 dark:border-zinc-700/60 text-gray-600 dark:text-gray-400 hover:border-rose-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                  isChecked ? 'bg-rose-600 text-white' : 'border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800'
                }`}>
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* 2. YİYECEK, İÇECEK & MENÜ SEÇENEKLERİ */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200/60 dark:border-zinc-800 pb-3">
          <Utensils className="w-5 h-5 text-rose-500" />
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Yiyecek & İçecek (Catering) Ayrıntıları
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Mutfağınızın hazırlayabildiği menü alternatifleri ve ikram standartları.
            </p>
          </div>
        </div>

        {/* Menü Seçenekleri */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Hazırlanabilen Menü Çeşitleri
          </label>
          <div className="flex flex-wrap gap-2">
            {CATERING_TYPES.map((cat) => {
              const isSelected = selectedCatering.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleItem(selectedCatering, setSelectedCatering, cat.id)}
                  className={`text-xs px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-rose-500 text-white border-rose-500 font-medium shadow-xs'
                      : 'bg-white/60 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-slate-200 dark:border-zinc-700 hover:border-rose-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Alkol Servis Durumu */}
        <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
            <Wine className="w-4 h-4 text-rose-500" />
            Alkol Servisi Durumu
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'VAR', title: 'Alkol Servisi Var', desc: 'Mekan tarafından sağlanıyor' },
              { id: 'DIŞARIDAN', title: 'Dışarıdan Getirilebilir', desc: 'Çiftler kendi getirebilir' },
              { id: 'YOK', title: 'Alkol Servisi Yok', desc: 'Mekanda alkol kullanılmıyor' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAlcoholService(opt.id as any)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  alcoholService === opt.id
                    ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 ring-1 ring-rose-500'
                    : 'border-slate-200 dark:border-zinc-700 hover:border-slate-300'
                }`}
              >
                <p className="text-xs font-bold text-gray-900 dark:text-white">{opt.title}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* 3. OPERASYONEL KURALLAR & ZAMAN KISITLAMALARI */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200/60 dark:border-zinc-800 pb-3">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Mekan Kuralları & Esneklikler
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Çiftlerin organizasyon planlarken uyması gereken temel kurallar ve kısıtlamalar.
            </p>
          </div>
        </div>

        {/* Toggle Mantığındaki Kurallar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Dışarıdan Organizasyon Firması İzni */}
          <div className="flex items-center justify-between p-3.5 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-slate-200/60 dark:border-zinc-700/60">
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Dışarıdan Organizasyon Firması</p>
                <p className="text-[10px] text-gray-500">Çiftler kendi organizasyon firmasını getirebilir mi?</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={outsideOrgAllowed}
              onChange={(e) => setOutsideOrgAllowed(e.target.checked)}
              className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
            />
          </div>

          {/* Dışarıdan Fotoğrafçı İzni */}
          <div className="flex items-center justify-between p-3.5 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-slate-200/60 dark:border-zinc-700/60">
            <div className="flex items-center gap-2.5">
              <Camera className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Dışarıdan Fotoğrafçı / Kameraman</p>
                <p className="text-[10px] text-gray-500">Harici çekim ekibi getirilmesine izin veriliyor mu?</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={outsidePhotoAllowed}
              onChange={(e) => setOutsidePhotoAllowed(e.target.checked)}
              className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
            />
          </div>

          {/* Havai Fişek / Kitle Gösterisi */}
          <div className="flex items-center justify-between p-3.5 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-slate-200/60 dark:border-zinc-700/60">
            <div className="flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Havai Fişek / Yanıcı Gösteri</p>
                <p className="text-[10px] text-gray-500">Açık alanda havai fişek kullanım izni var mı?</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={fireworksAllowed}
              onChange={(e) => setFireworksAllowed(e.target.checked)}
              className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
            />
          </div>

          {/* Evcil Hayvan İzni */}
          <div className="flex items-center justify-between p-3.5 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-slate-200/60 dark:border-zinc-700/60">
            <div className="flex items-center gap-2.5">
              <Dog className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Evcil Hayvan Dostu (Pet Friendly)</p>
                <p className="text-[10px] text-gray-500">Seremonide evcil hayvan bulunabilir mi?</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={petFriendly}
              onChange={(e) => setPetFriendly(e.target.checked)}
              className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
            />
          </div>

        </div>

        {/* Bitiş Saatleri & Otopark Bilgisi */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100 dark:border-zinc-800">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-gray-500" />
              Müzik Bitiş Saati
            </label>
            <input
              type="text"
              value={musicCutoff}
              onChange={(e) => setMusicCutoff(e.target.value)}
              placeholder="Örn: 24:00 veya 02:00"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              Servis Bitiş Saati
            </label>
            <input
              type="text"
              value={serviceCutoff}
              onChange={(e) => setServiceCutoff(e.target.value)}
              placeholder="Örn: 23:30 veya 01:00"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-gray-500" />
              Otopark Kapasitesi & Vale
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={parkingCapacity}
                onChange={(e) => setValetCapacity(e.target.value)}
                placeholder="Örn: 500 Araç"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
              />
              <select
                value={valetType}
                onChange={(e) => setValetPriceType(e.target.value as any)}
                className="text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2"
              >
                <option value="Ücretli">Ücretli</option>
                <option value="Ücretsiz">Ücretsiz</option>
              </select>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Kaydet Butonu */}
      <div className="flex justify-end pt-2">
        <Button className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 px-6">
          <Save className="w-4 h-4" />
          Hizmet ve Kuralları Kaydet
        </Button>
      </div>

    </div>
  );
}