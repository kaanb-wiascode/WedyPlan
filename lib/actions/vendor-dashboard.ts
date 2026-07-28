"use server";

import { revalidatePath } from "next/cache";

export async function getVendorExecutiveDashboardAction(vendorId: string) {
  try {
    console.log("Fetching executive dashboard data for vendor " + vendorId);
    return {
      success: true,
      kpis: {
        todayRevenue: "45.000 ₺",
        monthlyRevenue: "380.000 ₺",
        revenueGrowth: "+%18",
        newLeadsCount: 14,
        pendingOffersCount: 5,
        signedContractsCount: 8,
        upcomingWeddingsCount: 3,
        todayMeetingsCount: 2,
        unreadMessagesCount: 4,
        conversionRate: "%32",
        responseTimeMinutes: "14 dk",
        customerSatisfactionScore: 4.9,
        aiBusinessScore: 94,
        profileQualityScore: 98,
      },
      aiInsights: {
        todayPriorities: [
          "Selin & Kaan çiftinin 350 kişilik düğün mekan teklifini onaylayın (Bütçe: 320.000 ₺).",
          "Saat 15:00'teki menü tadımı toplantısı için mutfak ekibini bilgilendirin.",
        ],
        lostOpportunityAlert: "2 teklif talebi 48 saattir yanıt bekliyor. Yanıt süresi uzarsa dönüşüm ihtimali %60 düşer.",
        revenuePrediction: "Önümüzdeki 30 gün içinde beklenen tahmini ciro: 420.000 ₺ (%15 büyüme).",
        recommendedActions: [
          "Cuma günkü boş kalan açık hava salonu için %10 'Erken Rezervasyon' kampanyası başlatın.",
        ],
      },
      upcomingMeetings: [
        { id: "m1", coupleNames: "Selin & Kaan", title: "Menü Tadımı & Masa Düzeni", time: "15:00", type: "YÜZ YÜZE" },
        { id: "m2", coupleNames: "Ece & Mert", title: "Sözleşme Revizyonu", time: "17:30", type: "ONLINE" },
      ],
    };
  } catch (error) {
    console.error("Vendor Executive Dashboard Error:", error);
    return { success: false, error: "Dashboard verileri yüklenemedi." };
  }
}
