"use client";

import React, { useState } from "react";
import { triggerPipelineAction, triggerDeploymentAction } from "@/lib/actions/cicd";

export default function PipelineTriggerConsole() {
  const [branchOrTag, setBranchOrTag] = useState("main");
  const [targetEnvironment, setTargetEnvironment] = useState<any>("STAGING");
  const [triggerType, setTriggerType] = useState<any>("MANUAL_RELEASE");

  const handleRunPipeline = async () => {
    const res = await triggerPipelineAction({
      branchOrTag,
      targetEnvironment,
      triggerType,
      runSecurityScan: true,
      runE2eTests: true,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const handleQuickDeployProd = async () => {
    if (confirm("🚀 PROD DEPLOYMENT: Staging üzerinde onaylanan sürümü Production ortamına canlıya almak istiyor musunuz?")) {
      const res = await triggerDeploymentAction({
        pipelineId: "pipe_101",
        environment: "PRODUCTION",
        actionType: "DEPLOY",
      });

      if (res.success) {
        alert(res.message);
      }
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🚀 Manuel CI/CD Boru Hattı & Dağıtım Konsolu
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Runner Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Git Branch / Tag</label>
            <input
              type="text"
              value={branchOrTag}
              onChange={(e) => setBranchOrTag(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-emerald-600"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Ortam</label>
            <select
              value={targetEnvironment}
              onChange={(e) => setTargetEnvironment(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="DEVELOPMENT">Development</option>
              <option value="QA">QA Test</option>
              <option value="STAGING">Staging</option>
              <option value="PRODUCTION">Production</option>
              <option value="PREVIEW">Preview PR Env</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={handleRunPipeline}
            className="py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
          >
            🚀 Boru Hattını Tetikle
          </button>

          <button
            onClick={handleQuickDeployProd}
            className="py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
          >
            ⚡ Production'a Canlıya Al
          </button>
        </div>
      </div>
    </div>
  );
}
