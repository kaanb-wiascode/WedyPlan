"use client";

import React, { useState } from "react";
import InventoryHeader from "./InventoryHeader";
import AIInventoryIntelligenceWidget from "./AIInventoryIntelligenceWidget";
import AssetManagerTable from "./AssetManagerTable";
import { createVendorAssetAction, reportAssetDamageAction } from "@/lib/actions/vendor-inventory";

export default function VendorInventoryClient({ vendorId }: { vendorId: string }) {
  const [aiData] = useState({
    inventoryOptimizationScore: 94,
    demandPredictions: [
      "19 Haziran Bodrum düğünü için 350 adet Tiffany Sandalye rezervasyonu var. Mevcut kullanılabilir stok: 400 adet (Yeterli).",
      "Temmuz ayındaki 2 çakışan kır düğünü için ses/ışık podyum kablosu stok yetersizliği riski mevcut.",
    ],
    maintenancePredictions: [
      "DJ Pro Sound System #1 cihazı son 30 günde 6 gece düğününde kullanıldı. Amfi soğutucu fan bakımı önerilir.",
      "DJI Inspire 3 Drone cihazı 45 saatlik uçuş limitine ulaştı. Pervane değişimi önerilir.",
    ],
  });

  const [assets, setAssets] = useState([
    {
      id: "ast_1",
      title: "Lüks Tiffany Ahşap Düğün Sandalyesi",
      category: "Masa & Sandalye",
      qrCode: "QR-TS-2026-01",
      totalQuantity: 400,
      availableQuantity: 50,
      location: "Merkez Depo (Bodrum)",
      status: "RESERVED",
    },
    {
      id: "ast_2",
      title: "DJI Inspire 3 Pro Çekim Dronu",
      category: "Kamera & Dron",
      qrCode: "QR-DR-2026-09",
      totalQuantity: 2,
      availableQuantity: 1,
      location: "Saha Ekipman Kasası",
      status: "IN_MAINTENANCE",
    },
    {
      id: "ast_3",
      title: "Porselen & Şampanya Kadeh Seti (350 Kişilik)",
      category: "Depo Sarf / Mutfak",
      qrCode: "QR-PK-2026-44",
      totalQuantity: 350,
      availableQuantity: 350,
      location: "Merkez Depo (Bodrum)",
      status: "AVAILABLE",
    },
  ]);

  const handleAddMockAsset = async () => {
    const res = await createVendorAssetAction(vendorId, {
      title: "Pro Sahne Işıklandırma Robotu",
      category: "LIGHTING_SOUND",
      qrCode: "QR-LG-" + Date.now(),
      totalQuantity: 4,
      location: "Merkez Depo",
      purchasePrice: 120000,
      status: "AVAILABLE",
    });

    if (res.success) {
      setAssets([
        ...assets,
        {
          id: res.assetId || "ast_" + Date.now(),
          title: "Pro Sahne Işıklandırma Robotu",
          category: "Ses & Işık",
          qrCode: "QR-LG-NEW",
          totalQuantity: 4,
          availableQuantity: 4,
          location: "Merkez Depo",
          status: "AVAILABLE",
        },
      ]);
      alert("✨ " + res.message);
    }
  };

  const handleReportDamage = async (asset: any) => {
    const res = await reportAssetDamageAction(vendorId, {
      assetId: asset.id,
      damageDescription: "Taşıma esnasında ayak kısmı çizildi.",
      estimatedRepairCost: 1500,
      severity: "LOW",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const reservedCount = assets.filter((a) => a.status === "RESERVED").length;
  const inMaintenanceCount = assets.filter((a) => a.status === "IN_MAINTENANCE").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <InventoryHeader
        totalAssetsCount={assets.length}
        reservedCount={reservedCount}
        inMaintenanceCount={inMaintenanceCount}
        totalInventoryValue={1850000}
        onOpenNewAssetModal={handleAddMockAsset}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIInventoryIntelligenceWidget aiData={aiData} />
        </div>

        <div className="lg:col-span-7">
          <AssetManagerTable
            assets={assets}
            onReportDamage={handleReportDamage}
          />
        </div>
      </div>
    </div>
  );
}
