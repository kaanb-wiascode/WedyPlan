import React from 'react';
import Link from 'next/link';

export function AdminHeader({
  kicker,
  title,
  description,
  actions,
}: {
  kicker: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="apple-panel flex flex-col gap-4 rounded-[28px] p-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <p className="apple-kicker">{kicker}</p>
        <h1 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f]">{title}</h1>
        {description ? <p className="max-w-2xl text-[13px] leading-relaxed text-[#86868b]">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: string | number;
  hint?: string;
  href?: string;
}) {
  const inner = (
    <div className="apple-panel rounded-[24px] p-5">
      <p className="text-[12px] text-[#86868b]">{label}</p>
      <p className="mt-2 text-[28px] font-semibold tracking-tight text-[#1d1d1f]">{value}</p>
      {hint ? <p className="mt-1 text-[12px] text-[#86868b]">{hint}</p> : null}
    </div>
  );
  if (!href) return inner;
  return <Link href={href}>{inner}</Link>;
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    APPROVED: 'bg-emerald-50 text-emerald-700',
    ACTIVE: 'bg-emerald-50 text-emerald-700',
    PENDING: 'bg-[#0071e3]/10 text-[#0071e3]',
    PENDING_VERIFICATION: 'bg-[#0071e3]/10 text-[#0071e3]',
    SUSPENDED: 'bg-rose-50 text-rose-700',
    REJECTED: 'bg-rose-50 text-rose-700',
    LOCKED: 'bg-rose-50 text-rose-700',
    CONTACTED: 'bg-amber-50 text-amber-700',
    CLOSED: 'bg-zinc-100 text-zinc-600',
  };
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${map[status] || 'bg-zinc-100 text-zinc-600'}`}>
      {status}
    </span>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-[20px] border border-dashed border-black/10 px-6 py-10 text-center text-[13px] text-[#86868b]">
      {text}
    </div>
  );
}

export function formatWhen(value?: string | null) {
  if (!value) return '—';
  return new Date(value).toLocaleString('tr-TR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
