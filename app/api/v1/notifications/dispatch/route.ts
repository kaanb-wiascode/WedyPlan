import { NextRequest, NextResponse } from 'next/server';
import { UniversalNotificationEngine } from '@/lib/notifications/application/universal-notification.engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const results = await UniversalNotificationEngine.dispatch({
      userId: body.userId,
      templateCode: body.templateCode || 'OFFER_RECEIVED',
      category: body.category || 'OFFERS',
      channels: body.channels || ['IN_APP', 'EMAIL'],
      priority: body.priority || 'NORMAL',
      locale: body.locale || 'tr',
      variables: body.variables || { fullName: 'Selin Arslan', amount: 150000, vendorName: 'Luxe Kır Bahçesi' },
      recipients: body.recipients || { email: 'selin@wedyplan.com' }
    });

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Dispatch failed' }, { status: 400 });
  }
}