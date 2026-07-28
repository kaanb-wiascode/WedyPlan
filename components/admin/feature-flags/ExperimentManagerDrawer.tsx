"use client";

import React, { useState } from "react";
import { saveFeatureFlagConfigAction } from "@/lib/actions/admin-feature-flags";

export interface FeatureFlagItem {
  flagKey: string;
  name: string;
  environment: "PRODUCTION" | "DEVELOPMENT" | "STAGING";
  rolloutPercentage: number;
  targetPlans?: string[];
  targetCountries?: string[];
  status: "ENABLED" | "DISABLED" | "EXPERIMENT_ACTIVE";
  description?: string;
}

export default function ExperimentManagerDrawer({
  flag,
  isOpen,
  onClose,
}: {
  flag: FeatureFlagItem | null;
  isOpen: boolean;
  onClose: () => void; }) {
  const [rollout, setRollout] = useState(flag?.rolloutPercentage || 50);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !flag) return null;

  const handleUpdateRollout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const res = await saveFeatureFlagConfigAction({
      flagKey: flag.flagKey,
      name: flag.name,
      environment: flag.environment || "PRODUCTION",
      rolloutPercentage: rollout,
      targetPlans: flag.targetPlans || ["ALL"],
      targetCountries: flag.targetCountries || ["TR"],
      status: flag.status || "ENABLED",
      description: flag.description,
    });

    setIsProcessing(false);

    if (res.success) {
      alert("✨ " + res.message);
      onClose();
    } else {
      alert("❌ Hata: " + (res.error || "Güncelleme başarısız."));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end text-xs">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full p-6 space-y-6 overflow-y-auto border-l border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">A/B Deney & Rollout Yönetimi</h2>
            <span className="text-[10px] text-slate-400 font-mono">Flag: {flag.flagKey}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleUpdateRollout} className="space-y-4">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">
              Dağıtım Yüzdesi (% Rollout Percentage)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                value={rollout}
                onChange={(e) => setRollout(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="font-mono font-bold text-sm text-indigo-600 min-w-[40px]">%{rollout}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Etki Alanı Tahmini</span>
            <p className="text-slate-700 dark:text-slate-300 text-[11px]">
              Bu bayrak şu an aktif kullanıcıların <strong>%{rollout}</strong> kadarına sunulacaktır.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-1/2 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isProcessing ? "Kaydediliyor..." : "Kaydet & Yayınla 🚀"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
