'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Wallet, Sparkles, CheckCircle2, MessageSquare, MoreHorizontal } from 'lucide-react';
import { LeadOpportunity, TagColor } from '@/types/vendor-leads';

interface LeadKanbanCardProps {
  lead: LeadOpportunity;
  onSendAiProposal: (id: string) => void;
}

const TAG_COLOR_MAP: Record<TagColor, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
};

export const LeadKanbanCard: React.FC<LeadKanbanCardProps> = ({ lead, onSendAiProposal }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white/70 backdrop-blur-2xl border border-white/90 p-4 rounded-[20px] shadow-sm hover:shadow-md transition-all space-y-3 cursor-grab active:cursor-grabbing group"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-bold text-[14px] text-[#1D1D1F] leading-tight">{lead.coupleNames}</h4>
          <span className="text-[10px] text-[#86868B]">{lead.lastActivityAt}</span>
        </div>
        <button className="text-[#86868B] hover:text-[#1D1D1F] p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {lead.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {lead.tags.map((tag) => (
            <span key={tag.id} className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${TAG_COLOR_MAP[tag.color]}`}>
              {tag.label}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6E6E73]">
        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {lead.weddingDate}</div>
        <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#D4AF37]" /> {lead.guestCount} Kişi</div>
        <div className="col-span-2 flex items-center justify-between pt-1 border-t border-black/5 font-semibold text-[#1D1D1F]">
          <span className="flex items-center gap-1"><Wallet className="w-3.5 h-3.5 text-[#D4AF37]" /> {lead.budgetEstimated.toLocaleString('tr-TR')} ₺</span>
          <span className="text-[10px] text-[#86868B] font-mono flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {lead.notesCount}</span>
        </div>
      </div>

      {lead.aiProposalStatus === 'READY' && (
        <div className="pt-2">
          <button
            onClick={() => onSendAiProposal(lead.id)}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 text-[#1D1D1F] text-[11px] font-bold rounded-xl transition-colors border border-[#D4AF37]/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> WedyAI Teklifini Gönder
          </button>
        </div>
      )}

      {lead.aiProposalStatus === 'SENT' && (
        <div className="pt-1 text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> WedyAI Teklifi Müşteriye İletildi
        </div>
      )}
    </motion.div>
  );
};