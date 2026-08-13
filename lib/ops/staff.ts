import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin/require-admin';
import type { WedyJWTPayload } from '@/lib/auth/jwt';
import type { OpsDesk } from '@/lib/ops/catalog';
import { deskHome } from '@/lib/ops/catalog';

const db = prisma as any;

export type StaffContext = WedyJWTPayload & {
  desk: OpsDesk;
  staffId: string;
  title: string;
  regionCode: string | null;
  managerUserId: string | null;
  extraPerms: string[];
  revokedPerms: string[];
  fullName: string;
};

export async function ensureStaffForAdmin(userId: string): Promise<StaffContext['desk']> {
  const existing = await db.adminStaff.findUnique({ where: { userId } }).catch(() => null);
  if (existing) return existing.desk as OpsDesk;
  await db.adminStaff.create({
    data: { userId, desk: 'SUPER', title: 'Süper Admin', isActive: true },
  }).catch(() => null);
  return 'SUPER';
}

export async function requireStaff(allowed?: OpsDesk[]): Promise<StaffContext> {
  const session = await requireAdmin();
  let row = await db.adminStaff.findUnique({ where: { userId: session.userId } }).catch(() => null);
  if (!row) {
    await ensureStaffForAdmin(session.userId);
    row = await db.adminStaff.findUnique({ where: { userId: session.userId } }).catch(() => null);
  }
  const user = await db.identityUser.findUnique({
    where: { id: session.userId },
    select: { fullName: true },
  }).catch(() => null);

  const desk = (row?.desk || 'SUPER') as OpsDesk;
  const ctx: StaffContext = {
    ...session,
    desk,
    staffId: row?.id || session.userId,
    title: row?.title || 'Yönetici',
    regionCode: row?.regionCode || null,
    managerUserId: row?.managerUserId || null,
    extraPerms: row?.extraPerms || [],
    revokedPerms: row?.revokedPerms || [],
    fullName: user?.fullName || session.email,
  };

  if (desk === 'SUPER') return ctx;
  if (allowed && allowed.length > 0 && !allowed.includes(desk)) {
    redirect(deskHome(desk));
  }
  if (row && row.isActive === false) redirect('/giris');
  return ctx;
}

export function canWriteFinance(staff: StaffContext) {
  if (staff.desk === 'SUPER') return true;
  if (staff.desk === 'FINANCE') return true;
  return false;
}

export function canApproveDeals(staff: StaffContext) {
  return staff.desk === 'SUPER' || staff.desk === 'REGION';
}

export function salesScopeUserIds(staff: StaffContext, teamIds: string[]) {
  if (staff.desk === 'SUPER' || staff.desk === 'REGION') return teamIds;
  return [staff.userId];
}
