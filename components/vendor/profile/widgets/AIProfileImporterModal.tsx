'use client';

import React, { useState } from 'react';
import { Button } from '@/components/shared/ui/Button';
import { 
  Sparkles, 
  Link as LinkIcon, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  X, 
  ArrowRight,
  Building,
  Check,
  AlertCircle
} from 'lucide-react';
import { extractProfileFromExternalSource } from '@/lib/actions/vendor-profile';

interface AIProfileImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataExtracted: (data: any) => void;
}

export function AIProfileImporterModal({
  isOpen,
  onClose,
  onDataExtracted,
}: AIProfileImporterModalProps) {
  const [sourceType, setSourceType] = useState<'link' | 'pdf'>('link');
  const [urlInput, setUrlInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Analiz Aşamaları: 'idle' | 'analyzing' | 'preview'
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'preview'>('idle');
  const [extractedResult, setExtractedResult] = useState<any>(null);

  if (!isOpen) return null;

  // AI Analizini Başlat
  const handleStartAnalysis = async () => {
    setStatus('analyzing');

    try {
      // Server Action Çağrısı (PDF veya Link)
      const res = await extractProfileFromExternalSource(
        sourceType === 'link' ? urlInput : selectedFile?.name || 'Broşür.pdf'
      );

      if (res.success) {
        setExtractedResult(res.data);
        setStatus('preview');
      }
    } catch (error) {
      console.error('AI Extraction Error:', error);
      setStatus('idle');
    }
  };

  // Verileri Profil Formuna Aktar
  const handleApplyData = () => {
    if (extractedResult) {
      onDataExtracted(extractedResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-zinc-800 overflow-hidden">
        
        {/* Üst Başlık & Kapat */}
        <div className="p-6 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-transparent border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-rose-500 text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                WedyPlan AI Profil Sihirbazı
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Web sitenizden veya katalog PDF'inizden tüm bilgileri 30 saniyede otomatik çekin.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal İçeriği */}
        <div className="p-6 space-y-6">

          {/* 1. ADIM: Kaynak Seçimi (Arama / PDF) */}
          {status === 'idle' && (
            <div className="space-y-5">
              
              {/* Sekme Butonları (Link vs PDF) */}
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-zinc-800/60 rounded-2xl">
                <button
                  onClick={() => setSourceType('link')}
                  className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                    sourceType === 'link'
                      ? 'bg-white dark:bg-zinc-900 text-rose-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  Web Sitesi / Profil Linki
                </button>

                <button
                  onClick={() => setSourceType('pdf')}
                  className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                    sourceType === 'pdf'
                      ? 'bg-white dark:bg-zinc-900 text-rose-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Düğün Kataloğu (PDF)
                </button>
              </div>

              {/* Input Alanları */}
              {sourceType === 'link' ? (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Mekan Web Sitesi veya Mevcut Profil URL'si
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="https://www.titanichotels.com/titanicbusinesskartal"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Düğün Tanıtım Broşürü veya Fiyat Listesi (PDF)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 dark:border-zinc-700 rounded-2xl p-6 text-center bg-slate-50/50 dark:bg-zinc-800/30 hover:border-rose-300 transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {selectedFile ? selectedFile.name : "PDF dosyanızı buraya sürükleyin veya seçin"}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">Maksimum dosya boyutu: 25MB</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload" className="inline-block mt-3 px-4 py-1.5 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-slate-50">
                      Dosya Seç
                    </label>
                  </div>
                </div>
              )}

              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
                  WedyPlan AI, dokümandaki balo salonu kapasitelerini, tavan yüksekliklerini, yemek menülerini ve fiyatları otomatik ayıklar. Var olan verilerinizin üzerine yazılmaz, önizleme aşamasında onayınız alınır.
                </p>
              </div>
            </div>
          )}

          {/* 2. ADIM: AI Analiz Ediyor (Loading State) */}
          {status === 'analyzing' && (
            <div className="py-12 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-ping" />
                <div className="p-4 bg-gradient-to-tr from-rose-500 to-amber-500 text-white rounded-full relative z-10 shadow-lg">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  Yapay Zekâ Dokümanı Analiz Ediyor...
                </h4>
                <p className="text-xs text-gray-500">
                  Salon kapasiteleri, tavan yükseklikleri ve paket detayları ayıklanıyor.
                </p>
              </div>
            </div>
          )}

          {/* 3. ADIM: AI Önizleme ve Onay (Preview State) */}
          {status === 'preview' && extractedResult && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Analiz Tamamlandı! Aşağıdaki veriler profil sekmelerinize aktarılacak:</span>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2 p-1">
                {/* Tespit Edilen Temel Bilgiler */}
                <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-gray-900 dark:text-white block">Firma Kimliği:</span>
                  <p className="text-gray-600 dark:text-gray-300">{extractedResult.title} ({extractedResult.category})</p>
                  <p className="text-rose-600 font-semibold">Başlangıç Fiyatı: {extractedResult.minPriceWeekday} {extractedResult.currency} / Kişi</p>
                </div>

                {/* Tespit Edilen Salonlar */}
                <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-gray-900 dark:text-white block">Tespit Edilen Salonlar ({extractedResult.spaces?.length || 0}):</span>
                  {extractedResult.spaces?.map((sp: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-gray-600 dark:text-gray-300 py-1 border-b border-slate-200 dark:border-zinc-700 last:border-0">
                      <span>• {sp.name}</span>
                      <span className="font-medium">{sp.capacityYemekliMax} Kişi | {sp.ceilingHeight}m Tavan</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Alt Butonlar */}
        <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 border-t border-slate-100 dark:border-zinc-800 flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            İptal
          </Button>

          {status === 'idle' && (
            <Button
              size="sm"
              onClick={handleStartAnalysis}
              disabled={sourceType === 'link' ? !urlInput : !selectedFile}
              className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Analizi Başlat
            </Button>
          )}

          {status === 'preview' && (
            <Button
              size="sm"
              onClick={handleApplyData}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Verileri Profile Aktar
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}