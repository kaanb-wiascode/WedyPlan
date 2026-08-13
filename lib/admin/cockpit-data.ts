import { prisma } from '@/lib/db';

const db = prisma as any;

export type CockpitSnapshot = {
  generatedAt: string;
  health: {
    database: boolean;
    maintenanceMode: boolean;
    payoutHold: boolean;
  };
  counts: {
    users: number;
    couples: number;
    vendors: number;
    pendingVendors: number;
    verifiedVendors: number;
    leads: number;
    openLeads: number;
    guests: number;
    payments: number;
    sessions: number;
  };
  settings: {
    commissionRate: number;
    payoutHold: boolean;
    maintenanceMode: boolean;
  };
  flags: { key: string; name: string; isEnabled: boolean }[];
  pendingVendors: CockpitVendor[];
  recentCouples: CockpitCouple[];
  recentVendors: CockpitVendor[];
  recentLeads: CockpitLead[];
  recentUsers: CockpitUser[];
  recentAudit: CockpitAudit[];
  broadcasts: { id: string; message: string; audience: string; createdAt: string }[];
};

export type CockpitVendor = {
  id: string;
  userId: string;
  businessName: string;
  businessCategory: string;
  city: string | null;
  district: string | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  status: string;
  isVerified: boolean;
  services: string[];
  notes: string | null;
  createdAt: string;
  owner: { email: string; fullName: string; status: string } | null;
};

export type CockpitCouple = {
  id: string;
  userId: string;
  partnerOneName: string;
  partnerTwoName: string | null;
  weddingDate: string | null;
  targetBudget: number;
  city: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
  owner: { email: string; fullName: string; status: string } | null;
};

export type CockpitLead = {
  id: string;
  vendorId: string | null;
  vendorName: string;
  categorySlug: string;
  city: string;
  district: string;
  coupleNames: string;
  phone: string;
  email: string | null;
  weddingDate: string | null;
  guestCount: number;
  note: string;
  status: string;
  createdAt: string;
};

export type CockpitUser = {
  id: string;
  email: string;
  fullName: string;
  status: string;
  createdAt: string;
  portals: string[];
};

export type CockpitAudit = {
  id: string;
  action: string;
  category: string;
  actorUserId: string | null;
  targetEntity: string | null;
  createdAt: string;
};

const DEFAULT_FLAGS = [
  { key: 'vendor_auto_approve', name: 'Firma otomatik onay', isEnabled: false },
  { key: 'ai_assistant', name: 'AI asistan', isEnabled: true },
  { key: 'catalog_leads', name: 'Katalog teklif talepleri', isEnabled: true },
  { key: 'maintenance_banner', name: 'Bakım duyurusu', isEnabled: false },
];

function iso(value?: Date | string | null) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}

async function getSetting<T>(key: string, fallback: T): Promise<T> {
  try {
    const row = await db.platformSetting.findUnique({ where: { key } });
    if (!row) return fallback;
    return (row.value as T) ?? fallback;
  } catch {
    return fallback;
  }
}

export async function ensureCockpitDefaults() {
  try {
    await db.platformSetting.upsert({
      where: { key: 'commission_rate' },
      update: {},
      create: { key: 'commission_rate', value: 12 },
    });
    await db.platformSetting.upsert({
      where: { key: 'payout_hold' },
      update: {},
      create: { key: 'payout_hold', value: false },
    });
    await db.platformSetting.upsert({
      where: { key: 'maintenance_mode' },
      update: {},
      create: { key: 'maintenance_mode', value: false },
    });
    for (const flag of DEFAULT_FLAGS) {
      await db.featureFlag.upsert({
        where: { key: flag.key },
        update: {},
        create: flag,
      });
    }
  } catch (error) {
    console.warn('Cockpit varsayılanları yazılamadı:', error);
  }
}

