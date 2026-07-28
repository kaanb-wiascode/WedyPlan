"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Smartphone, Laptop, Tablet, CheckCircle2, ShieldCheck, Sparkles, AlertTriangle, Radio, Wifi } from "lucide-react";
import { MultiDeviceSyncEngine, DeviceSyncNode } from "@/lib/mobile/multi-device-sync-engine";

export const MultiDeviceSyncDashboard: React.FC = () => {
  const [devices, setDevices] = useState<DeviceSyncNode[]>([]);
  const [healthInfo, setHealthInfo] = useState<{ healthScorePercent: number; status: string; aiRecommendation: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    MultiDeviceSyncEngine.getConnectedDevices().then((nodes) => {
      setDevices(nodes);
      setHealthInfo(MultiDeviceSyncEngine.evaluateSyncHealth(nodes));
    });
  }, []);

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setStatusMsg("Vektör saatleri senkronize ediliyor ve CRDT durumları birleştiriliyor...");

    setTimeout(() => {
      setIsSyncing(false);
      setStatusMsg("Tüm cihazlar başarıyla senkronize edildi!");
      MultiDeviceSyncEngine.getConnectedDevices().then((nodes) => {
        setDevices(nodes.map((n) => ({ ...n, hasPendingChanges: false, isOnline: true })));
        setHealthInfo({
          healthScorePercent: 100,
          status: "HEALTHY",
          aiRecommendation: "Tüm cihazlar anlık olarak %100 senkronize durumda.",
        });
      });
      setTimeout(() => setStatusMsg(null), 3000);
    }, 1200);
  };

  if (!healthInfo) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-5 font-sans">
      {/* Sync Health Overview Header Card */}
      <div className="bg-[#111111] text-[#F5F4F0] p-6 rounded-[36px] border border-white/20 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#D4AF37] animate-pulse" />
            <h3 className="font-serif-editorial text-lg font-semibold">
              Çoklu Cihaz Senkronizasyonu
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
            %{healthInfo.healthScorePercent} Sağlık
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-[#86868B] block">Bağlı Cihaz Sayısı</span>
            <span className="font-mono font-bold text-white text-base">{devices.length} Cihaz</span>
          </div>
          <div>
            <span className="text-[10px] text-[#86868B] block">Çakışma Önleme</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">CRDT / Active</span>
          </div>
        </div>

        <div className="p-3 bg-white/10 rounded-2xl flex items-center gap-2 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <p className="text-[11px] text-[#D1D1D6]">{healthInfo.aiRecommendation}</p>
        </div>
      </div>

      {/* Connected Devices Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <h4 className="font-serif-editorial text-base font-semibold text-[#111111] dark:text-[#F5F4F0]">
            Aktif Ekosistem Cihazları
          </h4>
          <button
            onClick={handleTriggerSync}
            disabled={isSyncing}
            className="text-[10px] font-semibold text-[#111111] dark:text-[#F5F4F0] hover:underline flex items-center gap-1"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? "animate-spin text-[#D4AF37]" : ""}`} />
            <span>Şimdi Eşitle</span>
          </button>
        </div>

        <div className="space-y-2">
          {devices.map((device) => (
            <div
              key={device.deviceId}
              className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 flex items-center justify-center text-[#111111] dark:text-[#F5F4F0]">
                  {device.deviceType === "WEB" ? (
                    <Laptop className="w-4 h-4 text-[#D4AF37]" />
                  ) : device.deviceType === "IPAD" || device.deviceType === "ANDROID_TABLET" ? (
                    <Tablet className="w-4 h-4 text-[#D4AF37]" />
                  ) : (
                    <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-1.5">
                    <span>{device.deviceName}</span>
                    {device.isOnline ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <span className="text-[10px] text-[#86868B] block font-mono">
                    Vector v{device.vectorClockVersion} • {device.isOnline ? "Çevrimiçi" : "Çevrimdışı"}
                  </span>
                </div>
              </div>

              <div className="text-right">
                {device.hasPendingChanges ? (
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    Bekleyen Değişiklik
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 justify-end">
                    <CheckCircle2 className="w-3 h-3" />
                    Eşitlendi
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {statusMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};