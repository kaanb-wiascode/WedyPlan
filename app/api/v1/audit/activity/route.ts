import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseAuditService } from '@/lib/audit/application/audit-activity.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const activity = await EnterpriseAuditService.recordActivity({
      userId: body.userId || 'usr_couple_1',
      portalContext: body.portalContext || 'COUPLE',
      action: body.action,
      summary: body.summary,
      targetEntityId: body.targetEntityId
    });

    return NextResponse.json(activity);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Activity recording failed' }, { status: 400 });
  }
}