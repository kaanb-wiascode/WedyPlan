import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { createInvoiceAction, sendGibInvoiceAction, saveIntegrationAction } from '@/lib/actions/ops';
import { AdminHeader, Field, ReportBar, StatusPill, formatWhen, money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function InvoicesPage() {
  const staff = await requireStaff(['SUPER', 'FINANCE', 'REGION']);
  const ops = await getOpsSnapshot(staff);
  const write = staff.desk !== 'REGION';

  return (
    <>
      <AdminHeader
        kicker="GİB"
        title="Faturalar ve e-belge"
        description="e-Fatura / e-Arşiv kuyruğu. GİB API anahtarı bağlandığında gönderim gerçek entegrasyona düşer; şimdilik kuyruk ve UUID üretilir."
        actions={<ReportBar slug="invoices" />}
      />
      {write ? (
        <form action={createInvoiceAction} className="apple-panel grid gap-3 rounded-[24px] p-5 sm:grid-cols-4">
          <Field name="partyName" label="Cari" required />
          <Field name="partyTaxNo" label="VKN" />
          <Field name="subTotal" label="Matrah" type="number" required />
          <Field name="description" label="Açıklama" />
          <button className="apple-btn sm:col-span-4">Kes</button>
        </form>
      ) : null}
      <section className="apple-panel overflow-hidden rounded-[24px]">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#f5f5f7] text-[11px] uppercase tracking-wide text-[#86868b]">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Cari</th>
              <th className="px-4 py-3">Tutar</th>
              <th className="px-4 py-3">GİB</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {ops.invoices.map((row: any) => (
              <tr key={row.id} className="border-t border-black/5">
                <td className="px-4 py-3 font-mono text-[12px]">{row.number}</td>
                <td className="px-4 py-3">{row.partyName}<div className="text-[11px] text-[#86868b]">{formatWhen(row.issuedAt)}</div></td>
                <td className="px-4 py-3">{money(row.grandTotal)}</td>
                <td className="px-4 py-3"><StatusPill status={row.gibStatus} /></td>
                <td className="px-4 py-3 text-right">
                  {write ? (
                    <form action={sendGibInvoiceAction}>
                      <input type="hidden" name="id" value={row.id} />
                      <button className="apple-btn-secondary apple-btn-compact">GİB gönder</button>
                    </form>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {staff.desk === 'SUPER' ? (
        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Entegrasyon anahtarları</h2>
          {ops.integrations.map((item: any) => (
            <form key={item.key} action={saveIntegrationAction} className="grid gap-2 rounded-2xl bg-[#f5f5f7] p-3 sm:grid-cols-4">
              <input type="hidden" name="key" value={item.key} />
              <p className="text-[13px] font-medium sm:col-span-1">{item.label}</p>
              <input name="value" defaultValue={item.value} placeholder="API anahtarı / JSON" className="h-10 rounded-xl border border-black/10 px-3 text-[13px] sm:col-span-2" />
              <div className="flex gap-2">
                <select name="isEnabled" defaultValue={item.isEnabled ? 'true' : 'false'} className="h-10 rounded-xl border border-black/10 px-2 text-[12px]">
                  <option value="false">Kapalı</option>
                  <option value="true">Açık</option>
                </select>
                <button className="apple-btn-secondary apple-btn-compact">Kaydet</button>
              </div>
            </form>
          ))}
        </section>
      ) : null}
    </>
  );
}
