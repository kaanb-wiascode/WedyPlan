'use client';

import React from 'react';
import { Star, Sparkles, ShieldCheck } from 'lucide-react';
import { VendorReview } from '@/types/vendor-detail-page';

interface VendorReviewsSectionProps {
  reviews: VendorReview[];
  aiSummary: string;
}

export const VendorReviewsSection: React.FC<VendorReviewsSectionProps> = ({ reviews, aiSummary }) => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Gerçek Deneyimler</span>
        <h2 className="font-serif font-semibold text-[28px] text-[#1D1D1F]">Çift Değerlendirmeleri</h2>
      </div>

      {/* AI Sentiment Banner */}
      <div className="p-6 bg-gradient-to-r from-amber-500/10 via-white/80 to-white/40 border border-amber-200/80 rounded-[28px] backdrop-blur-2xl flex items-start gap-3">
        <div className="p-2.5 bg-[#D4AF37] text-white rounded-2xl shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-serif font-bold text-[15px] text-[#1D1D1F]">WedyAI Yorum & Duygu Analizi</h4>
          <p className="text-[13px] text-[#6E6E73] mt-0.5 leading-relaxed">{aiSummary}</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev: VendorReview) => (
          <div key={rev.id} className="bg-white/60 backdrop-blur-3xl p-6 rounded-[28px] border border-white/90 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-[15px] text-[#1D1D1F]">{rev.authorName}</h4>
                <span className="text-[11px] text-[#86868B]">{rev.weddingDate}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 text-[12px] font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {rev.rating}.0
              </div>
            </div>

            <p className="text-[13px] text-[#6E6E73] leading-relaxed">{rev.comment}</p>

            {rev.vendorReply && (
              <div className="p-4 bg-black/5 rounded-[20px] text-[12px] text-[#1D1D1F] space-y-1">
                <strong className="block font-bold">Firma Yanıtı:</strong>
                <p className="text-[#6E6E73]">{rev.vendorReply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};