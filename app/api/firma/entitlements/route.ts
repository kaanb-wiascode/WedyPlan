import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getVendorEntitlements } from '@/lib/ops/data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session?.userId) return NextResponse.json({ success: false }, { status: 401 });
  const data = await getVendorEntitlements(session.userId);
  return NextResponse.json({ success: true, data });
}
