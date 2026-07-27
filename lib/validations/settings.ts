import { z } from "zod";

export const profileSettingsSchema = z.object({
  fullName: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().optional(),
  weddingRole: z.enum(["BRIDE", "GROOM", "PARTNER"]).default("BRIDE"),
  preferredLanguage: z.enum(["TR", "EN"]).default("TR"),
  preferredCurrency: z.enum(["TRY", "USD", "EUR", "GBP"]).default("TRY"),
});

export const securitySettingsSchema = z.object({
  currentPassword: z.string().min(6, "Mevcut şifrenizi giriniz"),
  newPassword: z.string().min(8, "Yeni şifre en az 8 karakter olmalıdır"),
  confirmPassword: z.string().min(8, "Şifre tekrarı uyuşmuyor"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Yeni şifreler birbiriyle eşleşmiyor",
  path: ["confirmPassword"],
});

export const notificationSettingsSchema = z.object({
  emailVendorMessages: z.boolean().default(true),
  emailPaymentReminders: z.boolean().default(true),
  whatsappRsvpUpdates: z.boolean().default(true),
  pushAiAlerts: z.boolean().default(true),
});

export type ProfileSettingsInput = z.infer<typeof profileSettingsSchema>;
export type SecuritySettingsInput = z.infer<typeof securitySettingsSchema>;
export type NotificationSettingsInput = z.infer<typeof notificationSettingsSchema>;
