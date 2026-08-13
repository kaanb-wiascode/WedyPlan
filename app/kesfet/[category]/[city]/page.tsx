import { notFound } from "next/navigation";
import PublicPageLayout from "@/components/public/PublicPageLayout";
import { CatalogListing } from "@/components/public/catalog/CatalogListing";
import { CATALOG_CATEGORIES, getCategory, getCity } from "@/lib/catalog/taxonomy";
import { getMergedCatalogListings } from "@/lib/catalog/live";

export const dynamicParams = true;

export function generateStaticParams() {
  return CATALOG_CATEGORIES.flatMap((category) =>
    ["istanbul", "ankara", "izmir"].map((city) => ({ category: category.slug, city }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; city: string }>;
}) {
  const { category, city } = await params;
  const cat = getCategory(category);
  const cityData = getCity(city);
  if (!cat || !cityData) return { title: "Keşfet | WedyPlan" };
  return {
    title: `${cityData.name} ${cat.name} | WedyPlan`,
    description: `${cityData.name} içindeki ${cat.name.toLocaleLowerCase("tr-TR")}. ${cat.description}`,
    alternates: { canonical: `/${cat.slug}/${cityData.slug}` },
  };
}

export default async function CatalogCityPage({
  params,
}: {
  params: Promise<{ category: string; city: string }>;
}) {
  const { category, city } = await params;
  const cat = getCategory(category);
  const cityData = getCity(city);
  if (!cat || !cityData) notFound();

  const listings = await getMergedCatalogListings({ category: cat.slug, city: cityData.slug });

  return (
    <PublicPageLayout>
      <CatalogListing
        title={`${cityData.name} ${cat.name}`}
        description={`${cityData.name} ilçelerinde ${cat.name.toLocaleLowerCase("tr-TR")} karşılaştırın, ücretsiz teklif alın.`}
        category={cat}
        city={cityData}
        listings={listings}
      />
    </PublicPageLayout>
  );
}
