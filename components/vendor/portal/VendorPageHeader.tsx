import Link from 'next/link';
import type { ReactNode } from 'react';

export function VendorPageHeader({
  kicker,
  title,
  description,
  action,
}: {
  kicker: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <p className="apple-kicker">{kicker}</p>
        <h1 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f]">{title}</h1>
        <p className="max-w-2xl text-[14px] text-[#86868b]">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function EmptyNote({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl bg-[#f5f5f7] px-4 py-6 text-center text-[13px] text-[#86868b]">{children}</p>;
}

export function PublicLink({ href }: { href?: string | null }) {
  if (!href) return null;
  return (
    <Link href={href} className="apple-link text-[13px]" target="_blank">
      Vitrindeki sayfa
    </Link>
  );
}
