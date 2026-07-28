"use client";

import React, { useState, useRef } from "react";
import { Camera, Image as ImageIcon, FileText, QrCode, Upload, CheckCircle2, X } from "lucide-react";
import { MobileMediaEngine, ProcessedMediaItem } from "@/lib/mobile/mobile-media-engine";

interface MobileMediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onMediaCaptured?: (items: ProcessedMediaItem[]) => void;
}

export const MobileMediaPicker: React.FC<MobileMediaPickerProps> = ({
  isOpen,
  onClose,
  onMediaCaptured,
}) => {
  const [items, setItems] = useState<ProcessedMediaItem[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    const processedList: ProcessedMediaItem[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const item = await MobileMediaEngine.compressImage(files[i]);
        processedList.push(item);
      } catch (err) {
        console.error("Görsel işleme hatası:", err);
      }
    }

    setItems((prev) => [...prev, ...processedList]);
    setIsCompressing(false);
  };

  const handleComplete = () => {
    if (onMediaCaptured) onMediaCaptured(items);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-[#F5F4F0] rounded-[36px] border border-white/80 p-6 shadow-2xl space-y-6 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center pb-3 border-b border-black/10">
          <div>
            <h3 className="font-serif-editorial text-xl font-semibold text-[#111111]">
              Medya & Belge Yükle
            </h3>
            <p className="text-xs text-[#666666]">
              Fotoğraf seçin, sözleşme tarayın veya QR okutun.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10"
          >
            <X className="w-4 h-4 text-[#111111]" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-4 bg-white/80 border border-black/10 rounded-2xl hover:bg-white transition-all space-y-2"
          >
            <Camera className="w-6 h-6 text-[#111111]" />
            <span className="text-xs font-semibold text-[#111111]">Kamera / Galeri</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-4 bg-white/80 border border-black/10 rounded-2xl hover:bg-white transition-all space-y-2"
          >
            <FileText className="w-6 h-6 text-[#D4AF37]" />
            <span className="text-xs font-semibold text-[#111111]">Sözleşme Tara</span>
          </button>
        </div>

        {isCompressing && (
          <div className="p-3 bg-black/5 rounded-xl text-center text-xs text-[#111111] font-medium">
            Görseller optimize ediliyor ve WebP formatına dönüştürülüyor...
          </div>
        )}

        {items.length > 0 && (
          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              İşlenen Medyalar ({items.length})
            </span>
            <div className="grid grid-cols-4 gap-2">
              {items.map((item) => (
                <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden border border-black/10 bg-black/5">
                  <img src={item.compressedDataUrl} alt={item.originalName} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/60 p-0.5 rounded-full text-white">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs text-[#666666] font-medium"
          >
            Vazgeç
          </button>
          <button
            onClick={handleComplete}
            disabled={items.length === 0}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-[#F5F4F0] text-xs font-semibold rounded-full shadow-sm hover:bg-[#222222] transition-all disabled:opacity-40"
          >
            <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Tamamla ({items.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
};