"use client";

import React, { useState, useEffect } from "react";
import { Gauge, Zap, BatteryCharging, Cpu, Activity, CheckCircle2, ShieldAlert } from "lucide-react";
import { MobilePerformanceEngine, AppPerformanceMetrics } from "@/lib/mobile/mobile-performance-engine";

export const MobilePerformanceMonitor: React.FC = () => {
  const [fps, setFps] = useState(60);
  const [battery, setBattery] = useState({ level: 100, isLowPower: false });
  const [memoryFreed, setMemoryFreed] = useState<number | null>(null);

  useEffect(() => {
    MobilePerformanceEngine.measureFps((currentFps) => {
      setFps(currentFps);
    });

    MobilePerformanceEngine.checkBatteryHealth().then(setBattery);
  }, []);

  const handleRunGc = () => {
    const res = MobilePerformanceEngine.triggerMemoryGarbageCollection();
    setMemoryFreed(res.freedMemoryMb);
    setTimeout(() => setMemoryFreed(null), 3000);
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white/70 dark:bg-[#141418]/70 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-lg space-y-4 font-sans text-xs">
      <div className="flex justify-between items-center pb-3 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-[#D4AF37]" />
          <h4 className="font-serif-editorial text-base font-semibold text-[#111111] dark:text-[#F5F4F0]">
            Mobil Performans Denetçisi
          </h4>
        </div>
        <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
          OptiEngine Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* FPS Counter */}
        <div className="bg-[#F5F4F0] dark:bg-black/20 p-3 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-[#86868B]">
            <span className="text-[10px] uppercase font-bold">Kare Hızı</span>
            <Activity className="w-3.5 h-3.5 text-[#111111] dark:text-[#F5F4F0]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-mono font-bold text-[#111111] dark:text-[#F5F4F0]">{fps}</span>
            <span className="text-[10px] text-[#666666]">FPS</span>
          </div>
        </div>

        {/* Battery Health */}
        <div className="bg-[#F5F4F0] dark:bg-black/20 p-3 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-[#86868B]">
            <span className="text-[10px] uppercase font-bold">Pil Durumu</span>
            <BatteryCharging className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-mono font-bold text-[#111111] dark:text-[#F5F4F0]">% {battery.level}</span>
            {battery.isLowPower && <span className="text-[9px] text-amber-500 font-bold">Düşük Güç</span>}
          </div>
        </div>
      </div>

      {memoryFreed && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-[11px]">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{memoryFreed} MB bellek başarıyla temizlendi.</span>
        </div>
      )}

      <div className="pt-1 flex justify-between items-center">
        <span className="text-[10px] text-[#86868B]">Cache Başarım Oranı: %94.2</span>
        <button
          onClick={handleRunGc}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[11px] font-semibold rounded-full hover:opacity-90 transition-all shadow-sm"
        >
          <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Bellek Optimize Et</span>
        </button>
      </div>
    </div>
  );
};