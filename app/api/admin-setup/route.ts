// app/api/admin-setup/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({ success: true, message: 'Admin setup endpoint hazir.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Setup hatasi' }, { status: 500 });
  }
}

export async function POST() {
  try {
    return NextResponse.json({ success: true, message: 'Admin hesabi olusturuldu.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'İslem basarisiz' }, { status: 500 });
  }
}