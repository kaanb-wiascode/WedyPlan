'use server';

import { DataSharingEngine } from '@/lib/ai-native/ai-data-sharing-engine';
import { createDataSharePolicySchema } from '@/lib/validations/ai-data-sharing';
import { revalidatePath } from 'next/cache';

// Mock Kurumsal Veri Paylaşım Politikaları
let mockSharePolicies = [
  {
    id: 'pol-1',
    name: 'Partner_Vendor_Analytics_Share',
    targetType: 'PARTNER_VENDOR',
    targetIdentifier: 'PARTNER_PREMIUM_VENDORS',
    dataScope: 'ANALYTICS_READ_ONLY',
    sensitivityLevel: 'INTERNAL',
    status: 'ACTIVE',
    hasDataContract: true,
    expiresAt: '2027-12-31',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pol-2',
    name: 'External_Bi_Export_Api',
    targetType: 'EXTERNAL_API',
    targetIdentifier: 'BI_CONNECTOR_SYS',
    dataScope: 'TRANSACTIONS_PARTIAL',
    sensitivityLevel: 'SENSITIVE',
    status: 'ACTIVE',
    hasDataContract: false,
    expiresAt: '2026-11-30',
    createdAt: new Date().toISOString(),
  },
];

let mockAuditLogs = [
  { id: 'log-101', policyId: 'pol-1', accessorId: 'vendor_partner_88', actionType: 'EXPORT_CSV', recordsAccessed: 4500, riskScore: 22, sensitiveDataFlag: false, ipAddress: '192.168.1.45', timestamp: new Date().toISOString() },
  { id: 'log-102', policyId: 'pol-2', accessorId: 'api_ext_sys', actionType: 'API_QUERY', recordsAccessed: 18200, riskScore: 68, sensitiveDataFlag: true, ipAddress: '10.0.4.12', timestamp: new Date().toISOString() },
];

export async function getDataSharingOverviewAction() {
  const riskAssessments = mockSharePolicies.map(p =>
    DataSharingEngine.analyzeSharingRisk(p.name, p.targetType, p.sensitivityLevel, p.hasDataContract)
  );

  return {
    success: true,
    data: {
      policies: mockSharePolicies,
      auditLogs: mockAuditLogs,
      riskAssessments,
      stats: {
        activePoliciesCount: mockSharePolicies.filter(p => p.status === 'ACTIVE').length,
        totalRecordsExported: 1250000,
        highRiskSharesCount: riskAssessments.filter(r => r.riskLevel === 'HIGH' || r.riskLevel === 'CRITICAL').length,
        activeContractsCount: mockSharePolicies.filter(p => p.hasDataContract).length,
      }
    }
  };
}

export async function createDataSharePolicyAction(formData: FormData) {
  const rawData = {
    name: String(formData.get('name') || ''),
    targetType: String(formData.get('targetType') || ''),
    targetIdentifier: String(formData.get('targetIdentifier') || ''),
    dataScope: String(formData.get('dataScope') || ''),
    sensitivityLevel: String(formData.get('sensitivityLevel') || ''),
    hasDataContract: formData.get('hasDataContract') === 'true',
  };

  const validated = createDataSharePolicySchema.parse(rawData);

  const newPolicy = {
    id: `pol-${Date.now()}`,
    ...validated,
    expiresAt: validated.expiresAt || '',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  };

  mockSharePolicies.unshift(newPolicy);
  revalidatePath('/admin/ai-data-sharing');
  return { success: true, policy: newPolicy };
}