"use client";

import React, { useState } from "react";

export default function AlbumCollectionManager({
  albums,
  onCreateAlbum,
}: {
  albums: any[];
  onCreateAlbum: (name: string, category: string) => void;
}) {
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newCategory, setNewCategory] = useState("Düğün Mekanı");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumName) return;
    onCreateAlbum(newAlbumName, newCategory);
    setNewAlbumName("");
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📁 Tematik Albüm Koleksiyonları ({albums.length})
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {albums.map((alb) => (
          <div key={alb.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">{alb.name}</h4>
              <span className="text-[10px] text-slate-400">{alb.category} • {alb.itemCount} Medya</span>
            </div>
            {alb.isFeatured && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                ⭐ Öne Çıkarılan
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Yeni Albüm Ekleme Formu */}
      <form onSubmit={handleSubmit} className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
        <input
          type="text"
          placeholder="Yeni Albüm Adı (Örn: Bodrum Gün Batımı Nikahı)..."
          value={newAlbumName}
          onChange={(e) => setNewAlbumName(e.target.value)}
          className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:opacity-90 transition"
        >
          + Albüm Oluştur
        </button>
      </form>
    </div>
  );
}
