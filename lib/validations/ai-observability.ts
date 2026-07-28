import { z } from "zod";

export const feedbackTypeEnum = z.enum(["THUMBS_UP", "THUMBS_DOWN", "HALLUCINATION_REPORTED"]);

export const logTraceSchema = z.object({
  callerPortal: z.enum(["COUPLE", "VENDOR", "PUBLIC", "ADMIN"]).default("COUPLE"),
  taskType: z.string().min(1, "Görev türü gereklidir"),
  provider: z.string().min(1, "Sağlayıcı gereklidir"),
  model: z.string().min(1, "Model gereklidir"),
  promptTokens: z.number().default(0),
  completionTokens: z.number().default(0),
  totalCostUsd: z.number().default(0),
  latencyMs: z.number().default(0),
  statusCode: z.number().default(200),
});

export const submitFeedbackSchema = z.object({
  traceId: z.string().min(1, "Trace ID gereklidir"),
  feedbackType: feedbackTypeEnum,
  userComment: z.string().optional(),
});

export type LogTraceInput = z.infer<typeof logTraceSchema>;
export type SubmitFeedbackInput = z.infer<typeof submitFeedbackSchema>;
