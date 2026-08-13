import { prisma } from '@/lib/db';
import {
  DEFAULT_CHANNELS,
  DEFAULT_PACKAGES,
  INTEGRATIONS,
  type OpsDesk,
} from '@/lib/ops/catalog';
import type { StaffContext } from '@/lib/ops/staff';

const db = prisma as any;

function iso(value?: Date | string | null) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : String(value);
}

export async function pulse(desk: OpsDesk | null, category: string, title: string, actor: string) {
  await db.opsPulseEvent.create({
    data: { desk, category, title, actor },
  }).catch(() => null);
}

export async function ensureOpsDefaults(adminUserId?: string) {
  try {
    for (const pack of DEFAULT_PACKAGES) {
      await db.vendorPackage.upsert({
        where: { code: pack.code },
        update: {},
        create: pack,
      });
    }
    for (const channel of DEFAULT_CHANNELS) {
      const found = await db.opsChannel.findFirst({ where: { name: channel.name } });
      if (!found) {
        await db.opsChannel.create({ data: { name: channel.name, desk: channel.desk } });
      }
    }
    for (const item of INTEGRATIONS) {
      await db.integrationCredential.upsert({
        where: { key: item.key },
        update: {},
        create: { key: item.key, label: item.label, value: '', isEnabled: false },
      });
    }
    if (adminUserId) {
      await db.adminStaff.upsert({
        where: { userId: adminUserId },
        update: {},
        create: { userId: adminUserId, desk: 'SUPER', title: 'Süper Admin' },
      });
    }
  } catch (error) {
    console.warn('Ops varsayılanları yazılamadı:', error);
  }
}

