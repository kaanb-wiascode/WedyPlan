import { requireStaff } from '@/lib/ops/staff';
import { generateAIVectorAnalyticsAction } from '@/lib/actions/ai-vector-platform';
import VectorSearchExplorerTable from '@/components/admin/ai-vector/VectorSearchExplorerTable';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminAIVectorPage() {
  await requireStaff(['SUPER']);
  const report = await generateAIVectorAnalyticsAction();

  if (!report.success) {
    return (
      <>
        <AdminHeader
          kicker="Arama altyapısı"
          title="Vektör indeksleme"
          description="Anlamsal arama indeksleri ve embedding durumu."
        />
        <EmptyState text="Vektör analitiği şu anda okunamıyor." />
      </>
    );
  }

  const collections = report.collections || [];

  return (
    <>
      <AdminHeader
        kicker="Gerçek arama altyapısı"
        title="Vektör indeksleme"
        description="SearchIndexRegistry kayıtları, embedding durumu ve gerçek cosine similarity araması."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="İndekslenmiş kayıt"
          value={report.totalIndexedVectors}
        />
        <MetricCard
          label="İndeks sağlığı"
          value={`%${report.vectorHealthScore}`}
        />
        <MetricCard
          label="Ortalama arama süresi"
          value={`${report.avgSearchLatencyMs} ms`}
        />
        <MetricCard
          label="Vektör boyutu"
          value={report.vectorDimensions || 'Henüz veri yok'}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="apple-panel space-y-4 rounded-[24px] p-5 lg:col-span-2">
          <div>
            <h2 className="text-[16px] font-semibold">İndeks koleksiyonları</h2>
            <p className="text-[12px] text-[#86868b]">
              Bu sayılar doğrudan SearchIndexRegistry tablosundan okunur.
            </p>
          </div>

          {collections.length === 0 ? (
            <EmptyState text="Henüz indekslenmiş içerik bulunmuyor." />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {collections.map((collection) => (
                <div
                  key={collection.sourceType}
                  className="rounded-2xl border border-black/8 bg-white p-4"
                >
                  <p className="text-[11px] uppercase tracking-wide text-[#86868b]">
                    {collection.sourceType}
                  </p>
                  <p className="mt-1 text-[22px] font-semibold">
                    {collection.count.toLocaleString('tr-TR')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Embedding durumu</h2>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between gap-3">
              <span className="text-[#86868b]">Model</span>
              <span className="font-medium">{report.embeddingModel}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[#86868b]">Google API</span>
              <span className="font-medium">
                {report.apiConfigured ? 'Yapılandırıldı' : 'Eksik'}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[#86868b]">Bekleyen</span>
              <span className="font-medium">{report.pendingCount}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[#86868b]">Başarısız</span>
              <span className="font-medium">{report.failedCount}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[#86868b]">Eski indeks</span>
              <span className="font-medium">{report.staleCount}</span>
            </div>
          </div>
        </section>
      </div>

      <VectorSearchExplorerTable />
    </>
  );
}
