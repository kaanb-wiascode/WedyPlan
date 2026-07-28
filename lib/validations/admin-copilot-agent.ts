import { z } from "zod";

export const interactWithAdminCopilotSchema = z.object({
  adminUserId: z.string().min(1, "Yönetici ID gereklidir"),
  userMessage: z.string().min(1, "Mesaj boş olamaz"),
  targetScope: z.enum(["ALL", "VENDORS", "FINANCE", "SECURITY", "INFRASTRUCTURE"]).default("ALL"),
});

export const executeAdminActionSchema = z.object({
  actionType: z.enum([
    "APPROVE_VENDOR",
    "BLOCK_FRAUD_IP",
    "RESOLVE_SUPPORT_TICKET",
    "TRIGGER_ROLLBACK",
    "PAUSE_CAMPAIGN",
  ]),
  targetId: z.string().min(1, "Hedef ID gereklidir"),
  reason: z.string().min(5, "Eylem gerekçesi zorunludur"),
});

export type InteractWithAdminCopilotInput = z.infer<typeof interactWithAdminCopilotSchema>;
export type ExecuteAdminActionInput = z.infer<typeof executeAdminActionSchema>;
