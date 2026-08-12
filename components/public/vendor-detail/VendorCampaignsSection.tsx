'use client';

import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface Campaign {
  id: string;
  title: string;
  description: string;
  badge?: string;
}

interface VendorCampaignsSectionProps {
  campaigns?: Campaign[];
}

export const VendorCampaignsSection: React.FC<VendorCampaignsSectionProps> = ({ campaigns = [] }) => {
  if (!campaigns.length) return null;

  return (
    <section className="space-y-4">
      {campaigns.map((campaign) => (
        <GlassCard 
          key={campaign.id}
          hoverEffect
          className="p-1 border-[#0071e3]/20 bg-gradient-to-r from-[#0071e3]/10 to-purple-500/10"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-[14px] p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-[#0071e3] to-purple-600 rounded-2xl shrink-0 shadow-md">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                {campaign.badge && (
                  <span className="inline-block px-2.5 py-1 bg-[#0071e3]/10 text-[#0071e3] text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">
                    {campaign.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{campaign.title}</h3>
                <p className="text-[14px] text-gray-700 font-light">{campaign.description}</p>
              </div>
            </div>

            <button className="w-full md:w-auto shrink-0 px-6 py-3 bg-white border border-gray-200 text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2">
              Fırsatı Yakala <ArrowRight className="w-4 h-4" />
            </button>
            
          </div>
        </GlassCard>
      ))}
    </section>
  );
};