import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { submitPublicRsvpAction } from '@/lib/actions/couple-workspace';

export const dynamic = 'force-dynamic';

const db = prisma as any;

export default async function PublicWeddingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const invitation = await db.coupleInvitation.findUnique({ where: { slug } }).catch(() => null);
  if (!invitation) notFound();
  const couple = await db.couple.findUnique({ where: { id: invitation.coupleId } }).catch(() => null);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col justify-between px-6 py-12">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[#86868b]">WedyPlan davetiye</p>
        <div className="space-y-4 text-center">
          <p className="text-[13px] uppercase tracking-[0.25em] text-[#86868b]">Birlikte kutlamaya davetlisiniz</p>
          <h1 className="text-[48px] font-semibold tracking-tight sm:text-[64px]">{invitation.title}</h1>
          <p className="mx-auto max-w-md text-[16px] text-[#86868b]">{invitation.welcomeMessage}</p>
          <p className="text-[14px]">{invitation.dateLabel} {invitation.timeLabel ? `· ${invitation.timeLabel}` : ''}</p>
          <p className="text-[14px] text-[#86868b]">{invitation.venueName} {invitation.address}</p>
        </div>
        <form action={submitPublicRsvpAction} className="apple-panel mt-10 space-y-3 rounded-[28px] p-6">
          <input type="hidden" name="slug" value={slug} />
          <h2 className="text-[18px] font-semibold">Katılım (LCV)</h2>
          <input name="guestName" required placeholder="Adınız" className="h-11 w-full rounded-xl border border-black/10 px-3 text-[14px]" />
          <input name="phone" placeholder="Telefon" className="h-11 w-full rounded-xl border border-black/10 px-3 text-[14px]" />
          <input name="email" type="email" placeholder="E-posta" className="h-11 w-full rounded-xl border border-black/10 px-3 text-[14px]" />
          {invitation.askDietary ? (
            <input name="dietary" placeholder="Beslenme tercihi" className="h-11 w-full rounded-xl border border-black/10 px-3 text-[14px]" />
          ) : null}
          {invitation.askSongRequest ? (
            <input name="songRequest" placeholder="Şarkı isteği" className="h-11 w-full rounded-xl border border-black/10 px-3 text-[14px]" />
          ) : null}
          <select name="attending" className="h-11 w-full rounded-xl border border-black/10 px-3 text-[14px]">
            <option value="yes">Katılıyorum</option>
            <option value="no">Katılamıyorum</option>
          </select>
          <input name="plusOneCount" type="number" min={0} defaultValue={0} className="h-11 w-full rounded-xl border border-black/10 px-3 text-[14px]" />
          <button className="apple-btn w-full">Gönder</button>
          <p className="text-center text-[11px] text-[#86868b]">
            Yanıt {couple?.partnerOneName || 'çift'} panosundaki davetli listesine düşer.
          </p>
        </form>
      </section>
    </div>
  );
}
