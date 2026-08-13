import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { replyCaseAction } from '@/lib/actions/ops';
import { AdminHeader, ReportBar } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function ChatPage() {
  const staff = await requireStaff(['SUPER', 'CRM']);
  const ops = await getOpsSnapshot(staff);
  const chats = ops.cases.filter((row: any) => row.channel === 'CHAT' || row.channel === 'FORM');

  return (
    <>
      <AdminHeader
        kicker="Inbox"
        title="Sohbet ve chatbot"
        description="Sitedeki destek widget’ı ve çift portalı buraya düşer. Canned yanıt yerine gerçek ajan notu yazın."
        actions={<ReportBar slug="chat" />}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {chats.map((row: any) => (
          <section key={row.id} className="apple-panel flex h-[420px] flex-col rounded-[24px] p-4">
            <p className="text-[14px] font-semibold">{row.subject}</p>
            <p className="text-[11px] text-[#86868b]">{row.name} · {row.source}</p>
            <div className="mt-3 flex-1 space-y-2 overflow-y-auto">
              <p className="rounded-2xl bg-[#f5f5f7] px-3 py-2 text-[13px]">{row.body}</p>
              {(row.messages || []).map((msg: any) => (
                <p key={msg.id} className="rounded-2xl bg-[#0071e3]/10 px-3 py-2 text-[13px]"><strong>{msg.author}:</strong> {msg.body}</p>
              ))}
            </div>
            <form action={replyCaseAction} className="mt-3 flex gap-2">
              <input type="hidden" name="id" value={row.id} />
              <input name="body" required className="h-10 flex-1 rounded-xl border border-black/10 px-3 text-[13px]" placeholder="Yanıt" />
              <button className="apple-btn apple-btn-compact">Gönder</button>
            </form>
          </section>
        ))}
      </div>
    </>
  );
}
