import { cookies } from 'next/headers';
import { createToken, verifyToken, type WedyJWTPayload } from './jwt';
import { prisma } from '@/lib/db';

const COOKIE_NAME = 'wedyplan_session';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60, // 7 days
};

/**
 * Session oluştur ve cookie'ye kaydet
 */
export async function createSession(
  payload: Omit<WedyJWTPayload, 'iat' | 'exp'>
): Promise<string> {
  const token = await createToken(payload as WedyJWTPayload);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);

  return token;
}

/**
 * Session'ı doğrula
 */
export async function getSession(): Promise<WedyJWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

/**
 * Session'ı sil
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Session'ı güncelle
 */
export async function updateSession(
  payload: Partial<WedyJWTPayload>
): Promise<string | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const updatedPayload = { ...session, ...payload };
  const token = await createToken(updatedPayload as WedyJWTPayload);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);

  return token;
}

/**
 * Aktif Couple ID'sini al (Server Actions için)
 * 
 * @param coupleId - İsteğe bağlı couple ID
 * @returns Aktif couple ID veya error throw
 */
export async function getActiveCoupleId(coupleId?: string): Promise<string> {
  // Eğer coupleId geçildiyse, onu kullan
  if (coupleId) {
    return coupleId;
  }

  // Session'dan al
  const session = await getSession();

  if (!session || !session.userId) {
    throw new Error('Oturum bulunamadı. Lütfen giriş yapın.');
  }

  if (session.role !== 'COUPLE') {
    throw new Error('Bu işlem sadece çiftler tarafından yapılabilir.');
  }

  // Veritabanından çiftin ID'sini al
  try {
    const couple = await (prisma as any).couple.findUnique({
      where: { userId: session.userId },
      select: { id: true },
    });

    if (!couple) {
      throw new Error('Çift profili bulunamadı.');
    }

    return couple.id;
  } catch (error) {
    console.error('Active couple ID alınırken hata:', error);
    throw new Error('Çift bilgileri alınamadı.');
  }
}

/**
 * Aktif Vendor ID'sini al (Server Actions için)
 */
export async function getActiveVendorId(vendorId?: string): Promise<string> {
  if (vendorId) {
    return vendorId;
  }

  const session = await getSession();

  if (!session || !session.userId) {
    throw new Error('Oturum bulunamadı. Lütfen giriş yapın.');
  }

  if (session.role !== 'VENDOR') {
    throw new Error('Bu işlem sadece satıcılar tarafından yapılabilir.');
  }

  try {
    const vendor = await (prisma as any).vendor.findUnique({
      where: { userId: session.userId },
      select: { id: true },
    });

    if (!vendor) {
      throw new Error('Satıcı profili bulunamadı.');
    }

    return vendor.id;
  } catch (error) {
    console.error('Active vendor ID alınırken hata:', error);
    throw new Error('Satıcı bilgileri alınamadı.');
  }
}

/**
 * Kullanıcı bilgilerini al (Herhangi bir rol)
 */
export async function getUserInfo(): Promise<WedyJWTPayload | null> {
  return getSession();
}
