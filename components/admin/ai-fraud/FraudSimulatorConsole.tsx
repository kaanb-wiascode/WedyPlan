"use client";

import React, { useState } from "react";
import { scanFraudRiskAction, resolveFraudIncidentAction } from "@/lib/actions/ai-fraud-engine";

export default function FraudSimulatorConsole() {
  const [targetType, setTargetType] = useState<any>("FAKE_VENDOR");
  const [entityId, setEntityId] = useState("vendor_suspect_8810");
  const [ipAddress, setIpAddress] = useState("185.220.101.5");
  const [scanResult, setScanResult] = useState<any>(null);

  const handleScan = async () => {
    const res = await scanFraudRiskAction({
      targetType,
      entityId,
      ipAddress,
      deviceFingerprint: "fp_browser_hash_99",
    });

    if (res.success) {
      setScanResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleResolve = async (action: any) => {
    if (!scanResult) return;

    const res = await resolveFraudIncidentAction({
      incidentId: scanResult.scanId,
      action,
      notes: "Yönetici güvenlik incelemesi tamamlandı.",
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Fraud Scanner Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Live Fraud Scanner & Anomaly Detection Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
            Shield Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Tehdit Türü</label>
              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="FAKE_VENDOR">Sahte Tedarikçi (Fake Vendor)</option>
                <option value="PAYMENT_FRAUD">Ödeme Suiistimali (Payment Fraud)</option>
                <option value="FAKE_COUPLE">Bot Çift Hesabı</option>
                <option value="SPAM_BOT">Spam Bot Aktivitesi</option>
                <option value="COUPON_ABUSE">Kupon Suiistimali</option>
                <option value="FAKE_REVIEW">Sahte Değerlendirme</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Entity ID</label>
              <input
                type="text"
                value={entityId}
                onChange={(e) => setEntityId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-rose-600"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">İşlem IP Adresi</label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>

          <button
            onClick={handleScan}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white font-bold hover:shadow-md transition"
          >
            🛡️ Anomali & Dolandırıcılık Taraması Başlat
          </button>

          {scanResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-rose-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Fraud Scan ID: {scanResult.scanId}</span>
                <span className="text-rose-400 font-bold">Fraud Score: %{scanResult.fraudScorePct} [{scanResult.riskLevel}]</span>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                {scanResult.aiExplanation}
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-white font-bold block text-[10px]">🚨 Tespit Edilen Anomaliler:</span>
                {scanResult.detectedAnomalies.map((anom: string, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-slate-300 text-[10px] border-b border-slate-900 pb-1">
                    <span>• {anom}</span>
                    <span className="text-rose-400 font-bold">[ANOMALY DETECTED]</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 pt-2">
                <span className="font-bold text-slate-200 block">⚖️ KARANTİNA YÖNETİCİ KARARI (RISK ACTION):</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleResolve("CONFIRM_BLOCK")}
                    className="px-4 py-1.5 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700 transition"
                  >
                    🔒 Hesabı & İşlemi Kalıcı Engelle
                  </button>
                  <button
                    onClick={() => handleResolve("REQUEST_KYC")}
                    className="px-4 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700 transition"
                  >
                    📄 Kimlik Doğrulama (KYC) İste
                  </button>
                  <button
                    onClick={() => handleResolve("CLEAR_SAFE")}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
                  >
                    ✓ Temiz İşaretle
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
