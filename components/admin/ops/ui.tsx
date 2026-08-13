import React from 'react';
import Link from 'next/link';
import { AdminHeader, EmptyState, MetricCard, StatusPill, formatWhen } from '@/components/admin/cockpit/ui';

export { AdminHeader, EmptyState, MetricCard, StatusPill, formatWhen };

export function money(value?: number | string | null) {
  const n = Number(value || 0);
  return n.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 });
}

export function AlertStrip({ alerts }: { alerts: string[] }) {
  if (alerts.length === 0) {
    return (
      <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-[13px] text-emerald-700">
        Kritik uyarı yok. Operasyon yeşil.
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <div key={alert} className="rounded-2xl bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
          {alert}
        </div>
      ))}
    </div>
  );
}

export function BarRow({
  label,
  value,
  max,
  suffix = '',
}: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[12px]">
        <span className="text-[#1d1d1f]">{label}</span>
        <span className="font-medium text-[#86868b]">
          {suffix === '₺' ? money(value) : `${value}${suffix}`}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#f5f5f7]">
        <div className="h-full rounded-full bg-[#0071e3]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function PulseFeed({ items }: { items: { id: string; title: string; actor: string; createdAt: string | null; category: string }[] }) {
  return (
    <section className="apple-panel space-y-3 rounded-[24px] p-5">
      <h2 className="text-[16px] font-semibold">WedyPulse</h2>
      {items.length === 0 ? (
        <EmptyState text="Henüz canlı olay yok." />
      ) : (
        items.slice(0, 8).map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-3 text-[12px]">
            <div>
              <p className="font-medium text-[#1d1d1f]">{item.title}</p>
              <p className="text-[#86868b]">
                {item.actor} · {item.category}
              </p>
            </div>
            <span className="shrink-0 text-[#86868b]">{formatWhen(item.createdAt)}</span>
          </div>
        ))
      )}
    </section>
  );
}

export function ReportBar({ slug, label }: { slug: string; label?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a href={`/api/admin/reports?slug=${slug}&format=pdf`} className="apple-btn-secondary apple-btn-compact">
        {label || 'PDF'}
      </a>
      <a href={`/api/admin/reports?slug=${slug}&format=xls`} className="apple-btn-secondary apple-btn-compact">
        Excel
      </a>
    </div>
  );
}

export function Field({
  name,
  label,
  defaultValue = '',
  type = 'text',
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-[12px] text-[#86868b]">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px] text-[#1d1d1f]"
      />
    </label>
  );
}

export function TaskList({
  tasks,
  action,
  completeAction,
}: {
  tasks: { id: string; title: string; priority: string; status: string; dueAt: string | null }[];
  action: (formData: FormData) => Promise<void>;
  completeAction: (formData: FormData) => Promise<void>;
}) {
  return (
    <section className="apple-panel space-y-3 rounded-[24px] p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold">Görevlerim</h2>
        <Link href="/admin/gorevler" className="apple-link text-[12px]">
          Tümü
        </Link>
      </div>
      <form action={action} className="grid gap-2 sm:grid-cols-4">
        <input name="title" required placeholder="Yeni görev" className="h-10 rounded-xl border border-black/10 px-3 text-[13px] sm:col-span-2" />
        <input name="dueAt" type="datetime-local" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <button className="apple-btn apple-btn-compact">Ekle</button>
      </form>
      {tasks.length === 0 ? (
        <EmptyState text="Açık görev yok." />
      ) : (
        tasks.slice(0, 6).map((task) => (
          <form key={task.id} action={completeAction} className="flex items-center justify-between gap-3 rounded-xl bg-[#f5f5f7] px-3 py-2">
            <div>
              <p className="text-[13px] font-medium">{task.title}</p>
              <p className="text-[11px] text-[#86868b]">
                {task.priority} · {task.dueAt ? formatWhen(task.dueAt) : 'tarihsiz'}
              </p>
            </div>
            <input type="hidden" name="id" value={task.id} />
            <input type="hidden" name="status" value="DONE" />
            {task.status === 'DONE' ? (
              <StatusPill status="ACTIVE" />
            ) : (
              <button className="apple-btn-secondary apple-btn-compact">Tamam</button>
            )}
          </form>
        ))
      )}
    </section>
  );
}
