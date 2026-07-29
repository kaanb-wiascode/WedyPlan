'use server';

import { MlopsDataEngine } from '@/lib/ai-native/ai-mlops-data-engine';
import { datasetCreateSchema, driftCheckSchema, triggerRetrainSchema } from '@/lib/validations/ai-mlops-platform';
import { revalidatePath } from 'next/cache';

// Mock DB State (Prisma DB Entegrasyonu hazır altyapı)
let mockDatasets = [
  { id: 'ds-1', name: 'Wedding_Vendor_Matching_v4', version: '2.1.0', type: 'TRAINING', rowCount: 145000, featureCount: 48, qualityScore: 97.4, status: 'READY', storagePath: 's3://mlops-vault/train/v2.1.0.parquet', createdAt: new Date().toISOString() },
  { id: 'ds-2', name: 'Couple_Budget_Predictor_Val', version: '1.0.4', type: 'VALIDATION', rowCount: 22000, featureCount: 32, qualityScore: 94.8, status: 'READY', storagePath: 's3://mlops-vault/val/v1.0.4.parquet', createdAt: new Date().toISOString() },
];

let mockDriftMetrics = [
  { id: 'dr-1', modelId: 'model-vendor-match-v2', featureName: 'budget_range_preference', driftScore: 0.28, threshold: 0.20, status: 'WARNING', retrainTriggered: false, analyzedAt: new Date().toISOString() },
  { id: 'dr-2', modelId: 'model-churn-predictor-v1', featureName: 'user_activity_frequency', driftScore: 0.42, threshold: 0.25, status: 'CRITICAL', retrainTriggered: true, analyzedAt: new Date().toISOString() },
];

export async function getMlopsOverviewAction() {
  const driftAnalysis = MlopsDataEngine.analyzeDrift('model-vendor-match-v2', 125000, 0.28);
  const qualityReport = MlopsDataEngine.evaluateDatasetQuality('ds-1', 145000, 48);

  return {
    success: true,
    data: {
      datasets: mockDatasets,
      driftMetrics: mockDriftMetrics,
      driftAnalysis,
      qualityReport,
      stats: {
        totalDatasets: mockDatasets.length,
        activeModelsMonitored: 8,
        totalInferencesLogged: 1420500,
        pendingRetrainTriggers: mockDriftMetrics.filter(d => d.status === 'CRITICAL').length,
      }
    }
  };
}

export async function createDatasetAction(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    version: formData.get('version'),
    type: formData.get('type'),
    rowCount: Number(formData.get('rowCount')),
    featureCount: Number(formData.get('featureCount')),
    storagePath: formData.get('storagePath'),
  };

  const validated = datasetCreateSchema.parse(rawData);

  const newDataset = {
    id: `ds-${Date.now()}`,
    ...validated,
    qualityScore: 96.0,
    status: 'READY',
    createdAt: new Date().toISOString(),
  };

  mockDatasets.unshift(newDataset);
  revalidatePath('/admin/ai-mlops');
  return { success: true, dataset: newDataset };
}

export async function triggerRetrainingAction(modelId: string, reason: string) {
  const validated = triggerRetrainSchema.parse({ modelId, datasetId: 'ds-1', reason });
  
  mockDriftMetrics = mockDriftMetrics.map(m => 
    m.modelId === modelId ? { ...m, retrainTriggered: true, status: 'RETRAINING_SCHEDULED' } : m
  );

  revalidatePath('/admin/ai-mlops');
  return { success: true, message: `Model ${modelId} için yeniden eğitim tetiklendi. Nedeni: ${validated.reason}` };
}