import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth/session';
import { writeAdminAudit } from '@/lib/admin/audit';

const db = prisma as any;

export function coupleSlugify(value: string) {
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
    .slice(0, 72) || `dugun-${Date.now().toString(36)}`;
}

export async function auditCouple(action: string, input: {
  actorUserId?: string | null;
  actorRole?: string | null;
  targetEntity?: string;
  targetEntityId?: string;
  metadata?: Record<string, unknown>;
}) {
  await writeAdminAudit({
    actorUserId: input.actorUserId,
    actorRole: input.actorRole || 'COUPLE',
    action,
    category: 'CUSTOMER_UPDATE',
    targetEntity: input.targetEntity || 'Couple',
    targetEntityId: input.targetEntityId,
    metadata: input.metadata,
  });
}

export async function requireCoupleContext() {
  const session = await getSession();
  if (!session?.userId) return null;
  if (session.role !== 'COUPLE' && session.role !== 'ADMIN') return null;

  let couple = await db.couple.findFirst({ where: { userId: session.userId } }).catch(() => null);
  if (!couple) {
    const user = await db.identityUser.findUnique({ where: { id: session.userId } }).catch(() => null);
    const name = user?.fullName || 'Çift';
    const [one, two] = String(name).split(' & ').map((part: string) => part.trim());
    couple = await db.couple.create({
      data: {
        userId: session.userId,
        partnerOneName: one || name,
        partnerTwoName: two || null,
        slug: coupleSlugify(`${one || name}${two ? `-${two}` : ''}`),
      },
    }).catch(() => null);
  }
  if (!couple) return null;
  return { session, couple };
}

const STARTER_TASKS = [
  { title: 'Katalogdan mekan / firma teklifi alın', category: 'Mekan & Yeme-İçme', priority: 'HIGH' },
  { title: 'Bütçe kalemlerini girin', category: 'Resmi İşlemler', priority: 'HIGH' },
  { title: 'Davetli listesini oluşturun', category: 'Matbaa & Davetiye', priority: 'HIGH' },
  { title: 'Dijital davetiyeyi yayınlayın', category: 'Matbaa & Davetiye', priority: 'MEDIUM' },
];

export async function ensureStarterChecklist(userId: string) {
  const count = await db.checklistItem.count({ where: { userId } }).catch(() => 0);
  if (count > 0) return;
  for (const task of STARTER_TASKS) {
    await db.checklistItem.create({
      data: { userId, title: task.title, category: task.category, priority: task.priority, assignedToName: 'Birlikte' },
    }).catch(() => null);
  }
}

export async function getCoupleWorkspace() {
  const ctx = await requireCoupleContext();
  if (!ctx) return null;
  const { session, couple } = ctx;
  const userId = session.userId;

  const [
    budgetItems,
    tasks,
    guests,
    deals,
    payments,
    events,
    leads,
    threads,
    invitation,
    photos,
    gifts,
  ] = await Promise.all([
    db.budgetItem.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    db.checklistItem.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    db.guest.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    db.vendorDeal.findMany({ where: { coupleUserId: userId }, orderBy: { updatedAt: 'desc' } }).catch(() => []),
    db.vendorPaymentRequest.findMany({ where: { coupleUserId: userId }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    db.vendorCalendarItem.findMany({ where: { coupleUserId: userId }, orderBy: { startsAt: 'asc' } }).catch(() => []),
    db.marketplaceLead.findMany({ where: { coupleUserId: userId }, orderBy: { createdAt: 'desc' }, take: 40 }).catch(() => []),
    db.vendorCoupleThread.findMany({ where: { coupleUserId: userId }, orderBy: { updatedAt: 'desc' } }).catch(() => []),
    db.coupleInvitation.findUnique({ where: { coupleId: couple.id } }).catch(() => null),
    db.couplePhoto.findMany({ where: { coupleId: couple.id }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    db.coupleGiftItem.findMany({ where: { coupleId: couple.id }, orderBy: { createdAt: 'desc' } }).catch(() => []),
  ]);

  const vendorIds = [...new Set((deals as any[]).map((row) => row.vendorId).filter(Boolean))];
  const vendors = vendorIds.length
    ? await db.vendor.findMany({ where: { id: { in: vendorIds } } }).catch(() => [])
    : [];
  const vendorMap = new Map((vendors as any[]).map((row) => [row.id, row]));

  const dealAmount = (deals as any[]).reduce((sum, row) => sum + Number(row.totalAmount || 0), 0);
  const budgetSpent = (budgetItems as any[]).reduce((sum, row) => sum + Number(row.spentAmount || 0), 0);
  const paymentDue = (payments as any[]).filter((row) => row.status !== 'PAID').reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const spentBudget = budgetSpent + (payments as any[]).filter((row) => row.status === 'PAID').reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const targetBudget = Number(couple.targetBudget || 0) || 350000;
  const totalGuests = (guests as any[]).reduce((sum, row) => sum + 1 + Number(row.plusOneCount || 0), 0);
  const acceptedGuests = (guests as any[])
    .filter((row) => row.rsvpStatus === 'ACCEPTED')
    .reduce((sum, row) => sum + 1 + Number(row.plusOneCount || 0), 0);
  const completedTasks = (tasks as any[]).filter((row) => row.isCompleted).length;
  const bookedVendors = (deals as any[]).filter((row) => ['SIGNED', 'ACTIVE', 'COMPLETED'].includes(row.status)).length;
  const budgetPct = Math.min(100, Math.round((spentBudget / targetBudget) * 100));
  const taskPct = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const guestPct = totalGuests ? Math.round((acceptedGuests / totalGuests) * 100) : 0;
  const vendorPct = deals.length ? Math.round((bookedVendors / Math.max(deals.length, 1)) * 100) : 0;

  const threadPreviews = await Promise.all((threads as any[]).slice(0, 4).map(async (thread) => {
    const last = await db.message.findFirst({
      where: { conversationId: thread.conversationId },
      orderBy: { createdAt: 'desc' },
    }).catch(() => null);
    return {
      ...thread,
      lastBody: last?.bodyText || '',
      lastAt: last?.createdAt || thread.updatedAt,
    };
  }));

  return {
    session,
    couple,
    budgetItems,
    tasks,
    guests,
    deals: (deals as any[]).map((deal) => ({ ...deal, vendor: vendorMap.get(deal.vendorId) || null })),
    payments,
    events,
    leads,
    threads: threadPreviews,
    invitation,
    photos,
    gifts,
    kpis: {
      targetBudget,
      spentBudget,
      remainingBudget: targetBudget - spentBudget,
      budgetPercentage: budgetPct,
      dealAmount,
      paymentDue,
      completedTasks,
      totalTasks: tasks.length,
      taskPercentage: taskPct,
      acceptedGuests,
      totalGuests,
      guestPercentage: guestPct,
      bookedVendors,
      totalVendorCategories: Math.max(deals.length, 8),
      overallReadiness: Math.round(budgetPct * 0.25 + taskPct * 0.25 + guestPct * 0.25 + vendorPct * 0.25),
    },
  };
}

export function refreshCouplePaths() {
  return [
    '/cift/dashboard',
    '/cift/butce',
    '/cift/gorevler',
    '/cift/davetliler',
    '/cift/firmalar',
    '/cift/messages',
    '/cift/odeme',
    '/cift/ayarlar',
    '/cift/dijital-davetiye',
    '/cift/fotograf-duvari',
    '/admin/ciftler',
  ];
}
