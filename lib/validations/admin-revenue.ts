import { z } from "zod";

export const timeframeEnum = z.enum(["THIS_MONTH", "THIS_QUARTER", "THIS_YEAR", "LAST_12_MONTHS"]);
export const scenarioEnum = z.enum(["CONSERVATIVE", "REALISTIC", "AGGRESSIVE"]);

export const runForecastScenarioSchema = z.object({
  timeframe: timeframeEnum,
  scenario: scenarioEnum,
  simulatedChurnChange: z.number().min(-50).max(50).default(0),
  simulatedPriceIncrease: z.number().min(0).max(100).default(0),
});

export type RunForecastScenarioInput = z.infer<typeof runForecastScenarioSchema>;
