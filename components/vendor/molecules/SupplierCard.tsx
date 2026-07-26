'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Star, Calendar, Wallet, Clock, ChevronRight } from 'lucide-react';
import { Supplier } from '@/types/vendor-suppliers';
import { SUPPLIER_CATEGORY_LABELS } from '@/lib/vendor-suppliers-constants';

interface SupplierCardProps {
  supplier: Supplier;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white/60 backdrop-blur-3xl border border-white/90 p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold bg-black/5 text-[#6E6E73] px-2 py-0.5 rounded">
              {SUPPLIER_CATEGORY_LABELS[supplier.category]}
            </span>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-200">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {supplier.rating}
            </span>
          </div>
          <h3 className="font-bold text-[18px] text-[#1D1D1F] mt-1">{supplier.companyName}</h3>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[11px] text-[#86868B] block">Yetkili Kişi</span>
          <span className="text-[12px] font-semibold text-[#1D1D1F]">{supplier.contactPerson}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px] text-[#6E6E73]">
        <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> {supplier.phone}</div>
        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {supplier.activeEventsCount} Aktif Düğün</div>
        <div className="flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-[#D4AF37]" /> {supplier.totalEarnings.toLocaleString('tr-TR')} ₺ Hakediş</div>
        <div className="flex items-center gap-1.5 font-semibold text-rose-600">
          <Clock className="w-3.5 h-3.5" /> {supplier.pendingPayment.toLocaleString('tr-TR')} ₺ Alacak
        </div>
      </div>

      <div className="pt-2 border-t border-black/5 flex items-center justify-between">
        <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
          supplier.paymentStatus === 'PAID'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : supplier.paymentStatus === 'PARTIAL'
            ? 'bg-amber-50 text-amber-800 border-amber-200'
            : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          {supplier.paymentStatus === 'PAID' ? '✓ Hakediş Kapandı' : supplier.paymentStatus === 'PARTIAL' ? '⏳ Parçalı Ödeme' : '⚠️ Ödeme Bekliyor'}
        </span>

        <button className="text-[11px] font-bold text-[#1D1D1F] hover:text-[#D4AF37] inline-flex items-center gap-1 cursor-pointer">
          Hakediş & Atamalar <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};