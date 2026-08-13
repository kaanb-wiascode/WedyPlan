import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { saveSkuAction } from '@/lib/actions/ops';
import { AdminHeader, Field, ReportBar, money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function StockPage() {
  const staff = await requireStaff(['SUPER', 'FINANCE', 'REGION']);
  const ops = await getOpsSnapshot(staff);
  const write = staff.desk !== 'REGION';

  return (
    <>
      <AdminHeader
        kicker="Envanter"
        title="Stok"
        description="Depo, SKU ve yeniden sipariş eşiği. Kritik stoklar finans kokpitinde kırmızı uyarı olur."
        actions={<ReportBar slug="stock" />}
      />
      {write ? (
        <form action={saveSkuAction} className="apple-panel grid gap-3 rounded-[24px] p-5 sm:grid-cols-4">
          <Field name="sku" label="SKU" required />
          <Field name="name" label="Ürün" required />
          <Field name="quantity" label="Adet" type="number" />
          <Field name="unitCost" label="Birim maliyet" type="number" />
          <Field name="warehouse" label="Depo" defaultValue="Merkez" />
          <Field name="reorderAt" label="Min. stok" type="number" defaultValue={5} />
          <button className="apple-btn sm:col-span-4">Kaydet</button>
        </form>
      ) : null}
      <section className="apple-panel overflow-hidden rounded-[24px]">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#f5f5f7] text-[11px] uppercase tracking-wide text-[#86868b]">
            <tr>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Ad</th>
              <th className="px-4 py-3">Adet</th>
              <th className="px-4 py-3">Maliyet</th>
            </tr>
          </thead>
          <tbody>
            {ops.skus.map((row: any) => (
              <tr key={row.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-mono text-[12px]">{row.sku}</td>
                <td className="px-4 py-3">{row.name}<div className="text-[11px] text-[#86868b]">{row.warehouse}</div></td>
                <td className={`px-4 py-3 ${row.quantity <= row.reorderAt ? 'text-rose-600 font-semibold' : ''}`}>{row.quantity} {row.unit}</td>
                <td className="px-4 py-3">{money(row.unitCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
