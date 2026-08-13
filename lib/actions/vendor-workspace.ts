'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth/session';
import {
  auditVendor,
  citySlugFromName,
  requireVendorContext,
  slugify,
} from '@/lib/vendor/workspace';
import { ensureThread, postThreadMessage } from '@/lib/vendor/messages';

const db = prisma as any;

function refreshVendor() {
  revalidatePath('/firma/dashboard');
  revalidatePath('/firma/vitrin');
  revalidatePath('/firma/talepler');
  revalidatePath('/firma/takvim');
  revalidatePath('/firma/sozlesmeler');
  revalidatePath('/firma/finans');
  revalidatePath('/firma/mesajlar');
  revalidatePath('/firma/degerlendirmeler');
  revalidatePath('/firma/organizasyon');
  revalidatePath('/firma/ayarlar');
  revalidatePath('/cift/messages');
  revalidatePath('/cift/firmalar');
  revalidatePath('/admin/mesaj-denetim');
  revalidatePath('/firmalar');
}

async function actor() {
  const ctx = await requireVendorContext();
  return ctx;
}

export async function saveShowcaseAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx?.showcase) return;
  const city = String(formData.get('city') || '');
  const slugInput = String(formData.get('slug') || ctx.showcase.slug);
  const slug = slugify(slugInput || ctx.vendor.businessName);
  const published = String(formData.get('published') || '') === 'true';
  const data = {
    slug,
    categorySlug: String(formData.get('categorySlug') || 'dugun-mekanlari'),
    tagline: String(formData.get('tagline') || ''),
    story: String(formData.get('story') || ''),
    contactName: String(formData.get('contactName') || ''),
    contactTitle: String(formData.get('contactTitle') || ''),
    contactPhone: String(formData.get('contactPhone') || ''),
    contactEmail: String(formData.get('contactEmail') || ''),
    instagram: String(formData.get('instagram') || ''),
    website: String(formData.get('website') || ''),
    youtube: String(formData.get('youtube') || ''),
    linkedin: String(formData.get('linkedin') || ''),
    whatsapp: String(formData.get('whatsapp') || ''),
    address: String(formData.get('address') || ''),
    city,
    district: String(formData.get('district') || ''),
    citySlug: citySlugFromName(city) || 'istanbul',
    lat: String(formData.get('lat') || '41.0082'),
    lng: String(formData.get('lng') || '28.9784'),
    transportNotes: String(formData.get('transportNotes') || ''),
    seatedCapacity: Number(formData.get('seatedCapacity') || 0),
    cocktailCapacity: Number(formData.get('cocktailCapacity') || 0),
    parking: Number(formData.get('parking') || 0),
    priceFrom: Number(formData.get('priceFrom') || 0),
    priceType: String(formData.get('priceType') || 'PACKAGE'),
    features: String(formData.get('features') || '').split(',').map((s) => s.trim()).filter(Boolean),
    usps: String(formData.get('usps') || '').split(',').map((s) => s.trim()).filter(Boolean),
    published,
    moderationStatus: published ? (ctx.vendor.status === 'APPROVED' ? 'APPROVED' : 'PENDING') : 'DRAFT',
  };
  await db.vendorShowcase.update({ where: { id: ctx.showcase.id }, data });
  await db.vendor.update({
    where: { id: ctx.vendor.id },
    data: {
      businessName: String(formData.get('businessName') || ctx.vendor.businessName),
      description: data.story,
      city: data.city,
      district: data.district,
      phone: data.contactPhone,
      website: data.website,
      instagram: data.instagram,
      whatsapp: data.whatsapp,
      address: data.address,
      categorySlug: data.categorySlug,
      slug,
    },
  }).catch(() => null);
  await auditVendor('VENDOR_SHOWCASE_SAVED', {
    actorUserId: ctx.session.userId,
    actorRole: ctx.session.role,
    targetEntity: 'VendorShowcase',
    targetEntityId: ctx.vendor.id,
    metadata: { published, slug },
  });
  refreshVendor();
}

