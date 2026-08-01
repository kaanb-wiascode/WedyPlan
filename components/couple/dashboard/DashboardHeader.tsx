'use client';

import React, { useEffect, useState } from 'react';
import { getCoupleSettings } from '@/lib/actions/settings';
import { Sparkles, Plus, Calendar } from 'lucide-react';

interface DashboardHeaderProps {
  names?: string;
  location?: string;
}

export function DashboardHeader({ names, location }: DashboardHeaderProps = {}) {
  const [profile, setProfile] = useState<{
    partnerOneName: string;
    partnerTwoName: string;
    weddingDate: string;
  }>({
    partnerOneName: 'Sadi',
    partnerTwoName: 'Hamiyet',
    weddingDate: '2026-08-15',
  });

  const syncProfileData = async () => {
    // 1. Önce localStorage'dan hızlıca çek
    try {
      const localData = localStorage.getItem('wedyplan_couple_profile');
      if (localData) {
        const parsed = JSON.parse(localData);
        if (parsed.partnerOneName || parsed.partnerTwoName) {
          setProfile({
            partnerOneName: parsed.partnerOneName || 'Sadi',
            partnerTwoName: parsed.partnerTwoName || 'Hamiyet',
            weddingDate: parsed.weddingDate || '2026-08-15',
          });
        }
      }
    } catch (e) {}

    // 2. Sunucu Çerezinden Oku ve Senkronize Et
    const res = await getCoupleSettings();
    if (res.success && res.data?.profile) {
      const p = res.data.profile;
      setProfile({
        partnerOneName: p.partnerOneName || 'Sadi',
        partnerTwoName: p.partnerTwoName || 'Hamiyet',
        weddingDate: p.weddingDate || '2026-08-15',
      });
      try {
        localStorage.setItem('wedyplan_couple_profile', JSON.stringify(p));
      } catch (e) {}
    }
  };

  useEffect(() => {
    syncProfileData();

    // Ayarlar güncellendiğinde anında yenile
    const handleProfileUpdate = () => {
      syncProfileData();
    };

    window.addEventListener('wedyplan_profile_updated', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);

    return () => {
      window.removeEventListener('wedyplan_profile_updated', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  const calculateDaysLeft = (targetDateStr: string) => {
    if (!targetDateStr) return 0;
    const target = new Date(targetDateStr);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Tarih Seçilmedi';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const pOne = profile.partnerOneName || 'Sadi';
  const pTwo = profile.partnerTwoName || 'Hamiyet';
  const wDate = profile.weddingDate || '2026-08-15';

  const displayName = `${pOne} & ${pTwo}`;
  const daysLeft = calculateDaysLeft(wDate);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      
      <div className="space-y-3 max-w-xl z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Büyük Günü Planlıyoruz</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          Hoş Geldiniz, {displayName}! ✨
        </h1>

        <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
          Düğün hazırlıklarınız harika gidiyor! Planlamanızı kolaylaştırmak için tüm adımları tek ekranda topladık.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button className="px-4 py-2 rounded-xl bg-white text-rose-600 text-xs font-bold shadow-md hover:bg-rose-50 transition-all cursor-pointer inline-flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Harcama Ekle
          </button>
          <button className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-bold hover:bg-white/30 transition-all cursor-pointer inline-flex items-center gap-1.5">
            Davetli Ekle
          </button>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center shrink-0 min-w-[160px] z-10 space-y-1">
        <div className="text-4xl font-black tracking-tight">{daysLeft}</div>
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-200">GÜN KALDI</div>
        <div className="text-[11px] opacity-90 font-medium pt-1 flex items-center justify-center gap-1">
          <Calendar className="w-3 h-3" /> {formatDate(wDate)}
        </div>
      </div>

    </div>
  );
}

export default DashboardHeader;