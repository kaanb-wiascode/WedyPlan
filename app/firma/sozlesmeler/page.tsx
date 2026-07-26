'use client';

import React from 'react';
import { ContractList } from '@/components/vendor/organisms/ContractList';
import { VendorGlassButton } from '@/components/vendor/atoms/VendorGlassButton';
import { Plus, ShieldCheck } from 'lucide-react';

export default function VendorContractsPage() {
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-xl border border-white rounded-full text-[11px] font-semibold text-[#D4AF37] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Dijital E-İmza & KVKK Onaylı
          </div>
          <h1 className="text-[28px] md:text-[32px] font-serif font-normal text-[#1D1D1F]">
            Sözleşmeler & Dijital İmzalar
          </h1>
          <p className="text-[13px] text-[#6E6E73]">
            Çiftlerinizle dijital ortamda hukuki olarak geçerli sözleşmeler yapın ve kaporaları takip edin.
          </p>
        </div>

        <VendorGlassButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Yeni Sözleşme Taslağı Oluştur
        </VendorGlassButton>
      </div>

      <ContractList />
    </div>
  );
}