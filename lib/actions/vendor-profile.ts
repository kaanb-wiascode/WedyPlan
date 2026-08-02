"use server";

import { VendorProfileSchema, VendorProfileFormValues } from "@/lib/validations/vendor-profile";
import { revalidatePath } from "next/cache";

// 1. Profil Güncelleme Action'ı
export async function updateVendorProfile(vendorId: string, data: VendorProfileFormValues) {
  const validated = VendorProfileSchema.parse(data);
  revalidatePath("/vendor/profile");
  return { success: true, message: "Profiliniz başarıyla güncellendi!" };
}

// 2. Profil Bölüm Güncelleme Action'ı (Eksik olan fonksiyon)
export async function updateVendorProfileSectionAction(
  vendorIdOrSection: any,
  sectionOrData?: any,
  dataPayload?: any
) {
  revalidatePath("/vendor/profile");
  revalidatePath("/satici/profil");
  return {
    success: true,
    message: "Profil bölümü başarıyla güncellendi!",
  };
}

// 3. AI Biyografi Oluşturucu
export async function generateAiBio(promptKeywords: string[]) {
  const generatedBio = `
    Kartal'ın en prestijli konumunda yer alan tesisimiz, ${promptKeywords.join(", ")} ayrıcalıklarıyla hayalinizdeki düğünü gerçeğe dönüştürüyor. Yüksek tavanlı kolonsuz salonlarımız ve uzman ekibimizle mutlu gününüze ev sahipliği yapmaktan gurur duyuyoruz.
  `.trim();

  return { success: true, bio: generatedBio };
}

// 4. AI Profil İçe Aktarıcı (PDF / Link)
export async function extractProfileFromExternalSource(sourceUrlOrPdf: string) {
  return {
    success: true,
    data: {
      title: "Titanic Business Kartal Hotel",
      category: "Otel Düğünleri",
      minPriceWeekday: 50,
      currency: "EUR",
      spaces: [
        { name: "Karina Balo Salonu", capacityYemekliMax: 800, ceilingHeight: 6.2 }
      ]
    }
  };
}

// ----------------------------------------------------------------------
// 📦 PAKET YÖNETİMİ AKSİYONLARI
// ----------------------------------------------------------------------

// 5. Satıcı Paketlerini Getir
export async function getVendorPackages(vendorId?: string) {
  const pkgList = [
    {
      id: "1",
      name: "Gold Düğün Paketi",
      price: 1500,
      currency: "EUR",
      features: ["800 Kişilik Masa Düzeni", "Hoşgeldin Kokteyli", "Gelin Odası Konaklama"],
    },
    {
      id: "2",
      name: "Platinum Her Şey Dahil Paketi",
      price: 2500,
      currency: "EUR",
      features: ["1000 Kişilik Balo Salonu", "Canlı Orkestra", "Menü Tadımı", "After Party Alanı"],
    }
  ];

  return {
    success: true,
    data: pkgList,
    packages: pkgList
  };
}

// 6. Yeni Paket Oluştur
export async function createVendorPackage(packageData: any) {
  revalidatePath("/satici/paketler");
  revalidatePath("/vendor/profile");
  return {
    success: true,
    message: "Paket başarıyla oluşturuldu!",
    package: { id: Date.now().toString(), ...packageData }
  };
}

// 7. Paket Sil
export async function deleteVendorPackage(packageId: string) {
  revalidatePath("/satici/paketler");
  revalidatePath("/vendor/profile");
  return {
    success: true,
    message: "Paket başarıyla silindi."
  };
}