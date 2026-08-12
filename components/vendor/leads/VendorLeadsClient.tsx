'use client';

import React, { useState } from 'react';
import { Button } from '@/components/shared/ui/Button';
import { Search, Kanban, Table as TableIcon, Plus, Phone, Mail, X, MessageSquare, Sparkles, Zap, Activity } from 'lucide-react';
import AILeadInsightsWidget from './AILeadInsightsWidget';
import LeadKanbanBoard from './LeadKanbanBoard';
import InstantOfferModal from './InstantOfferModal';
import { LeadFormValues, LeadStatus } from '@/lib/validations/vendor-leads';
import { updateLeadStatusAction } from '@/lib/actions/vendor-leads';

export function VendorLeadsClient({ initialLeads }: { initialLeads: LeadFormValues[] }) {
  const [leads, setLeads] = useState<LeadFormValues[]>(initialLeads);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadFormValues | null>(null);
  const [instantOfferLead, setInstantOfferLead] = useState<LeadFormValues | null>(null);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    await updateLeadStatusAction(leadId, newStatus);
  };

  const filteredLeads: LeadFormValues[] = leads.filter(
    (l: LeadFormValues) =>
      l.coupleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <AILeadInsightsWidget
        totalLeads={leads.length}
        onlineCount={leads.filter((l: LeadFormValues) => l.isCoupleOnline).length}
        hotLeadsCount={leads.filter((l: LeadFormValues) => l.aiScore >= 85).length}
        selectedLead={selectedLead}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-slate-200/60 dark:border-zinc-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Çift adı veya e-posta ile canlı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex p-1 bg-slate-100 dark:bg-zinc-800 rounded-xl">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-zinc-900 text-rose-600 shadow-2xs font-bold'
                  : 'text-gray-500'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              Canlı Pano
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-zinc-900 text-rose-600 shadow-2xs font-bold'
                  : 'text-gray-500'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              Tablo
            </button>
          </div>

          <Button className="bg-rose-600 hover:bg-rose-700 text-white text-xs flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            Manuel Talep Ekle
          </Button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <LeadKanbanBoard
          leads={filteredLeads}
          onStatusChange={handleStatusChange}
          onSelectLead={(lead: LeadFormValues) => setSelectedLead(lead)}
          onInstantOffer={(lead: LeadFormValues) => setInstantOfferLead(lead)}
        />
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-zinc-800/50 text-gray-500 border-b border-slate-200 dark:border-zinc-800">
              <tr>
                <th className="p-3.5">Çift</th>
                <th className="p-3.5">Düğün Tarihi</th>
                <th className="p-3.5">Kişi Sayısı</th>
                <th className="p-3.5">Bütçe</th>
                <th className="p-3.5">AI Skor</th>
                <th className="p-3.5">Canlı Durum</th>
                <th className="p-3.5">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
              {filteredLeads.map((lead: LeadFormValues) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="hover:bg-rose-50/50 dark:hover:bg-rose-950/20 cursor-pointer transition-colors"
                >
                  <td className="p-3.5 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${lead.isCoupleOnline ? 'bg-emerald-500 animate-ping' : 'bg-gray-300'}`} />
                    {lead.coupleName}
                  </td>
                  <td className="p-3.5">{lead.weddingDate}</td>
                  <td className="p-3.5">{lead.guestCount} Kişi</td>
                  <td className="p-3.5 font-semibold">{lead.budgetAmount?.toLocaleString()} {lead.currency}</td>
                  <td className="p-3.5 text-rose-600 font-bold">%{lead.aiScore}</td>
                  <td className="p-3.5">
                    {lead.isCoupleOnline ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                        <Activity className="w-3 h-3" /> Online ({lead.currentActivity})
                      </span>
                    ) : (
                      <span className="text-gray-400">{lead.lastSeenTime}</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInstantOfferLead(lead);
                      }}
                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3 text-amber-300 fill-current" />
                      Teklif
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <InstantOfferModal
        lead={instantOfferLead}
        onClose={() => setInstantOfferLead(null)}
      />

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 h-full p-6 shadow-2xl border-l border-slate-200 dark:border-zinc-800 space-y-6 overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4 border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <img
                  src={selectedLead.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={selectedLead.coupleName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    {selectedLead.coupleName}
                    {selectedLead.isCoupleOnline && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    )}
                  </h3>
                  <p className="text-[11px] text-gray-400">Talep ID: #{selectedLead.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedLead.suggestedAction && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  AI Satış Aksiyon Tavsiyesi
                </div>
                <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed">
                  {selectedLead.suggestedAction}
                </p>
              </div>
            )}

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-gray-500">Düğün Tarihi:</span>
                <span className="font-semibold">{selectedLead.weddingDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-gray-500">Kişi Sayısı:</span>
                <span className="font-semibold">{selectedLead.guestCount} Kişi</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-gray-500">Bütçe:</span>
                <span className="font-bold text-rose-600">{selectedLead.budgetAmount?.toLocaleString()} {selectedLead.currency}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {selectedLead.whatsappPhone && (
                <a
                  href={`https://wa.me/${selectedLead.whatsappPhone}?text=Merhaba%20${encodeURIComponent(selectedLead.coupleName)},%20WedyPlan%20üzerinden%20talebinizi%20inceledik.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Canlı Görüşme Başlat
                </a>
              )}

              <Button
                onClick={() => {
                  setInstantOfferLead(selectedLead);
                  setSelectedLead(null);
                }}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 py-3"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-current" />
                Hızlı Özel Teklif Gönder
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorLeadsClient;