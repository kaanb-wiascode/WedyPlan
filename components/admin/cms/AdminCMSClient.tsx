"use client";

import React, { useState } from "react";
import AdminCMSHeader from "./AdminCMSHeader";
import AICMSAssistantWidget from "./AICMSAssistantWidget";
import ContentManagerTable from "./ContentManagerTable";
import MediaVaultWidget from "./MediaVaultWidget";
import { saveCMSContentItemAction } from "@/lib/actions/admin-cms";

export default function AdminCMSClient() {
  const [contents, setContents] = useState([
    {
      id: "cms_101",
      title: "2026 Bodrum Sahil Düğünleri Rehberi",
      type: "BLOG_POST",
      slug: "bodrum-sahil-dugunleri-rehberi-2026",
      language: "TR",
      status: "PUBLISHED",
    },
    {
      id: "cms_102",
      title: "Sözleşme İmzalandı Hoş Geldin E-Postası",
      type: "EMAIL_TEMPLATE",
      slug: "email-contract-signed-welcome",
      language: "TR",
      status: "PUBLISHED",
    },
    {
      id: "cms_103",
      title: "Destinasyon Düğünü İniş Sayfası (EN)",
      type: "LANDING_PAGE",
      slug: "turkey-destination-wedding-planning",
      language: "EN",
      status: "PUBLISHED",
    },
  ]);

  const [mediaAssets] = useState([
    { id: "m_1", fileName: "bodrum-sunset-hero.webp", sizeKb: 240 },
    { id: "m_2", fileName: "luxury-wedding-decor.webp", sizeKb: 180 },
  ]);

  const handleApplyAIContent = async (aiData: any) => {
    const res = await saveCMSContentItemAction({
      title: aiData.generatedTitle,
      type: "BLOG_POST",
      slug: aiData.generatedSlug,
      body: aiData.generatedBody,
      seoTitle: aiData.seoTitle,
      seoDescription: aiData.seoDescription,
      language: "TR",
      status: "PUBLISHED",
    });

    if (res.success) {
      setContents([
        ...contents,
        {
          id: res.contentId || "cms_" + Date.now(),
          title: aiData.generatedTitle,
          type: "BLOG_POST",
          slug: aiData.generatedSlug,
          language: "TR",
          status: "PUBLISHED",
        },
      ]);
    }
  };

  const publishedPages = contents.filter((c) => c.status === "PUBLISHED").length;
  const totalBlogs = contents.filter((c) => c.type === "BLOG_POST").length;
  const activeTemplates = contents.filter((c) => c.type.includes("TEMPLATE") || c.type.includes("NOTIFICATION")).length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminCMSHeader
        publishedPagesCount={publishedPages}
        totalBlogsCount={totalBlogs}
        activeTemplatesCount={activeTemplates}
        onOpenNewContentModal={() => alert("✏️ Yeni İçerik Oluşturucu Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AICMSAssistantWidget onApplyGeneratedContent={handleApplyAIContent} />
          <MediaVaultWidget mediaAssets={mediaAssets} />
        </div>

        <div className="lg:col-span-7">
          <ContentManagerTable
            contents={contents}
            onEdit={(item) => alert("✏️ İçerik Düzenle: " + item.title)}
          />
        </div>
      </div>
    </div>
  );
}
