"use client";

import React, { useState } from "react";
import { provisionServiceAction } from "@/lib/actions/idp";

export default function ProvisioningStudioConsole() {
  const [serviceName, setServiceName] = useState("wedyplan-ai-venue-matcher");
  const [category, setCategory] = useState<any>("AI_AGENT");
  const [ownerTeam, setOwnerTeam] = useState("AI Engineering Team");
  const [dbType, setDbType] = useState<any>("POSTGRESQL");

  const handleRunProvisioning = async () => {
    const res = await provisionServiceAction({
      serviceName,
      category,
      ownerTeam,
      dbType,
      enableQueue: true,
      enableStorageBucket: true,
      customDomain: "venue-ai.wedyplan.com",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🛠️ Self-Service Altyapı & Servis Oluşturma Konsolu
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          IaC Engine Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Servis / Proje Adı</label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-indigo-600"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Sorumlu Takım</label>
            <input
              type="text"
              value={ownerTeam}
              onChange={(e) => setOwnerTeam(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Servis Kategorisi</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="AI_AGENT">AI Agent / Copilot Worker</option>
              <option value="MICROSERVICE">API Mikroservisi</option>
              <option value="WORKER_JOB">Kuyruk İşleyicisi (Worker Job)</option>
              <option value="WEB_PORTAL">Web Portalı / Frontend App</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Veritabanı Altyapısı</label>
            <select
              value={dbType}
              onChange={(e) => setDbType(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="POSTGRESQL">PostgreSQL (Primary + Replica)</option>
              <option value="VECTOR_DB">Pinecone / Vector Memory DB</option>
              <option value="REDIS_CACHE">Redis In-Memory Cache</option>
              <option value="NONE">Veritabanı Yok (Stateless)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleRunProvisioning}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-bold hover:shadow-md transition"
        >
          🛠️ Servisi & Altyapıyı Otonom Oluştur (42 Saniyede Canlı)
        </button>
      </div>
    </div>
  );
}
