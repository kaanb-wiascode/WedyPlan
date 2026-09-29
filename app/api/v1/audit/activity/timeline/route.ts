import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { EnterpriseAuditService } from '@/lib/audit/application/audit-activity.service';

export async function GET(_req: NextRequest) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
  }

  const timeline =
    await EnterpriseAuditService.getUserActivityTimeline(session.userId);

  return NextResponse.json({
    userId: session.userId,
    count: timeline.length,
    timeline,
  });
}