export async function getOpsSnapshot(staff: StaffContext) {
  await ensureOpsDefaults(staff.userId);
  const region = staff.desk === 'REGION' ? staff.regionCode : undefined;
  const ownerFilter = staff.desk === 'SALES' ? staff.userId : undefined;

  const [
    packages,
    sales,
    kycPending,
    invoices,
    debts,
    skus,
    employees,
    payrolls,
    parties,
    deals,
    vendorRequests,
    cases,
    tasks,
    channels,
    events,
    pulseRows,
    integrations,
    vendors,
    staffRows,
  ] = await Promise.all([
    db.vendorPackage.findMany({ orderBy: { sortOrder: 'asc' } }).catch(() => []),
    db.vendorPackageSale.findMany({ orderBy: { createdAt: 'desc' }, take: 80 }).catch(() => []),
    db.vendorLegalProfile.findMany({ where: { kycStatus: { in: ['SUBMITTED', 'IN_REVIEW'] } }, take: 40 }).catch(() => []),
    db.gibInvoice.findMany({ orderBy: { createdAt: 'desc' }, take: 40 }).catch(() => []),
    db.financeDebt.findMany({ orderBy: { dueDate: 'asc' }, take: 40 }).catch(() => []),
    db.inventorySku.findMany({ orderBy: { name: 'asc' } }).catch(() => []),
    db.hrEmployee.findMany({ orderBy: { fullName: 'asc' } }).catch(() => []),
    db.payrollPeriod.findMany({ orderBy: { period: 'desc' }, take: 12 }).catch(() => []),
    db.crmParty.findMany({
      where: {
        ...(region ? { regionCode: region } : {}),
        ...(ownerFilter ? { ownerUserId: ownerFilter } : {}),
      },
      orderBy: { updatedAt: 'desc' },
      take: 80,
    }).catch(() => []),
    db.crmDeal.findMany({
      where: {
        ...(region ? { regionCode: region } : {}),
        ...(ownerFilter ? { ownerUserId: ownerFilter } : {}),
      },
      include: { party: true },
      orderBy: { updatedAt: 'desc' },
      take: 80,
    }).catch(() => []),
    db.vendorOpsRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 40 }).catch(() => []),
    db.supportCase.findMany({ orderBy: { createdAt: 'desc' }, take: 50, include: { messages: true } }).catch(() => []),
    db.opsTask.findMany({
      where: staff.desk === 'SUPER' ? {} : { OR: [{ desk: staff.desk }, { assigneeUserId: staff.userId }] },
      orderBy: { dueAt: 'asc' },
      take: 60,
    }).catch(() => []),
    db.opsChannel.findMany({ include: { messages: { orderBy: { createdAt: 'desc' }, take: 30 } }, orderBy: { name: 'asc' } }).catch(() => []),
    db.opsCalendarEvent.findMany({ orderBy: { startsAt: 'asc' }, take: 40 }).catch(() => []),
    db.opsPulseEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }).catch(() => []),
    db.integrationCredential.findMany({ orderBy: { key: 'asc' } }).catch(() => []),
    db.vendor.findMany({ orderBy: { createdAt: 'desc' }, take: 80 }).catch(() => []),
    db.adminStaff.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
  ]);

  const users = await db.identityUser.findMany({
    where: { id: { in: staffRows.map((row: any) => row.userId).filter(Boolean) } },
    select: { id: true, email: true, fullName: true, status: true },
  }).catch(() => []);
  const userMap = new Map(users.map((user: any) => [user.id, user]));

  const soldByPackage = new Map<string, { count: number; revenue: number }>();
  for (const sale of sales as any[]) {
    if (sale.status !== 'ACTIVE' && sale.status !== 'WON') continue;
    const current = soldByPackage.get(sale.packageId) || { count: 0, revenue: 0 };
    current.count += 1;
    current.revenue += Number(sale.amount || 0);
    soldByPackage.set(sale.packageId, current);
  }

  const packageCards = (packages as any[]).map((pack) => {
    const stats = soldByPackage.get(pack.id) || { count: 0, revenue: 0 };
    return {
      ...pack,
      monthlyPrice: Number(pack.monthlyPrice),
      yearlyPrice: Number(pack.yearlyPrice),
      commissionPct: Number(pack.commissionPct),
      soldCount: stats.count,
      soldRevenue: stats.revenue,
    };
  });

  const dealPipeline = ['LEAD', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'PENDING_APPROVAL', 'WON', 'LOST'].map((stage) => ({
    stage,
    count: (deals as any[]).filter((deal) => deal.stage === stage).length,
    amount: (deals as any[]).filter((deal) => deal.stage === stage).reduce((sum, deal) => sum + Number(deal.amount || 0), 0),
  }));

  const openTasks = (tasks as any[]).filter((task) => task.status !== 'DONE');
  const overdueTasks = openTasks.filter((task) => task.dueAt && new Date(task.dueAt).getTime() < Date.now());
  const lowStock = (skus as any[]).filter((item) => item.quantity <= item.reorderAt);
  const overdueDebt = (debts as any[]).filter((item) => item.status === 'OPEN' && new Date(item.dueDate).getTime() < Date.now());
  const slaBreaches = (cases as any[]).filter((item) => {
    if (item.status === 'CLOSED') return false;
    const age = (Date.now() - new Date(item.createdAt).getTime()) / 60000;
    return age > (item.slaMinutes || 240);
  });

  return {
    generatedAt: new Date().toISOString(),
    packages: packageCards,
    sales: (sales as any[]).map((row) => ({ ...row, amount: Number(row.amount), createdAt: iso(row.createdAt) })),
    kycPending,
    invoices: (invoices as any[]).map((row) => ({
      ...row,
      subTotal: Number(row.subTotal),
      taxTotal: Number(row.taxTotal),
      grandTotal: Number(row.grandTotal),
      issuedAt: iso(row.issuedAt),
      dueDate: iso(row.dueDate),
    })),
    debts: (debts as any[]).map((row) => ({ ...row, amount: Number(row.amount), dueDate: iso(row.dueDate) })),
    skus: (skus as any[]).map((row) => ({ ...row, unitCost: Number(row.unitCost) })),
    employees: (employees as any[]).map((row) => ({ ...row, salaryGross: Number(row.salaryGross), startDate: iso(row.startDate) })),
    payrolls: (payrolls as any[]).map((row) => ({ ...row, totalGross: Number(row.totalGross), totalNet: Number(row.totalNet) })),
    parties,
    deals: (deals as any[]).map((row) => ({
      ...row,
      amount: Number(row.amount),
      partyName: row.party?.name,
      updatedAt: iso(row.updatedAt),
    })),
    vendorRequests,
    cases: (cases as any[]).map((row) => ({
      ...row,
      createdAt: iso(row.createdAt),
      ageMinutes: Math.round((Date.now() - new Date(row.createdAt).getTime()) / 60000),
    })),
    tasks: (tasks as any[]).map((row) => ({ ...row, dueAt: iso(row.dueAt), createdAt: iso(row.createdAt) })),
    channels: (channels as any[]).map((row) => ({
      ...row,
      messages: (row.messages || []).slice().reverse().map((msg: any) => ({ ...msg, createdAt: iso(msg.createdAt) })),
    })),
    events: (events as any[]).map((row) => ({ ...row, startsAt: iso(row.startsAt), endsAt: iso(row.endsAt) })),
    pulse: (pulseRows as any[]).map((row) => ({ ...row, createdAt: iso(row.createdAt) })),
    integrations,
    vendors: (vendors as any[]).map((row: any) => ({
      id: row.id,
      businessName: row.businessName,
      city: row.city,
      status: row.status,
      kycStatus: row.kycStatus || 'NOT_STARTED',
      activePackageCode: row.activePackageCode,
    })),
    staff: staffRows.map((row: any) => ({
      ...row,
      email: userMap.get(row.userId)?.email,
      fullName: userMap.get(row.userId)?.fullName,
      userStatus: userMap.get(row.userId)?.status,
    })),
    kpis: {
      packageMrr: packageCards.reduce((sum: number, pack: any) => sum + pack.soldCount * pack.monthlyPrice, 0),
      activePackages: (sales as any[]).filter((row) => row.status === 'ACTIVE').length,
      pendingKyc: (kycPending as any[]).length,
      openDeals: (deals as any[]).filter((row) => !['WON', 'LOST'].includes(row.stage)).length,
      dealValue: (deals as any[]).filter((row) => !['WON', 'LOST'].includes(row.stage)).reduce((sum, row) => sum + Number(row.amount || 0), 0),
      openCases: (cases as any[]).filter((row) => row.status !== 'CLOSED').length,
      openTasks: openTasks.length,
      overdueTasks: overdueTasks.length,
      lowStock: lowStock.length,
      overdueDebt: overdueDebt.length,
      slaBreaches: slaBreaches.length,
      invoiceTotal: (invoices as any[]).reduce((sum, row) => sum + Number(row.grandTotal || 0), 0),
    },
    dealPipeline,
    alerts: [
      overdueTasks.length ? `${overdueTasks.length} görevin süresi doldu` : null,
      slaBreaches.length ? `${slaBreaches.length} destek kaydı SLA aşımında` : null,
      overdueDebt.length ? `${overdueDebt.length} vadesi geçmiş borç` : null,
      lowStock.length ? `${lowStock.length} SKU kritik stokta` : null,
      (kycPending as any[]).length ? `${(kycPending as any[]).length} evrak dosyası incelemede` : null,
    ].filter(Boolean) as string[],
  };
}

export async function getVendorEntitlements(userId: string) {
  const vendor = await db.vendor.findFirst({ where: { userId } }).catch(() => null);
  if (!vendor) {
    return { kycStatus: 'NOT_STARTED', features: [] as string[], packageName: null, vendorId: null, legal: null, docs: [] as any[] };
  }
  const legal = await db.vendorLegalProfile.findUnique({ where: { vendorId: vendor.id } }).catch(() => null);
  const docs = await db.vendorKycDocument.findMany({ where: { vendorId: vendor.id } }).catch(() => []);
  const sale = await db.vendorPackageSale.findFirst({
    where: { vendorId: vendor.id, status: 'ACTIVE' },
    include: { package: true },
    orderBy: { createdAt: 'desc' },
  }).catch(() => null);
  return {
    vendorId: vendor.id,
    businessName: vendor.businessName,
    kycStatus: legal?.kycStatus || vendor.kycStatus || 'NOT_STARTED',
    features: sale?.package?.features || ['showcase', 'leads'],
    packageName: sale?.package?.name || null,
    packageCode: sale?.package?.code || vendor.activePackageCode || null,
    legal,
    docs,
  };
}
