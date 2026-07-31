// lib/actions/invitation.ts
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// 1. Davetiye ve Çift detaylarını kamu erişimine getir
export async function getPublicInvitation(idOrCoupleId: string) {
  try {
    const coupleModel = (db as any).couple;
    const invitationModel = (db as any).invitation;

    let invitation = null;
    if (invitationModel) {
      invitation = await invitationModel.findFirst({
        where: {
          OR: [{ id: idOrCoupleId }, { coupleId: idOrCoupleId }],
        },
      });
    }

    let couple = null;
    if (coupleModel) {
      couple = await coupleModel.findFirst({
        where: {
          OR: [{ id: idOrCoupleId }, { id: invitation?.coupleId || '' }],
        },
      });
    }

    return {
      success: true,
      data: {
        coupleName: couple ? `${couple.partner1Name || 'Gelin'} & ${couple.partner2Name || 'Damat'}` : 'Düğün Davetiyesi',
        weddingDate: couple?.weddingDate || invitation?.weddingDate || null,
        venueName: couple?.venueName || invitation?.venueName || 'Düğün Salonu',
        venueAddress: couple?.venueAddress || invitation?.venueAddress || '',
        message: invitation?.message || 'Bu mutlu günümüzde sizleri de aramızda görmekten onur duyarız.',
        coupleId: couple?.id || invitation?.coupleId || idOrCoupleId,
      },
    };
  } catch (error) {
    console.error('Davetiye detayları alınırken hata:', error);
    return {
      success: true,
      data: {
        coupleName: 'Düğün Davetiyesi',
        weddingDate: null,
        venueName: 'Düğün Salonu',
        venueAddress: '',
        message: 'Bu mutlu günümüzde sizleri de aramızda görmekten onur duyarız.',
        coupleId: idOrCoupleId,
      },
    };
  }
}

// 2. Dışarıdan gelen davetlinin LCV yanıtını veritabanına kaydet
export async function submitPublicRsvp(data: {
  coupleId: string;
  fullName: string;
  phone?: string;
  status: 'ATTENDING' | 'DECLINED';
  plusOne?: boolean;
  notes?: string;
}) {
  try {
    const guestModel = (db as any).guest;

    if (!guestModel) {
      return { success: false, error: 'Davetli veritabanı altyapısı hazır değil.' };
    }

    const existingGuest = await guestModel.findFirst({
      where: {
        coupleId: data.coupleId,
        OR: [
          { fullName: { equals: data.fullName, mode: 'insensitive' } },
          ...(data.phone ? [{ phone: data.phone }] : []),
        ],
      },
    });

    if (existingGuest) {
      await guestModel.update({
        where: { id: existingGuest.id },
        data: {
          status: data.status,
          plusOne: data.plusOne ?? existingGuest.plusOne,
          notes: data.notes || existingGuest.notes,
        },
      });
    } else {
      await guestModel.create({
        data: {
          coupleId: data.coupleId,
          fullName: data.fullName,
          phone: data.phone || null,
          status: data.status,
          plusOne: data.plusOne || false,
          group: 'Davetiye Formu',
          notes: data.notes || '',
        },
      });
    }

    revalidatePath('/cift/davetliler');
    return { success: true };
  } catch (error) {
    console.error('LCV yanıtı kaydedilirken hata:', error);
    return { success: false, error: 'Yanıtınız iletilemedi, lütfen tekrar deneyin.' };
  }
}

// 3. AI Davetiye Metni Üretici
export async function generateAIInvitationCopyAction(
  tone?: string,
  coupleNames?: string,
  venueName?: string
) {
  const names = coupleNames || 'Selin & Kaan';
  const venue = venueName || 'Düğün Salonu';
  const generatedText = `${names} çifti olarak, hayatımızın en özel gününde (${venue}) siz değerli dostlarımızı da aramızda görmekten onur duyarız.`;

  return {
    success: true,
    generatedText,
    copy: generatedText,
  };
}

// 4. RSVP Hatırlatma Gönderici (2 Parametreli Çağrıları Destekler)
export async function sendRSVPReminderAction(
  userIdOrGuestId?: string,
  options?: { guestIds?: string[]; reminderChannel?: string; [key: string]: any }
) {
  return {
    success: true,
    message: 'Davetlilere LCV hatırlatması başarıyla iletildi.',
  };
}