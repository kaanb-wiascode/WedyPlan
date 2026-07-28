"use client";

import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, Sparkles, CheckCircle2, AlertCircle, ChevronRight, MapPin, RefreshCw, X } from "lucide-react";
import { MobileBookingEngine, BookingSlot, MobileBookingItem } from "@/lib/mobile/mobile-booking-engine";

interface MobileBookingFlowProps {
  vendorId?: string;
  vendorName?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const MobileBookingFlow: React.FC<MobileBookingFlowProps> = ({
  vendorId = "v_101",
  vendorName = "Çırağan Palace Kempinski",
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedDate, setSelectedDate] = useState("2026-08-15");
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      MobileBookingEngine.getAvailableSlots(vendorId, selectedDate).then(setSlots);
    }
  }, [isOpen, selectedDate, vendorId]);

  if (!isOpen) return null;

  const handleConfirmBooking = async () => {
    if (!selectedSlot) return;
    setLoading(true);

    const res = await MobileBookingEngine.createBooking({
      vendorId,
      vendorName,
      type: "VENDOR_BOOKING",
      eventDate: selectedDate,
      timeSlot: selectedSlot,
      depositAmount: 15000,
    });

    setLoading(false);

    if (res.success) {
      setStatusMessage({ type: "success", text: "Rezervasyonunuz başarıyla onaylandı ve takvime işlendi!" });
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    } else {
      setStatusMessage({ type: "error", text: res.error || "Rezervasyon oluşturulamadı." });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="w-full max-w-md bg-[#F5F4F0] rounded-[36px] border border-white/80 p-6 shadow-2xl space-y-5 animate-in slide-in-from-bottom duration-300 font-sans">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-black/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
              Anlık Mobil Rezervasyon
            </span>
            <h3 className="font-serif-editorial text-xl font-semibold text-[#111111]">
              {vendorName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4 text-[#111111]" />
          </button>
        </div>

        {/* Date Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#111111] flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>Etkinlik / Görüşme Tarihi</span>
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full h-12 px-4 bg-white/80 backdrop-blur-md border border-black/10 rounded-2xl text-xs text-[#111111] font-mono outline-none focus:border-[#111111]"
          />
        </div>

        {/* WedyAI Slot Recommendations */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-[#111111] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#111111]" />
              <span>Saat Seçimi</span>
            </label>
            <span className="text-[10px] font-bold text-[#D4AF37] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> WedyAI Akıllı Öneri
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {slots.map((slot) => {
              const isSelected = selectedSlot === slot.timeSlot;
              return (
                <button
                  key={slot.id}
                  disabled={!slot.isAvailable}
                  onClick={() => setSelectedSlot(slot.timeSlot)}
                  className={`p-3 rounded-2xl border text-left transition-all relative ${
                    !slot.isAvailable
                      ? "opacity-40 bg-black/5 border-transparent cursor-not-allowed"
                      : isSelected
                      ? "bg-[#111111] text-[#F5F4F0] border-[#111111] shadow-md"
                      : "bg-white/80 border-black/10 text-[#111111] hover:bg-white"
                  }`}
                >
                  <div className="text-xs font-bold font-mono">{slot.timeSlot}</div>
                  {slot.aiRecommendationScore && slot.aiRecommendationScore > 90 && slot.isAvailable && (
                    <span className={`text-[9px] font-medium block mt-1 ${isSelected ? "text-[#D4AF37]" : "text-emerald-600"}`}>
                      ✦ %{slot.aiRecommendationScore} Mükemmel Uyum
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Messages */}
        {statusMessage && (
          <div
            className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              statusMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleConfirmBooking}
            disabled={!selectedSlot || loading}
            className="flex items-center justify-center gap-2 w-full h-12 bg-[#111111] text-[#F5F4F0] text-xs font-semibold rounded-2xl shadow-md hover:bg-[#222222] transition-all disabled:opacity-40"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <span>Rezervasyonu Onayla</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};