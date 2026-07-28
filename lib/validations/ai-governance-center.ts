import { z } from "zod";

export const policyCategoryEnum = z.enum([
  "PII_DATA_PRIVACY",
  "PROMPT_INJECTION_SHIELD",
  "MODEL_HALLUCINATION_GUARD",
  "USAGE_COST_LIMIT",
  "COMPLIANCE_EU_AI_ACT",
]);

export const validateAIPolicySchema = z.object({
  targetService: z.string().min(1, "Hedef AI Servisi zorunludur"),
  promptPayload: z.string().min(3, "İstem içeriği zorunludur"),
  modelName: z.string().default("claude-3-5-sonnet"),
  policyCategory: policyCategoryEnum.default("PII_DATA_PRIVACY"),
  autoBlockOnRisk: z.boolean().default(true),
});

export const enforcePolicyStatusSchema = z.object({
  policyKey: z.string().min(1),
  status: z.enum(["ENFORCED", "AUDIT_ONLY", "DISABLED"]),
});

export type ValidateAIPolicyInput = z.infer<typeof validateAIPolicySchema>;
export type EnforcePolicyStatusInput = z.infer<typeof enforcePolicyStatusSchema>;
