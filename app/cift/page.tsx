'use client';

import React, { useState } from 'react';
import { PortalMode } from '@/types/couple-command';
import { CoupleCommandHeader } from '@/components/couple/CoupleCommandHeader';
import { AiPlannerCard } from '@/components/couple/AiPlannerCard';
import { BudgetOSWidget } from '@/components/couple/BudgetOSWidget';
import { WeddingDayModeWidget } from '@/components/couple/WeddingDayModeWidget';
import { GuestManagementWidget } from '@/components/couple/GuestManagementWidget';
import { WeddingWebsiteBuilderModal } from '@/components/couple/WeddingWebsiteBuilderModal';
import { WEDDING_TIMELINE_PHASES } from '@/lib/couple-command-constants';

export default function CoupleCommandCenterPage() {
  const [mode, setMode] = useState<PortalMode>('COMMAND_CENTER');
  const [showWebsiteModal, setShowWebsiteModal] = useState(false);

  return (
    <div className="space-y-8 max-w-[1240px] mx-auto pb-12">
      {/* Top Header Command Bar */}
      <CoupleCommandHeader
        mode={mode}
        onModeChange={(newMode) => setMode(newMode)}
        onOpenWebsiteModal={() => setShowWebsiteModal(true)}
      />

      {/* Mode Render Strategy */}
      {mode === 'WEDDING_DAY_MODE' ? (
        <WeddingDayModeWidget />
      ) : mode === 'AFTER_WEDDING' ? (
        <div className="bg-white/40 backdrop-blur-3xl border border-white/80 p-8 rounded-[36px] text-center space-y-4">
          <h2 className="font-serif font-bold text-[28px]">Balayı & Düğün Anıları</h2>
          <p className="text-[13px] text-[#6E6E73]">Düğününüz sonrasında 4K video teslimi, albüm basımı ve teşekkür mesajları bu alandan takip edilecek.</p>
        </div>
      ) : (
        /* MAIN COMMAND CENTER */
        <div className="space-y-8">
          <AiPlannerCard />
          <BudgetOSWidget />
          <GuestManagementWidget />

          {/* Timeline Process Bar */}
          <div className="bg-white/40 backdrop-blur-3xl border border-white/80 p-8 rounded-[36px] space-y-4">
            <h3 className="font-serif font-semibold text-[22px] text-[#1D1D1F]">Düğün Yolculuğu & Zaman Çizelgesi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {WEDDING_TIMELINE_PHASES.map((phase) => (
                <div key={phase.id} className="p-4 bg-white/80 rounded-[22px] border border-white text-center space-y-1">
                  <span className="text-[10px] font-bold text-[#E6007E] block">{phase.dateRange}</span>
                  <h4 className="font-bold text-[13px] text-[#1D1D1F]">{phase.title}</h4>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block ${
                    phase.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-800' : phase.status === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {phase.status === 'COMPLETED' ? '✓ Tamamlandı' : phase.status === 'IN_PROGRESS' ? 'Devam Ediyor' : 'Gelecek'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Website Builder Modal */}
      {showWebsiteModal && <WeddingWebsiteBuilderModal onClose={() => setShowWebsiteModal(false)} />}
    </div>
  );
}