"use server";

import { revalidatePath } from "next/cache";
import { PackageFormValues } from "@/lib/validations/vendor-packages";

// 1. Paketleri ve AI Fiyat Önerilerini Getir
export async function getVendorPackages(vendorId?: string) {
  const packages: PackageFormValues[] = [
    {
      id: "pkg_1",
      name: "Zarif Başlangıç (Kokteyl)",
      description: "200-300 kişilik butik kutlamalar için ideal kokteyl menüsü.",
      price: 120000,
      currency: "TRY",
      minGuests: 200,
      maxGuests: 300,
      isPopular: false,
      features: [
        { id: "f1", name: "Standart Kokteyl Menüsü", included: true },
        { id: "f2", name: "DJ Performansı", included: true },
        { id: "f3", name: "Dış Çekim Fotoğraf", included: false },
      ],
      aiSuggestedPrice: 135000,
      aiReason: "Eylül dönemi kokteyl taleplerinde %22 artış var. Rakiplerinize göre %15 ucuz kaldınız."
    },
    {
      id: "pkg_2",
      name: "Premium Yemekli Paket",
      description: "Tüm detayların düşünüldüğü lüks akşam yemeği konsepti.",
      price: 250000,
      currency: "TRY",
      minGuests: 400,
      maxGuests: 600,
      isPopular: true,
      features: [
        { id: "f4", name: "4 Çeşit Özel Menü", included: true },
        { id: "f5", name: "Canlı Orkestra", included: true },
        { id: "f6", name: "Gelin & Damat Süiti", included: true },
      ],
      aiSuggestedPrice: 280000,
      aiReason: "En çok satılan paketiniz. Hafta sonu rezervasyonları için fiyatı optimize edebilirsiniz."
    }
  ];

  return { success: true, packages };
}

// 2. Fiyat Güncelleme (Örn: AI'ın önerdiği fiyatı onayla)
export async function updatePackagePriceAction(packageId: string, newPrice: number) {
  // DB kayıt simülasyonu...
  revalidatePath("/vendor/packages");
  return { 
    success: true, 
    message: `Paket fiyatı başarıyla ${newPrice.toLocaleString('tr-TR')} ₺ olarak güncellendi.` 
  };
}