import { z } from "zod";

export const providerKeyEnum = z.enum([
  "GOOGLE",
  "APPLE",
  "META",
  "WHATSAPP",
  "STRIPE",
  "IYZICO",
  "PAYTR",
  "CLOUDFLARE",
  "AWS",
]);

export const testConnectionSchema = z.object({
  providerKey: providerKeyEnum,
});

export const replayWebhookSchema = z.object({
  webhookLogId: z.string().min(1, "Webhook Log ID gereklidir"),
});

export const updateCredentialsSchema = z.object({
  providerKey: providerKeyEnum,
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
  environment: z.enum(["SANDBOX", "PRODUCTION"]).default("PRODUCTION"),
});

export type TestConnectionInput = z.infer<typeof testConnectionSchema>;
export type ReplayWebhookInput = z.infer<typeof replayWebhookSchema>;
export type UpdateCredentialsInput = z.infer<typeof updateCredentialsSchema>;
