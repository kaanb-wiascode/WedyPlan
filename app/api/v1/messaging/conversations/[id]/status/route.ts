import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseMessagingService } from '@/lib/messaging/application/enterprise-messaging.service';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const body = await req.json();

  const success = await EnterpriseMessagingService.updateMessageStatus(
    resolvedParams.id,
    body.status || 'READ'
  );

  if (!success) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, messageId: resolvedParams.id, status: body.status });
}