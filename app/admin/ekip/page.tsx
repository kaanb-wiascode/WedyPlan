import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { DESKS } from '@/lib/ops/catalog';
import { createStaffAction, setStaffActiveAction } from '@/lib/actions/ops';
import { AdminHeader, Field, ReportBar, StatusPill } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function TeamPage() {
  const staff = await requireStaff(['SUPER', 'REGION']);
  const ops = await getOpsSnapshot(staff);
  const desks = staff.desk === 'REGION' ? DESKS.filter((d) => d.id === 'SALES') : DESKS.filter((d) => d.id !== 'SUPER');

  return (
    <>
      <AdminHeader
        kicker="Yetki"
        title="Ekip ve masalar"
        description="Muhasebe, satış, bölge ve müşteri hizmetleri kullanıcılarını tanımlayın. Bölge müdürü yalnızca kendi satış ekibini ekleyip yetkisini açıp kapatır."
        actions={<ReportBar slug="staff" />}
      />

      <form action={createStaffAction} className="apple-panel grid gap-3 rounded-[24px] p-5 sm:grid-cols-3">
        <Field name="fullName" label="Ad soyad" required />
        <Field name="email" label="E-posta" type="email" required />
        <Field name="password" label="Geçici şifre" />
        <label className="text-[12px] text-[#86868b]">
          Masa
          <select name="desk" className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]">
            {desks.map((desk) => (
              <option key={desk.id} value={desk.id}>{desk.name}</option>
            ))}
          </select>
        </label>
        <Field name="title" label="Unvan" defaultValue="Uzman" />
        <Field name="regionCode" label="Bölge (IST, ANK, IZM...)" defaultValue={staff.regionCode || ''} />
        <button className="apple-btn sm:col-span-3">Kullanıcı oluştur</button>
      </form>

      <section className="apple-panel overflow-hidden rounded-[24px]">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#f5f5f7] text-[11px] uppercase tracking-wide text-[#86868b]">
            <tr>
              <th className="px-4 py-3">Kişi</th>
              <th className="px-4 py-3">Masa</th>
              <th className="px-4 py-3">Bölge</th>
              <th className="px-4 py-3 text-right">Durum</th>
            </tr>
          </thead>
          <tbody>
            {ops.staff.map((row: any) => (
              <tr key={row.id} className="border-t border-black/5">
                <td className="px-4 py-3">
                  <p className="font-semibold">{row.fullName || row.userId}</p>
                  <p className="text-[12px] text-[#86868b]">{row.email} · {row.title}</p>
                </td>
                <td className="px-4 py-3">{row.desk}</td>
                <td className="px-4 py-3">{row.regionCode || '—'}</td>
                <td className="px-4 py-3 text-right">
                  <form action={setStaffActiveAction} className="inline-flex items-center gap-2">
                    <StatusPill status={row.isActive ? 'ACTIVE' : 'SUSPENDED'} />
                    <input type="hidden" name="id" value={row.id} />
                    <input type="hidden" name="isActive" value={row.isActive ? 'false' : 'true'} />
                    <button className="apple-btn-secondary apple-btn-compact">{row.isActive ? 'Askıya al' : 'Aç'}</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
