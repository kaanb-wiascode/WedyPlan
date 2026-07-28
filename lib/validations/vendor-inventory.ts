import { z } from "zod";

export const assetCategoryEnum = z.enum([
  "DECORATION",
  "TABLES_CHAIRS",
  "FLOWERS",
  "LIGHTING_SOUND",
  "VEHICLES",
  "CAMRA_DRONES",
  "CONSUMABLES",
]);

export const assetStatusEnum = z.enum([
  "AVAILABLE",
  "RESERVED",
  "IN_MAINTENANCE",
  "DAMAGED",
  "OUT_OF_STOCK",
]);

export const createAssetSchema = z.object({
  title: z.string().min(2, "Varlık adı en az 2 karakter olmalıdır"),
  category: assetCategoryEnum,
  qrCode: z.string().optional(),
  totalQuantity: z.number().min(1, "Miktar en az 1 olmalıdır"),
  location: z.string().min(2, "Depo konumu seçilmelidir"),
  purchasePrice: z.number().min(0),
  status: assetStatusEnum.default("AVAILABLE"),
});

export const reportDamageSchema = z.object({
  assetId: z.string().min(1, "Varlık ID gereklidir"),
  damageDescription: z.string().min(5, "Hasar açıklaması yazılmalıdır"),
  estimatedRepairCost: z.number().min(0),
  severity: z.enum(["LOW", "MEDIUM", "CRITICAL"]),
});

export type CreateAssetInput = z.infer<typeof createAssetSchema>;
export type ReportDamageInput = z.infer<typeof reportDamageSchema>;
