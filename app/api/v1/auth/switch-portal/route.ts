import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from '@/lib/auth/session';
import {
  isSwitchablePortal,
  listAllowedPortals,
  redirectForPortal,
} from '@/lib/auth/portals';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı.' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const portal = body?.portal;

    if (!isSwitchablePortal(portal)) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz panel.' },
        { status: 400 }
      );
    }

    const allowedPortals = await listAllowedPortals(session.userId, session.role);
    if (!allowedPortals.includes(portal)) {
      return NextResponse.json(
        { success: false, error: 'Bu panele geçiş yetkiniz yok.' },
        { status: 403 }
      );
    }

    await updateSession({
      role: portal,
      portalContext: portal,
    });

    return NextResponse.json({
      success: true,
      portal,
      redirectUrl: redirectForPortal(portal),
    });
  } catch (error) {
    console.error('Switch portal error:', error);
    return NextResponse.json(
      { success: false, error: 'Panel değiştirilemedi.' },
      { status: 500 }
    );
  }
}
