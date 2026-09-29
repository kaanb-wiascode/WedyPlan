import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin/require-admin';
import type { WedyJWTPayload } from '@/lib/auth/jwt';
import type { OpsDesk } from '@/lib/ops/catalog';
import { deskHome } from '@/lib/ops/catalog';

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

async function hasSuperAdminRole(userId: string): Promise<boolean> {
  const profile = await prisma.portalProfile.findUnique({
    where: {
      userId_portal: {
        userId,
        portal: 'ADMIN',
      },
    },
    include: {
      roles: {
        select: { code: true },
      },
    },
  });

  return Boolean(
    profile?.roles.some((role) => role.code === 'SUPER_ADMINISTRATOR'),
  );
}

export async function ensureStaffForAdmin(
  userId: string,
): Promise<StaffContext['desk']> {
  const existing = await prisma.adminStaff.findUnique({
    where: { userId },
  });

  if (existing) {
    return existing.desk as OpsDesk;
  }

  if (!(await hasSuperAdminRole(userId))) {
    throw new Error('Bu yönetici için operasyon personeli yetkisi tanımlı değil.');
  }

  const created = await prisma.adminStaff.create({
    data: {
      userId,
      desk: 'SUPER',
      title: 'Süper Admin',
      isActive: true,
    },
  });

  return created.desk as OpsDesk;
}

export async function requireStaff(
  allowed?: OpsDesk[],
): Promise<StaffContext> {
  const session = await requireAdmin();

  let row = await prisma.adminStaff.findUnique({
    where: { userId: session.userId },
  });

  if (!row) {
    await ensureStaffForAdmin(session.userId);
    row = await prisma.adminStaff.findUnique({
      where: { userId: session.userId },
    });
  }

  if (!row || row.isActive === false) {
    redirect('/giris');
  }

  const user = await prisma.identityUser.findUnique({
    where: { id: session.userId },
    select: { fullName: true },
  });

  const desk = row.desk as OpsDesk;
  const ctx: StaffContext = {
    ...session,
    desk,
    staffId: row.id,
    title: row.title,
    regionCode: row.regionCode,
    managerUserId: row.managerUserId,
    extraPerms: row.extraPerms,
    revokedPerms: row.revokedPerms,
    fullName: user?.fullName || session.email,
  };

  if (desk === 'SUPER') return ctx;

  if (allowed && allowed.length > 0 && !allowed.includes(desk)) {
    redirect(deskHome(desk));
  }

  return ctx;
}

export function canWriteFinance(staff: StaffContext) {
  return staff.desk === 'SUPER' || staff.desk === 'FINANCE';
}

export function canApproveDeals(staff: StaffContext) {
  return staff.desk === 'SUPER' || staff.desk === 'REGION';
}

export function salesScopeUserIds(
  staff: StaffContext,
  teamIds: string[],
) {
  if (staff.desk === 'SUPER' || staff.desk === 'REGION') {
    return teamIds;
  }
  return [staff.userId];
}
