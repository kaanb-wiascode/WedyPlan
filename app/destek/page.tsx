import PublicNavbar from '@/components/public/PublicNavbar';

export default function DestekPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <PublicNavbar />
      <main className="mx-auto max-w-xl px-5 py-16">
        <div className="apple-panel rounded-[28px] p-8">
          <p className="apple-kicker">Destek</p>
          <h1 className="mt-2 text-[28px] font-semibold">Size nasıl yardımcı olalım?</h1>
          <p className="mt-2 text-[14px] text-[#86868b]">Çiftler ve ziyaretçiler için müşteri hattı. Mesajınız CRM kuyruğuna düşer.</p>
          <form
            className="mt-6 space-y-3"
            action={async (formData) => {
              'use server';
              const { prisma } = await import('@/lib/db');
              await (prisma as any).supportCase.create({
                data: {
                  source: 'ANONYMOUS',
                  channel: 'FORM',
                  name: String(formData.get('name') || 'Ziyaretçi'),
                  email: String(formData.get('email') || '') || null,
                  subject: String(formData.get('subject') || 'Destek'),
                  body: String(formData.get('message') || ''),
                },
              });
            }}
          >
            <input name="name" placeholder="Adınız" className="h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
            <input name="email" type="email" placeholder="E-posta" className="h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
            <input name="subject" placeholder="Konu" className="h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
            <textarea name="message" required rows={5} className="w-full rounded-xl border border-black/10 px-3 py-2 text-[13px]" />
            <button className="apple-btn w-full">Gönder</button>
          </form>
        </div>
      </main>
    </div>
  );
}