async function ownerMap(userIds: string[]) {
  const unique = [...new Set(userIds.filter(Boolean))];
  if (unique.length === 0) return new Map<string, CockpitVendor['owner']>();
  const users = await db.identityUser.findMany({
    where: { id: { in: unique } },
    select: { id: true, email: true, fullName: true, status: true },
  });
  return new Map(users.map((user: { id: string; email: string; fullName: string; status: string }) => [user.id, user]));
}

function mapVendor(vendor: any, owners: Map<string, CockpitVendor['owner']>): CockpitVendor {
  return {
    id: vendor.id,
    userId: vendor.userId,
    businessName: vendor.businessName,
    businessCategory: vendor.businessCategory,
    city: vendor.city ?? null,
    district: vendor.district ?? null,
    phone: vendor.phone ?? null,
    website: vendor.website ?? null,
    description: vendor.description ?? null,
    status: vendor.status || 'APPROVED',
    isVerified: Boolean(vendor.isVerified),
    services: Array.isArray(vendor.services) ? vendor.services : [],
    notes: vendor.notes ?? null,
    createdAt: iso(vendor.createdAt) || new Date().toISOString(),
    owner: owners.get(vendor.userId) || null,
  };
}

function mapCouple(couple: any, owners: Map<string, CockpitCouple['owner']>): CockpitCouple {
  return {
    id: couple.id,
    userId: couple.userId,
    partnerOneName: couple.partnerOneName,
    partnerTwoName: couple.partnerTwoName ?? null,
    weddingDate: iso(couple.weddingDate),
    targetBudget: Number(couple.targetBudget || 0),
    city: couple.city ?? null,
    status: couple.status || 'ACTIVE',
    notes: couple.notes ?? null,
    createdAt: iso(couple.createdAt) || new Date().toISOString(),
    owner: owners.get(couple.userId) || null,
  };
}

function q<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return Promise.resolve(run()).catch(() => fallback);
  } catch {
    return Promise.resolve(fallback);
  }
}

