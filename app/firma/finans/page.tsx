'use client';

import React from 'react';
import { FinanceOverview } from '@/components/vendor/organisms/FinanceOverview';
import { VendorGlassButton } from '@/components/vendor/atoms/VendorGlassButton';
import { Plus, Download, Coins } from 'lucide-react';

export default function VendorFinancePage() {
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-xl border border-white rounded-full text-[11px] font-semibold text-[#D4AF37] mb-2">
            <Coins className="w-3.5 h-3.5" /> WedyPlan WOS Kasası & Finans Merkezi
          </div>
          <h1 className="text-[28px] md:text-[32px] font-serif font-normal text-[#1D1D1F]">
            Finans & Nakit Akışı Yönetimi
          </h1>
          <p className="text-[13px] text-[#6E6E73]">
            Çift kaporalarını, taksit alacaklarını ve tedarikçi hakedişlerini anlık olarak yönetin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <VendorGlassButton variant="secondary" leftIcon={<Download className="w-4 h-4" />}>
            Mali Rapor Al (PDF/Excel)
          </VendorGlassButton>
          <VendorGlassButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Yeni Ödeme / Gider İşle
          </VendorGlassButton>
        </div>
      </div>

      <FinanceOverview />
    </div>
  );
}