export async function addGalleryItemAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  const url = String(formData.get('url') || '');
  if (!url) return;
  const count = await db.vendorGalleryItem.count({ where: { vendorId: ctx.vendor.id } }).catch(() => 0);
  await db.vendorGalleryItem.create({
    data: {
      vendorId: ctx.vendor.id,
      url,
      caption: String(formData.get('caption') || ''),
      isCover: count === 0,
      sortOrder: count,
    },
  });
  await auditVendor('VENDOR_GALLERY_ADDED', {
    actorUserId: ctx.session.userId,
    targetEntity: 'VendorGalleryItem',
    targetEntityId: ctx.vendor.id,
  });
  refreshVendor();
}

export async function removeGalleryItemAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  const id = String(formData.get('id') || '');
  await db.vendorGalleryItem.delete({ where: { id } }).catch(() => null);
  refreshVendor();
}

export async function saveOfferAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  const id = String(formData.get('id') || '');
  const payload = {
    vendorId: ctx.vendor.id,
    kind: String(formData.get('kind') || 'PACKAGE'),
    name: String(formData.get('name') || 'Paket'),
    description: String(formData.get('description') || ''),
    weekdayPrice: Number(formData.get('weekdayPrice') || 0),
    weekendPrice: Number(formData.get('weekendPrice') || 0),
    includes: String(formData.get('includes') || '').split(',').map((s) => s.trim()).filter(Boolean),
  };
  if (id) {
    await db.vendorServiceOffer.update({ where: { id }, data: payload });
  } else {
    await db.vendorServiceOffer.create({ data: payload });
  }
  await auditVendor('VENDOR_OFFER_SAVED', {
    actorUserId: ctx.session.userId,
    targetEntity: 'VendorServiceOffer',
    targetEntityId: ctx.vendor.id,
    metadata: { name: payload.name },
  });
  refreshVendor();
}

export async function deleteOfferAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  await db.vendorServiceOffer.delete({ where: { id: String(formData.get('id') || '') } }).catch(() => null);
  refreshVendor();
}

export async function saveCampaignAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  await db.vendorCampaign.create({
    data: {
      vendorId: ctx.vendor.id,
      title: String(formData.get('title') || 'Kampanya'),
      discount: String(formData.get('discount') || ''),
      expiry: formData.get('expiry') ? new Date(String(formData.get('expiry'))) : null,
    },
  });
  refreshVendor();
}

export async function deleteCampaignAction(formData: FormData): Promise<void> {
  await db.vendorCampaign.delete({ where: { id: String(formData.get('id') || '') } }).catch(() => null);
  refreshVendor();
}

export async function saveFaqAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  await db.vendorFaqItem.create({
    data: {
      vendorId: ctx.vendor.id,
      question: String(formData.get('question') || ''),
      answer: String(formData.get('answer') || ''),
    },
  });
  refreshVendor();
}

export async function deleteFaqAction(formData: FormData): Promise<void> {
  await db.vendorFaqItem.delete({ where: { id: String(formData.get('id') || '') } }).catch(() => null);
  refreshVendor();
}

export async function saveStaffAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  await db.vendorStaffMember.create({
    data: {
      vendorId: ctx.vendor.id,
      name: String(formData.get('name') || ''),
      role: String(formData.get('role') || 'Ekip'),
      phone: String(formData.get('phone') || ''),
      assignedEvent: String(formData.get('assignedEvent') || ''),
    },
  });
  refreshVendor();
}

export async function deleteStaffAction(formData: FormData): Promise<void> {
  await db.vendorStaffMember.delete({ where: { id: String(formData.get('id') || '') } }).catch(() => null);
  refreshVendor();
}

