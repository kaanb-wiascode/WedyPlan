"use client";

import React from "react";
import { Sparkles, MapPin, Calendar, Heart, ShieldCheck, ChevronRight, Star } from "lucide-react";
import { MobileHaptics } from "@/lib/mobile/design-system-tokens";

// 1. LIQUID GLASS VENDOR CARD
export interface VendorCardProps {
  title: string;
  category: string;
  location: string;
  rating: number;
  priceTag: string;
  imageUrl: string;
  isVerified?: boolean;
  onBookClick?: () => void;
}

export const MobileVendorCard: React.FC<VendorCardProps> = ({
  title,
  category,
  location,
  rating,
  priceTag,
  imageUrl,
  isVerified = true,
  onBookClick,
}) => {
  return (
    <div 
      onClick={() => MobileHaptics.trigger("selection")}
      className="group relative overflow-hidden bg-white/65 dark:bg-[#141418]/65 backdrop-blur-[24px] border border-white/80 dark:border-white/10 rounded-[32px] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
    >
      <div className="relative h-48 w-full rounded-[24px] overflow-hidden mb-4 bg-black/5">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            MobileHaptics.trigger("impactLight");
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
        >
          <Heart className="w-5 h-5 stroke-[1.8]" />
        </button>
        {isVerified && (
          <span className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Onaylı Mekan
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">{category}</span>
          <div className="flex items-center gap-1 text-xs font-bold text-[#111111] dark:text-[#F5F4F0]">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            <span>{rating}</span>
          </div>
        </div>

        <h4 className="font-serif-editorial text-xl font-semibold text-[#111111] dark:text-[#F5F4F0] leading-tight">
          {title}
        </h4>

        <div className="flex items-center gap-1.5 text-xs text-[#666666] dark:text-[#86868B]">
          <MapPin className="w-3.5 h-3.5 text-[#111111] dark:text-[#F5F4F0]" />
          <span>{location}</span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-black/5 dark:border-white/5">
          <div>
            <span className="text-[10px] text-[#86868B] block">Başlangıç Fiyatı</span>
            <span className="text-sm font-bold font-mono text-[#111111] dark:text-[#F5F4F0]">{priceTag}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              MobileHaptics.trigger("success");
              if (onBookClick) onBookClick();
            }}
            className="px-5 py-2.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-full shadow-sm hover:opacity-90 transition-all flex items-center gap-1"
          >
            <span>Teklif Al</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. WEDDING TIMELINE COMPONENT
export interface TimelineStepProps {
  time: string;
  title: string;
  description: string;
  isCompleted?: boolean;
}

export const MobileTimelineItem: React.FC<TimelineStepProps> = ({ time, title, description, isCompleted = false }) => {
  return (
    <div className="flex gap-4 items-start relative pb-6">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
          isCompleted ? "bg-[#111111] text-[#F5F4F0]" : "bg-black/10 text-[#86868B]"
        }`}>
          {isCompleted ? "✓" : "•"}
        </div>
        <div className="w-0.5 h-full bg-black/10 absolute top-8 bottom-0" />
      </div>
      <div className="bg-white/60 dark:bg-[#141418]/60 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4 flex-1">
        <span className="text-[10px] font-mono font-bold text-[#D4AF37]">{time}</span>
        <h5 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">{title}</h5>
        <p className="text-xs text-[#666666] dark:text-[#86868B] mt-1">{description}</p>
      </div>
    </div>
  );
};