import { z } from "zod";

export const customerSegmentEnum = z.enum([
  "ALL",
  "PROSPECT",
  "ACTIVE_COUPLE",
  "PAST_CUSTOMER",
  "VIP",
  "BLACK_LIST",
]);

export const updateCustomerSegmentSchema = z.object({
  customerId: z.string().min(1, "Müşteri ID gereklidir"),
  segment: customerSegmentEnum,
});

export const addCustomerNoteTaskSchema = z.object({
  customerId: z.string().min(1),
  title: z.string().min(2, "Başlık gereklidir"),
  type: z.enum(["NOTE", "TASK", "REMINDER"]).default("NOTE"),
  dueDate: z.string().optional(),
});

export type UpdateCustomerSegmentInput = z.infer<typeof updateCustomerSegmentSchema>;
export type AddCustomerNoteTaskInput = z.infer<typeof addCustomerNoteTaskSchema>;
