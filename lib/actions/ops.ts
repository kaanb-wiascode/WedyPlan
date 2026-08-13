'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth/password';
import { writeAdminAudit } from '@/lib/admin/audit';
import { canApproveDeals, canWriteFinance, requireStaff, type StaffContext } from '@/lib/ops/staff';
import { pulse } from '@/lib/ops/data';
import type { OpsDesk } from '@/lib/ops/catalog';

const db = prisma as any;

function refresh() {
  revalidatePath('/admin');
  revalidatePath('/admin/muhasebe');
  revalidatePath('/admin/satis');
  revalidatePath('/admin/bolge');
  revalidatePath('/admin/crm');
  revalidatePath('/admin/paketler');
  revalidatePath('/admin/evrak');
  revalidatePath('/admin/ekip');
  revalidatePath('/admin/gorevler');
  revalidatePath('/admin/mesajlar');
  revalidatePath('/admin/takvim');
  revalidatePath('/admin/raporlar');
  revalidatePath('/firma/dashboard');
  revalidatePath('/firma/evrak');
  revalidatePath('/firma/paket');
}

function num(form: FormData, key: string) {
  return Number(String(form.get(key) || '0').replace(',', '.')) || 0;
}

async function audit(staff: StaffContext, action: string, category: 'API_REQUEST' | 'PAYMENT' | 'VENDOR_UPDATE' | 'CUSTOMER_UPDATE' | 'CAMPAIGN' | 'SUPPORT_TICKET', target?: string) {
  await writeAdminAudit({
    actorUserId: staff.userId,
    action,
    category,
    targetEntity: target,
  });
}

export async function savePackageAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'FINANCE']);
  const id = String(formData.get('id') || '');
  const features = String(formData.get('features') || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const data = {
    code: String(formData.get('code') || '').toUpperCase(),
    name: String(formData.get('name') || ''),
    tagline: String(formData.get('tagline') || ''),
    monthlyPrice: num(formData, 'monthlyPrice'),
    yearlyPrice: num(formData, 'yearlyPrice'),
    leadQuota: Number(formData.get('leadQuota') || 20),
    featuredSlots: Number(formData.get('featuredSlots') || 0),
    teamSeats: Number(formData.get('teamSeats') || 1),
    commissionPct: num(formData, 'commissionPct'),
    features,
    isActive: String(formData.get('isActive') || 'true') === 'true',
    isPublic: String(formData.get('isPublic') || 'true') === 'true',
  };
  if (id) {
    await db.vendorPackage.update({ where: { id }, data });
  } else {
    await db.vendorPackage.create({ data });
  }
  await pulse('FINANCE', 'PACKAGE', `${data.name} paketi güncellendi`, staff.fullName);
  await audit(staff, 'PACKAGE_SAVED', 'VENDOR_UPDATE', data.code);
  refresh();
}

export async function assignPackageAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'SALES', 'FINANCE', 'REGION']);
  const vendorId = String(formData.get('vendorId') || '');
  const packageId = String(formData.get('packageId') || '');
  const pack = await db.vendorPackage.findUnique({ where: { id: packageId } });
  if (!vendorId || !pack) return;
  await db.vendorPackageSale.updateMany({
    where: { vendorId, status: 'ACTIVE' },
    data: { status: 'CANCELED' },
  }).catch(() => null);
  await db.vendorPackageSale.create({
    data: {
      vendorId,
      packageId,
      billingCycle: String(formData.get('billingCycle') || 'MONTHLY'),
      amount: pack.monthlyPrice,
      status: 'ACTIVE',
      soldByUserId: staff.userId,
      regionCode: staff.regionCode,
      startsAt: new Date(),
    },
  });
  await db.vendor.update({
    where: { id: vendorId },
    data: { activePackageCode: pack.code },
  }).catch(() => null);
  await pulse('SALES', 'PACKAGE', `${pack.name} satıldı`, staff.fullName);
  await audit(staff, 'PACKAGE_ASSIGNED', 'PAYMENT', vendorId);
  refresh();
}

export async function reviewKycAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'FINANCE', 'CRM']);
  const vendorId = String(formData.get('vendorId') || '');
  const status = String(formData.get('status') || 'IN_REVIEW');
  const notes = String(formData.get('reviewNotes') || '');
  await db.vendorLegalProfile.update({
    where: { vendorId },
    data: {
      kycStatus: status,
      reviewNotes: notes,
      reviewedAt: new Date(),
      reviewedByUserId: staff.userId,
    },
  });
  await db.vendor.update({
    where: { id: vendorId },
    data: {
      kycStatus: status,
      status: status === 'ACTIVE' || status === 'APPROVED' ? 'APPROVED' : 'PENDING',
      isVerified: status === 'ACTIVE' || status === 'APPROVED',
    },
  }).catch(() => null);
  await pulse('FINANCE', 'KYC', `Evrak ${status}`, staff.fullName);
  await audit(staff, 'KYC_REVIEWED', 'VENDOR_UPDATE', vendorId);
  refresh();
}

