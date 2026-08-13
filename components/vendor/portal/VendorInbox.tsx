'use client';

import React, { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import {
  getInboxAction,
  markInboxReadAction,
  sendInboxMessageAction,
} from '@/lib/actions/vendor-messages';
import { MessageSquare, Send, ShieldCheck } from 'lucide-react';

type Thread = {
  id: string;
  conversationId: string;
  vendorName: string;
  coupleNames: string;
  unreadCount: number;
  messages: { id: string; body: string; createdAt: string; isMine: boolean; isSpam?: boolean; senderUserId: string }[];
};

export function VendorInbox({
  perspective,
}: {
  perspective: 'VENDOR' | 'COUPLE';
}) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [pending, start] = useTransition();
  const endRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    const res = await getInboxAction();
    if (res.success) {
      setThreads(res.threads as Thread[]);
      setActiveId((current) => current || res.threads[0]?.conversationId || null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, threads]);

  const active = useMemo(
    () => threads.find((t) => t.conversationId === activeId) || null,
    [threads, activeId]
  );

  useEffect(() => {
    if (activeId) markInboxReadAction(activeId);
  }, [activeId]);

  const send = () => {
    if (!draft.trim() || !activeId) return;
    const text = draft;
    setDraft('');
    start(async () => {
      await sendInboxMessageAction(activeId, text);
      await load();
    });
  };

  return (
    <div className="grid min-h-[640px] overflow-hidden rounded-[28px] border border-black/8 bg-white lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-black/8 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2 px-4 py-4">
          <MessageSquare className="h-4 w-4 text-[#0071e3]" />
          <p className="text-[13px] font-semibold">Konuşmalar</p>
        </div>
        <div className="max-h-[280px] overflow-y-auto lg:max-h-[580px]">
          {threads.length === 0 ? (
            <p className="px-4 pb-4 text-[13px] text-[#86868b]">Henüz mesaj yok. Teklif veya vitrinden sohbet başlar.</p>
          ) : (
            threads.map((thread) => (
              <button
                key={thread.conversationId}
                type="button"
                onClick={() => setActiveId(thread.conversationId)}
                className={`flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left ${
                  activeId === thread.conversationId ? 'bg-[#0071e3]/8' : 'hover:bg-black/3'
                }`}
              >
                <span className="text-[13px] font-semibold text-[#1d1d1f]">
                  {perspective === 'VENDOR' ? thread.coupleNames : thread.vendorName}
                </span>
                <span className="line-clamp-1 text-[11px] text-[#86868b]">
                  {thread.messages.at(-1)?.body || 'Sohbet açıldı'}
                </span>
                {thread.unreadCount > 0 ? (
                  <span className="mt-1 rounded-full bg-[#0071e3] px-1.5 text-[10px] text-white">{thread.unreadCount}</span>
                ) : null}
              </button>
            ))
          )}
        </div>
      </aside>
      <section className="flex min-h-[420px] flex-col">
        <div className="flex items-center justify-between border-b border-black/8 px-5 py-4">
          <div>
            <p className="text-[15px] font-semibold">
              {perspective === 'VENDOR' ? active?.coupleNames || 'Sohbet' : active?.vendorName || 'Sohbet'}
            </p>
            <p className="text-[11px] text-[#86868b]">WedyPlan üzerinden, admin denetimine açık</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#86868b]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0071e3]" /> Kayıt altında
          </span>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {(active?.messages || []).map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] ${
                  msg.isMine ? 'bg-[#0071e3] text-white' : 'bg-[#f5f5f7] text-[#1d1d1f]'
                } ${msg.isSpam ? 'ring-1 ring-rose-400' : ''}`}
              >
                {msg.body}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <form
          className="flex gap-2 border-t border-black/8 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Mesaj yazın…"
            className="h-11 flex-1 rounded-xl border border-black/10 px-3 text-[13px]"
          />
          <button type="submit" disabled={pending} className="apple-btn apple-btn-compact">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </section>
    </div>
  );
}
