'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth/session';
import { KYC_DOCS } from '@/lib/ops/catalog';

const db = prisma as any;

function refreshVendor() {
  revalidatePath('/firma/dashboard');
  revalidatePath('/firma/evrak');
  revalidatePath('/firma/paket');
  revalidatePath('/admin/evrak');
  revalidatePath('/admin/paketler');
}

async function vendorOfSession() {
  const session = await getSession();
  if (!session?.userId || (session.role !== 'VENDOR' && session.role !== 'ADMIN')) return null;
  return db.vendor.findFirst({ where: { userId: session.userId } });
}

export async function saveLegalProfileAction(formData: FormData): Promise<void> {
  const vendor = await vendorOfSession();
  if (!vendor) return;
  const companyType = String(formData.get('companyType') || 'SOLE');
  const data = {
    vendorId: vendor.id,
    companyType,
    legalTitle: String(formData.get('legalTitle') || vendor.businessName),
    address: String(formData.get('address') || ''),
    phone: String(formData.get('phone') || vendor.phone || ''),
    email: String(formData.get('email') || ''),
    authorizedName: String(formData.get('authorizedName') || ''),
    taxNumber: String(formData.get('taxNumber') || '') || null,
    taxOffice: String(formData.get('taxOffice') || '') || null,
    kycStatus: 'DRAFT',
  };
  await db.vendorLegalProfile.upsert({
    where: { vendorId: vendor.id },
    create: data,
    update: data,
  });
  await db.vendor.update({
    where: { id: vendor.id },
    data: { companyType, kycStatus: 'DRAFT' },
  }).catch(() => null);
  refreshVendor();
}

export async function submitKycAction(): Promise<void> {
  const vendor = await vendorOfSession();
  if (!vendor) return;
  await db.vendorLegalProfile.update({
    where: { vendorId: vendor.id },
    data: { kycStatus: 'SUBMITTED', submittedAt: new Date() },
  });
  await db.vendor.update({
    where: { id: vendor.id },
    data: { kycStatus: 'SUBMITTED', status: 'PENDING' },
  }).catch(() => null);
  await db.opsPulseEvent.create({
    data: { desk: 'FINANCE', category: 'KYC', title: `${vendor.businessName} evrak gönderdi`, actor: vendor.businessName },
  }).catch(() => null);
  refreshVendor();
}

export async function uploadKycDocAction(formData: FormData): Promise<void> {
  const vendor = await vendorOfSession();
  if (!vendor) return;
  const docType = String(formData.get('docType') || '');
  const file = formData.get('file') as File | null;
  if (!docType || !file || typeof file === 'string') return;
  const spec = KYC_DOCS.find((item) => item.id === docType);
  if (!spec || !('file' in spec) || !spec.file) return;
  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > 4_500_000) return;
  const contentBase64 = buf.toString('base64');
  const existing = await db.vendorKycDocument.findFirst({ where: { vendorId: vendor.id, docType } });
  const payload = {
    vendorId: vendor.id,
    docType,
    fileName: file.name,
    mimeType: file.type || 'application/octet-stream',
    contentBase64,
    status: 'PENDING',
  };
  if (existing) {
    await db.vendorKycDocument.update({ where: { id: existing.id }, data: payload });
  } else {
    await db.vendorKycDocument.create({ data: payload });
  }
  refreshVendor();
}

export async function requestPackageAction(formData: FormData): Promise<void> {
  const vendor = await vendorOfSession();
  if (!vendor) return;
  const packageId = String(formData.get('packageId') || '');
  const pack = await db.vendorPackage.findUnique({ where: { id: packageId } });
  if (!pack) return;
  await db.vendorPackageSale.create({
    data: {
      vendorId: vendor.id,
      packageId,
      billingCycle: String(formData.get('billingCycle') || 'MONTHLY'),
      amount: pack.monthlyPrice,
      status: 'PENDING',
    },
  });
  await db.vendorOpsRequest.create({
    data: {
      vendorId: vendor.id,
      category: 'PACKAGE',
      title: `${pack.name} paketi talebi`,
      body: `${vendor.businessName} ${pack.name} paketini satın almak istiyor.`,
    },
  });
  await db.opsPulseEvent.create({
    data: { desk: 'SALES', category: 'PACKAGE', title: `Paket talebi: ${pack.name}`, actor: vendor.businessName },
  }).catch(() => null);
  refreshVendor();
}

export async function createVendorOpsRequestAction(formData: FormData): Promise<void> {
  const vendor = await vendorOfSession();
  if (!vendor) return;
  await db.vendorOpsRequest.create({
    data: {
      vendorId: vendor.id,
      category: String(formData.get('category') || 'SUPPORT'),
      title: String(formData.get('title') || 'Talep'),
      body: String(formData.get('body') || ''),
    },
  });
  refreshVendor();
}
