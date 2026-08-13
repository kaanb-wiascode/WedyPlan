import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getDashboardData } from '@/lib/actions/dashboard';
import {
  Sparkles,
  Calendar,
  Clock,
  Wallet,
  CheckCircle2,
  Users,
  Building2,
  Plus,
  MessageSquare,
  Heart,
  ChevronRight,
  ExternalLink,
  CheckSquare,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CiftDashboardPage() {
  const dashRes = await getDashboardData();
  if (!dashRes.success || !dashRes.data) redirect('/giris');

  const { profile, metrics, tasks = [], events = [], threads = [], invitation } = dashRes.data as any;
  const coupleTitle = profile.partnerTwo
    ? `${profile.partnerOne} & ${profile.partnerTwo}`
    : profile.partnerOne;
  const weddingDateRaw = profile.weddingDate ? new Date(profile.weddingDate) : null;
  const daysLeft = weddingDateRaw
    ? Math.max(0, Math.ceil((weddingDateRaw.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;
  const formattedDate = weddingDateRaw
    ? weddingDateRaw.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Tarih yok';
  const focusTasks = (tasks as any[]).filter((t) => !t.isCompleted).slice(0, 4);
  const upcoming = (events as any[]).slice(0, 4);
  const publicSlug = invitation?.slug;

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 font-sans sm:p-8">
      <section className="apple-panel relative overflow-hidden rounded-[28px] p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-3">
            <div className="apple-chip">
              <Heart className="h-3.5 w-3.5" />
              <span>Düğün işletim sistemi</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-4xl">
              {coupleTitle}
            </h1>
            <p className="text-[14px] text-[#86868b]">
              Bütçe, davetli, firma anlaşması ve mesajlar aynı kayıtta. Firma paneli ve admin denetimi buradan beslenir.
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-between gap-4 rounded-2xl bg-[#f5f5f7] p-5 text-center">
            <div>
              <span className="block text-4xl font-semibold tracking-tight">{daysLeft}</span>
              <span className="text-[10px] uppercase tracking-widest text-[#86868b]">Gün kaldı</span>
            </div>
            <div className="h-10 w-px bg-black/10" />
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-[13px] font-medium">
                <Calendar className="h-3.5 w-3.5 text-[#86868b]" />
                {formattedDate}
              </div>
              <div className="text-[11px] text-[#86868b]">Hedef tarih</div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 border-t border-black/8 pt-6">
          <Link href="/cift/butce" className="apple-btn apple-btn-compact inline-flex">
            <Plus className="h-4 w-4" /> Harcama ekle
          </Link>
          <Link href="/cift/davetliler" className="apple-btn-secondary apple-btn-compact inline-flex">
            <Users className="h-4 w-4" /> Davetli ekle
          </Link>
          <Link href="/firmalar" className="apple-btn-secondary apple-btn-compact inline-flex">
            <Building2 className="h-4 w-4" /> Firma bul
          </Link>
        </div>
      </section>

      <section className="apple-panel space-y-3 rounded-[28px] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <h2 className="text-[14px] font-semibold">Hazırlık skoru</h2>
          </div>
          <span className="text-[14px] font-semibold">%{metrics.overallReadiness}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[#f5f5f7]">
          <div className="h-full rounded-full bg-[#0071e3]" style={{ width: `${metrics.overallReadiness}%` }} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Bütçe', value: `₺${Number(metrics.spentBudget || 0).toLocaleString('tr-TR')}`, hint: `Hedef ₺${Number(metrics.targetBudget || 0).toLocaleString('tr-TR')}`, href: '/cift/butce', icon: Wallet, meta: `%${metrics.budgetPercentage}` },
          { label: 'Görevler', value: `${metrics.completedTasks} / ${metrics.totalTasks}`, hint: `${Math.max(0, metrics.totalTasks - metrics.completedTasks)} kalan`, href: '/cift/gorevler', icon: CheckSquare, meta: `%${metrics.taskPercentage}` },
          { label: 'Davetli & LCV', value: `${metrics.acceptedGuests} katılıyor`, hint: `Toplam ${metrics.totalGuests} kişi`, href: '/cift/davetliler', icon: Users, meta: `%${metrics.guestPercentage}` },
          { label: 'Firmalar', value: `${metrics.bookedVendors} anlaşma`, hint: 'Katalog ve teklif aynı süreç', href: '/cift/firmalar', icon: Building2, meta: `${metrics.totalVendorCategories} kayıt` },
        ].map((card) => (
          <div key={card.label} className="apple-panel space-y-3 rounded-[24px] p-5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#86868b]">{card.label}</span>
              <card.icon className="h-4 w-4 text-[#6e6e73]" />
            </div>
            <div className="text-[20px] font-semibold tracking-tight">{card.value}</div>
            <p className="text-[11px] text-[#86868b]">{card.hint}</p>
            <div className="flex items-center justify-between border-t border-black/8 pt-3 text-[12px]">
              <span className="text-[#86868b]">{card.meta}</span>
              <Link href={card.href} className="inline-flex items-center font-semibold">
                Detay <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="apple-panel space-y-4 rounded-[28px] p-6">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-[16px] font-semibold">
                <Clock className="h-4 w-4 text-[#86868b]" /> Açık görevler
              </h3>
              <Link href="/cift/gorevler" className="text-[12px] font-semibold">Tümü</Link>
            </div>
            {focusTasks.length === 0 ? (
              <p className="text-[13px] text-[#86868b]">Açık görev yok. Onboarding veya görevler sayfasından ekleyin.</p>
            ) : (
              focusTasks.map((task: any) => (
                <div key={task.id} className="flex items-center justify-between rounded-2xl bg-[#f5f5f7] px-4 py-3">
                  <span className="text-[13px] font-medium">{task.title}</span>
                  <span className="text-[11px] text-[#86868b]">{task.category}</span>
                </div>
              ))
            )}
          </div>

          <div className="apple-panel space-y-4 rounded-[28px] p-6">
            <h3 className="flex items-center gap-2 text-[16px] font-semibold">
              <Calendar className="h-4 w-4 text-[#86868b]" /> Firma randevuları
            </h3>
            {upcoming.length === 0 ? (
              <p className="text-[13px] text-[#86868b]">Firma takviminden randevu düşünce burada görünür.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {upcoming.map((event: any) => {
                  const d = new Date(event.startsAt);
                  return (
                    <div key={event.id} className="flex gap-3 rounded-2xl bg-[#f5f5f7] p-4">
                      <div className="min-w-[44px] rounded-xl bg-[#1d1d1f] p-2 text-center text-white">
                        <span className="block text-[10px] uppercase">{d.toLocaleDateString('tr-TR', { month: 'short' })}</span>
                        <span className="block text-base font-semibold">{d.getDate()}</span>
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold">{event.title}</h4>
                        <p className="text-[11px] text-[#86868b]">{event.coupleNames || event.kind}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="apple-panel space-y-4 rounded-[28px] p-6">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-[14px] font-semibold">
                <MessageSquare className="h-4 w-4" /> Firma mesajları
              </h3>
              <Link href="/cift/messages" className="text-[12px] font-semibold">Tümü</Link>
            </div>
            {threads.length === 0 ? (
              <p className="text-[13px] text-[#86868b]">Katalogdan yazın; sohbet admin denetiminde tutulur.</p>
            ) : (
              threads.map((m: any) => (
                <div key={m.id} className="rounded-2xl bg-[#f5f5f7] p-3">
                  <div className="flex justify-between text-[12px] font-semibold">
                    <span>{m.vendorName}</span>
                    <span className="font-normal text-[#86868b]">
                      {m.lastAt ? new Date(m.lastAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                  <p className="line-clamp-1 text-[11px] text-[#86868b]">{m.lastBody || 'Sohbet açıldı'}</p>
                </div>
              ))
            )}
          </div>

          <div className="apple-panel space-y-3 rounded-[28px] p-6">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#86868b]">Dijital davetiye</span>
              <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${invitation?.published ? 'bg-emerald-50 text-emerald-700' : 'bg-[#f5f5f7] text-[#86868b]'}`}>
                {invitation?.published ? 'Yayında' : 'Taslak'}
              </span>
            </div>
            <h4 className="text-[14px] font-semibold">{publicSlug ? `wedyplan.com/dugun/${publicSlug}` : 'Henüz slug yok'}</h4>
            <p className="text-[11px] text-[#86868b]">LCV yanıtları davetli listesine düşer.</p>
            <div className="flex gap-2 pt-2">
              <Link href="/cift/dijital-davetiye" className="apple-btn-secondary apple-btn-compact flex-1 text-center">Düzenle</Link>
              {publicSlug ? (
                <a href={`/dugun/${publicSlug}`} target="_blank" rel="noreferrer" className="flex items-center rounded-xl border border-black/10 px-3">
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <Link href="/cift/ai-asistan" className="apple-panel flex items-center justify-between rounded-[28px] p-6">
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold">
              <Sparkles className="h-4 w-4" /> Asistan
            </span>
            <ChevronRight className="h-4 w-4 text-[#86868b]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
