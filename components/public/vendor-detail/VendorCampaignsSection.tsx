'use client';

import React from 'react';
import { Tag, Calendar } from 'lucide-react';
import { VendorCampaign } from '@/types/vendor-detail-page';

interface VendorCampaignsSectionProps {
  campaigns: VendorCampaign[];
}

export const VendorCampaignsSection: React.FC<VendorCampaignsSectionProps> = ({ campaigns }) => {
  if (campaigns.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[#E6007E] text-[13px] font-bold">
        <Tag className="w-4 h-4 text-[#D4AF37]" />
        <span>Aktif Fırsat & Kampanyalar</span>
      </div>

      <div className="space-y-3">
        {campaigns.map((cmp: VendorCampaign) => (
          <div key={cmp.id} className="p-6 bg-gradient-to-r from-pink-500/10 via-amber-500/5 to-white/80 backdrop-blur-2xl border border-pink-200 rounded-[28px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold bg-[#E6007E] text-white px-2.5 py-0.5 rounded-full inline-block">
                {cmp.discountBadge}
              </span>
              <h4 className="font-bold text-[16px] text-[#1D1D1F]">{cmp.title}</h4>
              <p className="text-[12px] text-[#6E6E73]">{cmp.description}</p>
            </div>
            <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Son Tarih: {cmp.validUntil}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};