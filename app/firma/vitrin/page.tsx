'use client';

import React from 'react';
import { VendorProfileEditor } from '@/components/vendor/organisms/VendorProfileEditor';
import { VendorGlassButton } from '@/components/vendor/atoms/VendorGlassButton';
import { Store, Eye } from 'lucide-react';

export default function VendorVitrinPage() {
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-xl border border-white rounded-full text-[11px] font-semibold text-[#D4AF37] mb-2">
            <Store className="w-3.5 h-3.5" /> WedyPlan Pazaryeri Vitrini
          </div>
          <h1 className="text-[28px] md:text-[32px] font-serif font-normal text-[#1D1D1F]">
            Vitrin & Profil Yönetimi
          </h1>
          <p className="text-[13px] text-[#6E6E73]">
            Evlenecek çiftlerin WedyPlan platformunda gördüğü firma sayfanızı, paketlerinizi ve görsellerinizi güncelleyin.
          </p>
        </div>

        <VendorGlassButton variant="secondary" leftIcon={<Eye className="w-4 h-4" />}>
          Çift Gözünden Canlı Önizle
        </VendorGlassButton>
      </div>

      <VendorProfileEditor />
    </div>
  );
}