"use server";

import { revalidatePath } from "next/cache";
import { biFilterSchema, BIFilterInput } from "@/lib/validations/vendor-bi";

export async function getVendorBIAnalyticsAction(vendorId: string, filter: BIFilterInput) {
  const validation = biFilterSchema.safeParse(filter);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Fetching BI analytics for vendor " + vendorId + " with view " + filter.viewMode);
    revalidatePath("/vendor/bi");
    return {
      success: true,
      data: {
        kpis: {
          totalRevenue: "1.240.000 ₺",
          revenueGrowth: "+%22",
          conversionRate: "%34",
          campaignRoi: "%340",
          responseTimeMinutes: "12 dk",
          customerSatisfactionScore: 4.9,
          contractSuccessRate: "%88",
          paymentSuccessRate: "%96",
          cancellationRate: "%2",
        },
        competitorBenchmark: {
          regionalRank: "2 / 48 (Bodrum Bölgesi)",
          pricePositioning: "Lüks Segment Ortalamasında",
          responseSpeedComparison: "Pazardan %40 Daha Hızlı",
        },
        leadSourcesDistribution: [
          { source: "WedyPlan Organik", percentage: 48 },
          { source: "Instagram & Sosyal Medya", percentage: 32 },
          { source: "Tavsiye & Doğrudan", percentage: 20 },
        ],
      },
    };
  } catch (error) {
    console.error("Get BI Analytics Error:", error);
    return { success: false, error: "BI analitik verileri çekilemedi." };
  }
}

export async function generateAIBIInsightsAction(vendorId: string) {
  try {
    return {
      success: true,
      businessHealthScore: 96,
      growthForecast: "Önümüzdeki 12 ayda %24 beklenen ciro büyümesi.",
      opportunityDetection: "Son 3 ayda açık hava akşam düğünü talepleri %35 arttı. Bu alandaki paket kapasitenizi artırmak ek 280.000 ₺ ciro yaratabilir.",
      riskAlerts: [
        "Cuma günleri için gelen taleplerde yanıt süresi ortalaması 24 dakikaya yükseldi.",
      ],
      actionRecommendations: [
        "Hafta sonu boş kalan 2 tarihi dolabilmesi için %10 'Sınırlı Zaman' fırsat kampanyası başlatın.",
        "Mutfak ekibi tadım süreçlerinde müşteri memnuniyeti %98 seviyesinde; bunu pazarlama materyallerinde öne çıkarın.",
      ],
    };
  } catch (error) {
    console.error("AI BI Insights Error:", error);
    return { success: false, error: "AI BI analizi üretilemedi." };
  }
}
