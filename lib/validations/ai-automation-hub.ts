import { z } from "zod";

export const automationDomainEnum = z.enum([
  "MARKETING",
  "CRM",
  "SUPPORT",
  "FINANCE",
  "NOTIFICATIONS",
  "REPORTS",
  "CONTRACTS",
  "MARKETPLACE",
]);

export const triggerAutomationSchema = z.object({
  automationKey: z.string().min(1, "Otomasyon Key zorunludur"),
  domain: automationDomainEnum.default("CRM"),
  payloadSummary: z.string().min(3, "Payload özeti gereklidir"),
  isSimulation: z.boolean().default(true),
});

export const toggleAutomationStatusSchema = z.object({
  automationKey: z.string().min(1),
  active: z.boolean(),
});

export type TriggerAutomationInput = z.infer<typeof triggerAutomationSchema>;
export type ToggleAutomationStatusInput = z.infer<typeof toggleAutomationStatusSchema>;
