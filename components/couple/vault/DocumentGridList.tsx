"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DocumentGridList({
  documents,
  onViewDocument,
  onToggleFavorite,
}: {
  documents: any[];
  onViewDocument: (doc: any) => void;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📁 Arşivlenmiş Dokümanlar ({documents.length})
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <motion.div
            key={doc.id}
            whileHover={{ y: -3 }}
            className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-2xl">
                  {doc.category === "CONTRACT" ? "📜" : doc.category === "INVOICE" ? "🧾" : doc.category === "MEDIA" ? "🖼️" : "📄"}
                </span>
                <button
                  onClick={() => onToggleFavorite(doc.id)}
                  className="text-sm hover:scale-110 transition"
                >
                  {doc.isFavorite ? "⭐" : "☆"}
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{doc.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{doc.folderName} • {doc.fileSizeMb} MB</p>
              </div>

              {doc.tags && (
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-200/40 dark:border-slate-700/40 flex justify-between items-center text-[10px]">
              <span className="text-slate-400">{doc.uploadDate}</span>
              <button
                onClick={() => onViewDocument(doc)}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                İncele & OCR →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
