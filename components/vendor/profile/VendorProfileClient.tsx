"use client";

import React, { useState } from "react";
import GlassCard from "@/components/shared/ui/GlassCard";
import { Button } from "@/components/shared/ui/Button";
import { Sparkles, Eye, Save, Building2, MapPin, Image as ImageIcon, Utensils } from "lucide-react";

export function VendorProfileClient({ initialData }: { initialData: any }) {
  const [activeTab, setActiveTab] = useState<"basics" | "spaces" | "services" | "media">("basics");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Üst Başlık ve Hızlı AI Aksiyonları */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-rose-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vitrin & Profil Yönetimi</h1>
          <p className="text-sm text-gray-500">
            Pazaryerinde çiftlerin gördüğü tüm içerikleri, salonları ve görselleri buradan yönetin.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* AI ile Otomatik Doldur Button */}
          <Button 
            variant="outline" 
            onClick={() => setIsAiModalOpen(true)}
            className="border-rose-200 text-rose-700 hover:bg-rose-50 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
            AI ile Profil Doldur
          </Button>

          {/* Canlı Önizleme */}
          <Button 
            variant="secondary" 
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Çift Gözünden Gör
          </Button>

          {/* Kaydet */}
          <Button className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2">
            <Save className="w-4 h-4" />
            Değişiklikleri Kaydet
          </Button>
        </div>
      </div>

      {/* Sekme Navigasyonu (Tab Navigation) */}
      <div className="flex border-b border-gray-200 gap-2">
        {[
          { id: "basics", label: "Temel Bilgiler & Kimlik", icon: Building2 },
          { id: "spaces", label: "Davet Alanları / Salonlar", icon: MapPin },
          { id: "services", label: "Hizmetler & Menüler", icon: Utensils },
          { id: "media", label: "Vitrin & Medya Galeri", icon: ImageIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-rose-600 text-rose-600 bg-rose-50/50 rounded-t-lg"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Sekme İçerikleri */}
      <div className="mt-6">
        {activeTab === "basics" && (
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Temel Firma Bilgileri & Başlangıç Fiyatları</h3>
            {/* Form Alanları: Title, Category, Fiyatlar (EUR/TL) */}
          </GlassCard>
        )}

        {activeTab === "spaces" && (
          <GlassCard className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Salonlar ve Açık Alanlar</h3>
              <Button size="sm" variant="outline">+ Yeni Salon Ekle</Button>
            </div>
            {/* Salon Kartları / Bento Düzendeki Alan Listesi */}
          </GlassCard>
        )}

        {activeTab === "services" && (
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Düğün Paketleri & İmkânlar</h3>
            {/* Checkbox / Toggle düğmeleri: Menü Tipleri, Kurallar, Otopark */}
          </GlassCard>
        )}

        {activeTab === "media" && (
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Fotoğraf & Video Galeri</h3>
            {/* Drag and drop medya kütüphanesi ve Albüm Yönetimi */}
          </GlassCard>
        )}
      </div>
    </div>
  );
}