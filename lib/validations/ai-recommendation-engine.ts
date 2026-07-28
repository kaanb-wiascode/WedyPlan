import { z } from "zod";

export const recommendationTypeEnum = z.enum([
  "VENDORS",
  "PACKAGES",
  "CAMPAIGNS",
  "BLOG_ARTICLES",
  "CHECKLISTS",
  "TIMELINE",
  "BUDGET",
  "WEDDING_STYLES",
]);

export const signalTypeEnum = z.enum(["BUDGET", "LOCATION", "WEDDING_DATE", "PREFERENCES", "BEHAVIOR", "HISTORY", "FAVORITES"]);

export const getRecommendationsSchema = z.object({
  entityId: z.string().min(1, "Kullanıcı/Çift ID gereklidir"),
  recommendationType: recommendationTypeEnum.default("VENDORS"),
  limit: z.number().min(1).max(20).default(6),
  city: z.string().optional().default("Bodrum"),
  maxBudget: z.number().optional().default(850000),
});

export const trackSignalSchema = z.object({
  entityId: z.string().min(1, "Kullanıcı/Çift ID gereklidir"),
  signalType: signalTypeEnum,
  targetId: z.string().min(1, "Hedef ID gereklidir"),
  actionValue: z.enum(["CLICKED", "FAVORITED", "DISMISSED"]).default("CLICKED"),
});

export type GetRecommendationsInput = z.infer<typeof getRecommendationsSchema>;
export type TrackSignalInput = z.infer<typeof trackSignalSchema>;
