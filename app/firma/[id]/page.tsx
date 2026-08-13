import { redirect } from 'next/navigation';
import { loadLiveCatalogVendorById } from '@/lib/vendor/workspace';
import { catalogHref } from '@/lib/catalog/taxonomy';
import { getCatalogVendorById } from '@/lib/catalog/listings';
import PublicPageLayout from '@/components/public/PublicPageLayout';
import { CatalogDetail } from '@/components/public/catalog/CatalogDetail';
import { similarLiveVendors } from '@/lib/catalog/live';

export const dynamic = 'force-dynamic';

export default async function PublicVendorByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const live = await loadLiveCatalogVendorById(id);
  if (live) {
    redirect(catalogHref(live.categorySlug, live.citySlug, live.slug));
  }
  const generated = getCatalogVendorById(id);
  if (!generated) redirect('/firmalar');
  const similar = await similarLiveVendors(generated, 4);
  return (
    <PublicPageLayout>
      <CatalogDetail vendor={generated} similar={similar} />
    </PublicPageLayout>
  );
}
