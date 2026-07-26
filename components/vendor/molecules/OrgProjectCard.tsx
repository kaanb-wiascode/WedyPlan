'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, AlertTriangle, UserCheck, Truck, ChevronRight } from 'lucide-react';
import { OrgProject } from '@/types/vendor-organization';
import { ORG_STATUS_LABELS } from '@/lib/vendor-organization-constants';
import { VendorProgressBar } from '@/components/vendor/atoms/VendorProgressBar';

interface OrgProjectCardProps {
  project: OrgProject;
  onSelectProject: (id: string) => void;
}

export const OrgProjectCard: React.FC<OrgProjectCardProps> = ({ project, onSelectProject }) => {
  const statusInfo = ORG_STATUS_LABELS[project.status as keyof typeof ORG_STATUS_LABELS] || {
    label: 'Hazırlık Aşamasında',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white/60 backdrop-blur-3xl border border-white/90 p-6 rounded-[28px] shadow-sm hover:shadow-md transition-all space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#86868B] font-bold">
            Sözleşme No: {project.contractId}
          </span>
          <h3 className="font-serif text-[20px] font-semibold text-[#1D1D1F]">{project.coupleNames}</h3>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
          <span className="text-[11px] font-mono font-bold bg-black/5 px-2.5 py-1 rounded-full text-[#1D1D1F]">
            {project.daysRemaining} Gün Kaldı
          </span>
        </div>
      </div>

      {project.riskSeverity === 'HIGH' && project.riskMessage && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-rose-700 text-[12px]">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <div className="font-medium">
            <strong className="font-bold">WedyAI Risk Analizi: </strong>
            {project.riskMessage}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px] text-[#6E6E73]">
        <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#D4AF37]" /> {project.eventDate}</div>
        <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#D4AF37]" /> {project.guestCount} Davetli</div>
        <div className="flex items-center gap-1.5"><UserCheck className="w-4 h-4 text-[#D4AF37]" /> {project.assignedStaffCount} Vardiya Personel</div>
        <div className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-[#D4AF37]" /> {project.confirmedSuppliersCount}/{project.totalSuppliersCount} Tedarikçi</div>
      </div>

      <div className="space-y-1.5 pt-2">
        <div className="flex justify-between text-[11px] font-semibold text-[#1D1D1F]">
          <span>Hazırlık & Operasyon İlerlemesi</span>
          <span className="font-mono">%{project.completionRate}</span>
        </div>
        <VendorProgressBar progress={project.completionRate} />
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={() => onSelectProject(project.id)}
          className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1D1D1F] bg-white/80 hover:bg-white px-4 py-2 rounded-full border border-white shadow-sm transition-colors cursor-pointer"
        >
          Saha Detayları & Görevler <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>
    </motion.div>
  );
};