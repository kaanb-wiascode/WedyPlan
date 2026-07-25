'use client';

import React, { useState } from 'react';
import { 
  Inbox, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Search, 
  DollarSign, 
  Calendar,
  Sparkles,
  ArrowRight,
  MoreVertical
} from 'lucide-react';

interface Lead {
  id: string;
  coupleName: string;
  weddingDate: string;
  budget: string;
  category: string;
  status: 'GELEN' | 'TEKLIF_VERILDI' | 'ONAYLANDI' | 'RED';
}

export default function VendorLeadsKanbanPage() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', coupleName: 'Selin & Burak', weddingDate: '15 Eylül 2026', budget: '180.000 TL', category: 'Kır Bahçesi', status: 'GELEN' },
    { id: '2', coupleName: 'Ceren & Mert', weddingDate: '22 Ekim 2026', budget: '220.000 TL', category: 'Otel Düğünü', status: 'TEKLIF_VERILDI' },
    { id: '3', coupleName: 'Elif & Volkan', weddingDate: '04 Ağustos 2026', budget: '150.000 TL', category: 'Düğün Salonu', status: 'ONAYLANDI' },
    { id: '4', coupleName: 'Zeynep & Kaan', weddingDate: '12 Kasım 2026', budget: '200.000 TL', category: 'Kır Bahçesi', status: 'RED' },
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [offerPrice, setOfferPrice] = useState('');

  // Move status
  const updateStatus = (id: string, newStatus: Lead['status']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  // Columns definition
  const columns: { title: string; status: Lead['status']; icon: any; color: string }[] = [
    { title: 'Gelen Talepler', status: 'GELEN', icon: Inbox, color: 'border-blue-500/20 text-blue-600 bg-blue-50' },
    { title: 'Teklif Verildi', status: 'TEKLIF_VERILDI', icon: FileText, color: 'border-amber-500/20 text-amber-600 bg-amber-50' },
    { title: 'Anlaşıldı / Onaylandı', status: 'ONAYLANDI', icon: CheckCircle2, color: 'border-emerald-500/20 text-emerald-600 bg-emerald-50' },
    { title: 'İptal / Olumsuz', status: 'RED', icon: XCircle, color: 'border-rose-500/20 text-rose-600 bg-rose-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-medium tracking-tight text-[#111111]">
            Müşteri Talepleri & CRM Kanban
          </h1>
          <p className="text-[14px] text-[#666666] mt-1">
            Gelen çift taleplerini değerlendirin, 10 saniyede resmi teklifinizi oluşturun.
          </p>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colLeads = leads.filter(l => l.status === col.status);
          const Icon = col.icon;

          return (
            <div key={col.status} className="bg-[#F8F8F7] p-4 rounded-[24px] border border-[rgba(0,0,0,0.06)] min-w-[260px] flex flex-col justify-between space-y-4">
              
              {/* Column Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`p-2 rounded-[10px] ${col.color}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <h3 className="text-[14px] font-medium text-[#111111]">{col.title}</h3>
                </div>
                <span className="text-[12px] font-medium text-[#666666] bg-white px-2 py-0.5 rounded-full border border-[rgba(0,0,0,0.04)]">
                  {colLeads.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-3 flex-1">
                {colLeads.map((lead) => (
                  <div 
                    key={lead.id} 
                    className="bg-white p-5 rounded-[20px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_16px_rgba(0,0,0,0.02)] space-y-3 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all"
                  >
                    <div>
                      <h4 className="font-medium text-[15px] text-[#111111]">{lead.coupleName}</h4>
                      <p className="text-[12px] text-[#666666]">{lead.category}</p>
                    </div>

                    <div className="space-y-1 text-[12px] text-[#666666]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#999999]" />
                        <span>{lead.weddingDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-[#999999]" />
                        <span className="font-medium text-[#111111]">Bütçe: {lead.budget}</span>
                      </div>
                    </div>

                    {/* Action buttons based on state */}
                    <div className="pt-2 border-t border-[rgba(0,0,0,0.04)] flex items-center justify-between gap-2">
                      {lead.status === 'GELEN' && (
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="w-full h-[36px] bg-[#111111] text-white text-[12px] font-medium rounded-[12px] hover:bg-[#333333] transition-colors flex items-center justify-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Teklif Hazırla</span>
                        </button>
                      )}

                      {lead.status === 'TEKLIF_VERILDI' && (
                        <button
                          onClick={() => updateStatus(lead.id, 'ONAYLANDI')}
                          className="w-full h-[36px] bg-emerald-600 text-white text-[12px] font-medium rounded-[12px] hover:bg-emerald-700 transition-colors"
                        >
                          Anlaşmayı Onayla
                        </button>
                      )}

                      {lead.status === 'ONAYLANDI' && (
                        <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          Sözleşme Aktif
                        </span>
                      )}

                      {lead.status === 'RED' && (
                        <span className="text-[11px] font-medium text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                          Süreç Kapatıldı
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Offer Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-[460px] w-full rounded-[32px] p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div>
              <h3 className="text-[20px] font-medium text-[#111111]">
                Hızlı Teklif Hazırla
              </h3>
              <p className="text-[13px] text-[#666666] mt-1">
                {selectedLead.coupleName} çifti için özel fiyatlandırma ve detay belirleyin.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-[#666666] mb-1">Teklif Fiyatı (TL)</label>
                <input
                  type="text"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder="Örn: 165.000 TL"
                  className="w-full h-[48px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] outline-none focus:border-[#7C5CFF]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#666666] mb-1">Teklif Notu & Hizmet Kapsamı</label>
                <textarea
                  rows={3}
                  placeholder="Dahil olan hizmetler, ikramlar ve özel indirimler..."
                  className="w-full p-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] outline-none focus:border-[#7C5CFF]"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedLead(null)}
                className="flex-1 h-[48px] bg-[#F8F8F7] text-[#666666] font-medium text-[14px] rounded-[16px] hover:bg-[#EFEFE3]"
              >
                Vazgeç
              </button>
              <button
                onClick={() => {
                  updateStatus(selectedLead.id, 'TEKLIF_VERILDI');
                  setSelectedLead(null);
                }}
                className="flex-1 h-[48px] bg-[#111111] text-white font-medium text-[14px] rounded-[16px] hover:bg-[#333333] flex items-center justify-center gap-2"
              >
                <span>Teklifi Gönder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}