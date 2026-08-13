'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CockpitSnapshot } from '@/lib/admin/cockpit-data';

export function LiveClock({ initial }: { initial: string }) {
  const [stamp, setStamp] = useState(initial);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      fetch('/api/admin/cockpit')
        .then((res) => res.json())
        .then((payload) => {
          const data = payload?.data as CockpitSnapshot | undefined;
          if (data?.generatedAt) {
            setStamp(data.generatedAt);
            router.refresh();
          }
        })
        .catch(() => {});
    }, 8000);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex items-center gap-2 rounded-full bg-[#0071e3]/10 px-3 py-1.5 text-[12px] font-medium text-[#0071e3]">
      <span className="h-2 w-2 animate-pulse rounded-full bg-[#0071e3]" />
      Canlı · {new Date(stamp).toLocaleTimeString('tr-TR')}
    </div>
  );
}
