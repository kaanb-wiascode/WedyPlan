'use client';

import React from 'react';
import { Star, MessageCircle, Sparkles, ThumbsUp } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface Review {
  id?: string;
  authorName?: string;
  userName?: string; // Datanızda userName olarak geçiyor olabilir
  rating: number;
  date?: string;
  content?: string;
  comment?: string; // TS Hatasını çözen ekleme
}

interface VendorReviewsSectionProps {
  reviews?: Review[];
  aiSummary?: string;
}

export const VendorReviewsSection: React.FC<VendorReviewsSectionProps> = ({ reviews = [], aiSummary }) => {
  if (!reviews.length) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <MessageCircle className="w-6 h-6 text-gray-900" />
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Çiftlerin Yorumları</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {aiSummary && (
          <GlassCard className="col-span-1 md:col-span-12 p-6 md:p-8 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-indigo-100/50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wider mb-2">
                  Yapay Zeka Yorum Özeti
                </h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  "{aiSummary}"
                </p>
              </div>
            </div>
          </GlassCard>
        )}

        <div className="col-span-1 md:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.slice(0, 4).map((review, idx) => {
            // Datanızdaki olası alan isimlerini yakalıyoruz
            const displayContent = review.content || review.comment;
            const displayName = review.authorName || review.userName || 'Mutlu Çift';

            return (
              <GlassCard key={idx} className="p-6 border-white/40 flex flex-col justify-between" hoverEffect>
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-100 text-gray-200'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-[14px] leading-relaxed mb-6 italic">
                    "{displayContent}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-100/60 pt-4 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                      {displayName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{displayName}</p>
                      <p className="text-[10px] text-gray-400">{review.date || 'Yakın zamanda'}</p>
                    </div>
                  </div>
                  <ThumbsUp className="w-4 h-4 text-gray-300" />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};