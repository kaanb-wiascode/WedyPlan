'use client';

import React, { useState } from 'react';
import { INITIAL_SUPPLIERS, SUPPLIER_CATEGORY_LABELS } from '@/lib/vendor-suppliers-constants';
import { Supplier } from '@/types/vendor-suppliers';
import { SupplierCard } from '@/components/vendor/molecules/SupplierCard';

export const SupplierList: React.FC = () => {
  const [suppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredSuppliers = suppliers.filter((s) => {
    if (selectedCategory !== 'ALL') return s.category === selectedCategory;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Kategori Filtreleri */}
      <div className="flex items-center gap-2 border-b border-black/5 pb-3 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all shrink-0 cursor-pointer ${
            selectedCategory === 'ALL'
              ? 'bg-white/90 text-[#1D1D1F] shadow-sm border border-white'
              : 'text-[#6E6E73] hover:bg-white/30'
          }`}
        >
          Tüm Tedarikçiler ({suppliers.length})
        </button>
        {Object.entries(SUPPLIER_CATEGORY_LABELS).map(([catKey, label]) => (
          <button
            key={catKey}
            onClick={() => setSelectedCategory(catKey)}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all shrink-0 cursor-pointer ${
              selectedCategory === catKey
                ? 'bg-white/90 text-[#1D1D1F] shadow-sm border border-white'
                : 'text-[#6E6E73] hover:bg-white/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="space-y-4">
        {filteredSuppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}

        {filteredSuppliers.length === 0 && (
          <div className="p-12 text-center bg-white/30 rounded-[28px] border border-white/60 text-[#86868B] text-[13px]">
            Seçilen kategoriye ait kayıtlı tedarikçi bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};