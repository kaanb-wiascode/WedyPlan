import { z } from "zod";

export const logLevelEnum = z.enum(["INFO", "WARN", "ERROR", "FATAL", "SECURITY_AUDIT"]);

export const recordTelemetryLogSchema = z.object({
  serviceName: z.string().min(1, "Servis adı zorunludur"),
  logLevel: logLevelEnum.default("INFO"),
  message: z.string().min(1, "Log mesajı zorunludur"),
  traceId: z.string().optional(),
  context: z.record(z.string(), z.any()).optional(),
});

export const createAlertRuleSchema = z.object({
  ruleName: z.string().min(2, "Kural adı en az 2 karakter olmalıdır"),
  targetMetric: z.string().min(1, "Hedef metrik zorunludur"),
  thresholdValue: z.number(),
  comparison: z.enum(["GREATER_THAN", "LESS_THAN", "EQUALS"]).default("GREATER_THAN"),
  channel: z.enum(["SLACK", "EMAIL", "PAGERDUTY", "OPSGENIE", "SMS"]).default("SLACK"),
  recipient: z.string().min(1, "Bildirim adresi zorunludur"),
});

export type RecordTelemetryLogInput = z.infer<typeof recordTelemetryLogSchema>;
export type CreateAlertRuleInput = z.infer<typeof createAlertRuleSchema>;
