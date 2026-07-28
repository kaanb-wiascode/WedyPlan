export interface TraceSpanItem {
  spanId: string;
  traceId: string;
  operationName: string;
  service: string;
  durationMs: number;
  status: "OK" | "ERROR";
  children?: TraceSpanItem[];
}

export function generateSampleTrace(): TraceSpanItem {
  const traceId = "tr_wedy_" + Math.random().toString(36).substring(2, 9);
  return {
    spanId: "sp_01_gateway",
    traceId,
    operationName: "POST /api/v1/marketplace/booking",
    service: "API-Gateway",
    durationMs: 128,
    status: "OK",
    children: [
      {
        spanId: "sp_02_auth",
        traceId,
        operationName: "JWT Verify & RBAC Check",
        service: "Auth-Service",
        durationMs: 12,
        status: "OK",
      },
      {
        spanId: "sp_03_db",
        traceId,
        operationName: "Prisma findUnique(VendorAvailability)",
        service: "PostgreSQL-Core",
        durationMs: 24,
        status: "OK",
      },
      {
        spanId: "sp_04_ai",
        traceId,
        operationName: "Copilot Fraud & Dynamic Pricing Inspection",
        service: "AI-Central-Brain",
        durationMs: 68,
        status: "OK",
      },
      {
        spanId: "sp_05_payment",
        traceId,
        operationName: "Iyzico Gateway Tokenize Payment",
        service: "Payment-Gateway",
        durationMs: 24,
        status: "OK",
      },
    ],
  };
}
