"use client";

import React, { useState } from "react";
import WebsiteBuilderHeader from "./WebsiteBuilderHeader";
import SectionControlsSidebar from "./SectionControlsSidebar";
import LiveWebsitePreview from "./LiveWebsitePreview";
import { saveWebsiteSettingsAction, publishWebsiteAction } from "@/lib/actions/website";

export default function WebsiteBuilderClient({ userId }: { userId: string }) {
  const [previewDevice, setPreviewDevice] = useState<"DESKTOP" | "MOBILE">("DESKTOP");
  const [isPublished, setIsPublished] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const [settings, setSettings] = useState({
    coupleNames: "Selin & Kaan",
    slug: "selin-kaan-2027",
    themeId: "theme_boho_luxe",
    weddingDate: "19 Haziran 2027",
    venueLocation: "Bodrum Sunset Venue, Muğla",
    storyTitle: "Bizim Masalımız",
    storyContent: "Üniversite kütüphanesinde aynı kitabı ararken başlayan hikayemiz, Bodrum'da unutulmaz bir gün batımı teklifiyle taçlandı.",
  });

  const [sections, setSections] = useState([
    { id: "hero", label: "Karşılama (Hero Header)", isVisible: true },
    { id: "story", label: "Bizim Hikayemiz (Our Story)", isVisible: true },
    { id: "timeline", label: "Düğün Günü Akışı", isVisible: true },
    { id: "location", label: "Konum & Yol Tarifi", isVisible: true },
    { id: "rsvp", label: "LCV / Katılım Formu", isVisible: true },
    { id: "faq", label: "Sıkça Sorulan Sorular", isVisible: true },
  ]);

  const handleStoryGenerated = (title: string, content: string) => {
    setSettings((prev) => ({ ...prev, storyTitle: title, storyContent: content }));
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    await saveWebsiteSettingsAction(userId, {
      ...settings,
      isPasswordProtected: false,
    });

    const res = await publishWebsiteAction(userId, settings.slug);
    setIsPublishing(false);

    if (res.success && res.publishedUrl) {
      setIsPublished(true);
      setPublishedUrl(res.publishedUrl);
      alert("✨ Düğün web siteniz başarıyla canlıya alındı!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-6">
      <WebsiteBuilderHeader
        previewDevice={previewDevice}
        setPreviewDevice={setPreviewDevice}
        isPublished={isPublished}
        publishedUrl={publishedUrl}
        onPublish={handlePublish}
        isPublishing={isPublishing}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        {/* Sol Kolon (4 Sütun): Bölüm Kontrolleri & AI Story */}
        <div className="lg:col-span-4">
          <SectionControlsSidebar
            settings={settings}
            setSettings={setSettings}
            sections={sections}
            setSections={setSections}
            onStoryGenerated={handleStoryGenerated}
          />
        </div>

        {/* Sağ Kolon (8 Sütun): Canlı Web Önizleyici */}
        <div className="lg:col-span-8">
          <LiveWebsitePreview
            settings={settings}
            sections={sections}
            previewDevice={previewDevice}
          />
        </div>
      </div>
    </div>
  );
}