export async function getCockpitSnapshot(): Promise<CockpitSnapshot> {
  await ensureCockpitDefaults();

  let database = true;
  try {
    await db.$queryRaw`SELECT 1`;
  } catch {
    database = false;
  }

  const [
    users,
    couples,
    vendors,
    pendingVendors,
    verifiedVendors,
    leads,
    openLeads,
    guests,
    payments,
    sessions,
    commissionRate,
    payoutHold,
    maintenanceMode,
    flags,
    pendingVendorRows,
    recentCoupleRows,
    recentVendorRows,
    recentLeadRows,
    recentUserRows,
    recentAuditRows,
    broadcastRows,
    portalRows,
  ] = await Promise.all([
    q(() => db.identityUser.count(), 0),
    q(() => db.couple.count(), 0),
    q(() => db.vendor.count(), 0),
    q(() => db.vendor.count({ where: { status: 'PENDING' } }), 0),
    q(() => db.vendor.count({ where: { isVerified: true } }), 0),
    q(() => db.marketplaceLead.count(), 0),
    q(() => db.marketplaceLead.count({ where: { status: 'PENDING' } }), 0),
    q(() => db.guest.count(), 0),
    q(() => db.paymentTransaction.count(), 0),
    q(() => db.userSession.count({ where: { isRevoked: false } }), 0),
    getSetting<number>('commission_rate', 12),
    getSetting<boolean>('payout_hold', false),
    getSetting<boolean>('maintenance_mode', false),
    q(() => db.featureFlag.findMany({ orderBy: { name: 'asc' } }), []),
    q(() => db.vendor.findMany({ where: { status: 'PENDING' }, orderBy: { createdAt: 'desc' }, take: 8 }), []),
    q(() => db.couple.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }), []),
    q(() => db.vendor.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }), []),
    q(() => db.marketplaceLead.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }), []),
    q(() => db.identityUser.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }), []),
    q(() => db.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 12 }), []),
    q(() => db.adminBroadcast.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }), []),
    q(() => db.portalProfile.findMany({ select: { userId: true, portal: true } }), []),
  ]);

  const ownerIds = [
    ...pendingVendorRows.map((row: any) => row.userId),
    ...recentVendorRows.map((row: any) => row.userId),
    ...recentCoupleRows.map((row: any) => row.userId),
  ];
  const owners = await ownerMap(ownerIds);
  const portalsByUser = new Map<string, string[]>();
  for (const row of portalRows as { userId: string; portal: string }[]) {
    const current = portalsByUser.get(row.userId) || [];
    current.push(row.portal);
    portalsByUser.set(row.userId, current);
  }

  return {
    generatedAt: new Date().toISOString(),
    health: {
      database,
      maintenanceMode: Boolean(maintenanceMode),
      payoutHold: Boolean(payoutHold),
    },
    counts: {
      users,
      couples,
      vendors,
      pendingVendors,
      verifiedVendors,
      leads,
      openLeads,
      guests,
      payments,
      sessions,
    },
    settings: {
      commissionRate: Number(commissionRate) || 12,
      payoutHold: Boolean(payoutHold),
      maintenanceMode: Boolean(maintenanceMode),
    },
    flags: flags.map((flag: any) => ({
      key: flag.key,
      name: flag.name,
      isEnabled: Boolean(flag.isEnabled),
    })),
    pendingVendors: pendingVendorRows.map((row: any) => mapVendor(row, owners)),
    recentCouples: recentCoupleRows.map((row: any) => mapCouple(row, owners)),
    recentVendors: recentVendorRows.map((row: any) => mapVendor(row, owners)),
    recentLeads: recentLeadRows.map((row: any) => ({
      id: row.id,
      vendorId: row.vendorId,
      vendorName: row.vendorName,
      categorySlug: row.categorySlug,
      city: row.city,
      district: row.district,
      coupleNames: row.coupleNames,
      phone: row.phone,
      email: row.email,
      weddingDate: row.weddingDate,
      guestCount: row.guestCount,
      note: row.note,
      status: row.status,
      createdAt: iso(row.createdAt) || new Date().toISOString(),
    })),
    recentUsers: recentUserRows.map((row: any) => ({
      id: row.id,
      email: row.email,
      fullName: row.fullName,
      status: row.status,
      createdAt: iso(row.createdAt) || new Date().toISOString(),
      portals: portalsByUser.get(row.id) || [],
    })),
    recentAudit: recentAuditRows.map((row: any) => ({
      id: row.id,
      action: row.action,
      category: row.category,
      actorUserId: row.actorUserId,
      targetEntity: row.targetEntity,
      createdAt: iso(row.createdAt) || new Date().toISOString(),
    })),
    broadcasts: broadcastRows.map((row: any) => ({
      id: row.id,
      message: row.message,
      audience: row.audience,
      createdAt: iso(row.createdAt) || new Date().toISOString(),
    })),
  };
}

