import { cookies } from 'next/headers';
import { createToken, verifyToken, type WedyJWTPayload } from './jwt';
import { prisma } from '@/lib/db';

const COOKIE_NAME = 'wedyplan_session';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60, // 7 gün
  path: '/', // Çerezin tüm sitede geçerli olması için şart
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
 * Session'ı sil (Tüm yollardan temizler)
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: COOKIE_NAME,
    path: '/',
  });
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
 * Aktif Couple ID'sini al (Sessiz Onarımlı Yapı)
 * 
 * @param coupleId - İsteğe bağlı couple ID
 * @returns Aktif couple ID veya otomatik oluşturulan couple ID
 */
export async function getActiveCoupleId(coupleId?: string): Promise<string> {
  const session = await getSession();

  if (!session || !session.userId) {
    throw new Error('Oturum bulunamadı. Lütfen giriş yapın.');
  }

  if (session.role !== 'COUPLE') {
    throw new Error('Bu işlem sadece çiftler tarafından yapılabilir.');
  }

  try {
    if (coupleId) {
      const ownedCouple = await prisma.couple.findFirst({
        where: { id: coupleId, userId: session.userId },
        select: { id: true },
      });

      if (!ownedCouple) {
        throw new Error('Bu çift kaydına erişim yetkiniz yok.');
      }

      return ownedCouple.id;
    }

    let couple = await prisma.couple.findFirst({
      where: { userId: session.userId },
      select: { id: true },
    });

    if (!couple) {
      couple = await prisma.couple.create({
        data: {
          userId: session.userId,
          partnerOneName: 'Çift',
        },
        select: { id: true },
      });
    }

    return couple.id;
  } catch (error) {
    console.error('Active couple ID alınırken hata:', error);
    throw new Error('Çift bilgileri alınamadı.');
  }
}

/**
 * Aktif Vendor ID'sini al (Sessiz Onarımlı Yapı)
 */
export async function getActiveVendorId(vendorId?: string): Promise<string> {
  const session = await getSession();

  if (!session || !session.userId) {
    throw new Error('Oturum bulunamadı. Lütfen giriş yapın.');
  }

  if (session.role !== 'VENDOR') {
    throw new Error('Bu işlem sadece satıcılar tarafından yapılabilir.');
  }

  try {
    if (vendorId) {
      const ownedVendor = await prisma.vendor.findFirst({
        where: { id: vendorId, userId: session.userId },
        select: { id: true },
      });

      if (!ownedVendor) {
        throw new Error('Bu satıcı kaydına erişim yetkiniz yok.');
      }

      return ownedVendor.id;
    }

    let vendor = await prisma.vendor.findFirst({
      where: { userId: session.userId },
      select: { id: true },
    });

    if (!vendor) {
      vendor = await prisma.vendor.create({
        data: {
          userId: session.userId,
          businessName: 'Satıcı Hizmeti',
          businessCategory: 'OTHER',
        },
        select: { id: true },
      });
    }

    return vendor.id;
  } catch (error) {
    console.error('Active vendor ID alınırken hata:', error);
    throw new Error('Satıcı bilgileri alınamadı.');
  }
}

/**
 * Kullanıcı bilgilerini al
 */
export async function getUserInfo(): Promise<WedyJWTPayload | null> {
  return getSession();
}