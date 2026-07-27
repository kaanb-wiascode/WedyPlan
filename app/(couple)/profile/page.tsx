"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileHeader from "@/components/couple/profile/ProfileHeader";
import ProfileTabsNav from "@/components/couple/profile/ProfileTabsNav";
import GeneralInfoTab from "@/components/couple/profile/tabs/GeneralInfoTab";
import StoryThemeTab from "@/components/couple/profile/tabs/StoryThemeTab";
import VenueCultureTab from "@/components/couple/profile/tabs/VenueCultureTab";
import PrivacyNotesTab from "@/components/couple/profile/tabs/PrivacyNotesTab";
import { WeddingProfileFormData } from "@/lib/validations/wedding-profile";
import { updateWeddingProfile } from "@/lib/actions/wedding-profile";

const INITIAL_PROFILE_DATA: WeddingProfileFormData = {
  title: "Selin & Kaan'ın Düğün Daveti",
  weddingDate: "2027-06-19",
  weddingCity: "Bodrum, Muğla",
  brideGroomName: "Selin Yılmaz",
  partnerName: "Kaan Atamer",
  partnerEmail: "kaan@wiascorp.com",
  weddingStory: "2021 yılında Ege kıyılarında başlayan yolculuğumuz, Bodrum'un eşsiz gün batımında sonsuz bir evete dönüşüyor...",
  weddingTheme: "EGE_BOHEM_LÜKS",
  colorPalette: ["#F8FAFC", "#E2E8F0", "#94A3B8", "#E11D48", "#F59E0B"],
  dressCode: "BLACK_TIE_OPTIONAL",
  venuePreferences: ["Kumsal / Plaj", "Tarihi Taş Konak", "Açık Hava Çim Alan"],
  culture: "Ege & Akdeniz Sentezi",
  traditions: ["Zeybek Gösterisi", "Gece Yarısı Çorba İkramı", "Tarihi Kına Seremonisi"],
  languages: ["Türkçe", "İngilizce"],
  familyNotes: "Aile büyüklerimiz için ön sıralarda tekerlekli sandalye erişimine uygun özel oturma düzeni oluşturulmalı.",
  isPrivateProfile: true,
  passcodeProtection: "2027",
};

export default function WeddingProfilePage() {
  const [activeTab, setActiveTab] = useState<"general" | "theme" | "venue" | "privacy">("general");
  const [formData, setFormData] = useState<WeddingProfileFormData>(INITIAL_PROFILE_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateFields = (fields: Partial<WeddingProfileFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const response = await updateWeddingProfile("usr_demo_123", formData);
    setIsSaving(false);

    if (response.success) {
      setToastMessage(response.message || "Kaydedildi!");
      setTimeout(() => setToastMessage(null), 3000);
    } else {
      alert("Lütfen alanları doğru doldurduğunuzdan emin olun.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Üst Başlık ve Profil Özeti */}
        <ProfileHeader data={formData} onSave={handleSave} isSaving={isSaving} />

        {/* Sekme Yönlendirme Barı */}
        <ProfileTabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Bildirim Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-emerald-500 text-white font-medium text-center text-sm shadow-lg backdrop-blur-md"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sekme İçerikleri */}
        <div className="backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "general" && <GeneralInfoTab data={formData} updateFields={updateFields} />}
              {activeTab === "theme" && <StoryThemeTab data={formData} updateFields={updateFields} />}
              {activeTab === "venue" && <VenueCultureTab data={formData} updateFields={updateFields} />}
              {activeTab === "privacy" && <PrivacyNotesTab data={formData} updateFields={updateFields} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}