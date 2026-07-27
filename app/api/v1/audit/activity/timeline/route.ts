import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseAuditService } from '@/lib/audit/application/audit-activity.service';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId') || 'usr_couple_1';

  const timeline = await EnterpriseAuditService.getUserActivityTimeline(userId);

  return NextResponse.json({ userId, count: timeline.length, timeline });
}