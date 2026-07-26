'use client';

import React, { useState } from 'react';
import { INITIAL_ORG_PROJECTS } from '@/lib/vendor-organization-constants';
import { OrgProject } from '@/types/vendor-organization';
import { OrgProjectCard } from '@/components/vendor/molecules/OrgProjectCard';

type FilterType = 'ALL' | 'RISKY' | 'PREPARATION';

export const OrganizationList: React.FC = () => {
  const [projects] = useState<OrgProject[]>(INITIAL_ORG_PROJECTS);
  const [filter, setFilter] = useState<FilterType>('ALL');

  const filteredProjects = projects.filter((p: OrgProject) => {
    if (filter === 'RISKY') return p.riskSeverity === 'HIGH';
    if (filter === 'PREPARATION') return p.status === 'PREPARATION';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filtre Sekmeleri */}
      <div className="flex items-center gap-2 border-b border-black/5 pb-3">
        {[
          { id: 'ALL', label: 'Tüm Düğün Operasyonları' },
          { id: 'RISKY', label: '⚠️ WedyAI Risk Uyarısı Olanlar' },
          { id: 'PREPARATION', label: 'Hazırlığı Sürenler' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as FilterType)}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-white/90 text-[#1D1D1F] shadow-sm border border-white'
                : 'text-[#6E6E73] hover:bg-white/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Proje Kartları Listesi */}
      <div className="space-y-4">
        {filteredProjects.map((project: OrgProject) => (
          <OrgProjectCard
            key={project.id}
            project={project}
            onSelectProject={(id: string) => alert(`Düğün Operasyon Detayı Açılıyor ID: ${id}`)}
          />
        ))}

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center bg-white/30 rounded-[28px] border border-white/60 text-[#86868B] text-[13px]">
            Bu filtreye uygun aktif düğün operasyonu bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};