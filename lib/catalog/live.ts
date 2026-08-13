import { getCatalogListings, getCatalogVendor, type CatalogFilter, type CatalogVendor } from './listings';
import { loadLiveCatalogVendor, loadLiveCatalogVendors } from '@/lib/vendor/workspace';

export async function getMergedCatalogListings(filter: CatalogFilter = {}): Promise<CatalogVendor[]> {
  const live = await loadLiveCatalogVendors(filter);
  const generated = getCatalogListings({ ...filter, limit: undefined });
  const slugs = new Set(live.map((item) => item.slug));
  const merged = [...live, ...generated.filter((item) => !slugs.has(item.slug))];
  return filter.limit ? merged.slice(0, filter.limit) : merged;
}

export async function getMergedCatalogVendor(category: string, city: string, slug: string) {
  return (await loadLiveCatalogVendor(category, city, slug)) || getCatalogVendor(category, city, slug);
}

export async function similarLiveVendors(vendor: CatalogVendor, limit = 4) {
  const merged = await getMergedCatalogListings({ category: vendor.categorySlug, city: vendor.citySlug });
  return merged.filter((item) => item.id !== vendor.id).slice(0, limit);
}
