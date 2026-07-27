"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WebsiteBuilderHeader({
  previewDevice,
  setPreviewDevice,
  isPublished,
  publishedUrl,
  onPublish,
  isPublishing,
}: {
  previewDevice: "DESKTOP" | "MOBILE";
  setPreviewDevice: (d: "DESKTOP" | "MOBILE") => void;
  isPublished: boolean;
  publishedUrl: string;
  onPublish: () => void;
  isPublishing: boolean;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ No-Code Builder
            </span>
            <span className="text-xs text-slate-400">Kişisel Düğün Web Sitesi Mimarı</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Wedding Website Builder</h1>
        </div>

        {/* Cihaz Önizleme & Yayınla Aksiyonları */}
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-slate-200/60 dark:bg-slate-800 rounded-2xl">
            <button
              onClick={() => setPreviewDevice("DESKTOP")}
              className={"px-3 py-1.5 rounded-xl text-xs font-semibold transition " +
                (previewDevice === "DESKTOP" ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white" : "text-slate-500")
              }
            >
              🖥️ Masaüstü
            </button>
            <button
              onClick={() => setPreviewDevice("MOBILE")}
              className={"px-3 py-1.5 rounded-xl text-xs font-semibold transition " +
                (previewDevice === "MOBILE" ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white" : "text-slate-500")
              }
            >
              📱 Mobil
            </button>
          </div>

          <button
            onClick={onPublish}
            disabled={isPublishing}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold hover:shadow-lg transition disabled:opacity-50"
          >
            {isPublishing ? "Yayınlanıyor..." : isPublished ? "✓ Güncellemeleri Yayınla" : "🌐 Sitemi Canlıya Al"}
          </button>
        </div>
      </div>

      {isPublished && (
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-xs flex justify-between items-center text-emerald-800 dark:text-emerald-300">
          <span>🌐 Siteniz Canlıda: <a href={publishedUrl} target="_blank" rel="noreferrer" className="font-bold underline">{publishedUrl}</a></span>
          <button onClick={() => navigator.clipboard.writeText(publishedUrl)} className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-bold text-[10px]">Bağlantıyı Kopyala</button>
        </div>
      )}
    </div>
  );
}
