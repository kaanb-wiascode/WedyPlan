"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WorkflowCanvasBuilder({
  workflow,
  onRunTest,
}: {
  workflow: any;
  onRunTest: (id: string) => void;
}) {
  if (!workflow) return null;

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-6 text-xs">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase text-purple-600">Görsel Akış Düğüm Ağacı (Visual Canvas)</span>
          <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 mt-0.5">{workflow.name}</h3>
        </div>

        <button
          onClick={() => onRunTest(workflow.id || "demo")}
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition flex items-center gap-1 text-[11px]"
        >
          ▶ Test Çalıştır
        </button>
      </div>

      {/* Düğüm Ağacı Akış Şeması (Node Graph UI) */}
      <div className="space-y-4 relative before:absolute before:left-6 before:top-8 before:bottom-8 before:w-0.5 before:bg-purple-200 dark:before:bg-purple-900/50">
        {/* Tetikleyici Adımı */}
        <motion.div whileHover={{ x: 2 }} className="relative pl-12">
          <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[10px] shadow">
            ⚡
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40">
            <span className="text-[10px] text-purple-600 font-bold uppercase block">TETİKLEYİCİ (TRIGGER)</span>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-0.5">{workflow.trigger}</h4>
            <span className="text-[10px] text-slate-400 font-mono">Olay gerçekleştiği an tetiklenir</span>
          </div>
        </motion.div>

        {/* Eylem Adımları */}
        {workflow.steps?.map((step: any, idx: number) => (
          <motion.div key={step.id || idx} whileHover={{ x: 2 }} className="relative pl-12">
            <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shadow">
              {idx + 1}
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <span className="text-[10px] text-indigo-600 font-bold uppercase block">EYLEM (ACTION STEP)</span>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{step.actionType}</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-mono">
                {JSON.stringify(step.config || { status: "Aktif Yapılandırma" })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
