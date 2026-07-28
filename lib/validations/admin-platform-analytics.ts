import { z } from "zod";

export const analyticsTimeframeEnum = z.enum(["TODAY", "LAST_7_DAYS", "LAST_30_DAYS", "YTD"]);

export const createFunnelSchema = z.object({
  funnelName: z.string().min(3, "Huni adı en az 3 karakter olmalıdır"),
  steps: z.array(z.string()).min(2, "En az 2 huni adımı tanımlanmalıdır"),
  targetUserType: z.enum(["COUPLE", "VENDOR", "ALL"]).default("COUPLE"),
});

export const trackCustomEventSchema = z.object({
  eventName: z.string().min(2, "Olay adı gereklidir"),
  portal: z.enum(["PUBLIC", "COUPLE", "VENDOR", "ADMIN"]),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateFunnelInput = z.infer<typeof createFunnelSchema>;
export type TrackCustomEventInput = z.infer<typeof trackCustomEventSchema>;
