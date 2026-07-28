"use client";

import React, { useState } from "react";
import BIHeader from "./BIHeader";
import AIBIExecutiveWidget from "./AIBIExecutiveWidget";
import BIDashboardBentoGrid from "./BIDashboardBentoGrid";
import BIMetricDimensionsTable from "./BIMetricDimensionsTable";

export default function AdminBIClient() {
  const [selectedTab, setSelectedTab] = useState("EXECUTIVE");

  const [aiReport] = useState({
    executiveSummary: "2026 yılı 3. çeyreğinde WedyPlan ekosistemi %18.4 net ciro büyümesi ve %92.4 müşteri elde tutma oranı ile tarihindeki en yüksek operasyonel verimliliğe ulaşmıştır.",
    detectedTrends: [
      "Ege ve Akdeniz destinasyon düğünü aramaları son 30 günde %140 artış gösterdi.",
      "Sözleşmelerin dijital e-imza ile tamamlanma süresi ortalama 1.2 güne düştü.",
    ],
    businessForecast: "Gelecek 6 aylık dönemde toplam işlem hacminin (GMV) 180.000.000 ₺ barajını aşması öngörülmektedir.",
    opportunities: [
      "Lüks segment mekanlarda 'Featured Choice' vitrin paketi fiyatlarının %15 güncellenmesi ek 85.000 ₺ MRR getirecektir.",
    ],
    revenueRisks: [
      "Marmara bölgesindeki 2 tedarikçi kategorisinde yanıt verme sürelerinde hafif aksama gözlendi.",
    ],
    kpiRecommendations: "Müşteri Edinme Maliyeti (CAC) hedefini 350 ₺ seviyesinden 310 ₺ seviyesine düşürmek mümkündür.",
  });

  const [dimensions] = useState([
    { name: "Satış & Dönüşüm", value: "%38.4", trend: "+%4.2", status: "ON_TRACK" },
    { name: "Pazarlama ROI", value: "4.8x LTV/CAC", trend: "+%0.6x", status: "ON_TRACK" },
    { name: "Destek SLA Yanıtı", value: "4.2 Dk", trend: "-1.1 Dk", status: "ON_TRACK" },
    { name: "Arama Engine Latency", value: "18ms", trend: "Sabit", status: "ON_TRACK" },
    { name: "Tedarikçi Başarı Endeksi", value: "94/100", trend: "+2 Puan", status: "ON_TRACK" },
    { name: "Çift Tamamlama Oranı", value: "%89.2", trend: "+%3.1", status: "ON_TRACK" },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <BIHeader
        healthScore={98}
        activeCouples={14250}
        activeVendors={840}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        onExportReport={() => alert("📊 BI Yönetici Raporu İndiriliyor...")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIBIExecutiveWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <BIDashboardBentoGrid dimensions={dimensions} />
          <BIMetricDimensionsTable />
        </div>
      </div>
    </div>
  );
}
