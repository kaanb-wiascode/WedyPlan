import { prisma } from '@/lib/db';
import type { Prisma, VendorShowcase } from '@prisma/client';
import { getSession } from '@/lib/auth/session';
import { writeAdminAudit } from '@/lib/admin/audit';
import { getCategory, getCity } from '@/lib/catalog/taxonomy';
import type { CatalogMenu, CatalogReview, CatalogVendor } from '@/lib/catalog/listings';


function slugify(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .replaceAll('ı', 'i')
    .replaceAll('ğ', 'g')
    .replaceAll('ü', 'u')
    .replaceAll('ş', 's')
    .replaceAll('ö', 'o')
    .replaceAll('ç', 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72) || `firma-${Date.now().toString(36)}`;
}

export async function auditVendor(action: string, input: {
  actorUserId?: string | null;
  actorRole?: string | null;
  targetEntity?: string;
  targetEntityId?: string;
  metadata?: Record<string, unknown>;
  category?: 'VENDOR_UPDATE' | 'MESSAGING' | 'CONTRACT' | 'PAYMENT' | 'DOCUMENT';
}) {
  await writeAdminAudit({
    actorUserId: input.actorUserId,
    actorRole: input.actorRole || 'VENDOR',
    action,
    category: input.category || 'VENDOR_UPDATE',
    targetEntity: input.targetEntity,
    targetEntityId: input.targetEntityId,
    metadata: input.metadata,
  });
}

export async function requireVendorContext() {
  const session = await getSession();
  if (!session?.userId) return null;
  if (session.role !== 'VENDOR' && session.role !== 'ADMIN') return null;

  let vendor = await prisma.vendor.findFirst({ where: { userId: session.userId } }).catch(() => null);
  if (!vendor && session.role === 'VENDOR') {
    const user = await prisma.identityUser.findUnique({ where: { id: session.userId } }).catch(() => null);
    vendor = await prisma.vendor.create({
      data: {
        userId: session.userId,
        businessName: user?.fullName || 'Yeni Firma',
        businessCategory: 'OTHER',
        status: 'PENDING',
        slug: slugify(user?.fullName || `firma-${session.userId.slice(0, 6)}`),
      },
    }).catch(() => null);
  }
  if (!vendor) return null;

  let showcase = await prisma.vendorShowcase.findUnique({ where: { vendorId: vendor.id } }).catch(() => null);
  if (!showcase) {
    const baseSlug = vendor.slug || slugify(vendor.businessName);
    showcase = await prisma.vendorShowcase.create({
      data: {
        vendorId: vendor.id,
        slug: `${baseSlug}-${vendor.id.slice(0, 6)}`,
        categorySlug: vendor.categorySlug || 'dugun-mekanlari',
        city: vendor.city || '',
        district: vendor.district || '',
        contactPhone: vendor.phone || '',
        instagram: vendor.instagram || '',
        whatsapp: vendor.whatsapp || '',
        address: vendor.address || '',
        story: vendor.description || '',
      },
    }).catch(() => null);
  }

  return { session, vendor, showcase };
}