export async function reviewKycDocAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'FINANCE']);
  await db.vendorKycDocument.update({
    where: { id: String(formData.get('id') || '') },
    data: {
      status: String(formData.get('status') || 'PENDING'),
      reviewNotes: String(formData.get('reviewNotes') || ''),
      reviewedByUserId: staff.userId,
    },
  });
  refresh();
}

export async function createStaffAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'REGION']);
  const desk = String(formData.get('desk') || 'SALES') as OpsDesk;
  if (staff.desk === 'REGION' && desk !== 'SALES') return;
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const fullName = String(formData.get('fullName') || '');
  const password = String(formData.get('password') || `Wedy-${Math.random().toString(36).slice(2, 8)}-26`);
  if (!email || !fullName) return;
  let user = await db.identityUser.findUnique({ where: { email } });
  if (!user) {
    user = await db.identityUser.create({
      data: {
        email,
        fullName,
        passwordHash: await hashPassword(password),
        status: 'ACTIVE',
        isEmailVerified: true,
        securityProfile: { create: {} },
      },
    });
  }
  await db.portalProfile.upsert({
    where: { userId_portal: { userId: user.id, portal: 'ADMIN' } },
    create: { userId: user.id, portal: 'ADMIN', isPrimary: true },
    update: {},
  });
  await db.adminStaff.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      desk,
      title: String(formData.get('title') || 'Uzman'),
      regionCode: String(formData.get('regionCode') || staff.regionCode || '') || null,
      managerUserId: staff.desk === 'REGION' ? staff.userId : String(formData.get('managerUserId') || '') || null,
    },
    update: {
      desk,
      title: String(formData.get('title') || 'Uzman'),
      regionCode: String(formData.get('regionCode') || staff.regionCode || '') || null,
      isActive: true,
    },
  });
  await pulse('REGION', 'STAFF', `${fullName} eklendi (${desk})`, staff.fullName);
  await audit(staff, 'STAFF_CREATED', 'API_REQUEST', email);
  refresh();
}

export async function setStaffActiveAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'REGION']);
  await db.adminStaff.update({
    where: { id: String(formData.get('id') || '') },
    data: { isActive: String(formData.get('isActive') || 'true') === 'true' },
  });
  refresh();
}