export async function listVendors(filter?: { status?: string; q?: string }): Promise<CockpitVendor[]> {
  const vendors = await db.vendor.findMany({
    where: {
      ...(filter?.status && filter.status !== 'ALL' ? { status: filter.status } : {}),
      ...(filter?.q
        ? {
            OR: [
              { businessName: { contains: filter.q, mode: 'insensitive' } },
              { businessCategory: { contains: filter.q, mode: 'insensitive' } },
              { city: { contains: filter.q, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 80,
  });
  const owners = await ownerMap(vendors.map((vendor: any) => vendor.userId));
  return vendors.map((vendor: any) => mapVendor(vendor, owners));
}

export async function getVendorById(id: string) {
  const vendor = await db.vendor.findUnique({ where: { id } });
  if (!vendor) return null;
  const owners = await ownerMap([vendor.userId]);
  const notes = await db.vendorModerationNote
    .findMany({ where: { vendorId: id }, orderBy: { createdAt: 'desc' }, take: 20 })
    .catch(() => []);
  return { vendor: mapVendor(vendor, owners), notes };
}

export async function listCouples(filter?: { q?: string }): Promise<CockpitCouple[]> {
  const couples = await db.couple.findMany({
    where: filter?.q
      ? {
          OR: [
            { partnerOneName: { contains: filter.q, mode: 'insensitive' } },
            { partnerTwoName: { contains: filter.q, mode: 'insensitive' } },
            { city: { contains: filter.q, mode: 'insensitive' } },
          ],
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
    take: 80,
  });
  const owners = await ownerMap(couples.map((couple: any) => couple.userId));
  return couples.map((couple: any) => mapCouple(couple, owners));
}

export async function getCoupleById(id: string) {
  const couple = await db.couple.findUnique({ where: { id } });
  if (!couple) return null;
  const owners = await ownerMap([couple.userId]);
  const [budgetCount, guestCount, taskCount] = await Promise.all([
    db.budgetItem.count({ where: { userId: couple.userId } }).catch(() => 0),
    db.guest.count({ where: { userId: couple.userId } }).catch(() => 0),
    db.checklistItem.count({ where: { userId: couple.userId } }).catch(() => 0),
  ]);
  return {
    couple: mapCouple(couple, owners),
    stats: { budgetCount, guestCount, taskCount },
  };
}

export async function listLeads(): Promise<CockpitLead[]> {
  const rows = await db.marketplaceLead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return rows.map((row: any) => ({
    ...row,
    createdAt: iso(row.createdAt) || new Date().toISOString(),
  }));
}

export async function listUsers(): Promise<CockpitUser[]> {
  const [users, portals] = await Promise.all([
    db.identityUser.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
    db.portalProfile.findMany({ select: { userId: true, portal: true } }),
  ]);
  const portalsByUser = new Map<string, string[]>();
  for (const row of portals as { userId: string; portal: string }[]) {
    const current = portalsByUser.get(row.userId) || [];
    current.push(row.portal);
    portalsByUser.set(row.userId, current);
  }
  return users.map((user: any) => ({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    status: user.status,
    createdAt: iso(user.createdAt) || new Date().toISOString(),
    portals: portalsByUser.get(user.id) || [],
  }));
}

export async function listAuditLogs(): Promise<CockpitAudit[]> {
  const rows = await db.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 80,
  });
  return rows.map((row: any) => ({
    id: row.id,
    action: row.action,
    category: row.category,
    actorUserId: row.actorUserId,
    actorRole: row.actorRole,
    targetEntity: row.targetEntity,
    targetEntityId: row.targetEntityId,
    createdAt: iso(row.createdAt) || new Date().toISOString(),
  }));
}

export async function listServices() {
  const vendors = await listVendors();
  return vendors.map((vendor: CockpitVendor) => ({
    id: vendor.id,
    businessName: vendor.businessName,
    businessCategory: vendor.businessCategory,
    city: vendor.city,
    status: vendor.status,
    isVerified: vendor.isVerified,
    services: vendor.services,
    owner: vendor.owner,
  }));
}

export async function getFinanceSnapshot(): Promise<{
  commissionRate: number;
  payoutHold: boolean;
  plans: { id: string; name: string; code: string; price: unknown }[];
  subscriptionCount: number;
  commissionRules: unknown[];
  payments: {
    id: string;
    userId: string;
    type: string;
    status: string;
    grossAmount: string;
    createdAt: string | null;
  }[];
}> {
  const [plans, subscriptions, commissionRules, payments, settings] = await Promise.all([
    db.subscriptionPlan.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    db.userSubscription.count().catch(() => 0),
    db.commissionRule.findMany().catch(() => []),
    db.paymentTransaction.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }).catch(() => []),
    getCockpitSnapshot(),
  ]);
  return {
    commissionRate: settings.settings.commissionRate,
    payoutHold: settings.settings.payoutHold,
    plans: (plans as { id: string; name: string; code: string; price: unknown }[]),
    subscriptionCount: subscriptions,
    commissionRules,
    payments: payments.map((payment: any) => ({
      id: payment.id,
      userId: payment.userId,
      type: payment.type,
      status: payment.status,
      grossAmount: String(payment.grossAmount),
      createdAt: iso(payment.createdAt),
    })),
  };
}
