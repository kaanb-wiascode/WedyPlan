import React from "react";
import PublicNavbar from "@/components/public/PublicNavbar";
import PublicVendorCard from "@/components/public/PublicVendorCard";
import AiRecommendationCard from "@/components/public/ai-search/AiRecommendationCard";

export default function FirmalarPage() {
  const vendors = [
    {
      id: "1",
      name: "Luxe Kır Bahçesi & Balo Salonu",
      category: "DÜĞÜN SALONU & KIR BAHÇESİ",
      location: "Beykoz, İstanbul",
      capacity: "600 Kişi",
      price: "250.000 ₺",
      rating: 4.95,
      reviewsCount: 142,
      imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
      matchScore: 98,
      tags: ["Boğaz Manzarası", "Michelin Menü", "Cam Salon"],
    },
    {
      id: "2",
      name: "Maison de Blanc Haute Couture",
      category: "GELİNLİK & MODA EVİ",
      location: "Nişantaşı, İstanbul",
      capacity: "Kişiye Özel",
      price: "85.000 ₺",
      rating: 4.96,
      reviewsCount: 88,
      imageUrl: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=800&auto=format&fit=crop",
      matchScore: 96,
      tags: ["Özel Tasarım", "İthal Dantel", "Prova Hizmeti"],
    },
    {
      id: "3",
      name: "Lumière Cinema & Photography",
      category: "FOTOĞRAF & VİDEO STÜDYO",
      location: "Kadıköy, İstanbul",
      capacity: "Tüm Gün",
      price: "45.000 ₺",
      rating: 4.92,
      reviewsCount: 114,
      imageUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop",
      matchScore: 95,
      tags: ["Drone Çekimi", "Belgesel Düğün", "4K Klip"],
    },
    {
      id: "4",
      name: "Grand Bosphorus Palace",
      category: "TARİHİ YALI & DAVET",
      location: "Üsküdar, İstanbul",
      capacity: "800 Kişi",
      price: "400.000 ₺",
      rating: 4.98,
      reviewsCount: 210,
      imageUrl: "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=800&auto=format&fit=crop",
      matchScore: 99,
      tags: ["Deniz Ulaşımı", "Tarihi Doku", "Valet"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-900">
      <PublicNavbar mode="public" />

      {/* Header Banner - Rozet Kaldırıldı */}
      <section className="pt-36 pb-12 px-6 max-w-7xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-neutral-900">
          Türkiye’nin En Prestijli Düğün Partnerleri
        </h1>
        <p className="text-neutral-600 text-sm md:text-base max-w-2xl mx-auto font-normal">
          Tüm hizmet sağlayıcıları tarafsız değerlendirmeler, özel fiyatlar ve yüksek uyum skorları ile inceleyin.
        </p>
      </section>

      {/* AI Önerileri Şeridi */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <AiRecommendationCard />
      </section>

      {/* Ana Listeleme */}
      <section className="pb-28 px-6 max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
            Sıralama: En Yüksek Puanlılar
          </span>
          <span className="text-xs text-neutral-500 font-medium">
            4 Seçkin Firma Listeleniyor
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {vendors.map((vendor) => (
            <PublicVendorCard key={vendor.id} {...vendor} />
          ))}
        </div>
      </section>
    </div>
  );
}