export async function createInvoiceAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'FINANCE']);
  if (!canWriteFinance(staff)) return;
  const subTotal = num(formData, 'subTotal');
  const taxTotal = Math.round(subTotal * 0.2 * 100) / 100;
  const number = `WP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
  const invoice = await db.gibInvoice.create({
    data: {
      number,
      partyName: String(formData.get('partyName') || ''),
      partyTaxNo: String(formData.get('partyTaxNo') || '') || null,
      vendorId: String(formData.get('vendorId') || '') || null,
      description: String(formData.get('description') || 'Hizmet bedeli'),
      subTotal,
      taxTotal,
      grandTotal: subTotal + taxTotal,
      dueDate: formData.get('dueDate') ? new Date(String(formData.get('dueDate'))) : null,
      status: 'ISSUED',
      createdByUserId: staff.userId,
    },
  });
  await db.financeLedgerEntry.create({
    data: {
      accountCode: '120',
      accountName: 'Alıcılar',
      vendorId: invoice.vendorId,
      invoiceId: invoice.id,
      debit: invoice.grandTotal,
      memo: invoice.number,
    },
  });
  await pulse('FINANCE', 'INVOICE', `${number} kesildi`, staff.fullName);
  await audit(staff, 'INVOICE_CREATED', 'PAYMENT', number);
  refresh();
}

export async function sendGibInvoiceAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'FINANCE']);
  const id = String(formData.get('id') || '');
  await db.gibInvoice.update({
    where: { id },
    data: {
      gibStatus: 'QUEUED',
      gibUuid: crypto.randomUUID(),
      status: 'SENT',
    },
  });
  await pulse('FINANCE', 'GIB', 'e-Fatura kuyruğa alındı', staff.fullName);
  refresh();
}

export async function createDebtAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'FINANCE', 'SALES']);
  await db.financeDebt.create({
    data: {
      vendorId: String(formData.get('vendorId') || '') || null,
      partyName: String(formData.get('partyName') || ''),
      title: String(formData.get('title') || 'Sözleşme tahsilatı'),
      amount: num(formData, 'amount'),
      dueDate: new Date(String(formData.get('dueDate') || new Date().toISOString())),
      installment: Number(formData.get('installment') || 1),
      notes: String(formData.get('notes') || ''),
    },
  });
  await pulse('FINANCE', 'DEBT', 'Yeni borç / vade', staff.fullName);
  refresh();
}

export async function settleDebtAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'FINANCE']);
  await db.financeDebt.update({
    where: { id: String(formData.get('id') || '') },
    data: { status: 'PAID' },
  });
  refresh();
}

export async function saveSkuAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'FINANCE']);
  const id = String(formData.get('id') || '');
  const data = {
    sku: String(formData.get('sku') || ''),
    name: String(formData.get('name') || ''),
    category: String(formData.get('category') || 'GENEL'),
    quantity: Number(formData.get('quantity') || 0),
    unit: String(formData.get('unit') || 'adet'),
    unitCost: num(formData, 'unitCost'),
    warehouse: String(formData.get('warehouse') || 'Merkez'),
    reorderAt: Number(formData.get('reorderAt') || 5),
  };
  if (id) await db.inventorySku.update({ where: { id }, data });
  else await db.inventorySku.create({ data });
  await pulse('FINANCE', 'STOCK', `${data.name} stok güncellendi`, staff.fullName);
  refresh();
}

export async function saveEmployeeAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'FINANCE']);
  await db.hrEmployee.create({
    data: {
      fullName: String(formData.get('fullName') || ''),
      title: String(formData.get('title') || ''),
      department: String(formData.get('department') || 'Genel'),
      salaryGross: num(formData, 'salaryGross'),
      startDate: new Date(String(formData.get('startDate') || new Date().toISOString())),
      regionCode: String(formData.get('regionCode') || '') || null,
    },
  });
  refresh();
}

export async function runPayrollAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'FINANCE']);
  const employees = await db.hrEmployee.findMany({ where: { status: 'ACTIVE' } });
  const totalGross = employees.reduce((sum: number, row: any) => sum + Number(row.salaryGross || 0), 0);
  const totalNet = Math.round(totalGross * 0.72 * 100) / 100;
  await db.payrollPeriod.create({
    data: {
      period: String(formData.get('period') || new Date().toISOString().slice(0, 7)),
      status: 'POSTED',
      employeeCount: employees.length,
      totalGross,
      totalNet,
    },
  });
  await pulse('FINANCE', 'PAYROLL', 'Bordro çalıştırıldı', staff.fullName);
  refresh();
}

export async function savePartyAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'SALES', 'REGION', 'CRM']);
  await db.crmParty.create({
    data: {
      kind: String(formData.get('kind') || 'PROSPECT'),
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || '') || null,
      phone: String(formData.get('phone') || '') || null,
      city: String(formData.get('city') || '') || null,
      regionCode: String(formData.get('regionCode') || staff.regionCode || '') || null,
      ownerUserId: staff.userId,
      source: String(formData.get('source') || 'MANUAL'),
      notes: String(formData.get('notes') || ''),
      score: Number(formData.get('score') || 40),
    },
  });
  await pulse('SALES', 'CRM', 'Yeni müşteri kartı', staff.fullName);
  refresh();
}

export async function saveDealAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'SALES', 'REGION']);
  const stage = String(formData.get('stage') || 'LEAD');
  await db.crmDeal.create({
    data: {
      partyId: String(formData.get('partyId') || ''),
      title: String(formData.get('title') || ''),
      amount: num(formData, 'amount'),
      stage: stage === 'WON' && staff.desk === 'SALES' ? 'PENDING_APPROVAL' : stage,
      paymentTerms: String(formData.get('paymentTerms') || 'PEŞİN'),
      installmentCount: Number(formData.get('installmentCount') || 1),
      regionCode: staff.regionCode,
      ownerUserId: staff.userId,
      packageId: String(formData.get('packageId') || '') || null,
      needsRegionApproval: true,
    },
  });
  await pulse('SALES', 'DEAL', 'Yeni anlaşma', staff.fullName);
  refresh();
}

export async function moveDealAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'SALES', 'REGION']);
  const id = String(formData.get('id') || '');
  let stage = String(formData.get('stage') || 'LEAD');
  if (stage === 'WON' && staff.desk === 'SALES') stage = 'PENDING_APPROVAL';
  const extra: Record<string, unknown> = { stage };
  if (stage === 'WON' && canApproveDeals(staff)) {
    extra.approvedByUserId = staff.userId;
    const deal = await db.crmDeal.findUnique({ where: { id }, include: { party: true } });
    if (deal) {
      await db.financeDebt.create({
        data: {
          partyName: deal.party?.name || deal.title,
          title: `${deal.title} tahsilat planı`,
          amount: deal.amount,
          dueDate: new Date(Date.now() + 7 * 86400000),
          installment: deal.installmentCount || 1,
          notes: deal.paymentTerms,
        },
      });
    }
  }
  await db.crmDeal.update({ where: { id }, data: extra });
  await pulse('SALES', 'DEAL', `Anlaşma ${stage}`, staff.fullName);
  refresh();
}

export async function addActivityAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'SALES', 'REGION', 'CRM']);
  await db.crmActivity.create({
    data: {
      partyId: String(formData.get('partyId') || '') || null,
      dealId: String(formData.get('dealId') || '') || null,
      type: String(formData.get('type') || 'NOTE'),
      body: String(formData.get('body') || ''),
      authorUserId: staff.userId,
    },
  });
  refresh();
}

export async function saveTaskAction(formData: FormData): Promise<void> {
  const staff = await requireStaff();
  await db.opsTask.create({
    data: {
      title: String(formData.get('title') || ''),
      details: String(formData.get('details') || ''),
      desk: (String(formData.get('desk') || staff.desk) as OpsDesk) || staff.desk,
      assigneeUserId: String(formData.get('assigneeUserId') || staff.userId) || staff.userId,
      creatorUserId: staff.userId,
      priority: String(formData.get('priority') || 'MEDIUM'),
      dueAt: formData.get('dueAt') ? new Date(String(formData.get('dueAt'))) : null,
    },
  });
  refresh();
}

export async function completeTaskAction(formData: FormData): Promise<void> {
  await requireStaff();
  await db.opsTask.update({
    where: { id: String(formData.get('id') || '') },
    data: { status: String(formData.get('status') || 'DONE') },
  });
  refresh();
}

export async function sendChatAction(formData: FormData): Promise<void> {
  const staff = await requireStaff();
  await db.opsChatMessage.create({
    data: {
      channelId: String(formData.get('channelId') || ''),
      authorUserId: staff.userId,
      authorName: staff.fullName,
      body: String(formData.get('body') || ''),
    },
  });
  refresh();
}

export async function createEventAction(formData: FormData): Promise<void> {
  const staff = await requireStaff();
  const startsAt = new Date(String(formData.get('startsAt') || new Date().toISOString()));
  const endsAt = new Date(String(formData.get('endsAt') || new Date(startsAt.getTime() + 3600000).toISOString()));
  const meet = `https://meet.google.com/${Math.random().toString(36).slice(2, 5)}-${Math.random().toString(36).slice(2, 6)}-${Math.random().toString(36).slice(2, 5)}`;
  await db.opsCalendarEvent.create({
    data: {
      title: String(formData.get('title') || ''),
      details: String(formData.get('details') || ''),
      startsAt,
      endsAt,
      location: String(formData.get('location') || '') || null,
      meetUrl: String(formData.get('meetUrl') || meet),
      desk: staff.desk,
      ownerUserId: staff.userId,
      attendees: String(formData.get('attendees') || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    },
  });
  await pulse(staff.desk, 'MEETING', 'Toplantı planlandı', staff.fullName);
  refresh();
}