export async function getVendorWorkspace() {
  const ctx = await requireVendorContext();
  if (!ctx) return null;
  const { vendor, showcase, session } = ctx;
  const vendorId = vendor.id;

  const [
    gallery,
    offers,
    campaigns,
    faqs,
    staff,
    leads,
    deals,
    reviews,
    events,
    payments,
    threads,
  ] = await Promise.all([
    prisma.vendorGalleryItem.findMany({ where: { vendorId }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.vendorServiceOffer.findMany({ where: { vendorId }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.vendorCampaign.findMany({ where: { vendorId }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.vendorFaqItem.findMany({ where: { vendorId }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.vendorStaffMember.findMany({ where: { vendorId }, orderBy: { createdAt: 'asc' } }).catch(() => []),
    prisma.marketplaceLead.findMany({ where: { vendorId }, orderBy: { createdAt: 'desc' }, take: 80 }).catch(() => []),
    prisma.vendorDeal.findMany({ where: { vendorId }, orderBy: { updatedAt: 'desc' } }).catch(() => []),
    prisma.vendorReviewRecord.findMany({ where: { vendorId }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.vendorCalendarItem.findMany({ where: { vendorId }, orderBy: { startsAt: 'asc' } }).catch(() => []),
    prisma.vendorPaymentRequest.findMany({ where: { vendorId }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.vendorCoupleThread.findMany({ where: { vendorId }, orderBy: { updatedAt: 'desc' } }).catch(() => []),
  ]);

  const unread = await countUnreadForUser(session.userId, threads.map((row) => row.conversationId));
  const dealIds = deals.map((row) => row.id);
  const milestones = dealIds.length
    ? await prisma.vendorDealMilestone.findMany({ where: { dealId: { in: dealIds } }, orderBy: { sortOrder: 'asc' } }).catch(() => [])
    : [];
  const dealsWithSteps = deals.map((deal) => ({
    ...deal,
    milestones: milestones.filter((row) => row.dealId === deal.id),
  }));

  return {
    session,
    vendor,
    showcase,
    gallery,
    offers,
    campaigns,
    faqs,
    staff,
    leads,
    deals: dealsWithSteps,
    reviews,
    events,
    payments,
    threads,
    unread,
    kpis: {
      leads: leads.length,
      openLeads: leads.filter((row) => row.status === 'PENDING' || row.status === 'OFFER_SENT').length,
      deals: deals.length,
      signed: dealsWithSteps.filter((row) => ['SIGNED', 'ACTIVE', 'COMPLETED'].includes(row.status)).length,
      pipeline: dealsWithSteps.filter((row) => !['COMPLETED', 'CANCELLED'].includes(row.status)).reduce((sum, row) => sum + Number(row.totalAmount || 0), 0),
      messages: threads.length,
      events: events.length,
      rating: reviews.length
        ? Number((reviews.reduce((sum: number, row) => sum + Number(row.rating || 0), 0) / reviews.length).toFixed(1))
        : 0,
    },
  };
}

async function countUnreadForUser(userId: string, conversationIds: string[]) {
  if (!conversationIds.length) return 0;
  const parts = await prisma.conversationParticipant.findMany({
    where: { userId, conversationId: { in: conversationIds } },
  }).catch(() => []);
  return parts.reduce((sum, row) => sum + Number(row.unreadCount || 0), 0);
}

export async function loadLiveCatalogVendors(filter: {
  category?: string;
  city?: string;
  search?: string;
  limit?: number;
} = {}): Promise<CatalogVendor[]> {
  const where: Prisma.VendorShowcaseWhereInput = {
    published: true,
    moderationStatus: 'APPROVED',
  };
  if (filter.category) where.categorySlug = filter.category;
  if (filter.city) where.citySlug = filter.city;

  const showcases = await prisma.vendorShowcase.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    take: filter.limit || 80,
  }).catch(() => []);

  const vendors = await Promise.all(showcases.map((row) => hydrateCatalogVendor(row)));
  let items = vendors.filter(Boolean) as CatalogVendor[];

  if (filter.search) {
    const q = filter.search.toLocaleLowerCase('tr-TR');
    items = items.filter((v) =>
      v.name.toLocaleLowerCase('tr-TR').includes(q) ||
      v.district.toLocaleLowerCase('tr-TR').includes(q)
    );
  }
  return items;
}

export async function loadLiveCatalogVendor(categorySlug: string, citySlug: string, slug: string) {
  const showcase = await prisma.vendorShowcase.findFirst({
    where: {
      slug,
      categorySlug,
      citySlug,
      published: true,
      moderationStatus: 'APPROVED',
    },
  }).catch(() => null);
  if (!showcase) {
    const bySlug = await prisma.vendorShowcase.findFirst({
      where: { slug, published: true, moderationStatus: 'APPROVED' },
    }).catch(() => null);
    if (!bySlug) return null;
    return hydrateCatalogVendor(bySlug);
  }
  return hydrateCatalogVendor(showcase);
}

export async function loadLiveCatalogVendorById(id: string) {
  const showcase = await prisma.vendorShowcase.findFirst({
    where: { vendorId: id, published: true, moderationStatus: 'APPROVED' },
  }).catch(() => null);
  return showcase ? hydrateCatalogVendor(showcase) : null;
}

async function hydrateCatalogVendor(showcase: VendorShowcase): Promise<CatalogVendor | null> {
  const vendor = await prisma.vendor.findUnique({ where: { id: showcase.vendorId } }).catch(() => null);
  if (!vendor) return null;
  const cat = getCategory(showcase.categorySlug) || getCategory('dugun-mekanlari');
  const city = getCity(showcase.citySlug);
  const [gallery, offers, reviews, faqs] = await Promise.all([
    prisma.vendorGalleryItem.findMany({ where: { vendorId: vendor.id }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.vendorServiceOffer.findMany({ where: { vendorId: vendor.id, isActive: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.vendorReviewRecord.findMany({ where: { vendorId: vendor.id, isPublished: true }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.vendorFaqItem.findMany({ where: { vendorId: vendor.id }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
  ]);

  const images = gallery.map((item) => item.url).filter(Boolean);
  const cover = images[0] || '/assets/placeholder-vendor.jpg';
  const menus: CatalogMenu[] = offers.length
    ? offers.map((offer) => ({
        name: offer.name,
        type: offer.kind === 'MENU' ? 'Menü' : 'Paket',
        weekdayPrice: Number(offer.weekdayPrice || 0),
        weekendPrice: Number(offer.weekendPrice || offer.weekdayPrice || 0),
      }))
    : [];
  const catalogReviews: CatalogReview[] = reviews.map((row) => ({
    id: row.id,
    authorName: row.authorName,
    weddingDate: '',
    rating: Number(row.rating),
    comment: row.comment,
  }));
  const avg = catalogReviews.length
    ? catalogReviews.reduce((sum, row) => sum + row.rating, 0) / catalogReviews.length
    : 0;

  return {
    id: vendor.id,
    slug: showcase.slug,
    categorySlug: showcase.categorySlug || cat?.slug || 'dugun-mekanlari',
    categoryName: cat?.name || vendor.businessCategory,
    name: vendor.businessName,
    city: showcase.city || city?.name || vendor.city || '',
    citySlug: showcase.citySlug || slugify(showcase.city || vendor.city || 'istanbul'),
    district: showcase.district || vendor.district || '',
    address: showcase.address || vendor.address || '',
    phone: showcase.contactPhone || vendor.phone || '',
    whatsapp: showcase.whatsapp || vendor.whatsapp || '',
    rating: Number(avg.toFixed(1)),
    reviewCount: catalogReviews.length,
    capacityMin: Number(showcase.seatedCapacity || 0),
    capacityMax: Number(showcase.cocktailCapacity || showcase.seatedCapacity || 0),
    priceType: showcase.priceType === 'PER_PERSON' ? 'PER_PERSON' : 'PACKAGE',
    price: Number(showcase.priceFrom || menus[0]?.weekendPrice || 0),
    oldPrice: null,
    discountPct: null,
    campaignDaysLeft: null,
    tags: [...(showcase.features || []), ...(showcase.usps || [])].slice(0, 8),
    imageUrl: cover,
    gallery: images.length ? images : [cover],
    yearsOnPlatform: 1,
    responseTime: 'WedyPlan mesajı',
    story: showcase.story || vendor.description || `${vendor.businessName} WedyPlan üzerinde hizmet verir.`,
    features: showcase.features || [],
    menus,
    reviews: catalogReviews,
    faqs: faqs.map((row) => ({ question: row.question, answer: row.answer })),
    isVerified: Boolean(vendor.isVerified),
  };
}

export function citySlugFromName(name: string) {
  return slugify(name || 'istanbul');
}

export { slugify };
