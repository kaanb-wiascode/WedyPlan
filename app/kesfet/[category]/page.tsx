import { notFound } from "next/navigation";
import PublicPageLayout from "@/components/public/PublicPageLayout";
import { CatalogListing } from "@/components/public/catalog/CatalogListing";
import { CATALOG_CATEGORIES, getCategory } from "@/lib/catalog/taxonomy";
import { getMergedCatalogListings } from "@/lib/catalog/live";

export function generateStaticParams() {
  return CATALOG_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Keşfet | WedyPlan" };
  return {
    title: `${cat.name} | WedyPlan`,
    description: cat.description,
    alternates: { canonical: `/${cat.slug}` },
  };
}

export default async function CatalogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const listings = await getMergedCatalogListings({ category: cat.slug });

  return (
    <PublicPageLayout>
      <CatalogListing
        title={cat.name}
        description={cat.description}
        category={cat}
        listings={listings}
      />
    </PublicPageLayout>
  );
}
