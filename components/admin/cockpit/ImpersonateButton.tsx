'use client';

import { useState } from 'react';
import { Ghost, Loader2 } from 'lucide-react';

export function ImpersonateButton({
  targetUserId,
  portal,
  label = 'Portalına gir',
}: {
  targetUserId: string;
  portal: 'COUPLE' | 'VENDOR';
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function enter() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/impersonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId, portal }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Giriş başarısız.');
        setLoading(false);
        return;
      }
      window.location.href = data.redirectUrl;
    } catch {
      setError('Bağlantı hatası.');
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button type="button" onClick={enter} disabled={loading} className="apple-btn apple-btn-compact inline-flex items-center gap-1.5">
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Ghost className="h-3.5 w-3.5" />}
        {label}
      </button>
      {error ? <span className="text-[11px] text-rose-600">{error}</span> : null}
    </div>
  );
}
