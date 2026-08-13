import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCoupleWorkspace } from '@/lib/couple/workspace';
import { money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function PaymentsPage() {
  const data = await getCoupleWorkspace();
  if (!data) redirect('/giris');
  const rows = data.payments as any[];
  const due = rows.filter((row) => row.status !== 'PAID').reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const paid = rows.filter((row) => row.status === 'PAID').reduce((sum, row) => sum + Number(row.amount || 0), 0);

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <p className="apple-kicker">Ödeme</p>
        <h1 className="text-[28px] font-semibold tracking-tight">Firma ödeme talepleri</h1>
        <p className="mt-1 text-[14px] text-[#86868b]">
          Kart saklanmaz. Firmaların kestiği talepler burada; admin ve firma finans paneli aynı kaydı görür.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="apple-panel rounded-[24px] p-5">
          <p className="text-[12px] text-[#86868b]">Ödenen</p>
          <p className="text-[22px] font-semibold">{money(paid)}</p>
        </div>
        <div className="apple-panel rounded-[24px] p-5">
          <p className="text-[12px] text-[#86868b]">Bekleyen</p>
          <p className="text-[22px] font-semibold">{money(due)}</p>
        </div>
      </div>
      {rows.length === 0 ? (
        <p className="apple-panel rounded-[24px] p-6 text-[13px] text-[#86868b]">
          Henüz talep yok. Anlaşma sonrası firma finans ekranından talep düşünce burada belirir.
        </p>
      ) : (
        rows.map((row) => (
          <div key={row.id} className="apple-panel flex flex-wrap items-center justify-between gap-2 rounded-[20px] p-4">
            <div>
              <p className="text-[14px] font-semibold">{row.description}</p>
              <p className="text-[12px] text-[#86868b]">{row.coupleNames} · {row.dueDate || 'vade yok'}</p>
            </div>
            <div className="text-right">
              <p className="text-[14px] font-semibold">{money(row.amount)}</p>
              <p className="text-[11px] text-[#86868b]">{row.status}</p>
            </div>
          </div>
        ))
      )}
      <Link href="/cift/firmalar" className="apple-btn-secondary apple-btn-compact inline-flex">Anlaşmalara dön</Link>
    </div>
  );
}
