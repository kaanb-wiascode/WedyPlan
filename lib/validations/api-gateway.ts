import { z } from "zod";

export const gatewayAuthLevelEnum = z.enum(["PUBLIC", "OAUTH2_JWT", "API_KEY", "MUTUAL_TLS"]);
export const apiVersionEnum = z.enum(["V1", "V2", "V3_BETA"]);

export const updateGatewayRouteSchema = z.object({
  routePath: z.string().min(1, "Rota path zorunludur"),
  upstreamUrl: z.string().min(1, "Upstream URL zorunludur"),
  version: apiVersionEnum.default("V1"),
  authLevel: gatewayAuthLevelEnum.default("OAUTH2_JWT"),
  rateLimitPerMin: z.number().min(10).max(100000).default(1000),
  cacheTtlSeconds: z.number().default(60),
});

export const updateRateLimitSchema = z.object({
  clientTier: z.enum(["FREE_TIER", "VENDOR_PRO", "ENTERPRISE_PARTNER"]),
  requestsPerMinute: z.number().min(60).max(1000000),
});

export type UpdateGatewayRouteInput = z.infer<typeof updateGatewayRouteSchema>;
export type UpdateRateLimitInput = z.infer<typeof updateRateLimitSchema>;
