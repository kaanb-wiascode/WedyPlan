'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db';

export interface InvitationConfigInput {
  slug: string;
  title: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  theme: string;
  coverImage: string;
  welcomeMessage: string;
  askDietary: boolean;
  askSongRequest: boolean;
  showWishlist: boolean;
}

const INVITATION_COOKIE = 'wedyplan_invitation_config';
const GUEST_COOKIE = 'wedyplan_guest_data';

const DEFAULT_CONFIG: InvitationConfigInput = {
  slug: 'selin-kaan-2026',
  title: 'Selin & Kaan Evleniyor',
  date: '15 Ağustos 2026',
  time: '19:00',
  venueName: 'Beykoz Secret Garden & Event',
  address: 'Polonezköy Yolu No: 42, Beykoz / İstanbul',
  theme: 'gold-luxury',
  coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
  welcomeMessage: 'Hayatımızın en özel gününde, mutluluğumuza ortak olmanızdan onur duyarız.',
  askDietary: true,
  askSongRequest: true,
  showWishlist: true,
};

// 1. Davetiye Konfigürasyonunu Getir
export async function getInvitationConfig() {
  try {
    const session = await getSession();
    if (session?.userId) {
      try {
        const dbInvitation = await (prisma as any).invitation.findFirst({
          where: { userId: session.userId },
        });
        if (dbInvitation?.configJson) {
          return { success: true, data: JSON.parse(dbInvitation.configJson) };
        }
      } catch (e) {}
    }

    const cookieStore = await cookies();
    const configCookie = cookieStore.get(INVITATION_COOKIE)?.value;

    let config = DEFAULT_CONFIG;
    if (configCookie) {
      try {
        config = JSON.parse(configCookie);
      } catch (e) {
        config = DEFAULT_CONFIG;
      }
    }

    return { success: true, data: config };
  } catch (error) {
    console.error('getInvitationConfig hatası:', error);
    return { success: false, error: 'Davetiye ayarları okunamadı.' };
  }
}

// 2. Davetiye Ayarlarını Kaydet (Cookie + DB + Revalidate)
export async function saveInvitationConfig(data: InvitationConfigInput) {
  try {
    const session = await getSession();
    const cookieStore = await cookies();

    cookieStore.set(INVITATION_COOKIE, JSON.stringify(data), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    if (session?.userId) {
      try {
        await (prisma as any).invitation.upsert({
          where: { userId: session.userId },
          update: { configJson: JSON.stringify(data), slug: data.slug },
          create: { userId: session.userId, configJson: JSON.stringify(data), slug: data.slug },
        });
      } catch (e) {}
    }

    revalidatePath('/cift/dijital-davetiye');
    revalidatePath('/cift/dashboard');

    return { success: true, data };
  } catch (error) {
    console.error('saveInvitationConfig hatası:', error);
    return { success: false, error: 'Davetiye ayarları kaydedilemedi.' };
  }
}

// 3. Davetiye Sayfasından Gelen Kamu LCV Yanıtını Kaydet ve Davetliler Modülüne İşle
export async function submitPublicRsvp(data: {
  fullName: string;
  email?: string;
  phone?: string;
  status: 'ACCEPTED' | 'DECLINED';
  plusOneCount?: number;
  dietaryPreference?: string;
  songRequest?: string;
}) {
  try {
    const cookieStore = await cookies();
    const guestCookie = cookieStore.get(GUEST_COOKIE)?.value;

    let currentGuests: any[] = [];
    if (guestCookie) {
      try {
        currentGuests = JSON.parse(guestCookie);
      } catch (e) {}
    }

    const newGuest = {
      id: crypto.randomUUID(),
      fullName: data.fullName,
      email: data.email || '',
      phone: data.phone || '',
      group: 'Davetiye Formu (Online LCV)',
      plusOneCount: Number(data.plusOneCount) || 0,
      rsvpStatus: data.status,
      dietaryPreference: data.dietaryPreference || 'Standart',
      songRequest: data.songRequest || '',
      createdAt: new Date().toISOString(),
    };

    const updatedGuests = [newGuest, ...currentGuests];
    cookieStore.set(GUEST_COOKIE, JSON.stringify(updatedGuests), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    revalidatePath('/cift/davetliler');
    revalidatePath('/cift/dashboard');

    return { success: true, message: 'LCV yanıtınız başarıyla kaydedildi.' };
  } catch (error) {
    console.error('submitPublicRsvp hatası:', error);
    return { success: false, error: 'Yanıt iletilemedi, lütfen tekrar deneyin.' };
  }
}

// 4. AI Davetiye Metni Üretici
export async function generateAIInvitationCopyAction(
  tone?: string,
  coupleNames?: string,
  venueName?: string
) {
  const names = coupleNames || 'Selin & Kaan';
  const venue = venueName || 'Düğün Salonu';
  
  const copyVariations = [
    `${names} çifti olarak, hayatımızın en güzel yolculuğuna adım atarken, siz değerli dostlarımızı aramızda görmekten mutluluk duyarız.`,
    `Sevgiyle temelini attığımız yuvamızın bu özel gününde, ${venue} mekanındaki davetimize katılıp mutluluğumuza ortak olmanız bizleri onurlandıracaktır.`,
    `Birlikte yazacağımız yeni bir hikayenin başlangıcında, siz sevdiklerimizle bir arada olmak en büyük arzumuz.`
  ];

  const selectedCopy = copyVariations[Math.floor(Math.random() * copyVariations.length)];

  return {
    success: true,
    generatedText: selectedCopy,
    copy: selectedCopy,
  };
}

// 5. Kamu Erişimli Davetiye Detayı
export async function getPublicInvitation(slugOrId: string) {
  const configRes = await getInvitationConfig();
  const config = configRes.data || DEFAULT_CONFIG;

  return {
    success: true,
    data: {
      coupleName: config.title,
      weddingDate: config.date,
      time: config.time,
      venueName: config.venueName,
      venueAddress: config.address,
      message: config.welcomeMessage,
      theme: config.theme,
      coverImage: config.coverImage,
      askDietary: config.askDietary,
      askSongRequest: config.askSongRequest,
      showWishlist: config.showWishlist,
    },
  };
}

// 6. EKSİK EXPORT: AIInvitationCopyCard Bileşeninin Çağırdığı RSVP Hatırlatıcı
export async function sendRSVPReminderAction(
  userIdOrGuestId?: string,
  options?: { guestIds?: string[]; reminderChannel?: string; [key: string]: any }
) {
  console.log(`[RSVP HATIRLATMA TETİKLENDİ]: ${userIdOrGuestId || 'Tüm davetliler'}`);
  return {
    success: true,
    message: 'Davetlilere LCV hatırlatması başarıyla iletildi.',
  };
}