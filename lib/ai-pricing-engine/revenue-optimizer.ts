import { PredictOptimalPriceInput } from "@/lib/validations/ai-pricing-engine";

export interface PricingAnalysisResult {
  optimalPrice: number;
  basePrice: number;
  currency: string;
  priceDeltaPct: number;
  expectedConversionRatePct: number;
  predictedRevenueIncreasePct: number;
  factors: {
    seasonalityMultiplier: number;
    demandMultiplier: number;
    competitionFactor: number;
  };
  suggestedCampaign: string;
}

export function calculateOptimalPrice(input: PredictOptimalPriceInput): PricingAnalysisResult {
  let seasonality = 1.0;
  if ([5, 6, 7, 8, 9].includes(input.month)) {
    seasonality = 1.35; // Yüksek sezon
  } else if ([11, 12, 1, 2].includes(input.month)) {
    seasonality = 0.80; // Düşük sezon
  }

  let demand = 1.0;
  if (input.occupancyRatePct > 80) {
    demand = 1.25;
  } else if (input.occupancyRatePct < 40) {
    demand = 0.85;
  }

  const optimalPrice = Math.round(input.basePrice * seasonality * demand);
  const priceDeltaPct = Math.round(((optimalPrice - input.basePrice) / input.basePrice) * 100);

  let campaign = "Standart Sezon Fiyatlandırması Uygulansın";
  if (input.occupancyRatePct < 40 && seasonality < 1.0) {
    campaign = "Erken Rezervasyon %15 İndirim Fırsatı Kampanyası Önerilir";
  } else if (input.occupancyRatePct > 80) {
    campaign = "Yüksek Talep Premium Fiyatlandırma Modu Aktif";
  }

  return {
    optimalPrice,
    basePrice: input.basePrice,
    currency: input.currency,
    priceDeltaPct,
    expectedConversionRatePct: 78,
    predictedRevenueIncreasePct: 22.4,
    factors: {
      seasonalityMultiplier: seasonality,
      demandMultiplier: demand,
      competitionFactor: 1.05,
    },
    suggestedCampaign: campaign,
  };
}
