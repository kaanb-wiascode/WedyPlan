import React from 'react';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/ops/staff';
import { ensureOpsDefaults } from '@/lib/ops/data';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { PortalShell } from '@/components/shared/layout/PortalShell';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const staff = await requireStaff();
  await ensureOpsDefaults(staff.userId);
  const user = await prisma.identityUser.findUnique({
    where: { id: staff.userId },
    select: { fullName: true, email: true },
  });

  return (
    <PortalShell
      logoVariant="admin"
      sidebar={
        <AdminSidebar
          userName={user?.fullName}
          email={user?.email}
          desk={staff.desk}
          title={staff.title}
        />
      }
    >
      <div className="min-h-dvh overflow-y-auto">
        <div className="mx-auto w-full max-w-6xl space-y-5 p-4 sm:p-5 md:p-7">{children}</div>
      </div>
    </PortalShell>
  );
}
