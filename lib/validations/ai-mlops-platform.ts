import { z } from 'zod';

export const datasetCreateSchema = z.object({
  name: z.string().min(2, 'Dataset adı en az 2 karakter olmalıdır'),
  version: z.string().min(1, 'Versiyon bilgisi zorunludur'),
  type: z.enum(['TRAINING', 'VALIDATION', 'TEST']),
  rowCount: z.number().int().positive(),
  featureCount: z.number().int().positive(),
  storagePath: z.string().min(1, 'Depolama yolu zorunludur'),
});

export const driftCheckSchema = z.object({
  modelId: z.string().min(1, 'Model ID zorunludur'),
  featureName: z.string().min(1, 'Feature adı zorunludur'),
  driftScore: z.number().min(0).max(1),
  threshold: z.number().min(0).max(1).default(0.25),
});

export const triggerRetrainSchema = z.object({
  modelId: z.string().min(1, 'Model ID zorunludur'),
  datasetId: z.string().min(1, 'Dataset ID zorunludur'),
  reason: z.string().min(3, 'Yeniden eğitim nedeni belirtilmelidir'),
});

export type DatasetCreateInput = z.infer<typeof datasetCreateSchema>;
export type DriftCheckInput = z.infer<typeof driftCheckSchema>;
export type TriggerRetrainInput = z.infer<typeof triggerRetrainSchema>;