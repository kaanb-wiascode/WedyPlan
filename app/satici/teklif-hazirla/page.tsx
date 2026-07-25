'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  Check, 
  Share2, 
  MessageCircle, 
  Sparkles, 
  Calendar, 
  Users, 
  Trash2,
  Paperclip,
  CheckCircle2
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

export default function PremiumPrepareProposalPage() {
  const [proposal, setProposal] = useState({
    clientName: 'Selin & Caner',
    clientPhone: '05321234567',
    weddingDate: '2026-08-15',
    guestCount: '300 Kişi',
    packageDetails: 'Standard Düğün Paketi (Yemekli Menü, Dış Çekim, Canlı Müzik, Anı Defteri)',
    totalPrice: '180.000',
    depositPrice: '50.000',
    terms: '1. Etkinlik tarihinden 15 gün öncesine kadar iptal durumunda kaporanın %50\'si iade edilir.\n2. Alkol ve ek ikramlar ücrete dahil değildir.',
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { id: '1', name: '2026_Dugun_Menuleri_Katalogu.pdf', size: '2.4 MB', type: 'PDF' }
  ]);

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];

    setTimeout(() => {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        type: file.name.split('.').pop()?.toUpperCase() || 'DOSYA',
      };
      setUploadedFiles([newFile, ...uploadedFiles]);
      setIsUploading(false);
    }, 800);
  };

  const handleShareWhatsApp = () => {
    let msg = `*💍 ${proposal.clientName.toUpperCase()} - DÜĞÜN TEKLİFİ VE SÖZLEŞME TASLAĞI*\n\n`;
    msg += `📅 *Tarih:* ${proposal.weddingDate}\n`;
    msg += `👥 *Kapasite:* ${proposal.guestCount}\n\n`;
    msg += `📦 *Dahil Hizmetler:*\n${proposal.packageDetails}\n\n`;
    msg += `💰 *Toplam Anlaşma:* ${proposal.totalPrice} TL\n`;
    msg += `💳 *Kapora:* ${proposal.depositPrice} TL\n\n`;
    msg += `📋 *Şartlar:*\n${proposal.terms}\n\n`;
    if (uploadedFiles.length > 0) {
      msg += `📄 *Ekli Katalog:* ${uploadedFiles[0].name}\n\n`;
    }
    msg += `Detayları onaylıyorsanız lütfen bu mesaja dönüş yapınız.`;

    const cleanPhone = proposal.clientPhone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <header>
        <h1 className="text-[32px] font-medium tracking-tight text-[#111111]">
          Teklif & Doküman Stüdyosu
        </h1>
        <p className="text-[15px] text-[#666666] mt-1">
          Çifte özel dijital teklif oluşturun veya menü/katalog PDF'lerinizi yükleyin.
        </p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Form Column (7 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* File Upload Zone */}
          <div className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="text-[16px] font-medium text-[#111111]">Özel Katalog veya Menü PDF Yükle</h2>

            <div className="border-2 border-dashed border-[rgba(0,0,0,0.08)] hover:border-[#7C5CFF]/50 bg-[#F8F8F7] p-8 rounded-[20px] text-center space-y-3 transition-colors cursor-pointer relative">
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-[#7C5CFF]">
                <UploadCloud className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#111111]">
                  {isUploading ? 'Dosya Yükleniyor...' : 'Sürükleyip bırakın veya dosya seçin'}
                </p>
                <p className="text-[12px] text-[#999999] mt-0.5">PDF, Word veya Görsel (Max 10MB)</p>
              </div>
            </div>

            {/* Uploaded File List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2 pt-2">
                {uploadedFiles.map(file => (
                  <div key={file.id} className="bg-[#F8F8F7] p-3 rounded-[14px] flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2.5">
                      <Paperclip className="w-4 h-4 text-[#7C5CFF]" />
                      <span className="font-medium text-[#111111]">{file.name}</span>
                      <span className="text-[#999999]">({file.size})</span>
                    </div>
                    <span className="text-[12px] text-[#1DB954] font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Yüklendi
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Details */}
          <div className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
            <h2 className="text-[16px] font-medium text-[#111111]">Teklif Detayları</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Çift / Müşteri Adı</label>
                  <input 
                    type="text" 
                    value={proposal.clientName}
                    onChange={(e) => setProposal({ ...proposal, clientName: e.target.value })}
                    className="w-full h-[48px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Telefon</label>
                  <input 
                    type="tel" 
                    value={proposal.clientPhone}
                    onChange={(e) => setProposal({ ...proposal, clientPhone: e.target.value })}
                    className="w-full h-[48px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Düğün Tarihi</label>
                  <input 
                    type="date" 
                    value={proposal.weddingDate}
                    onChange={(e) => setProposal({ ...proposal, weddingDate: e.target.value })}
                    className="w-full h-[48px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Kapasite</label>
                  <input 
                    type="text" 
                    value={proposal.guestCount}
                    onChange={(e) => setProposal({ ...proposal, guestCount: e.target.value })}
                    className="w-full h-[48px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Paket İçeriği</label>
                <textarea 
                  rows={3}
                  value={proposal.packageDetails}
                  onChange={(e) => setProposal({ ...proposal, packageDetails: e.target.value })}
                  className="w-full p-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Toplam Anlaşma Tutarı (TL)</label>
                  <input 
                    type="text" 
                    value={proposal.totalPrice}
                    onChange={(e) => setProposal({ ...proposal, totalPrice: e.target.value })}
                    className="w-full h-[48px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] font-medium outline-none focus:border-[#7C5CFF]/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Kapora (TL)</label>
                  <input 
                    type="text" 
                    value={proposal.depositPrice}
                    onChange={(e) => setProposal({ ...proposal, depositPrice: e.target.value })}
                    className="w-full h-[48px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] font-medium outline-none focus:border-[#7C5CFF]/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Sözleşme Şartları</label>
                <textarea 
                  rows={3}
                  value={proposal.terms}
                  onChange={(e) => setProposal({ ...proposal, terms: e.target.value })}
                  className="w-full p-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors resize-none"
                ></textarea>
              </div>
            </div>
          </div>

        </div>

        {/* Preview Column (5 Columns) */}
        <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-4">
          <span className="text-[13px] font-medium text-[#666666] block text-center">
            Dijital Sözleşme Önizlemesi
          </span>

          <div className="bg-white rounded-[28px] border border-[rgba(0,0,0,0.08)] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.04)] space-y-6 text-[14px]">
            
            <div className="border-b border-[rgba(0,0,0,0.06)] pb-4 flex justify-between items-center">
              <div>
                <span className="text-[18px] font-medium tracking-tight text-[#111111] block">WEDYPLAN</span>
                <span className="text-[11px] text-[#999999] uppercase tracking-wider">Resmi Teklif Formu</span>
              </div>
              <span className="px-2.5 py-1 bg-[#F8F8F7] text-[#666666] text-[11px] font-medium rounded-full">
                TASLAK
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-[#666666]"><strong>Müşteri:</strong> <span className="text-[#111111]">{proposal.clientName}</span></p>
              <p className="text-[#666666]"><strong>Düğün Tarihi:</strong> <span className="text-[#111111]">{proposal.weddingDate}</span></p>
              <p className="text-[#666666]"><strong>Kapasite:</strong> <span className="text-[#111111]">{proposal.guestCount}</span></p>
            </div>

            <div className="p-4 rounded-[16px] bg-[#F8F8F7] border border-[rgba(0,0,0,0.04)] space-y-1">
              <span className="text-[12px] font-medium text-[#666666] block">Dahil Hizmetler</span>
              <p className="text-[#111111] whitespace-pre-line text-[13px]">{proposal.packageDetails}</p>
            </div>

            <div className="flex justify-between items-center p-4 rounded-[16px] bg-[#111111] text-white">
              <span className="text-[13px] font-medium text-white/70">Toplam Anlaşma</span>
              <span className="text-[18px] font-medium">{proposal.totalPrice} TL</span>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="pt-2 text-[12px] text-[#7C5CFF] font-medium flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5" />
                <span>Ekli Katalog: {uploadedFiles[0].name}</span>
              </div>
            )}

            <button 
              onClick={handleShareWhatsApp}
              className="w-full h-[52px] bg-[#1DB954] hover:bg-[#1AA34A] text-white font-medium text-[15px] rounded-[18px] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp'tan Gönder</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}