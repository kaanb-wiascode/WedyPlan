import { z } from "zod";

export const lifecycleStageEnum = z.enum([
  "DISCOVERY_EARLY",
  "VENUE_SELECTION",
  "VENDOR_BOOKING",
  "FINAL_COUNTDOWN",
  "POST_WEDDING",
]);

export const targetChannelEnum = z.enum([
  "HOMEPAGE_HERO",
  "MARKETPLACE_FEED",
  "EMAIL_CAMPAIGN",
  "PUSH_NOTIFICATION",
  "COPILOT_CHAT_RESPONSE",
]);

export const generateRecommendationsSchema = z.object({
  userId: z.string().min(1, "Kullanıcı ID zorunludur"),
  channel: targetChannelEnum.default("MARKETPLACE_FEED"),
  lifecycleStage: lifecycleStageEnum.default("VENDOR_BOOKING"),
  preferredStyle: z.string().optional(),
  budgetScopeMax: z.number().optional(),
  limit: z.number().min(1).max(20).default(5),
});

export const recordBehaviorSignalSchema = z.object({
  userId: z.string().min(1),
  signalType: z.enum(["VIEW_ITEM", "CLICK_FAVORITE", "SEARCH_KEYWORD", "BUDGET_CHANGE"]),
  targetCategory: z.string(),
  weight: z.number().min(0.1).max(1.0).default(0.5),
});

export type GenerateRecommendationsInput = z.infer<typeof generateRecommendationsSchema>;
export type RecordBehaviorSignalInput = z.infer<typeof recordBehaviorSignalSchema>;
