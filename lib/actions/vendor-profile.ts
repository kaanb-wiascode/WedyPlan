"use server";

import { VendorProfileSchema, VendorProfileFormValues } from "@/lib/validations/vendor-profile";
import { revalidatePath } from "next/cache";

// 1. Profil Güncelleme Action'ı
export async function updateVendorProfile(vendorId: string, data: VendorProfileFormValues) {
  const validated = VendorProfileSchema.parse(data);

  // Veritabanı güncelleme simülasyonu / Prisma entegrasyonu
  revalidatePath("/vendor/profile");
  return { success: true, message: "Profiliniz başarıyla güncellendi!" };
}

// 2. AI Biyografi Oluşturucu
export async function generateAiBio(promptKeywords: string[]) {
  const generatedBio = `
    Kartal'ın en prestijli konumunda yer alan tesisimiz, ${promptKeywords.join(", ")} ayrıcalıklarıyla hayalinizdeki düğünü gerçeğe dönüştürüyor. Yüksek tavanlı kolonsuz salonlarımız ve uzman ekibimizle mutlu gününüze ev sahipliği yapmaktan gurur duyuyoruz.
  `.trim();

  return { success: true, bio: generatedBio };
}

// 3. AI Profil İçe Aktarıcı (PDF / Link)
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
// 📦 PAKET YÖNETİMİ AKSİYONLARI (Eksik Olan Fonksiyonlar)
// ----------------------------------------------------------------------

// 4. Satıcı Paketlerini Getir
export async function getVendorPackages(vendorId?: string) {
  return {
    success: true,
    packages: [
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
    ]
  };
}

// 5. Yeni Paket Oluştur
export async function createVendorPackage(packageData: any) {
  // DB kayıt simülasyonu
  revalidatePath("/satici/paketler");
  revalidatePath("/vendor/profile");
  return {
    success: true,
    message: "Paket başarıyla oluşturuldu!",
    package: { id: Date.now().toString(), ...packageData }
  };
}

// 6. Paket Sil
export async function deleteVendorPackage(packageId: string) {
  // DB silme simülasyonu
  revalidatePath("/satici/paketler");
  revalidatePath("/vendor/profile");
  return {
    success: true,
    message: "Paket başarıyla silindi."
  };
}