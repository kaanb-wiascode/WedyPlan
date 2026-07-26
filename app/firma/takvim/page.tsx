'use client';

import React from 'react';
import { VendorCalendarView } from '@/components/vendor/organisms/VendorCalendarView';
import { VendorGlassButton } from '@/components/vendor/atoms/VendorGlassButton';
import { Plus, Calendar, Lock } from 'lucide-react';

export default function VendorCalendarPage() {
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-xl border border-white rounded-full text-[11px] font-semibold text-[#D4AF37] mb-2">
            <Calendar className="w-3.5 h-3.5" /> WedyPlan Çakışma Önleyici Takvim
          </div>
          <h1 className="text-[28px] md:text-[32px] font-serif font-normal text-[#1D1D1F]">
            Akıllı Takvim & Rezervasyon Yönetimi
          </h1>
          <p className="text-[13px] text-[#6E6E73]">
            Salon doluluk durumlarını, gündüz/gece vardiyalarını ve çakışma risklerini canlı takip edin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <VendorGlassButton variant="secondary" leftIcon={<Lock className="w-4 h-4" />}>
            Tarih Kapat / Bakım Ekle
          </VendorGlassButton>
          <VendorGlassButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Yeni Rezervasyon İşle
          </VendorGlassButton>
        </div>
      </div>

      <VendorCalendarView />
    </div>
  );
}