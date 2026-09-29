import { redirect } from 'next/navigation';
import { loadLiveCatalogVendorById } from '@/lib/vendor/workspace';
import { catalogHref } from '@/lib/catalog/taxonomy';

export const dynamic = 'force-dynamic';

export default async function PublicVendorByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const live = await loadLiveCatalogVendorById(id);

  if (!live) {
    redirect('/firmalar');
  }

  redirect(catalogHref(live.categorySlug, live.citySlug, live.slug));
}
