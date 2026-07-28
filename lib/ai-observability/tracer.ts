import { LogTraceInput } from "@/lib/validations/ai-observability";

export interface TraceRecordPayload extends LogTraceInput {
  traceId: string;
  timestamp: string;
  qualityScore: number;
}

export async function captureAITraceSpan(input: LogTraceInput): Promise<TraceRecordPayload> {
  console.log("AI Observability Tracer Capturing Span for Task:", input.taskType);

  return {
    ...input,
    traceId: "tr_" + Math.random().toString(36).substring(2, 12),
    timestamp: new Date().toLocaleTimeString("tr-TR"),
    qualityScore: input.statusCode === 200 ? 98 : 40,
  };
}
