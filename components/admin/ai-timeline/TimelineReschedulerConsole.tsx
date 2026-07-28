"use client";

import React, { useState } from "react";
import { generateAdaptiveTimelineAction, predictTimelineDelayAction } from "@/lib/actions/ai-timeline-engine";

export default function TimelineReschedulerConsole() {
  const [weddingDate, setWeddingDate] = useState("2026-09-15");
  const [guestCount, setGuestCount] = useState(200);
  const [delayMinutes, setDelayMinutes] = useState(30);
  const [timelineResult, setTimelineResult] = useState<any>(null);
  const [rescheduleResult, setRescheduleResult] = useState<any>(null);

  const handleGenerate = async () => {
    const res = await generateAdaptiveTimelineAction({
      weddingDate,
      startTime: "10:00",
      endTime: "24:00",
      guestCount,
      locationType: "OUTDOOR_GARDEN",
      timelineType: "WEDDING_DAY_SCHEDULE",
    });

    if (res.success) {
      setTimelineResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleSimulateDelay = async () => {
    const res = await predictTimelineDelayAction({
      currentDelayedTaskId: "task_1",
      delayMinutes,
      autoReschedule: true,
    });

    if (res.success) {
      setRescheduleResult(res);
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Timeline Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Interactive Timeline Generator & Delay Predictor
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            Engine Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Düğün Tarihi</label>
              <input
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Davetli Sayısı</label>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Simüle Edilecek Gecikme (Dakika)</label>
              <input
                type="number"
                value={delayMinutes}
                onChange={(e) => setDelayMinutes(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-rose-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleGenerate}
              className="py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
            >
              📅 Akıllı Düğün Zaman Çizelgesi Oluştur
            </button>

            <button
              onClick={handleSimulateDelay}
              className="py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold hover:shadow-md transition"
            >
              ⚡ {delayMinutes} Dk Gecikme Simüle Et & Yeniden Planla
            </button>
          </div>

          {timelineResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-indigo-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● AI Timeline Engine Output</span>
                <span className="text-emerald-400 font-bold">Sağlık Skoru: %{timelineResult.healthScore}</span>
              </div>

              <div className="space-y-1.5 pt-1">
                {timelineResult.tasks.map((t: any) => (
                  <div key={t.id} className="flex justify-between items-center text-slate-300 text-[10px] border-b border-slate-900 pb-1">
                    <span>{t.timeSlot} - <strong>{t.title}</strong></span>
                    <div className="flex items-center gap-2">
                      {t.isCriticalPath && <span className="text-rose-400 font-bold">[Kritik Yol]</span>}
                      <span className="text-indigo-400">{t.durationMinutes} dk</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {rescheduleResult && (
            <div className="p-3 rounded-2xl bg-emerald-950 text-emerald-200 border border-emerald-800 text-[11px] font-mono">
              🚀 <strong>Yeniden Planlama Başarılı:</strong> Gecikme sonrası {rescheduleResult.rescheduledTasksCount} bağımlı görev Kritik Yol tamponları kullanılarak otomatik yeniden senkronize edildi!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
