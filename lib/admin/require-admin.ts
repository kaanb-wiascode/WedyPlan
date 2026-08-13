import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import type { WedyJWTPayload } from '@/lib/auth/jwt';

export async function requireAdmin(): Promise<WedyJWTPayload> {
  const session = await getSession();
  if (!session?.userId || session.role !== 'ADMIN') {
    redirect('/giris');
  }
  return session;
}

export async function getAdminSession(): Promise<WedyJWTPayload | null> {
  const session = await getSession();
  if (!session?.userId || session.role !== 'ADMIN') return null;
  return session;
}

export function unauthorized() {
  return NextResponse.json({ success: false, error: 'Yetkisiz.' }, { status: 401 });
}
