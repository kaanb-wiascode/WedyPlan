import { z } from "zod";

export const integrationCategoryEnum = z.enum([
  "ALL",
  "CALENDAR",
  "STORAGE",
  "MESSAGING_SOCIAL",
  "PAYMENTS",
  "DEVELOPER_API",
]);

export const toggleIntegrationSchema = z.object({
  integrationId: z.string().min(1, "Entegrasyon ID gereklidir"),
  connect: z.boolean(),
  credentials: z.record(z.string(), z.string()).optional(),
});

export const webhookConfigSchema = z.object({
  targetUrl: z.string().url("Geçerli bir Webhook URL'si giriniz"),
  secretKey: z.string().min(8, "Gizli anahtar en az 8 karakter olmalıdır"),
  events: z.array(z.string()).min(1, "En az bir tetikleyici olay seçiniz"),
});

export type ToggleIntegrationInput = z.infer<typeof toggleIntegrationSchema>;
export type WebhookConfigInput = z.infer<typeof webhookConfigSchema>;
