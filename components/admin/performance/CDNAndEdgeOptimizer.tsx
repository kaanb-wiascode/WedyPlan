"use client";

import React from "react";

export default function CDNAndEdgeOptimizer() {
  const edgeMetrics = [
    { name: "Image CDN (AVIF/WebP)", ratio: "%35 Bant Genişliği Tasarrufu", status: "OPTIMIZED", color: "text-amber-600" },
    { name: "Video HLS Streaming", ratio: "0.2s Buffer Latency", status: "OPTIMIZED", color: "text-emerald-600" },
    { name: "Next.js Route Streaming", ratio: "React 19 Suspense Active", status: "OPTIMIZED", color: "text-indigo-600" },
    { name: "Brotli/Gzip Compression", ratio: "%72 Payload Reduction", status: "OPTIMIZED", color: "text-purple-600" },
  ];

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🌐 Edge Delivery & Compression Matrix (Cloudflare Engine)
          </span>
          <span className="text-[11px] text-amber-600 font-mono font-bold">Smart CDN Caching Active</span>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          Edge Accelerated
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {edgeMetrics.map((item, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold">{item.name}</span>
            <div className={"text-xs font-bold font-mono " + item.color}>{item.ratio}</div>
            <div className="flex justify-between text-[9px] text-slate-400 pt-0.5">
              <span>Status:</span>
              <span className="text-emerald-500 font-bold">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
