"use client";

import React, { useState } from "react";
import VaultHeader from "./VaultHeader";
import AIVaultInsightsWidget from "./AIVaultInsightsWidget";
import DocumentGridList from "./DocumentGridList";
import DocumentViewerModal from "./DocumentViewerModal";
import { uploadVaultDocumentAction } from "@/lib/actions/vault";

export default function VaultClient({ userId }: { userId: string }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [documents, setDocuments] = useState([
    {
      id: "doc_1",
      title: "Bodrum_Sunset_Venue_Sozlesme_v2.pdf",
      category: "CONTRACT",
      folderName: "Sözleşmeler",
      fileSizeMb: 3.4,
      uploadDate: "12 Şub 2027",
      isFavorite: true,
      tags: ["Mekan", "Sözleşme", "Bodrum"],
      aiSummary: "Bodrum Sunset Venue mekan kiralama sözleşmesinin onaylanmış 2. revizyonudur.",
      ocrText: "BODRUM SUNSET VENUE DÜĞÜN SÖZLEŞMESİ - Bedel: 320.000 TL - Tarih: 19.06.2027.",
      version: 2,
    },
    {
      id: "doc_2",
      title: "Studio_Aegean_Kapora_Makbuzu.pdf",
      category: "INVOICE",
      folderName: "Faturalar & Makbuzlar",
      fileSizeMb: 1.2,
      uploadDate: "15 Şub 2027",
      isFavorite: false,
      tags: ["Fotoğraf", "Makbuz"],
      aiSummary: "Fotoğraf çekimi için ödenen 35.000 TL tutarındaki kapora makbuzudur.",
      ocrText: "STUDIO AEGEAN MAKBUZ - Alınan Tutar: 35.000 TL - Kalan: 50.000 TL.",
      version: 1,
    },
  ]);

  const handleUploadNew = async () => {
    const title = prompt("Dosya Adı:");
    if (!title) return;

    const res = await uploadVaultDocumentAction(userId, {
      title,
      category: "CONTRACT",
      folderName: "Genel Belgeler",
      fileUrl: "https://example.com/file.pdf",
      fileSizeMb: 2.1,
      tags: ["Yeni"],
    });

    if (res.success) {
      alert(res.message);
    }
  };

  const handleToggleFavorite = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isFavorite: !d.isFavorite } : d))
    );
  };

  const handleViewDocument = (doc: any) => {
    setSelectedDoc(doc);
    setIsViewerOpen(true);
  };

  const filteredDocs = documents.filter((d) => {
    if (activeCategory === "ALL") return true;
    return d.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <VaultHeader
        totalDocuments={documents.length}
        usedStorageMb={420}
        maxStorageMb={5120} // 5 GB
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onUploadClick={handleUploadNew}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIVaultInsightsWidget
            ocrScannedCount={documents.length}
            duplicateAlertsCount={0}
            suggestedFolder="Bütçe & Faturalar"
          />
        </div>

        <div className="lg:col-span-8">
          <DocumentGridList
            documents={filteredDocs}
            onViewDocument={handleViewDocument}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>

      <DocumentViewerModal
        document={selectedDoc}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </div>
  );
}