export async function saveIntegrationAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER']);
  await db.integrationCredential.update({
    where: { key: String(formData.get('key') || '') },
    data: {
      value: String(formData.get('value') || ''),
      isEnabled: String(formData.get('isEnabled') || 'false') === 'true',
    },
  });
  await audit(staff, 'INTEGRATION_UPDATED', 'API_REQUEST', String(formData.get('key')));
  refresh();
}

export async function replyCaseAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'CRM', 'SALES']);
  const id = String(formData.get('id') || '');
  await db.supportCaseMessage.create({
    data: {
      caseId: id,
      author: staff.fullName,
      body: String(formData.get('body') || ''),
    },
  });
  await db.supportCase.update({
    where: { id },
    data: { status: String(formData.get('status') || 'OPEN'), assigneeUserId: staff.userId },
  });
  refresh();
}

export async function assignCaseAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'CRM', 'REGION']);
  await db.supportCase.update({
    where: { id: String(formData.get('id') || '') },
    data: {
      relatedDesk: String(formData.get('relatedDesk') || 'CRM'),
      assigneeUserId: String(formData.get('assigneeUserId') || staff.userId),
      status: 'IN_PROGRESS',
    },
  });
  refresh();
}

export async function vendorRequestAction(formData: FormData): Promise<void> {
  const staff = await requireStaff(['SUPER', 'SALES', 'CRM']);
  await db.vendorOpsRequest.update({
    where: { id: String(formData.get('id') || '') },
    data: { status: String(formData.get('status') || 'OPEN'), assigneeUserId: staff.userId },
  });
  refresh();
}
