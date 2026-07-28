import { z } from "zod";

export const policyScopeEnum = z.enum(["ROLE_BASED", "TENANT_BASED", "COUNTRY_BASED", "AGE_BASED"]);
export const threatTypeEnum = z.enum(["PROMPT_INJECTION", "JAILBREAK_ATTEMPT", "PII_LEAK_RISK", "UNSAFE_OUTPUT", "RATE_LIMIT_EXCEEDED"]);

export const evaluateGuardrailSchema = z.object({
  promptText: z.string().min(1, "Prompt metni gereklidir"),
  callerPortal: z.enum(["COUPLE", "VENDOR", "PUBLIC", "ADMIN"]).default("COUPLE"),
  userRole: z.string().default("GUEST"),
  countryCode: z.string().default("TR"),
  direction: z.enum(["INPUT", "OUTPUT"]).default("INPUT"),
});

export const updatePolicySchema = z.object({
  policyId: z.string().min(1, "Politika ID gereklidir"),
  scope: policyScopeEnum,
  enablePromptInjectionGuard: z.boolean(),
  enablePiiMasking: z.boolean(),
  enableModeration: z.boolean(),
  rateLimitRpm: z.number().min(10).max(1000).default(60),
});

export type EvaluateGuardrailInput = z.infer<typeof evaluateGuardrailSchema>;
export type UpdatePolicyInput = z.infer<typeof updatePolicySchema>;
