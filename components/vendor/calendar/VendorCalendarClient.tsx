"use client";

import React, { useState } from "react";
import VendorCalendarHeader from "./VendorCalendarHeader";
import AIConflictWidget from "./AIConflictWidget";
import ResourceSchedulerWidget from "./ResourceSchedulerWidget";
import { createVendorCalendarEventAction } from "@/lib/actions/vendor-calendar";

export default function VendorCalendarClient({ vendorId }: { vendorId: string }) {
  const [viewMode, setViewMode] = useState<"MONTH" | "WEEK" | "DAY">("WEEK");

  const [conflicts] = useState([
    {
      id: "conf_1",
      severity: "HIGH",
      title: "Personel & Lojistik Çakışması",
      description: "19 Haziran Cumartesi saat 14:00'te hem Bodrum Sunset Venue kurulumuna hem de Çeşme Düğün alanına aynı 'VIP Servis Aracı 1' atanmış.",
      solution: "'VIP Servis Aracı 2'yi Çeşme rotasına kaydırarak çakışmayı giderebilirsiniz.",
    },
  ]);

  const [suggestions] = useState([
    "Cuma günkü menü tadımı toplantılarını tek bir 3 saatlik blokta toplayarak 2 saatlik personel süresi tasarrufu sağlayabilirsiniz.",
  ]);

  const [resources] = useState({
    staff: [
      { name: "Ahmet Yılmaz", role: "Saha Koordinatörü" },
      { name: "Mehmet Demir", role: "Baş Şef" },
      { name: "Canan Kaya", role: "Müşteri Temsilcisi" },
    ],
    vehicles: [
      { plate: "48 BD 102 (VIP Minibüs)", status: "Atandı - Bodrum" },
      { plate: "35 ÇŞ 401 (Kamyonet)", status: "Atandı - Çeşme" },
    ],
    equipment: [
      { name: "350 Kişilik Porselen & Kadeh Seti", assignedTo: "Bodrum Sunset Venue" },
      { name: "Pro Ses & Avize Seti", assignedTo: "Çeşme Balo Alanı" },
    ],
  });

  const [events] = useState([
    {
      id: "ev_1",
      title: "Selin & Kaan Düğün Seremonisi & Balo",
      type: "WEDDING",
      date: "19 Haziran 2027",
      time: "18:30 - 02:00",
      location: "Bodrum Sunset Venue",
      color: "bg-rose-500",
    },
    {
      id: "ev_2",
      title: "Masa & Ses/Işık Kurulumu",
      type: "INSTALLATION",
      date: "19 Haziran 2027",
      time: "10:00 - 15:00",
      location: "Bodrum Sunset Venue",
      color: "bg-indigo-500",
    },
    {
      id: "ev_3",
      title: "Ece & Mert Menü Tadımı Görüşmesi",
      type: "MEETING",
      date: "20 Haziran 2027",
      time: "15:00 - 16:30",
      location: "Merkez Ofis",
      color: "bg-amber-500",
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <VendorCalendarHeader
        activeEventsCount={events.length}
        syncStatusGoogle={true}
        syncStatusApple={true}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenNewEventModal={() => alert("➕ Yeni Etkinlik & Lojistik Planlama Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIConflictWidget
            conflicts={conflicts}
            suggestions={suggestions}
          />
        </div>

        <div className="lg:col-span-8 space-y-6">
          {/* Canlı Etkinlik Zaman Çizelgesi */}
          <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                📅 Planlanan Operasyonlar ({events.length} Etkinlik)
              </span>
            </div>

            <div className="space-y-3">
              {events.map((ev) => (
                <div key={ev.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center hover:border-slate-300 transition">
                  <div className="flex items-center gap-3">
                    <span className={"w-3 h-3 rounded-full " + ev.color} />
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{ev.title}</h4>
                      <p className="text-[10px] text-slate-400">{ev.date} • {ev.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-indigo-600 block">{ev.time}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 font-semibold">{ev.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ResourceSchedulerWidget resources={resources} />
        </div>
      </div>
    </div>
  );
}
