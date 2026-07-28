import { z } from "zod";

export const appEnvironmentEnum = z.enum(["SANDBOX", "PRODUCTION"]);
export const appStatusEnum = z.enum(["ACTIVE", "SUSPENDED", "SANDBOX_ONLY"]);

export const createDeveloperAppSchema = z.object({
  appName: z.string().min(3, "Uygulama adı en az 3 karakter olmalıdır"),
  developerEmail: z.string().email("Geçerli bir e-posta girilmelidir"),
  environment: appEnvironmentEnum.default("SANDBOX"),
  rateLimitRpm: z.number().min(60).max(10000).default(1000),
  allowedScopes: z.array(z.string()).min(1, "En az bir yetki (Scope) seçilmelidir"),
});

export const rotateKeySchema = z.object({
  appId: z.string().min(1, "Uygulama ID gereklidir"),
  reason: z.string().min(5, "Anahtar yenileme gerekçesi zorunludur"),
});

export type CreateDeveloperAppInput = z.infer<typeof createDeveloperAppSchema>;
export type RotateKeyInput = z.infer<typeof rotateKeySchema>;
