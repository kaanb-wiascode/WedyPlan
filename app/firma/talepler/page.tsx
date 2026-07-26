'use client';

import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { VendorGlassButton } from '@/components/vendor/atoms/VendorGlassButton';
import { LeadKanbanBoard } from '@/components/vendor/organisms/LeadKanbanBoard';

export default function VendorLeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-serif text-[#1D1D1F]">
            Talepler & Satış Pipeline
          </h1>
          <p className="text-[13px] text-[#6E6E73]">
            Çiftlerden gelen talepleri yönetin ve WedyAI ile otomatik teklifler hazırlayın.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <VendorGlassButton variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
            Filtrele
          </VendorGlassButton>
          <VendorGlassButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Manuel Talep Ekle
          </VendorGlassButton>
        </div>
      </div>

      <LeadKanbanBoard />
    </div>
  );
}