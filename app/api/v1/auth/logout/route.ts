import { NextRequest, NextResponse } from 'next/server';
import { getSession, deleteSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı.' },
        { status: 401 }
      );
    }

    // Audit log kaydet
    await (prisma as any).auditLog.create({
      data: {
        correlationId: crypto.randomUUID(),
        category: 'AUTHENTICATION',
        action: 'LOGOUT_SUCCESS',
        actorUserId: session.userId,
        actorRole: session.role,
        actorIpAddress: request.headers.get('x-forwarded-for') || 'unknown',
        actorUserAgent: request.headers.get('user-agent') || 'unknown',
        severity: 'INFO',
      },
    });

    // Session sil
    await deleteSession();

    // Response cookie'yi de sil
    const response = NextResponse.json({
      success: true,
      message: 'Başarıyla çıkış yapıldı.',
    });

    response.cookies.delete('wedyplan_session');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Çıkış yapılamadı.' },
      { status: 500 }
    );
  }
}
