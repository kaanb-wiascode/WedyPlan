"use server";

import { revalidatePath } from "next/cache";
import { biFilterSchema, BIFilterInput } from "@/lib/validations/admin-bi";

export async function getBIMetricsDataAction(data: BIFilterInput) {
  const validation = biFilterSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    revalidatePath("/admin/bi");
    return {
      success: true,
      data: {
        executive: {
          platformHealthScore: 98,
          activeCouples: 14250,
          activeVendors: 840,
          mrr: "1.420.000 ₺",
          retentionRate: "%92.4",
          activationRate: "%88.1",
        },
        dimensions: [
          { name: "Satış & Dönüşüm", value: "%38.4", trend: "+%4.2", status: "ON_TRACK" },
          { name: "Pazarlama ROI", value: "4.8x LTV/CAC", trend: "+%0.6x", status: "ON_TRACK" },
          { name: "Destek SLA Yanıtı", value: "4.2 Dk", trend: "-1.1 Dk", status: "ON_TRACK" },
          { name: "Arama Engine Latency", value: "18ms", trend: "Sabit", status: "ON_TRACK" },
          { name: "Tedarikçi Başarı Endeksi", value: "94/100", trend: "+2 Puan", status: "ON_TRACK" },
          { name: "Çift Tamamlama Oranı", value: "%89.2", trend: "+%3.1", status: "ON_TRACK" },
        ],
      },
    };
  } catch (error) {
    console.error("Get BI Metrics Error:", error);
    return { success: false, error: "BI verileri alınamadı." };
  }
}

export async function generateAIBIExtractAction() {
  try {
    return {
      success: true,
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
    };
  } catch (error) {
    console.error("AI BI Extract Error:", error);
    return { success: false, error: "AI BI brifingi üretilemedi." };
  }
}
