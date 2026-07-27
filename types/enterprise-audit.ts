export type AuditActionCategory =
  | 'AUTHENTICATION'
  | 'PERMISSION_CHANGE'
  | 'PAYMENT'
  | 'CONTRACT'
  | 'SUBSCRIPTION'
  | 'VENDOR_UPDATE'
  | 'CUSTOMER_UPDATE'
  | 'AI_REQUEST'
  | 'MESSAGING'
  | 'DOCUMENT'
  | 'CAMPAIGN'
  | 'SUPPORT_TICKET'
  | 'SYSTEM_ERROR'
  | 'API_REQUEST';

export type AuditSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export interface RecordAuditLogDTO {
  correlationId?: string;
  category: AuditActionCategory;
  action: string;
  severity?: AuditSeverity;
  actorUserId?: string;
  actorRole?: string;
  actorIpAddress?: string;
  actorUserAgent?: string;
  targetEntity?: string;
  targetEntityId?: string;
  beforeState?: Record<string, unknown>;
  afterState?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface RecordActivityDTO {
  userId: string;
  portalContext: string;
  action: string;
  summary: string;
  targetEntityId?: string;
  ipAddress?: string;
}

export interface RecordMetricDTO {
  correlationId?: string;
  endpointPath: string;
  httpMethod: string;
  statusCode: number;
  executionMs: number;
  dbQueryTimeMs?: number;
  memoryUsageMb?: number;
}

export interface StateDiffResult {
  hasChanges: boolean;
  addedKeys: string[];
  removedKeys: string[];
  changedKeys: Record<string, { before: unknown; after: unknown }>;
}

export interface AuditLogItemDTO {
  id: string;
  correlationId: string;
  category: AuditActionCategory;
  action: string;
  severity: AuditSeverity;
  actorUserId?: string;
  targetEntity?: string;
  targetEntityId?: string;
  diff?: StateDiffResult;
  createdAt: string;
}

export interface UserActivityItemDTO {
  id: string;
  userId: string;
  portalContext: string;
  action: string;
  summary: string;
  createdAt: string;
}