import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { listAllowedPortals } from '@/lib/auth/portals';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 }
      );
    }

    const allowedPortals = await listAllowedPortals(session.userId, session.role);

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        userId: session.userId,
        email: session.email,
        role: session.role,
        portalContext: session.portalContext,
        allowedPortals,
      },
    });
  } catch (error) {
    console.error('Verify token error:', error);
    return NextResponse.json(
      { success: false, authenticated: false, error: 'Token doğrulanamadı.' },
      { status: 401 }
    );
  }
}
