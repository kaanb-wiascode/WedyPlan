'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export default function PrepareProposalPage() {
  // İnteraktif Teklif Form State'i
  const [proposal, setProposal] = useState({
    clientName: '',
    clientPhone: '',
    weddingDate: '',
    guestCount: '300 Kişi',
    packageDetails: 'Standard Düğün Paketi (Yemekli Menü, Dış Çekim, Canlı Müzik, Anı Defteri)',
    totalPrice: '',
    depositPrice: '',
    terms: '1. Etkinlik tarihinden 15 gün öncesine kadar iptal durumunda kaporanın %50\'si iade edilir.\n2. Alkol ve ek ikramlar ücrete dahil değildir.\n3. Ödeme peşin veya 3 taksit olarak yapılır.',
  });

  // Dosya Yükleme State'i
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: '2026_Dugun_Menuleri_Katalogu.pdf',
      size: '2.4 MB',
      type: 'PDF',
      url: '#',
      uploadedAt: '20.07.2026',
    },
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  // Dosya Yükleme Simülasyonu
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
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toLocaleDateString('tr-TR'),
      };

      setUploadedFiles([newFile, ...uploadedFiles]);
      setIsUploading(false);
      alert('📄 Dosyanız başarıyla yüklendi ve tekliflerinize eklendi!');
    }, 1000);
  };

  // Teklif Oluşturma & WhatsApp Bağlantısı
  const handleGenerateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  const handleShareWhatsApp = () => {
    let msg = `*💍 ${proposal.clientName.toUpperCase()} - ÖZEL DÜĞÜN TEKLİFİ VE SÖZLEŞME TASLAĞI*\n\n`;
    msg += `📅 *Düğün Tarihi:* ${proposal.weddingDate}\n`;
    msg += `👥 *Davetli Sayısı:* ${proposal.guestCount}\n\n`;
    msg += `📦 *Dahil Hizmetler:*\n${proposal.packageDetails}\n\n`;
    msg += `💰 *Toplam Tutar:* ${proposal.totalPrice} TL\n`;
    msg += `💳 *Kapora / Ön Ödeme:* ${proposal.depositPrice} TL\n\n`;
    msg += `📋 *Sözleşme Maddeleri:*\n${proposal.terms}\n\n`;
    if (uploadedFiles.length > 0) {
      msg += `📄 *Ekli Fiyat Kataloğu / Menü:* ${uploadedFiles[0].name}\n\n`;
    }
    msg += `Detayları onaylıyorsanız lütfen bu mesaja dönüş yapınız.`;

    const cleanPhone = proposal.clientPhone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Üst Başlık */}
      <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-purple-100 text-[#4A154B] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
            B2B Teklif & Doküman Stüdyosu
          </span>
          <h1 className="text-2xl font-extrabold text-[#4A154B] mt-1">Teklif Hazırla & Özel Dosya Yükle 📝</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Çiftlere özel dijital sözleşme taslağı oluşturun veya kendi menü/katalog PDF'lerinizi yükleyip paylaşın.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sol Kolon: Form & Dosya Yükleme (7 Kolon) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Özel Dosya / PDF Yükleme Alanı */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#4A154B] flex items-center gap-2">
              <span>📁</span> Özel Fiyat Kataloğu / Menü PDF Yükle
            </h2>

            {/* Yükleme Kutusu */}
            <div className="border-2 border-dashed border-purple-200 hover:border-[#E6007E] bg-purple-50/40 p-6 rounded-2xl text-center space-y-2 transition cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl mx-auto shadow-sm text-[#E6007E]">
                📤
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">
                  {isUploading ? 'Dosya Yükleniyor...' : 'Dosyayı Buraya Sürükleyin veya Seçin'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">PDF, Word, JPG veya PNG (Max 10MB)</p>
              </div>
            </div>

            {/* Yüklenen Dosyalar Listesi */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Yüklü Kurumsal Dokümanlar</span>
              {uploadedFiles.map((file) => (
                <div key={file.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#4A154B] text-white text-[9px] font-bold px-2 py-1 rounded uppercase">
                      {file.type}
                    </span>
                    <span className="font-bold text-slate-700 truncate max-w-[200px]">{file.name}</span>
                    <span className="text-[10px] text-slate-400">({file.size})</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    ✓ Yüklendi
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dijital Teklif & Sözleşme Formu */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#4A154B] flex items-center gap-2">
              <span>✍️</span> Çifte Özel Fiyat & Sözleşme Detayları
            </h2>

            <form onSubmit={handleGenerateProposal} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Müşteri (Çift) Adı</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ayşe & Ahmet"
                    value={proposal.clientName}
                    onChange={(e) => setProposal({ ...proposal, clientName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Müşteri Telefonu</label>
                  <input
                    type="tel"
                    required
                    placeholder="05XX XXX XX XX"
                    value={proposal.clientPhone}
                    onChange={(e) => setProposal({ ...proposal, clientPhone: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Anlaşılan Düğün Tarihi</label>
                  <input
                    type="date"
                    required
                    value={proposal.weddingDate}
                    onChange={(e) => setProposal({ ...proposal, weddingDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Davetli Kapasitesi</label>
                  <input
                    type="text"
                    value={proposal.guestCount}
                    onChange={(e) => setProposal({ ...proposal, guestCount: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Paket İçeriği & Dahil Hizmetler</label>
                <textarea
                  rows={3}
                  value={proposal.packageDetails}
                  onChange={(e) => setProposal({ ...proposal, packageDetails: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Toplam Anlaşma Tutarı (TL)</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: 150.000"
                    value={proposal.totalPrice}
                    onChange={(e) => setProposal({ ...proposal, totalPrice: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] font-bold text-[#E6007E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Talep Edilen Kapora (TL)</label>
                  <input
                    type="text"
                    placeholder="Örn: 30.000"
                    value={proposal.depositPrice}
                    onChange={(e) => setProposal({ ...proposal, depositPrice: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Sözleşme Maddeleri & İptal Şartları</label>
                <textarea
                  rows={3}
                  value={proposal.terms}
                  onChange={(e) => setProposal({ ...proposal, terms: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4A154B] hover:bg-purple-900 text-white font-bold text-xs py-3.5 rounded-xl transition shadow"
              >
                Önizleme Oluştur ✨
              </button>
            </form>
          </div>
        </div>

        {/* Sağ Kolon: Dijital Önizleme & Paylaşım (5 Kolon) */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-slate-400 block text-center">
            📄 Canlı Sözleşme Taslağı Önizlemesi
          </span>

          <div className="bg-white rounded-3xl border border-purple-200 p-6 shadow-xl space-y-4 text-xs relative">
            <div className="border-b border-purple-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-[#4A154B] text-sm">WEDYPLAN RESMİ TEKLİF FORMU</h3>
                <p className="text-[10px] text-slate-400">Tarih: {new Date().toLocaleDateString('tr-TR')}</p>
              </div>
              <span className="bg-pink-50 text-[#E6007E] font-bold text-[9px] px-2 py-1 rounded">TASLAK</span>
            </div>

            <div className="space-y-2">
              <p><strong>Müşteri:</strong> {proposal.clientName || 'Ayşe & Ahmet'}</p>
              <p><strong>Tarih / Kapasite:</strong> {proposal.weddingDate || 'Tarih Seçilmedi'} ({proposal.guestCount})</p>
            </div>

            <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-100 space-y-1">
              <span className="font-bold text-[#4A154B] block">Dahil Hizmetler:</span>
              <p className="text-slate-600 whitespace-pre-line">{proposal.packageDetails}</p>
            </div>

            <div className="flex justify-between items-center bg-slate-900 text-white p-3 rounded-xl font-bold">
              <span>Toplam Tutar:</span>
              <span className="text-emerald-400 text-sm">{proposal.totalPrice || '0'} TL</span>
            </div>

            {proposal.terms && (
              <div className="text-[10px] text-slate-500 space-y-1 pt-1">
                <span className="font-bold text-slate-700 block">Şartlar:</span>
                <p className="whitespace-pre-line">{proposal.terms}</p>
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="pt-2 border-t border-slate-100 text-[10px] text-purple-900 font-bold">
                📎 Ekli Katalog: {uploadedFiles[0].name}
              </div>
            )}

            <button
              onClick={handleShareWhatsApp}
              disabled={!proposal.clientPhone}
              className="w-full bg-[#25D366] hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2 text-xs disabled:opacity-50"
            >
              <span>💬</span>
              <span>WhatsApp'tan Çifte Gönder</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}