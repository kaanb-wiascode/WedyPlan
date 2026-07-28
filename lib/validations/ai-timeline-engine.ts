import { z } from "zod";

export const timelineTypeEnum = z.enum([
  "WEDDING_DAY_SCHEDULE",
  "FULL_PREPARATION_ROADMAP",
  "VENDOR_COORDINATION_FLOW",
]);

export const generateTimelineSchema = z.object({
  weddingDate: z.string().min(1, "Düğün tarihi gereklidir"),
  startTime: z.string().default("10:00"),
  endTime: z.string().default("24:00"),
  guestCount: z.number().min(10).default(200),
  locationType: z.enum(["OUTDOOR_GARDEN", "BALLROOM", "DESTINATION_BEACH"]).default("OUTDOOR_GARDEN"),
  timelineType: timelineTypeEnum.default("WEDDING_DAY_SCHEDULE"),
});

export const predictTimelineDelaySchema = z.object({
  currentDelayedTaskId: z.string().min(1),
  delayMinutes: z.number().min(5).max(180),
  autoReschedule: z.boolean().default(true),
});

export type GenerateTimelineInput = z.infer<typeof generateTimelineSchema>;
export type PredictTimelineDelayInput = z.infer<typeof predictTimelineDelaySchema>;
