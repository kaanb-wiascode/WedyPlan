'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  children: React.ReactNode;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  onReset,
  children
}) => {
  // Drawer açıkken arka plan kaydırmasını kilitle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Karartma Maskesi */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Cam Çekmece Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] landscape:max-h-[92vh] bg-white/80 backdrop-blur-2xl border-t border-white/60 rounded-t-[36px] shadow-2xl flex flex-col lg:hidden overflow-hidden"
          >
            {/* Üst Tutacak (Drag Handle) */}
            <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 bg-gray-300/80 rounded-full" />
            </div>

            {/* Başlık ve Butonlar */}
            <div className="px-6 py-3 flex items-center justify-between border-b border-gray-100/60">
              <div className="flex items-center gap-2 text-gray-900">
                <SlidersHorizontal className="w-5 h-5 text-[#0071e3]" />
                <h3 className="font-bold text-lg">Filtrele ve Sırala</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={onReset}
                  className="text-xs font-bold text-[#0071e3] hover:bg-[#0071e3]/10 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Temizle
                </button>
                <button
                  onClick={onClose}
                  className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* İletilen Filtre İçeriği (Yatay/Dikey Kaydırma Destekli) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {children}
            </div>

            {/* Alt Uygula Butonu */}
            <div className="p-4 bg-white/90 border-t border-gray-100/60 backdrop-blur-md">
              <button
                onClick={onClose}
                className="w-full py-3.5 bg-[#1D1D1F] text-white font-bold text-sm rounded-2xl hover:bg-black transition-all shadow-lg active:scale-[0.98]"
              >
                Sonuçları Göster
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};