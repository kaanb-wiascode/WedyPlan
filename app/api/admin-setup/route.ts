import { NextRequest, NextResponse } from 'next/server';
import { ensureSuperAdmin } from '@/lib/auth/ensure-super-admin';

export const dynamic = 'force-dynamic';

function setupSecret() {
  return process.env.ADMIN_SETUP_SECRET || process.env.JWT_SECRET || '';
}

function isAuthorized(request: NextRequest) {
  const secret = setupSecret();
  if (!secret) return false;
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;
  return token === secret;
}

export async function GET() {
  return NextResponse.json({ success: true, message: 'Admin setup endpoint hazir.' });
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ success: false, error: 'Yetkisiz.' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const email = body.email || process.env.SUPER_ADMIN_EMAIL;
    const password = body.password || process.env.SUPER_ADMIN_PASSWORD;
    const fullName = body.fullName || process.env.SUPER_ADMIN_NAME || 'WedyPlan Super Admin';

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'email ve password gerekli.' },
        { status: 400 }
      );
    }

    const user = await ensureSuperAdmin({ email, password, fullName });

    return NextResponse.json({
      success: true,
      message: 'Admin hesabi olusturuldu.',
      email: user.email,
    });
  } catch (error) {
    console.error('Admin setup error:', error);
    return NextResponse.json({ success: false, error: 'İslem basarisiz' }, { status: 500 });
  }
}
