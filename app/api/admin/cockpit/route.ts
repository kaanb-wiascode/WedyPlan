import { NextResponse } from 'next/server';
import { getAdminSession, unauthorized } from '@/lib/admin/require-admin';
import { getCockpitSnapshot } from '@/lib/admin/cockpit-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) return unauthorized();

  const snapshot = await getCockpitSnapshot();
  return NextResponse.json({ success: true, data: snapshot });
}
