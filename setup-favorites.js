const fs = require("fs");

const dirs = [
  "lib/validations",
  "lib/actions",
  "components/couple/favorites",
  "app/(couple)/favorites"
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const files = {
  "lib/validations/favorites.ts": `import { z } from "zod";

export const collectionSchema = z.object({
  title: z.string().min(2, "Koleksiyon adı en az 2 karakter olmalıdır"),
  description: z.string().optional(),
  isSharedWithPartner: z.boolean().default(true),
  colorTag: z.string().default("#E11D48"),
});

export const addNoteSchema = z.object({
  itemId: z.string(),
  note: z.string().min(1, "Not boş olamaz"),
});

export type CollectionFormData = z.infer<typeof collectionSchema>;
export type AddNoteFormData = z.infer<typeof addNoteSchema>;
`,

  "lib/actions/favorites.ts": `"use server";

import { revalidatePath } from "next/cache";
import { collectionSchema, CollectionFormData } from "@/lib/validations/favorites";

export async function createCollectionAction(userId: string, data: CollectionFormData) {
  const validation = collectionSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating collection for user " + userId + ":", validation.data);
    revalidatePath("/couple/favorites");
    return { success: true, message: "Koleksiyon başarıyla oluşturuldu ✨" };
  } catch (error) {
    console.error("Create Collection Error:", error);
    return { success: false, error: "Koleksiyon oluşturulamadı." };
  }
}

export async function analyzeAIMoodBoardAction(userId: string) {
  try {
    return {
      success: true,
      detectedStyle: "Ege & Akdeniz Bohem Lüks",
      dominantPalette: ["#FAF8F5", "#D97706", "#0284C7", "#E11D48"],
      recommendations: [
        "Masa düzenlerinde zeytin dalı ve fener detayları ağırlıkta.",
        "Müzik grubu seçiminiz henüz kaydedilen konseptle eşleşmedi.",
      ],
    };
  } catch (error) {
    console.error("AI Mood Analysis Error:", error);
    return { success: false, error: "Stil analizi yapılamadı." };
  }
}
`,

  "components/couple/favorites/FavoritesHeader.tsx": `"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FavoritesHeader({
  totalSaved,
  collectionsCount,
  activeTab,
  setActiveTab,
  onCreateCollection,
}: {
  totalSaved: number;
  collectionsCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCreateCollection: () => void;
}) {
  const tabs = [
    { id: "ALL", label: "Tüm Kaydedilenler", icon: "💎" },
    { id: "COLLECTIONS", label: "Koleksiyonlar & Klasörler", icon: "📁" },
    { id: "VENDORS", label: "Tedarikçiler", icon: "🏰" },
    { id: "INSPIRATION", label: "Mood Board & İlhamlar", icon: "🎨" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ Collections & Mood Boards
            </span>
            <span className="text-xs text-slate-400">Ortak İlham & Favori Paneli</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Favorites & Collections</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCreateCollection}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-medium hover:opacity-90 transition flex items-center gap-1.5"
          >
            + Yeni Koleksiyon Oluştur
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-medium uppercase">Kaydedilen Toplam Öğe</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{totalSaved} İçerik</div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Aktif Koleksiyonlar</span>
          <div className="text-2xl font-bold mt-1 text-rose-600">{collectionsCount} Klasör</div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Partner İş Birliği</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">Selin & Kaan</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ortak Düzenleme Aktif</span>
        </motion.div>
      </div>

      <div className="flex gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={"flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition " +
              (activeTab === tab.id
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-slate-300")
            }
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
`,

  "components/couple/favorites/AIMoodAnalysisCard.tsx": `"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIMoodAnalysisCard({
  style,
  palette,
  recommendations,
}: {
  style: string;
  palette: string[];
  recommendations: string[];
}) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          ✦ AI Visual Mood Analysis
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Canlı Stil Analizi
        </span>
      </div>

      <div>
        <span className="text-[10px] text-slate-400 uppercase font-semibold">Tespit Edilen Düğün Konsepti</span>
        <div className="text-xl font-serif font-bold text-slate-800 dark:text-slate-100 mt-0.5">{style}</div>
      </div>

      {/* Renk Paleti */}
      <div>
        <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1.5">Dominant Renk Paleti</span>
        <div className="flex gap-2">
          {palette.map((color, i) => (
            <div key={i} className="h-6 flex-1 rounded-xl border border-slate-200/80 shadow-sm" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>

      {/* Yapay Zeka Önerileri */}
      <div className="space-y-2 pt-2 border-t border-indigo-100 dark:border-indigo-900/40 text-xs">
        {recommendations.map((rec, i) => (
          <div key={i} className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300">
            💡 {rec}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
`,

  "components/couple/favorites/CollectionCard.tsx": `"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CollectionCard({ collection }: { collection: any }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3 cursor-pointer hover:border-slate-300 transition"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: collection.colorTag }} />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{collection.title}</h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
          {collection.itemCount} Öğe
        </span>
      </div>

      <p className="text-xs text-slate-400 line-clamp-2">{collection.description}</p>

      {/* Önizleme Görselleri */}
      <div className="grid grid-cols-3 gap-1.5 pt-1">
        {collection.thumbnails.map((thumb: string, i: number) => (
          <div key={i} className="h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img src={thumb} alt="thumbnail" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span>{collection.isShared ? "👥 Partner ile Paylaşıldı" : "🔒 Özel"}</span>
        <span>Son Güncelleme: {collection.updatedAt}</span>
      </div>
    </motion.div>
  );
}
`,

  "components/couple/favorites/SavedItemCard.tsx": `"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SavedItemCard({ item }: { item: any }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between"
    >
      <div>
        <div className="relative h-44 bg-slate-200 dark:bg-slate-800">
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
            {item.type === "VENDOR" ? "🏰 Tedarikçi" : "🎨 İlham"}
          </span>
        </div>

        <div className="p-4 space-y-2">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{item.title}</h4>
          <p className="text-[11px] text-slate-400">{item.subtitle}</p>

          {item.note && (
            <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/40 text-[11px] text-amber-800 dark:text-amber-300 italic">
              ✍️ "{item.note}"
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pt-0 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
        <span>Klasör: <strong className="text-slate-600 dark:text-slate-300">{item.collectionName}</strong></span>
        <button className="text-rose-600 dark:text-rose-400 font-bold hover:underline">Detay →</button>
      </div>
    </motion.div>
  );
}
`,

  "components/couple/favorites/FavoritesClient.tsx": `"use client";

import React, { useState } from "react";
import FavoritesHeader from "./FavoritesHeader";
import AIMoodAnalysisCard from "./AIMoodAnalysisCard";
import CollectionCard from "./CollectionCard";
import SavedItemCard from "./SavedItemCard";
import { createCollectionAction } from "@/lib/actions/favorites";

export default function FavoritesClient({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState("ALL");

  const [collections] = useState([
    {
      id: "col_1",
      title: "Bodrum Mekan Adayları",
      description: "Gün batımı manzaralı açık hava düğün mekanları",
      colorTag: "#E11D48",
      itemCount: 4,
      isShared: true,
      updatedAt: "Dün",
      thumbnails: [
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=300&q=80",
      ],
    },
    {
      id: "col_2",
      title: "Masa Dekorasyonu & Aydınlatma",
      description: "Keten örtüler, mumlar ve ege konsepti çiçek tasarımları",
      colorTag: "#D97706",
      itemCount: 8,
      isShared: true,
      updatedAt: "3 gün önce",
      thumbnails: [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=300&q=80",
      ],
    },
  ]);

  const [savedItems] = useState([
    {
      id: "saved_1",
      title: "Bodrum Sunset Venue",
      subtitle: "Düğün Mekanı • Bodrum",
      type: "VENDOR",
      collectionName: "Bodrum Mekan Adayları",
      note: "Kaan kokteyl alanını çok beğendi, fiyat teklifi beklenecek.",
      imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "saved_2",
      title: "Bohem Sahil Masası Düzeni",
      subtitle: "Görsel İlham • Dekorasyon",
      type: "INSPIRATION",
      collectionName: "Masa Dekorasyonu & Aydınlatma",
      note: "Zeytin yaprakları ve fener konsepti masalar için harika bir fikir.",
      imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80",
    },
  ]);

  const handleCreateCollection = async () => {
    const title = prompt("Yeni Koleksiyon Adı:");
    if (!title) return;

    const res = await createCollectionAction(userId, {
      title,
      description: "Yeni oluşturulan ilham koleksiyonu",
      isSharedWithPartner: true,
      colorTag: "#E11D48",
    });

    if (res.success) {
      alert("✨ Koleksiyon oluşturuldu!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <FavoritesHeader
        totalSaved={savedItems.length + 10}
        collectionsCount={collections.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreateCollection={handleCreateCollection}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        {/* Sol Kolon (4 Sütun): AI Mood Analitiği */}
        <div className="lg:col-span-4 space-y-6">
          <AIMoodAnalysisCard
            style="Ege & Akdeniz Bohem Lüks"
            palette={["#FAF8F5", "#D97706", "#0284C7", "#E11D48"]}
            recommendations={[
              "Kaydedilen görsellerde ahşap dokular ve keten detaylar baskın.",
              "Işıklandırma için sarkıt fener tasarımlarını inceleyebilirsiniz.",
            ]}
          />
        </div>

        {/* Sağ Kolon (8 Sütun): Klasörler & Favori Öğeler */}
        <div className="lg:col-span-8 space-y-8">
          {/* Koleksiyonlar Bölümü */}
          {(activeTab === "ALL" || activeTab === "COLLECTIONS") && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                📁 Koleksiyonlar & Klasörler ({collections.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collections.map((col) => (
                  <CollectionCard key={col.id} collection={col} />
                ))}
              </div>
            </div>
          )}

          {/* Kaydedilen Öğeler Bölümü */}
          {(activeTab === "ALL" || activeTab === "VENDORS" || activeTab === "INSPIRATION") && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                💎 Kaydedilen Favori Öğeler ({savedItems.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedItems.map((item) => (
                  <SavedItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`,

  "app/(couple)/favorites/page.tsx": `import React from "react";
import FavoritesClient from "@/components/couple/favorites/FavoritesClient";

export default function CoupleFavoritesPage() {
  const mockUserId = "usr_couple_demo_123";

  return <FavoritesClient userId={mockUserId} />;
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(filePath, content);
}

console.log("✅ Tüm Favorites & Wedding Collections bileşenleri başarıyla oluşturuldu!");