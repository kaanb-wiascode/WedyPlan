"use client";

import React, { useState } from "react";
import { triggerObservabilityAlertAction, recordTelemetryLogAction } from "@/lib/actions/observability";

export default function ObservabilityAlertCenter() {
  const [ruleName, setRuleName] = useState("HIGH_P99_LATENCY_ALERT");
  const [targetMetric, setTargetMetric] = useState("api_p99_latency_ms");
  const [thresholdValue, setThresholdValue] = useState(250);
  const [channel, setChannel] = useState<any>("SLACK");
  const [recipient, setRecipient] = useState("#ops-alerts-channel");

  const handleCreateAlert = async () => {
    const res = await triggerObservabilityAlertAction({
      ruleName,
      targetMetric,
      thresholdValue,
      comparison: "GREATER_THAN",
      channel,
      recipient,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const handleTestLog = async () => {
    const res = await recordTelemetryLogAction({
      serviceName: "Payment-Gateway",
      logLevel: "SECURITY_AUDIT",
      message: "Canlı ortamda test telemetri güvenlik log kaydı tetiklendi.",
      context: { testRun: true, environment: "production" },
    });

    if (res.success) {
      alert("🚀 Log kaydedildi ID: " + res.logId);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 Observability Alert Center & Integrations (PagerDuty, Slack, Opsgenie)
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
          Alerting Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Alarm Kural Adı</label>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-cyan-600"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Bildirim Kanalı</label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="SLACK">Slack Webhook</option>
              <option value="PAGERDUTY">PagerDuty Incident</option>
              <option value="OPSGENIE">Opsgenie Alert</option>
              <option value="EMAIL">E-Posta Bildirimi</option>
              <option value="SMS">SMS Kalkanı</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Adres / Kanal</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={handleCreateAlert}
            className="py-2.5 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition"
          >
            🚨 Alarm Kuralını Kaydet & Aktifleştir
          </button>

          <button
            onClick={handleTestLog}
            className="py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-md transition"
          >
            📝 Test Telemetri Logu Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
