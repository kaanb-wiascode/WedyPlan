import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { createToken } from '@/lib/auth/jwt';
import { getAdminSession, unauthorized } from '@/lib/admin/require-admin';
import { writeAdminAudit } from '@/lib/admin/audit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SESSION_COOKIE = 'wedyplan_session';
const RETURN_COOKIE = 'wedyplan_admin_return';
const SHADOW_COOKIE = 'wedyplan_shadow';

const cookieBase = {
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60,
};

export async function POST(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) return unauthorized();

  const body = await request.json().catch(() => ({}));
  const targetUserId = String(body.targetUserId || '');
  const portal = String(body.portal || body.targetRole || '').toUpperCase();

  if (!targetUserId || (portal !== 'COUPLE' && portal !== 'VENDOR')) {
    return NextResponse.json({ success: false, error: 'Hedef ve portal gerekli.' }, { status: 400 });
  }

  const user = await prisma.identityUser.findUnique({
    where: { id: targetUserId },
    select: { id: true, email: true, fullName: true, status: true },
  });
  if (!user) {
    return NextResponse.json({ success: false, error: 'Kullanıcı bulunamadı.' }, { status: 404 });
  }
  if (user.status !== 'ACTIVE') {
    return NextResponse.json({ success: false, error: 'Aktif olmayan hesap taklit edilemez.' }, { status: 409 });
  }

  const profile = await prisma.portalProfile.findFirst({
    where: { userId: user.id, portal: portal as 'COUPLE' | 'VENDOR' },
  });
  if (!profile) {
    return NextResponse.json(
      { success: false, error: 'Hedef kullanıcının bu portala erişimi yok.' },
      { status: 409 },
    );
  }

  if (portal === 'COUPLE') {
    const couple = await prisma.couple.findFirst({
      where: { userId: user.id },
      select: { id: true },
    });
    if (!couple) {
      return NextResponse.json(
        { success: false, error: 'Hedef kullanıcının çift profili bulunamadı.' },
        { status: 409 },
      );
    }
  }

  if (portal === 'VENDOR') {
    const vendor = await prisma.vendor.findFirst({
      where: { userId: user.id },
      select: { id: true },
    });
    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Hedef kullanıcının satıcı profili bulunamadı.' },
        { status: 409 },
      );
    }
  }

  const cookieStore = await cookies();
  const currentSession = cookieStore.get(SESSION_COOKIE)?.value;
  if (currentSession) {
    cookieStore.set(RETURN_COOKIE, currentSession, { ...cookieBase, httpOnly: true });
  }

  const token = await createToken({
    userId: user.id,
    email: user.email,
    role: portal as 'COUPLE' | 'VENDOR',
    portalContext: portal,
    impersonatedBy: admin.userId,
  });
  cookieStore.set(SESSION_COOKIE, token, { ...cookieBase, httpOnly: true });
  cookieStore.set(
    SHADOW_COOKIE,
    JSON.stringify({ name: user.fullName, role: portal, email: user.email }),
    { ...cookieBase, httpOnly: false }
  );

  await writeAdminAudit({
    actorUserId: admin.userId,
    action: 'IMPERSONATION_STARTED',
    category: 'PERMISSION_CHANGE',
    targetEntity: portal === 'VENDOR' ? 'Vendor' : 'Couple',
    targetEntityId: user.id,
    ip: request.headers.get('x-forwarded-for'),
    userAgent: request.headers.get('user-agent'),
    metadata: { email: user.email, portal },
  });

  return NextResponse.json({
    success: true,
    redirectUrl: portal === 'VENDOR' ? '/firma/dashboard' : '/cift/dashboard',
  });
}
