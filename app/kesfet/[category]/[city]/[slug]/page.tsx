import { notFound } from "next/navigation";
import PublicPageLayout from "@/components/public/PublicPageLayout";
import { CatalogDetail } from "@/components/public/catalog/CatalogDetail";
import { getCategory, getCity } from "@/lib/catalog/taxonomy";
import { getMergedCatalogVendor, similarLiveVendors } from "@/lib/catalog/live";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; city: string; slug: string }>;
}) {
  const { category, city, slug } = await params;
  const vendor = await getMergedCatalogVendor(category, city, slug);
  if (!vendor) return { title: "Firma | WedyPlan" };
  return {
    title: `${vendor.name} · ${vendor.district}, ${vendor.city} | WedyPlan`,
    description: vendor.story,
    alternates: { canonical: `/${vendor.categorySlug}/${vendor.citySlug}/${vendor.slug}` },
  };
}

export default async function CatalogVendorPage({
  params,
}: {
  params: Promise<{ category: string; city: string; slug: string }>;
}) {
  const { category, city, slug } = await params;
  if (!getCategory(category) || !getCity(city)) notFound();
  const vendor = await getMergedCatalogVendor(category, city, slug);
  if (!vendor) notFound();
  const similar = await similarLiveVendors(vendor, 4);

  return (
    <PublicPageLayout>
      <CatalogDetail vendor={vendor} similar={similar} />
    </PublicPageLayout>
  );
}
