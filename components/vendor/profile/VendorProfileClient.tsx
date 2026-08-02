"use client";

import React, { useState } from "react";
import GlassCard from "@/components/shared/ui/GlassCard";
import { Button } from "@/components/shared/ui/Button";
import { Sparkles, Eye, Save, Building2, MapPin, Image as ImageIcon, Utensils } from "lucide-react";

import { SpacesManagementTab } from "./tabs/SpacesManagementTab";
import { ServicesAndPackagesTab } from "./tabs/ServicesAndPackagesTab";
import { MediaAndShowcaseTab } from "./tabs/MediaAndShowcaseTab";
import { AIProfileImporterModal } from "./widgets/AIProfileImporterModal";

interface VendorProfileClientProps {
  initialData?: any;
  vendorId?: string;
}

export function VendorProfileClient({ initialData, vendorId }: VendorProfileClientProps) {
  const [activeTab, setActiveTab] = useState<"basics" | "spaces" | "services" | "media">("basics");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Üst Başlık ve Hızlı AI Aksiyonları */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-rose-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vitrin & Profil Yönetimi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
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
      <div className="flex border-b border-gray-200 dark:border-zinc-800 gap-2 overflow-x-auto">
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
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px shrink-0 ${
                activeTab === tab.id
                  ? "border-rose-600 text-rose-600 bg-rose-50/50 dark:bg-rose-950/30 rounded-t-lg font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Temel Firma Bilgileri & Başlangıç Fiyatları</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Firma / Mekan Adı
                </label>
                <input
                  type="text"
                  defaultValue="Titanic Business Kartal Hotel"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Hafta İçi Başlangıç Fiyatı (Kişi Başı)
                </label>
                <input
                  type="number"
                  defaultValue={50}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>
            </div>
          </GlassCard>
        )}

        {activeTab === "spaces" && <SpacesManagementTab />}

        {activeTab === "services" && <ServicesAndPackagesTab />}

        {activeTab === "media" && <MediaAndShowcaseTab />}
      </div>

      {/* AI Profil Sihirbazı Modalı */}
      <AIProfileImporterModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onDataExtracted={(data) => {
          console.log("AI Extracted Profile Data:", data);
        }}
      />
    </div>
  );
}