import { z } from "zod";

export const departmentEnum = z.enum([
  "MANAGEMENT",
  "SALES",
  "OPERATIONS",
  "KITCHEN_CATERING",
  "MEDIA_STAGE",
]);

export const roleEnum = z.enum(["ADMIN", "MANAGER", "COORDINATOR", "STAFF"]);

export const inviteEmployeeSchema = z.object({
  fullName: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  department: departmentEnum,
  role: roleEnum,
  emergencyContact: z.string().optional(),
});

export const updatePermissionsSchema = z.object({
  employeeId: z.string().min(1),
  permissions: z.array(z.string()),
});

export type InviteEmployeeInput = z.infer<typeof inviteEmployeeSchema>;
export type UpdatePermissionsInput = z.infer<typeof updatePermissionsSchema>;
