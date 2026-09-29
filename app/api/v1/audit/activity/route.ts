import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { EnterpriseAuditService } from '@/lib/audit/application/audit-activity.service';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
    }

    const body = await req.json();

    const activity = await EnterpriseAuditService.recordActivity({
      userId: session.userId,
      portalContext: session.portalContext || session.role,
      action: body.action,
      summary: body.summary,
      targetEntityId: body.targetEntityId,
    });

    return NextResponse.json(activity);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Aktivite kaydedilemedi.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