export async function sendLeadQuoteAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  const leadId = String(formData.get('leadId') || '');
  const amount = Number(formData.get('amount') || 0);
  const note = String(formData.get('note') || '');
  const lead = await db.marketplaceLead.findUnique({ where: { id: leadId } }).catch(() => null);
  if (!lead) return;
  await db.marketplaceLead.update({
    where: { id: leadId },
    data: { status: 'OFFER_SENT', quoteAmount: amount },
  }).catch(() => null);

  const coupleUserId = lead.coupleUserId || null;
  if (coupleUserId) {
    const thread = await ensureThread({
      vendorId: ctx.vendor.id,
      vendorUserId: ctx.vendor.userId,
      vendorName: ctx.vendor.businessName,
      coupleUserId,
      coupleNames: lead.coupleNames,
    });
    if (thread) {
      await postThreadMessage({
        conversationId: thread.conversationId,
        senderUserId: ctx.session.userId,
        body: `Teklif: ${amount.toLocaleString('tr-TR')} ₺\n${note || 'WedyPlan üzerinden iletilen resmi teklif.'}`,
      });
    }
  }

  await db.vendorDeal.create({
    data: {
      vendorId: ctx.vendor.id,
      coupleUserId: coupleUserId,
      coupleNames: lead.coupleNames,
      title: `${ctx.vendor.businessName} teklifi`,
      totalAmount: amount,
      depositAmount: Math.round(amount * 0.3),
      status: 'QUOTE_SENT',
      weddingDate: lead.weddingDate,
      guestCount: lead.guestCount || 0,
      notes: note,
      leadId,
    },
  }).then(async (deal: any) => {
    if (!deal) return;
    const titles = ['Kapora', 'Tadım / prova', 'Kurulum', 'Etkinlik günü', 'Teslim'];
    for (let i = 0; i < titles.length; i += 1) {
      await db.vendorDealMilestone.create({ data: { dealId: deal.id, title: titles[i], sortOrder: i } }).catch(() => null);
    }
  }).catch(() => null);

  await auditVendor('VENDOR_QUOTE_SENT', {
    actorUserId: ctx.session.userId,
    category: 'CONTRACT',
    targetEntity: 'MarketplaceLead',
    targetEntityId: leadId,
    metadata: { amount, coupleNames: lead.coupleNames },
  });
  refreshVendor();
}

export async function updateLeadStatusAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  await db.marketplaceLead.update({
    where: { id: String(formData.get('id') || '') },
    data: { status: String(formData.get('status') || 'PENDING') },
  }).catch(() => null);
  refreshVendor();
}

export async function saveDealAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  const id = String(formData.get('id') || '');
  const payload = {
    vendorId: ctx.vendor.id,
    coupleNames: String(formData.get('coupleNames') || ''),
    coupleUserId: String(formData.get('coupleUserId') || '') || null,
    title: String(formData.get('title') || 'Anlaşma'),
    totalAmount: Number(formData.get('totalAmount') || 0),
    depositAmount: Number(formData.get('depositAmount') || 0),
    status: String(formData.get('status') || 'DRAFT'),
    weddingDate: String(formData.get('weddingDate') || '') || null,
    guestCount: Number(formData.get('guestCount') || 0),
    notes: String(formData.get('notes') || ''),
  };
  if (id) {
    await db.vendorDeal.update({ where: { id }, data: payload });
  } else {
    const deal = await db.vendorDeal.create({ data: payload }).catch(() => null);
    if (deal) {
      const titles = ['Kapora', 'Tadım / prova', 'Kurulum', 'Etkinlik günü', 'Teslim'];
      for (let i = 0; i < titles.length; i += 1) {
        await db.vendorDealMilestone.create({ data: { dealId: deal.id, title: titles[i], sortOrder: i } }).catch(() => null);
      }
    }
  }
  await auditVendor('VENDOR_DEAL_SAVED', {
    actorUserId: ctx.session.userId,
    category: 'CONTRACT',
    targetEntity: 'VendorDeal',
    targetEntityId: ctx.vendor.id,
    metadata: { title: payload.title, status: payload.status },
  });
  refreshVendor();
}

export async function toggleMilestoneAction(formData: FormData): Promise<void> {
  const id = String(formData.get('id') || '');
  const isDone = String(formData.get('isDone') || '') === 'true';
  await db.vendorDealMilestone.update({ where: { id }, data: { isDone: !isDone } }).catch(() => null);
  refreshVendor();
}

