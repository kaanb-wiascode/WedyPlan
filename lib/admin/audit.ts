import { prisma } from '@/lib/db';

type AuditInput = {
  actorUserId?: string | null;
  actorRole?: string | null;
  action: string;
  category?:
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
  targetEntity?: string;
  targetEntityId?: string;
  metadata?: Record<string, unknown>;
  ip?: string | null;
  userAgent?: string | null;
};

export async function writeAdminAudit(input: AuditInput) {
  try {
    await prisma.auditLog.create({
      data: {
        correlationId: crypto.randomUUID(),
        category: input.category || 'API_REQUEST',
        action: input.action,
        severity: 'INFO',
        actorUserId: input.actorUserId || undefined,
        actorRole: input.actorRole || 'ADMIN',
        actorIpAddress: input.ip || undefined,
        actorUserAgent: input.userAgent || undefined,
        targetEntity: input.targetEntity,
        targetEntityId: input.targetEntityId,
        metadata: input.metadata as object | undefined,
      },
    });
  } catch (error) {
    console.warn('Admin audit yazılamadı:', error);
  }
}
