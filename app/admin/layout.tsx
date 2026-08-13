import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin/require-admin';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  const user = await prisma.identityUser.findUnique({
    where: { id: session.userId },
    select: { fullName: true, email: true },
  });

  return (
    <div className="apple-page flex min-h-screen">
      <AdminSidebar userName={user?.fullName} email={user?.email} />
      <div className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-6xl space-y-5 p-5 sm:p-7">{children}</div>
      </div>
    </div>
  );
}
