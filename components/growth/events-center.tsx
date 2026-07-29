"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Sparkles, MapPin, QrCode, CheckCircle2, Ticket, Users, Video, ShieldCheck, Clock, RefreshCw, AlertCircle } from "lucide-react";
import { EventsEngine, EventRecord, TicketRegistration } from "@/lib/growth/events-engine";

export const EventsCenter: React.FC = () => {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventRecord | null>(null);
  const [activeTicket, setActiveTicket] = useState<TicketRegistration | null>(null);

  // Registration Form
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    EventsEngine.getEvents().then((data) => {
      setEvents(data);
      if (data.length > 0) setSelectedEvent(data[0]);
    });
  }, []);

  const handleRegister = async () => {
    if (!nameInput.trim() || !emailInput.trim() || !selectedEvent) return;
    setIsRegistering(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ticket = await EventsEngine.registerForEvent(selectedEvent.id, nameInput, emailInput);
      setIsRegistering(false);
      setActiveTicket(ticket);
      setStatusMsg({ type: "success", text: "Etkinlik kaydınız ve QR VIP Giriş Biletiniz oluşturuldu!" });
      setNameInput("");
      setEmailInput("");
    }, 600);
  };

  if (!selectedEvent) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Etkinlik & Fuar Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Dynamic QR Check-in
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Fiziksel düğün fuarları, online web seminerleri, B2B network buluşmaları ve anlık QR bilet doğrulama altyapısı.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Etkinlik</span>
            <span className="font-mono font-bold text-white text-base">{events.length} Etkinlik</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam Kayıt</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">2.470 Çift</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Tahmini Katılım</span>
            <span className="font-mono font-bold text-emerald-400 text-base">%88 Katılım</span>
          </div>
        </div>
      </div>

      {/* WedyAI Attendance Prediction & Scheduling Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Katılım Tahmini & Zamanlama
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">AI Event Scheduler</span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {selectedEvent.aiOptimalSchedulingTip} (Tahmini Katılım Skoru: %{selectedEvent.aiPredictedAttendanceRatePercent})
          </p>
        </div>
      </div>

      {/* Event Selection List */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Yaklaşan Etkinlikler & Fuar Takvimi
        </h4>

        <div className="space-y-3">
          {events.map((evt) => (
            <div
              key={evt.id}
              onClick={() => setSelectedEvent(evt)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                selectedEvent.id === evt.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm">{evt.title}</span>
                <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full">
                  {evt.format}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#86868B]">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{evt.locationOrUrl}</span>
              </div>

              <div className="flex justify-between items-center text-[10px] pt-1">
                <span>Tarih: {new Date(evt.startDate).toLocaleString()}</span>
                <span className="font-mono font-bold text-emerald-400">
                  {evt.registeredCount} / {evt.capacityLimit} Kayıtlı
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration & QR Passport Generator Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Ticket className="w-5 h-5 text-[#D4AF37]" />
          <span>Etkinliğe Kaydol & VIP Bilet Al</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Adınız Soyadınız..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="E-posta Adresiniz..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={!nameInput.trim() || !emailInput.trim() || isRegistering}
            className="w-full h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isRegistering ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <QrCode className="w-4 h-4 text-[#D4AF37]" />
                <span>Kaydı Tamamla & QR Bilet Üret</span>
              </>
            )}
          </button>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Generated Dynamic QR Ticket Display Card */}
      {activeTicket && (
        <div className="bg-[#111111] text-[#F5F4F0] p-6 rounded-[36px] border border-[#D4AF37]/40 shadow-2xl space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1">
              <QrCode className="w-4 h-4" /> Dynamic VIP Event Ticket
            </span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              VALID
            </span>
          </div>

          <div className="space-y-1 text-center">
            <h5 className="font-serif-editorial text-lg font-semibold">{activeTicket.eventTitle}</h5>
            <p className="text-xs text-[#86868B]">{activeTicket.registrantName} ({activeTicket.registrantEmail})</p>
          </div>

          {/* Simulated QR Token Card */}
          <div className="p-4 bg-white rounded-2xl text-center space-y-2 text-[#111111]">
            <QrCode className="w-24 h-24 mx-auto text-[#111111]" />
            <span className="text-[10px] font-mono font-bold block text-gray-600">
              {activeTicket.qrValidationToken}
            </span>
          </div>

          <p className="text-[10px] text-[#86868B] text-center">
            Fuar girişinde veya online yayın odasında bu QR kodu taratarak doğrudan check-in yapabilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
};