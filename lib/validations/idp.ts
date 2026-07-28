import { z } from "zod";

export const serviceCategoryEnum = z.enum(["MICROSERVICE", "WORKER_JOB", "AI_AGENT", "WEB_PORTAL"]);
export const dbTypeEnum = z.enum(["POSTGRESQL", "REDIS_CACHE", "VECTOR_DB", "NONE"]);

export const provisionServiceSchema = z.object({
  serviceName: z.string().min(3, "Servis adı en az 3 karakter olmalıdır"),
  category: serviceCategoryEnum.default("MICROSERVICE"),
  ownerTeam: z.string().min(2, "Sorumlu takım zorunludur"),
  dbType: dbTypeEnum.default("POSTGRESQL"),
  enableQueue: z.boolean().default(true),
  enableStorageBucket: z.boolean().default(true),
  customDomain: z.string().optional(),
});

export type ProvisionServiceInput = z.infer<typeof provisionServiceSchema>;
