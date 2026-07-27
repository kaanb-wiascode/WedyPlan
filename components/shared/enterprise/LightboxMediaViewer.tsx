'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LightboxMedia } from '@/types/enterprise-components';

interface LightboxMediaViewerProps {
  mediaList: LightboxMedia[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const LightboxMediaViewer: React.FC<LightboxMediaViewerProps> = ({
  mediaList,
  initialIndex = 0,
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen || mediaList.length === 0) return null;

  const currentMedia = mediaList[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % mediaList.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full cursor-pointer">
        <X className="w-6 h-6" />
      </button>

      <div className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center">
        {currentMedia.type === 'IMAGE' ? (
          <img src={currentMedia.url} alt={currentMedia.title || 'Medya'} className="max-w-full max-h-[80vh] object-contain rounded-2xl" />
        ) : (
          <video src={currentMedia.url} controls className="max-w-full max-h-[80vh] rounded-2xl" />
        )}

        <button onClick={handlePrev} className="absolute left-4 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md cursor-pointer">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button onClick={handleNext} className="absolute right-4 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md cursor-pointer">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};