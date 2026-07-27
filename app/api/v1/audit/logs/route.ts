import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseAuditService } from '@/lib/audit/application/audit-activity.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const auditLog = await EnterpriseAuditService.recordAudit({
      category: body.category || 'AUTHENTICATION',
      action: body.action,
      severity: body.severity || 'INFO',
      actorUserId: body.actorUserId,
      actorIpAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      targetEntity: body.targetEntity,
      targetEntityId: body.targetEntityId,
      beforeState: body.beforeState,
      afterState: body.afterState
    });

    return NextResponse.json(auditLog);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Audit log recording failed' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId') || undefined;
  const category = req.nextUrl.searchParams.get('category') || undefined;

  const logs = await EnterpriseAuditService.getAuditLogs(userId, category);

  return NextResponse.json({ count: logs.length, logs });
}