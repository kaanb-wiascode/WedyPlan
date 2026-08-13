import PublicPageLayout from "@/components/public/PublicPageLayout";
import { CatalogListing } from "@/components/public/catalog/CatalogListing";
import { getMergedCatalogListings } from "@/lib/catalog/live";

export const metadata = {
  title: "Düğün Firmaları | WedyPlan",
  description: "Fotoğrafçı, organizasyon, saç-makyaj, müzik ve tüm düğün firmalarını karşılaştırın. Çiftlerden komisyon alınmaz.",
};

export default async function FirmalarPage() {
  const listings = await getMergedCatalogListings({ limit: 48 });

  return (
    <PublicPageLayout>
      <CatalogListing
        title="Düğün firmaları ve mekanları"
        description="38 kategoride ilanları karşılaştırın, fiyatı görün, ücretsiz teklif alın. Teklif firma panosuna düşer."
        listings={listings}
      />
    </PublicPageLayout>
  );
}
