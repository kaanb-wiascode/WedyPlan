import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { sendChatAction } from '@/lib/actions/ops';
import { AdminHeader, formatWhen } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ channel?: string }>;
}) {
  const staff = await requireStaff();
  const { channel } = await searchParams;
  const ops = await getOpsSnapshot(staff);
  const current = ops.channels.find((c: any) => c.id === channel) || ops.channels[0];

  return (
    <>
      <AdminHeader
        kicker="Slack / Teams / Chat"
        title="Ekip sohbeti"
        description="Masalara göre kanallar. Google Chat ve Microsoft Teams köprüleri entegrasyon anahtarından açılır; iç konuşma burada gerçek zamanlı tutulur."
      />
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <aside className="apple-panel space-y-1 rounded-[24px] p-3">
          {ops.channels.map((c: any) => (
            <a key={c.id} href={`/admin/mesajlar?channel=${c.id}`} className={`block rounded-xl px-3 py-2 text-[13px] ${current?.id === c.id ? 'bg-[#0071e3]/10 font-semibold text-[#0071e3]' : ''}`}>
              # {c.name}
            </a>
          ))}
        </aside>
        <section className="apple-panel flex h-[560px] flex-col rounded-[24px] p-4">
          <p className="text-[15px] font-semibold"># {current?.name || 'Kanal yok'}</p>
          <div className="mt-3 flex-1 space-y-2 overflow-y-auto">
            {(current?.messages || []).map((msg: any) => (
              <div key={msg.id} className="rounded-2xl bg-[#f5f5f7] px-3 py-2">
                <p className="text-[11px] text-[#86868b]">{msg.authorName} · {formatWhen(msg.createdAt)}</p>
                <p className="text-[13px]">{msg.body}</p>
              </div>
            ))}
          </div>
          {current ? (
            <form action={sendChatAction} className="mt-3 flex gap-2">
              <input type="hidden" name="channelId" value={current.id} />
              <input name="body" required placeholder="Mesaj yazın" className="h-10 flex-1 rounded-xl border border-black/10 px-3 text-[13px]" />
              <button className="apple-btn">Gönder</button>
            </form>
          ) : null}
        </section>
      </div>
    </>
  );
}
