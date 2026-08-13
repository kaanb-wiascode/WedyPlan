import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, unauthorized } from '@/lib/admin/require-admin';
import { ensureStaffForAdmin } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import type { StaffContext } from '@/lib/ops/staff';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function csvEscape(value: unknown) {
  const text = String(value ?? '');
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function toCsv(headers: string[], rows: unknown[][]) {
  return `\uFEFF${[headers, ...rows].map((line) => line.map(csvEscape).join(';')).join('\n')}`;
}

function simplePdf(title: string, lines: string[]) {
  const content = [title, '', ...lines].join('\n');
  const escaped = content.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  const stream = `BT /F1 12 Tf 48 780 Td (${escaped.replace(/\n/g, ') Tj T* (')}) Tj ET`;
  return `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length ${stream.length} >> stream
${stream}
endstream endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 6
0000000000 65535 f 
trailer << /Size 6 /Root 1 0 R >>
startxref
0
%%EOF`;
}

function tableFor(slug: string, ops: Awaited<ReturnType<typeof getOpsSnapshot>>): { headers: string[]; rows: unknown[][]; title: string } {
  switch (slug) {
    case 'packages':
      return {
        title: 'Paket satışları',
        headers: ['Kod', 'Ad', 'Aylık', 'Satış', 'Ciro'],
        rows: ops.packages.map((p: any) => [p.code, p.name, p.monthlyPrice, p.soldCount, p.soldRevenue]),
      };
    case 'invoices':
      return {
        title: 'Faturalar',
        headers: ['No', 'Cari', 'Tutar', 'GİB', 'Tarih'],
        rows: ops.invoices.map((r: any) => [r.number, r.partyName, r.grandTotal, r.gibStatus, r.issuedAt]),
      };
    case 'debts':
      return { title: 'Borçlar', headers: ['Cari', 'Başlık', 'Tutar', 'Vade', 'Durum'], rows: ops.debts.map((r: any) => [r.partyName, r.title, r.amount, r.dueDate, r.status]) };
    case 'stock':
      return { title: 'Stok', headers: ['SKU', 'Ad', 'Adet', 'Depo'], rows: ops.skus.map((r: any) => [r.sku, r.name, r.quantity, r.warehouse]) };
    case 'payroll':
      return { title: 'Bordro', headers: ['Dönem', 'Kişi', 'Brüt', 'Net', 'Durum'], rows: ops.payrolls.map((r: any) => [r.period, r.employeeCount, r.totalGross, r.totalNet, r.status]) };
    case 'deals':
      return { title: 'Anlaşmalar', headers: ['Başlık', 'Müşteri', 'Tutar', 'Aşama'], rows: ops.deals.map((r: any) => [r.title, r.partyName, r.amount, r.stage]) };
    case 'customers':
      return { title: 'Müşteriler', headers: ['Ad', 'Tür', 'Şehir', 'Skor'], rows: ops.parties.map((r: any) => [r.name, r.kind, r.city, r.score]) };
    case 'tickets':
    case 'crm':
      return { title: 'Destek', headers: ['Konu', 'Kaynak', 'Durum', 'SLA dk'], rows: ops.cases.map((r: any) => [r.subject, r.source, r.status, r.slaMinutes]) };
    case 'staff':
      return { title: 'Ekip', headers: ['Ad', 'E-posta', 'Masa', 'Bölge', 'Aktif'], rows: ops.staff.map((r: any) => [r.fullName, r.email, r.desk, r.regionCode, r.isActive]) };
    case 'tasks':
      return { title: 'Görevler', headers: ['Başlık', 'Öncelik', 'Durum', 'Deadline'], rows: ops.tasks.map((r: any) => [r.title, r.priority, r.status, r.dueAt]) };
    case 'kyc':
      return { title: 'KYC', headers: ['Unvan', 'Tür', 'Durum'], rows: ops.kycPending.map((r: any) => [r.legalTitle, r.companyType, r.kycStatus]) };
    default:
      return {
        title: 'Operasyon özeti',
        headers: ['Metrik', 'Değer'],
        rows: Object.entries(ops.kpis),
      };
  }
}

export async function GET(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) return unauthorized();
  const desk = await ensureStaffForAdmin(admin.userId);
  const user = await (prisma as any).identityUser.findUnique({ where: { id: admin.userId }, select: { fullName: true } }).catch(() => null);
  const staff = {
    ...admin,
    desk,
    staffId: admin.userId,
    title: 'Yönetici',
    regionCode: null,
    managerUserId: null,
    extraPerms: [],
    revokedPerms: [],
    fullName: user?.fullName || admin.email,
  } as StaffContext;
  const ops = await getOpsSnapshot(staff);
  const slug = request.nextUrl.searchParams.get('slug') || 'command';
  const format = request.nextUrl.searchParams.get('format') || 'xls';
  const table = tableFor(slug, ops);

  if (format === 'pdf') {
    const body = simplePdf(table.title, [table.headers.join(' | '), ...table.rows.map((row) => row.join(' | '))]);
    return new NextResponse(body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${slug}.pdf"`,
      },
    });
  }

  const csv = toCsv(table.headers, table.rows);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'application/vnd.ms-excel; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}.xls"`,
    },
  });
}
