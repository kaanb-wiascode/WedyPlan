"use client";

import React, { useState } from "react";
import { processVendorVoiceNoteAction } from "@/lib/actions/vendor-mobile";

export default function QuickActionsBar({
  vendorId,
  onActionExecute,
}: {
  vendorId: string;
  onActionExecute: (actionName: string) => void;
}) {
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceRecordMock = async () => {
    setIsRecording(true);
    setTimeout(async () => {
      setIsRecording(false);
      const res = await processVendorVoiceNoteAction(vendorId, {
        transcriptText: "Gelin Hanım masalara ilave 2 adet şamdan eklenmesini rica etti.",
      });
      if (res.success) {
        alert("🎤 " + res.message);
      }
    }, 2000);
  };

  return (
    <div className="p-4 backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-white/60 dark:border-slate-800 rounded-3xl shadow-lg space-y-3">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
        ⚡ Başparmak Odaklı Saha Aksiyon Barları
      </span>

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={handleVoiceRecordMock}
          className={"p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition text-xs font-bold " +
            (isRecording
              ? "bg-rose-600 text-white animate-pulse"
              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200")
          }
        >
          <span className="text-xl">🎙️</span>
          <span className="text-[9px]">{isRecording ? "Kaydediyor..." : "Sesli Not"}</span>
        </button>

        <button
          onClick={() => alert("📷 Telefon Kamerası Açılıyor...")}
          className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center gap-1 transition text-xs font-bold hover:bg-slate-200"
        >
          <span className="text-xl">📸</span>
          <span className="text-[9px]">Kamera</span>
        </button>

        <button
          onClick={() => onActionExecute("WHATSAPP_QUICK_REPLY")}
          className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 flex flex-col items-center justify-center gap-1 transition text-xs font-bold hover:bg-emerald-100"
        >
          <span className="text-xl">📲</span>
          <span className="text-[9px]">Hızlı Yanıt</span>
        </button>

        <button
          onClick={() => onActionExecute("CHECK_IN_EVENT")}
          className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 flex flex-col items-center justify-center gap-1 transition text-xs font-bold hover:bg-indigo-100"
        >
          <span className="text-xl">📍</span>
          <span className="text-[9px]">Saha Check-in</span>
        </button>
      </div>
    </div>
  );
}
