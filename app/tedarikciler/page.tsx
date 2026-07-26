'use client';

import React from 'react';
import { SupplierList } from '@/components/vendor/organisms/SupplierList';
import { VendorGlassButton } from '@/components/vendor/atoms/VendorGlassButton';
import { Plus, Handshake } from 'lucide-react';

export default function VendorSuppliersPage() {
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-xl border border-white rounded-full text-[11px] font-semibold text-[#D4AF37] mb-2">
            <Handshake className="w-3.5 h-3.5" /> WedyPlan Dış Hizmet & Ekosistem
          </div>
          <h1 className="text-[28px] md:text-[32px] font-serif font-normal text-[#1D1D1F]">
            Tedarikçi & Alt Yüklenici Yönetimi
          </h1>
          <p className="text-[13px] text-[#6E6E73]">
            Dışarıdan hizmet aldığınız orkestra, catering, fotoğrafçı ve garson ekiplerinin hakedişlerini yönetin.
          </p>
        </div>

        <VendorGlassButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Yeni Tedarikçi Ekle
        </VendorGlassButton>
      </div>

      <SupplierList />
    </div>
  );
}