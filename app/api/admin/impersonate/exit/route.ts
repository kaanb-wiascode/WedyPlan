import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { writeAdminAudit } from '@/lib/admin/audit';
import { getSession } from '@/lib/auth/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SESSION_COOKIE = 'wedyplan_session';
const RETURN_COOKIE = 'wedyplan_admin_return';
const SHADOW_COOKIE = 'wedyplan_shadow';

export async function POST() {
  const cookieStore = await cookies();
  const returnToken = cookieStore.get(RETURN_COOKIE)?.value;
  if (!returnToken) {
    return NextResponse.json({ success: false, error: 'Gölge oturumu bulunamadı.' }, { status: 400 });
  }

  const current = await getSession();
  cookieStore.set(SESSION_COOKIE, returnToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
  cookieStore.delete({ name: RETURN_COOKIE, path: '/' });
  cookieStore.delete({ name: SHADOW_COOKIE, path: '/' });

  await writeAdminAudit({
    actorUserId: current?.impersonatedBy || current?.userId,
    action: 'IMPERSONATION_ENDED',
    category: 'PERMISSION_CHANGE',
    targetEntityId: current?.userId,
  });

  return NextResponse.json({ success: true, redirectUrl: '/admin' });
}
