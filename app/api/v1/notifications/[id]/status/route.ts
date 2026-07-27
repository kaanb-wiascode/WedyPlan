import { NextRequest, NextResponse } from 'next/server';
import { UniversalNotificationEngine } from '@/lib/notifications/application/universal-notification.engine';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const body = await req.json();

  const success = await UniversalNotificationEngine.updateStatus(
    resolvedParams.id,
    body.status || 'READ'
  );

  if (!success) {
    return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, notificationId: resolvedParams.id, newStatus: body.status });
}