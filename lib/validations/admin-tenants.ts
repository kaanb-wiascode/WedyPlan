import { z } from "zod";

export const tenantTypeEnum = z.enum([
  "WEDYPLAN_GLOBAL",
  "COUNTRY",
  "REGION",
  "ORGANIZATION",
  "ENTERPRISE_CUSTOMER",
  "WHITE_LABEL_PARTNER",
  "FRANCHISE",
]);

export const dbIsolationEnum = z.enum(["SHARED_SCHEMA", "ISOLATED_SCHEMA", "DEDICATED_DATABASE"]);
export const tenantStatusEnum = z.enum(["ACTIVE", "SUSPENDED", "CLONING", "ARCHIVED"]);

export const createTenantSchema = z.object({
  name: z.string().min(3, "Kiracı adı en az 3 karakter olmalıdır"),
  slug: z.string().min(2, "Slug benzersiz ve geçerli olmalıdır"),
  type: tenantTypeEnum.default("ORGANIZATION"),
  isolation: dbIsolationEnum.default("SHARED_SCHEMA"),
  subdomain: z.string().optional(),
  customDomain: z.string().optional(),
  storageLimitGb: z.number().min(10).max(10000).default(100),
  aiCreditQuota: z.number().min(1000).max(1000000).default(50000),
  defaultCurrency: z.string().default("TRY"),
});

export const triggerTenantLifecycleSchema = z.object({
  tenantId: z.string().min(1, "Kiracı ID gereklidir"),
  action: z.enum(["SUSPEND", "ACTIVATE", "CLONE", "ARCHIVE", "DELETE"]),
  reason: z.string().min(5, "İşlem gerekçesi belirtilmelidir"),
});

export type CreateTenantInput = z.infer<typeof createTenantSchema>;
export type TriggerTenantLifecycleInput = z.infer<typeof triggerTenantLifecycleSchema>;
