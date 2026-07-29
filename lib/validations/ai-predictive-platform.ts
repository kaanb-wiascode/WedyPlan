import { z } from 'zod';

export const runForecastSchema = z.object({
  metricType: z.enum([
    'REVENUE',
    'BOOKINGS',
    'MARKETPLACE_GROWTH',
    'RETENTION',
    'VENDOR_GROWTH',
    'CASH_FLOW'
  ]),
  timeframe: z.enum(['MONTHLY', 'QUARTERLY', 'ANNUAL']).default('MONTHLY'),
  horizonMonths: z.number().int().min(1).max(36).default(12),
});

export const runSimulationSchema = z.object({
  forecastId: z.string().min(1, 'Forecast ID zorunludur'),
  scenarioName: z.string().min(1, 'Senaryo adı zorunludur'),
  growthModifierPercent: z.number().min(-100).max(500), // e.g. -20 for Bear Case, +25 for Bull Case
});

export type RunForecastInput = z.infer<typeof runForecastSchema>;
export type RunSimulationInput = z.infer<typeof runSimulationSchema>;