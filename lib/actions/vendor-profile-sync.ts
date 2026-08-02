'use server';

import { revalidatePath } from 'next/cache';

export interface VendorProfileData {
  companyName: string;
  category: string;
  aboutText: string;
  socialLinks: { instagram?: string; website?: string };
  contact: { name: string; title: string; phone: string; email: string };
  capacities: { seated: number; cocktail: number; parking: number };
  features: string[];
  faqs: { question: string; answer: string }[];
  campaigns: { title: string; discount: string; requestHomepageShowcase: boolean }[];
  location: { address: string; lat: string; lng: string };
}

/**
 * Firmanın Profilini Yönetici Onayına (Moderasyon) Gönderme İşlemi
 */
export async function submitProfileForReviewAction(data: VendorProfileData) {
  try {
    console.log('[PROFILE SYNC] Profil güncellemesi onay kuyruğuna alındı:', data);

    // Firma ve Public Çift sayfalarının önbelleğini yenile
    revalidatePath('/firma/vitrin');
    revalidatePath('/cift/firmalar');
    // revalidatePath('/cift/firmalar/[slug]'); -> Gerçek senaryoda public sayfa URL'si

    return {
      success: true,
      message: 'Profil güncellemeleriniz başarıyla kaydedildi ve WedyPlan moderasyon ekibinin onayına iletildi. Onaylandıktan sonra yayına alınacaktır.',
    };
  } catch (error) {
    return { success: false, message: 'Profil onaya gönderilirken bir hata oluştu.' };
  }
}

/**
 * Fotoğraf veya PDF Menü Yükleme (Simülasyon)
 */
export async function uploadVendorMediaAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    console.log('[PROFILE SYNC] Medya yüklendi:', file.name);
    
    return {
      success: true,
      fileUrl: `https://cdn.wedyplan.com/uploads/${Date.now()}_${file.name}`,
      message: `${file.name} başarıyla galerinize eklendi.`,
    };
  } catch (error) {
    return { success: false, message: 'Dosya yükleme başarısız.' };
  }
}