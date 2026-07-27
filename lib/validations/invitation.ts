import { z } from "zod";

export const digitalInvitationSchema = z.object({
  title: z.string().min(2, "Davetiye başlığı gereklidir"),
  coupleNames: z.string().min(3, "Çift isimleri girilmelidir"),
  eventDate: z.string().min(1, "Düğün tarihi seçilmelidir"),
  eventTime: z.string().min(1, "Etkinlik saati girilmelidir"),
  venueName: z.string().min(2, "Mekan adı belirtilmelidir"),
  rsvpDeadline: z.string().min(1, "LCV son tarihi gereklidir"),
  themeTone: z.enum(["ROMANTIC", "LUXURY", "BOHEMIAN", "HUMOROUS", "TRADITIONAL"]).default("ROMANTIC"),
  invitationText: z.string().min(10, "Davetiye metni en az 10 karakter olmalıdır"),
});

export const sendReminderSchema = z.object({
  guestIds: z.array(z.string()).min(1, "En az bir konuk seçilmelidir"),
  reminderChannel: z.enum(["WHATSAPP", "SMS", "EMAIL"]).default("WHATSAPP"),
  customMessage: z.string().optional(),
});

export type DigitalInvitationInput = z.infer<typeof digitalInvitationSchema>;
export type SendReminderInput = z.infer<typeof sendReminderSchema>;
