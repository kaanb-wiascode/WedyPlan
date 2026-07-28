import { z } from "zod";

export const channelEnum = z.enum(["EMAIL", "SMS", "WHATSAPP", "PUSH", "BROWSER", "IN_APP"]);

export const saveTemplateSchema = z.object({
  code: z.string().min(2, "Şablon kodu gereklidir"),
  channel: channelEnum,
  subject: z.string().min(2, "Başlık alanı gereklidir"),
  body: z.string().min(5, "Mesaj metni gereklidir"),
  variables: z.array(z.string()).default([]),
});

export const retryFailuresSchema = z.object({
  channel: channelEnum.optional(),
  failedLogIds: z.array(z.string()).min(1, "En az bir hatalı kayıt seçilmelidir"),
});

export const testNotificationSchema = z.object({
  channel: channelEnum,
  recipient: z.string().min(3, "Alıcı e-posta/telefon/token girilmelidir"),
  messageText: z.string().min(2, "Test mesajı girilmelidir"),
});

export type SaveTemplateInput = z.infer<typeof saveTemplateSchema>;
export type RetryFailuresInput = z.infer<typeof retryFailuresSchema>;
export type TestNotificationInput = z.infer<typeof testNotificationSchema>;
