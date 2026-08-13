import { VendorInbox } from '@/components/vendor/portal/VendorInbox';

export const dynamic = 'force-dynamic';

export default function CoupleMessagesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div>
        <p className="apple-kicker">İletişim</p>
        <h1 className="text-[28px] font-semibold tracking-tight">Firma mesajları</h1>
        <p className="mt-1 text-[14px] text-[#86868b]">Tüm yazışmalar kayıt altındadır. Teklif ve randevu aynı sohbetten yürür.</p>
      </div>
      <VendorInbox perspective="COUPLE" />
    </div>
  );
}
