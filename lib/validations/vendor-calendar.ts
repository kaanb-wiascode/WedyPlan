import { z } from "zod";

export const eventTypeEnum = z.enum([
  "WEDDING",
  "MEETING",
  "INSTALLATION",
  "DELIVERY",
  "TASK",
]);

export const createCalendarEventSchema = z.object({
  title: z.string().min(2, "Etkinlik başlığı gereklidir"),
  eventType: eventTypeEnum,
  startDate: z.string().min(1, "Başlangıç tarihi gereklidir"),
  startTime: z.string().min(1, "Başlangıç saati gereklidir"),
  endTime: z.string().min(1, "Bitiş saati gereklidir"),
  location: z.string().optional(),
  assignedStaff: z.array(z.string()).optional(),
  assignedVehicles: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type CreateCalendarEventInput = z.infer<typeof createCalendarEventSchema>;