export async function saveCalendarItemAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  const starts = String(formData.get('startsAt') || '');
  if (!starts) return;
  await db.vendorCalendarItem.create({
    data: {
      vendorId: ctx.vendor.id,
      title: String(formData.get('title') || 'Randevu'),
      coupleNames: String(formData.get('coupleNames') || ''),
      startsAt: new Date(starts),
      endsAt: formData.get('endsAt') ? new Date(String(formData.get('endsAt'))) : null,
      kind: String(formData.get('kind') || 'MEETING'),
      status: String(formData.get('status') || 'CONFIRMED'),
      note: String(formData.get('note') || ''),
    },
  });
  await auditVendor('VENDOR_CALENDAR_SAVED', {
    actorUserId: ctx.session.userId,
    targetEntity: 'VendorCalendarItem',
    targetEntityId: ctx.vendor.id,
  });
  refreshVendor();
}

export async function deleteCalendarItemAction(formData: FormData): Promise<void> {
  await db.vendorCalendarItem.delete({ where: { id: String(formData.get('id') || '') } }).catch(() => null);
  refreshVendor();
}

export async function createPaymentRequestAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  const amount = Number(formData.get('amount') || 0);
  const coupleNames = String(formData.get('coupleNames') || '');
  const paymentUrl = `https://pay.wedyplan.com/r/${Date.now().toString(36)}`;
  await db.vendorPaymentRequest.create({
    data: {
      vendorId: ctx.vendor.id,
      coupleNames,
      coupleUserId: String(formData.get('coupleUserId') || '') || null,
      description: String(formData.get('description') || 'Kapora / taksit'),
      amount,
      dueDate: String(formData.get('dueDate') || '') || null,
      paymentUrl,
      status: 'PENDING',
    },
  });
  await auditVendor('VENDOR_PAYMENT_LINK', {
    actorUserId: ctx.session.userId,
    category: 'PAYMENT',
    targetEntity: 'VendorPaymentRequest',
    targetEntityId: ctx.vendor.id,
    metadata: { amount, coupleNames },
  });
  refreshVendor();
}

export async function markPaymentPaidAction(formData: FormData): Promise<void> {
  await db.vendorPaymentRequest.update({
    where: { id: String(formData.get('id') || '') },
    data: { status: 'PAID' },
  }).catch(() => null);
  refreshVendor();
}

export async function replyReviewAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  await db.vendorReviewRecord.update({
    where: { id: String(formData.get('id') || '') },
    data: { vendorReply: String(formData.get('reply') || '') },
  }).catch(() => null);
  await auditVendor('VENDOR_REVIEW_REPLY', {
    actorUserId: ctx.session.userId,
    targetEntity: 'VendorReviewRecord',
    targetEntityId: String(formData.get('id') || ''),
  });
  refreshVendor();
}

export async function saveVendorSettingsAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  await db.vendor.update({
    where: { id: ctx.vendor.id },
    data: {
      businessName: String(formData.get('businessName') || ctx.vendor.businessName),
      phone: String(formData.get('phone') || ''),
    },
  }).catch(() => null);
  refreshVendor();
}

export async function openLeadChatAction(formData: FormData): Promise<void> {
  const ctx = await actor();
  if (!ctx) return;
  const lead = await db.marketplaceLead.findUnique({ where: { id: String(formData.get('leadId') || '') } }).catch(() => null);
  if (!lead?.coupleUserId) return;
  await ensureThread({
    vendorId: ctx.vendor.id,
    vendorUserId: ctx.vendor.userId,
    vendorName: ctx.vendor.businessName,
    coupleUserId: lead.coupleUserId,
    coupleNames: lead.coupleNames,
  });
  refreshVendor();
}

export async function submitCoupleReviewAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session?.userId || session.role !== 'COUPLE') return;
  const vendorId = String(formData.get('vendorId') || '');
  const couple = await db.couple.findFirst({ where: { userId: session.userId } }).catch(() => null);
  await db.vendorReviewRecord.create({
    data: {
      vendorId,
      coupleUserId: session.userId,
      authorName: couple ? `${couple.partnerOneName}${couple.partnerTwoName ? ` & ${couple.partnerTwoName}` : ''}` : session.email,
      rating: Number(formData.get('rating') || 5),
      comment: String(formData.get('comment') || ''),
      isPublished: true,
    },
  });
  revalidatePath('/cift/firmalar');
  revalidatePath('/firma/degerlendirmeler');
}
