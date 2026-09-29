import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
  StatusPill,
  money,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminFinancePage() {
  await requireStaff(['SUPER', 'FINANCE']);

  const [
    successful,
    pendingCount,
    disputedCount,
    refundedCount,
    recent,
  ] = await Promise.all([
    prisma.paymentTransaction.aggregate({
      where: { status: 'SUCCESS' },
      _sum: {
        grossAmount: true,
        platformCommission: true,
        vendorNetAmount: true,
        taxAmount: true,
      },
      _count: { _all: true },
    }),
    prisma.paymentTransaction.count({
      where: { status: { in: ['PENDING', 'AUTHORIZED'] } },
    }),
    prisma.paymentTransaction.count({ where: { status: 'DISPUTED' } }),
    prisma.paymentTransaction.count({
      where: { status: { in: ['REFUNDED', 'PARTIALLY_REFUNDED'] } },
    }),
    prisma.paymentTransaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true,
        type: true,
        provider: true,
        status: true,
        grossAmount: true,
        platformCommission: true,
        vendorNetAmount: true,
        currency: true,
        createdAt: true,
      },
    }),
  ]);

  const gross = Number(successful._sum.grossAmount || 0);
  const commission = Number(successful._sum.platformCommission || 0);
  const vendorNet = Number(successful._sum.vendorNetAmount || 0);
  const tax = Number(successful._sum.taxAmount || 0);

  return (
    <>
      <AdminHeader
        kicker="Gerçek ödeme kayıtları"
        title="Finans"
        description="Bu ekran yalnızca PaymentTransaction tablosundaki gerçek işlem durumlarını ve tutarlarını gösterir. Escrow veya banka payout sağlayıcısı bağlı değilken böyle bir bakiye varmış gibi gösterilmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Başarılı ödeme hacmi"
          value={money(gross)}
          hint={`${successful._count._all} başarılı işlem`}
        />
        <MetricCard
          label="Platform komisyonu"
          value={money(commission)}
          hint="SUCCESS işlemlerinden"
        />
        <MetricCard
          label="Vendor net tutarı"
          value={money(vendorNet)}
          hint="SUCCESS işlemlerinden"
        />
        <MetricCard
          label="Vergi toplamı"
          value={money(tax)}
          hint="SUCCESS işlemlerinden"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Bekleyen / authorize" value={pendingCount} />
        <MetricCard label="İhtilaflı" value={disputedCount} />
        <MetricCard label="İade / kısmi iade" value={refundedCount} />
      </div>

      <section className="apple-panel space-y-4 rounded-[24px] p-5">
        <div>
          <h2 className="text-[16px] font-semibold">Son ödeme işlemleri</h2>
          <p className="text-[12px] text-[#86868b]">
            Payout, escrow ve chargeback operasyonu yalnız gerçek provider/persistence bağlandığında aktif edilir.
          </p>
        </div>

        {recent.length === 0 ? (
          <EmptyState text="Henüz ödeme işlemi bulunmuyor." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-[12px]">
              <thead className="text-[#86868b]">
                <tr>
                  <th className="py-2">İşlem</th>
                  <th className="py-2">Tür</th>
                  <th className="py-2">Sağlayıcı</th>
                  <th className="py-2">Brüt</th>
                  <th className="py-2">Komisyon</th>
                  <th className="py-2">Vendor net</th>
                  <th className="py-2">Durum</th>
                  <th className="py-2">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((row) => (
                  <tr key={row.id} className="border-t border-black/8">
                    <td className="py-3 font-mono">{row.id.slice(0, 8)}</td>
                    <td className="py-3">{row.type}</td>
                    <td className="py-3">{row.provider}</td>
                    <td className="py-3">
                      {Number(row.grossAmount).toLocaleString('tr-TR')} {row.currency}
                    </td>
                    <td className="py-3">
                      {Number(row.platformCommission).toLocaleString('tr-TR')} {row.currency}
                    </td>
                    <td className="py-3">
                      {Number(row.vendorNetAmount).toLocaleString('tr-TR')} {row.currency}
                    </td>
                    <td className="py-3">
                      <StatusPill status={row.status} />
                    </td>
                    <td className="py-3">
                      {row.createdAt.toLocaleString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="apple-panel rounded-[24px] p-5">
        <EmptyState text="Gerçek payout/escrow sağlayıcısı henüz bağlı değil. Bu nedenle yönetim paneli banka transferi, toplu hakediş veya chargeback gönderimi yapmaz." />
      </section>
    </>
  );
}
