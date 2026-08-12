'use client';

import React from 'react';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Calendar, Users, Euro, Sparkles, Phone, MessageSquare, Zap, Activity } from 'lucide-react';
import { LeadFormValues, LeadStatus } from '@/lib/validations/vendor-leads';

interface LeadKanbanBoardProps {
  leads: LeadFormValues[];
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
  onSelectLead: (lead: LeadFormValues) => void;
  onInstantOffer?: (lead: LeadFormValues) => void;
}

const KANBAN_COLUMNS: { id: LeadStatus; title: string; color: string }[] = [
  { id: 'NEW', title: 'Yeni Gelenler', color: 'bg-blue-500' },
  { id: 'CONTACTED', title: 'İletişimde', color: 'bg-amber-500' },
  { id: 'PROPOSAL_SENT', title: 'Teklif Gönderildi', color: 'bg-purple-500' },
  { id: 'CONTRACT_STAGE', title: 'Sözleşme Aşaması', color: 'bg-rose-500' },
  { id: 'WON', title: 'Anlaşıldı 🎉', color: 'bg-emerald-500' },
  { id: 'LOST', title: 'Kaybedildi', color: 'bg-gray-400' },
];

export function LeadKanbanBoard({
  leads,
  onStatusChange,
  onSelectLead,
  onInstantOffer,
}: LeadKanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
      {KANBAN_COLUMNS.map((col) => {
        const columnLeads = leads.filter((l) => l.status === col.id);

        return (
          <div key={col.id} className="space-y-3 min-w-[260px]">
            <div className="flex items-center justify-between p-2.5 bg-slate-100/80 dark:bg-zinc-800/60 rounded-2xl border border-slate-200/60 dark:border-zinc-700/60">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  {col.title}
                </h4>
              </div>
              <span className="text-[10px] font-bold text-gray-500 bg-white dark:bg-zinc-700 px-2 py-0.5 rounded-full">
                {columnLeads.length}
              </span>
            </div>

            <div className="space-y-3 min-h-[400px]">
              {columnLeads.map((lead) => (
                <GlassCard
                  key={lead.id}
                  className={`p-4 space-y-3 cursor-pointer transition-all hover:shadow-lg group relative ${
                    lead.isCoupleOnline
                      ? 'border-emerald-300 dark:border-emerald-800/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200/80 dark:border-zinc-800'
                  }`}
                  onClick={() => onSelectLead(lead)}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <img
                          src={lead.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                          alt={lead.coupleName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        {lead.isCoupleOnline && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full animate-pulse" />
                        )}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-rose-600 transition-colors">
                          {lead.coupleName}
                        </h5>
                        <p className="text-[10px] text-gray-400">{lead.createdAt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/60 dark:border-rose-800">
                      <Sparkles className="w-2.5 h-2.5 text-rose-500" />
                      %{lead.aiScore}
                    </div>
                  </div>

                  {lead.isCoupleOnline && lead.currentActivity && (
                    <div className="p-2 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40 flex items-center gap-1.5 text-[10px] text-emerald-800 dark:text-emerald-300 font-medium">
                      <Activity className="w-3 h-3 text-emerald-500 animate-spin shrink-0" />
                      <span className="truncate">{lead.currentActivity}</span>
                    </div>
                  )}

                  <div className="space-y-1 text-[11px] text-gray-600 dark:text-gray-300 pt-1 border-t border-slate-100 dark:border-zinc-800">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {lead.weddingDate}
                      </span>
                      <span className="font-semibold flex items-center gap-1">
                        <Users className="w-3 h-3" /> {lead.guestCount} Kişi
                      </span>
                    </div>

                    {lead.budgetAmount && (
                      <div className="flex items-center justify-between font-bold text-gray-900 dark:text-white pt-1">
                        <span className="text-gray-400 font-normal">Bütçe:</span>
                        <span className="text-rose-600 dark:text-rose-400 flex items-center gap-0.5">
                          <Euro className="w-3 h-3" />
                          {lead.budgetAmount.toLocaleString()} {lead.currency}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1">
                      {lead.whatsappPhone && (
                        <a
                          href={`https://wa.me/${lead.whatsappPhone}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:hover:bg-emerald-900 transition-colors"
                          title="WhatsApp"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </a>
                      )}
                      <a
                        href={`tel:${lead.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 transition-colors"
                        title="Ara"
                      >
                        <Phone className="w-3 h-3" />
                      </a>
                    </div>

                    {onInstantOffer && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInstantOffer(lead);
                        }}
                        className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <Zap className="w-3 h-3 text-amber-300 fill-current" />
                        Teklif
                      </button>
                    )}
                  </div>
                </GlassCard>
              ))}

              {columnLeads.length === 0 && (
                <div className="p-6 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl text-center text-[11px] text-gray-400">
                  Talep yok
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LeadKanbanBoard;