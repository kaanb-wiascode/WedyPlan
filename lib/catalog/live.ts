import type { CatalogFilter, CatalogVendor } from './listings';
import {
  loadLiveCatalogVendor,
  loadLiveCatalogVendors,
} from '@/lib/vendor/workspace';

export async function getMergedCatalogListings(
  filter: CatalogFilter = {},
): Promise<CatalogVendor[]> {
  return loadLiveCatalogVendors(filter);
}

export async function getMergedCatalogVendor(
  category: string,
  city: string,
  slug: string,
) {
  return loadLiveCatalogVendor(category, city, slug);
}

export async function similarLiveVendors(
  vendor: CatalogVendor,
  limit = 4,
) {
  const live = await loadLiveCatalogVendors({
    category: vendor.categorySlug,
    city: vendor.citySlug,
    limit: limit + 1,
  });

  return live
    .filter((item) => item.id !== vendor.id)
    .slice(0, limit);
}
