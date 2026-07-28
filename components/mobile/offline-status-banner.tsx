"use client";

import React, { useState, useEffect } from "react";
import { WifiOff, RefreshCw, CheckCircle2 } from "lucide-react";
import { OfflineSyncEngine } from "@/lib/mobile/offline-engine";

export const OfflineStatusBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedMsg, setSyncedMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = async () => {
      setIsOffline(false);
      setIsSyncing(true);
      const res = await OfflineSyncEngine.syncQueue();
      setIsSyncing(false);
      if (res.syncedCount > 0) {
        setSyncedMsg(`${res.syncedCount} adet çevrimdışı işlem senkronize edildi.`);
        setTimeout(() => setSyncedMsg(null), 4000);
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      }
    };
  }, []);

  if (!isOffline && !isSyncing && !syncedMsg) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-in slide-in-from-top duration-300">
      {isOffline && (
        <div className="flex items-center justify-between px-4 py-3 bg-[#111111]/90 backdrop-blur-xl border border-white/20 text-[#F5F4F0] rounded-2xl shadow-xl text-xs font-sans-corporate">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-[#D4AF37]" />
            <span>Çevrimdışı Mod — İşlemleriniz kaydediliyor.</span>
          </div>
        </div>
      )}

      {isSyncing && (
        <div className="flex items-center justify-between px-4 py-3 bg-[#111111]/90 backdrop-blur-xl border border-white/20 text-[#F5F4F0] rounded-2xl shadow-xl text-xs font-sans-corporate">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#D4AF37] animate-spin" />
            <span>İnternet bağlandı. Veriler eşitleniyor...</span>
          </div>
        </div>
      )}

      {syncedMsg && (
        <div className="flex items-center justify-between px-4 py-3 bg-emerald-900/90 backdrop-blur-xl border border-emerald-500/30 text-white rounded-2xl shadow-xl text-xs font-sans-corporate">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{syncedMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};