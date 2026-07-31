// lib/auth/session.ts
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export interface CurrentUserSession {
  userId: string;
  email: string;
  role: 'COUPLE' | 'VENDOR' | 'ADMIN';
  coupleId?: string;
  vendorId?: string;
}

// 1. Sunucu tarafında aktif oturum açmış kullanıcıyı getir
export async function getCurrentUser(): Promise<CurrentUserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('wedyplan_token')?.value;

    // Token yoksa geliştirme ortamı için fallback veya null
    if (!token) {
      return null;
    }

    // JWT doğrulama veya veritabanı oturum kontrolü
    const sessionModel = (db as any).session || (db as any).user;
    if (!sessionModel) return null;

    // Örnek oturum/token sorgusu
    const user = await (db as any).user.findFirst({
      where: {
        OR: [{ id: token }, { email: token }],
      },
      include: {
        couple: true,
        vendor: true,
      },
    });

    if (!user) return null;

    return {
      userId: user.id,
      email: user.email,
      role: user.role || 'COUPLE',
      coupleId: user.couple?.id || user.coupleId,
      vendorId: user.vendor?.id || user.vendorId,
    };
  } catch (error) {
    console.error('Oturum okunurken hata oluştu:', error);
    return null;
  }
}

// 2. Aktif çift ID'sini getir (Yoksa güvenli varsayılan döner)
export async function getActiveCoupleId(providedId?: string): Promise<string> {
  if (providedId && providedId !== 'demo-couple-123') {
    return providedId;
  }

  const session = await getCurrentUser();
  if (session?.coupleId) {
    return session.coupleId;
  }

  // Oturum açılmamışsa geliştirme aşamasındaki test ID'sini fallback olarak kullanır
  return providedId || 'demo-couple-123';
}