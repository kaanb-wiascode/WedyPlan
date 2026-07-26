'use client';

import React from 'react';
import { VendorPortalShell } from '@/components/vendor/templates/VendorPortalShell';
import { OrganizationList } from '@/components/vendor/organisms/OrganizationList';
import { CalendarCheck2, Plus } from 'lucide-react';
import { VendorGlassButton } from '@/components/vendor/atoms/VendorGlassButton';

export default function VendorOrganizationPage() {
  return (
    <VendorPortalShell>
      <div className="space-y-6 max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-xl border border-white rounded-full text-[11px] font-semibold text-[#D4AF37] mb-2">
              <CalendarCheck2 className="w-3.5 h-3.5" /> WedyPlan WOS Operasyon Kalbi
            </div>
            <h1 className="text-[28px] md:text-[32px] font-serif font-normal text-[#1D1D1F]">
              Düğün & Saha Organizasyon Yönetimi
            </h1>
            <p className="text-[13px] text-[#6E6E73]">
              İmzalanan sözleşmelerin saha görevlerini, personel vardiyalarını ve risklerini canlı takip edin.
            </p>
          </div>

          <VendorGlassButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Yeni Saha Görevi Ekle
          </VendorGlassButton>
        </div>

        {/* Ana Organizasyon Listesi Organı */}
        <OrganizationList />

      </div>
    </VendorPortalShell>
  );
}