import { z } from "zod";

export const resourceTypeEnum = z.enum([
  "SERVER",
  "CONTAINER",
  "DATABASE_POSTGRES",
  "REDIS_CACHE",
  "QUEUE_BULLMQ",
  "STORAGE_S3",
  "CDN_CLOUDFLARE",
  "LOAD_BALANCER",
  "DNS_HEALTH",
  "SSL_CERTIFICATE",
  "BACKUP_JOB",
]);

export const nodeActionEnum = z.enum(["RESTART", "FLUSH_CACHE", "TRIGGER_BACKUP", "PURGE_CDN"]);

export const triggerNodeActionSchema = z.object({
  nodeId: z.string().min(1, "Kaynak ID gereklidir"),
  action: nodeActionEnum,
  reason: z.string().min(5, "İşlem gerekçesi açıklanmalıdır"),
});

export const scaleResourceSchema = z.object({
  nodeId: z.string().min(1, "Kaynak ID gereklidir"),
  targetReplicaCount: z.number().min(1).max(32).default(2),
  targetRamGb: z.number().min(1).max(128).default(8),
});

export type TriggerNodeActionInput = z.infer<typeof triggerNodeActionSchema>;
export type ScaleResourceInput = z.infer<typeof scaleResourceSchema>;
