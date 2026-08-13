'use client';

import React, { useState } from 'react';
import { flagInboxMessageAction, adminReplyInboxAction, getAdminInboxAction } from '@/lib/actions/vendor-messages';
import { formatWhen } from '@/components/admin/cockpit/ui';

export function VendorMessageAudit({ initial }: { initial: any[] }) {
  const [threads, setThreads] = useState(initial);
  const [active, setActive] = useState<any>(initial[0] || null);
  const [draft, setDraft] = useState('');

  const reload = async () => {
    const res = await getAdminInboxAction();
    if (res.success) {
      setThreads(res.threads);
      setActive((current: any) => res.threads.find((t: any) => t.id === current?.id) || res.threads[0] || null);
    }
  };

  return (
    <div className="grid min-h-[560px] overflow-hidden rounded-[24px] border border-black/8 bg-white lg:grid-cols-[300px_1fr]">
      <aside className="border-r border-black/8">
        {threads.length === 0 ? (
          <p className="p-4 text-[13px] text-[#86868b]">Henüz firma–çift sohbeti yok.</p>
        ) : (
          threads.map((thread: any) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => setActive(thread)}
              className={`block w-full px-4 py-3 text-left ${active?.id === thread.id ? 'bg-[#0071e3]/8' : ''}`}
            >
              <p className="text-[13px] font-semibold">{thread.vendorName}</p>
              <p className="text-[12px] text-[#86868b]">{thread.coupleNames}</p>
              <p className="line-clamp-1 text-[11px] text-[#86868b]">{thread.lastBody}</p>
            </button>
          ))
        )}
      </aside>
      <section className="flex flex-col">
        <div className="border-b border-black/8 px-5 py-3">
          <p className="text-[15px] font-semibold">{active ? `${active.vendorName} × ${active.coupleNames}` : 'Sohbet seçin'}</p>
          <p className="text-[11px] text-[#86868b]">{active?.messageCount || 0} mesaj · tümü kayıt altında</p>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto p-5">
          {(active?.messages || []).map((msg: any) => (
            <div key={msg.id} className={`rounded-2xl px-3 py-2 text-[13px] ${msg.isSpam ? 'bg-rose-50' : 'bg-[#f5f5f7]'}`}>
              <p>{msg.body}</p>
              <div className="mt-1 flex items-center justify-between text-[11px] text-[#86868b]">
                <span>{formatWhen(msg.createdAt)}</span>
                <button
                  type="button"
                  className="text-rose-600"
                  onClick={async () => {
                    await flagInboxMessageAction(msg.id, 'Admin işaretledi');
                    await reload();
                  }}
                >
                  İşaretle
                </button>
              </div>
            </div>
          ))}
        </div>
        {active ? (
          <form
            className="flex gap-2 border-t border-black/8 p-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              await adminReplyInboxAction(active.conversationId, draft);
              setDraft('');
              await reload();
            }}
          >
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Denetim / arabulucu mesajı" className="h-11 flex-1 rounded-xl border border-black/10 px-3 text-[13px]" />
            <button className="apple-btn apple-btn-compact">Yaz</button>
          </form>
        ) : null}
      </section>
    </div>
  );
}
