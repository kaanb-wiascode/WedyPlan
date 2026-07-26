'use client';

import React, { useState } from 'react';
import { KANBAN_COLUMNS, INITIAL_LEADS_DATA } from '@/lib/vendor-leads-constants';
import { LeadOpportunity } from '@/types/vendor-leads';
import { LeadKanbanCard } from '@/components/vendor/molecules/LeadKanbanCard';

export const LeadKanbanBoard: React.FC = () => {
  const [leads, setLeads] = useState<LeadOpportunity[]>(INITIAL_LEADS_DATA);

  const handleSendAiProposal = (id: string) => {
    setLeads((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, stage: 'PROPOSAL_SENT', aiProposalStatus: 'SENT' };
        }
        return item;
      })
    );
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x scrollbar-thin">
      {KANBAN_COLUMNS.map((column) => {
        const columnLeads = leads.filter((l) => l.stage === column.id);
        const totalAmount = columnLeads.reduce((sum, l) => sum + l.budgetEstimated, 0);

        return (
          <div key={column.id} className="w-[290px] shrink-0 flex flex-col snap-center">
            
            <div className="bg-white/40 backdrop-blur-xl border border-white/80 p-3 rounded-2xl shadow-sm mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${column.colorLine}`} />
                  <h3 className="font-semibold text-[13px] text-[#1D1D1F]">{column.title}</h3>
                </div>
                <span className="text-[11px] font-bold bg-white px-2 py-0.5 rounded-full text-[#6E6E73]">
                  {columnLeads.length}
                </span>
              </div>
              <div className="text-[10px] text-[#86868B] font-medium text-right mt-1 font-mono">
                {totalAmount.toLocaleString('tr-TR')} ₺
              </div>
            </div>

            <div className="flex flex-col gap-3 min-h-[200px]">
              {columnLeads.map((lead) => (
                <LeadKanbanCard key={lead.id} lead={lead} onSendAiProposal={handleSendAiProposal} />
              ))}
              {columnLeads.length === 0 && (
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-black/5 rounded-[20px] text-[11px] text-[#86868B] p-6 text-center">
                  Bu aşamada henüz talep yok
                </div>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
};