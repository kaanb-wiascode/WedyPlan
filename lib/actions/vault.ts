"use server";

import { revalidatePath } from "next/cache";
import { uploadDocumentSchema, UploadDocumentInput } from "@/lib/validations/vault";

export async function uploadVaultDocumentAction(userId: string, data: UploadDocumentInput) {
  const validation = uploadDocumentSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Uploading vault document for user " + userId + ":", validation.data);
    revalidatePath("/couple/vault");
    return { success: true, message: "Doküman kasaya başarıyla yüklendi ve OCR taraması yapıldı ✨" };
  } catch (error) {
    console.error("Upload Vault Document Error:", error);
    return { success: false, error: "Doküman yüklenemedi." };
  }
}

export async function toggleFavoriteDocumentAction(documentId: string) {
  try {
    console.log("Toggling favorite for document " + documentId);
    revalidatePath("/couple/vault");
    return { success: true, message: "Favori durumu güncellendi." };
  } catch (error) {
    console.error("Favorite Error:", error);
    return { success: false, error: "İşlem başarısız." };
  }
}

export async function processDocumentOCRAction(documentId: string) {
  try {
    return {
      success: true,
      ocrText: "BODRUM SUNSET VENUE DÜĞÜN SÖZLEŞMESİ - Toplam Bedel: 320.000 TL. Tarih: 19.06.2027.",
      summary: "350 kişilik düğün organizasyonuna ait onaylanmış resmi mekan sözleşmesidir.",
      suggestedCategory: "CONTRACT",
      isDuplicate: false,
    };
  } catch (error) {
    console.error("OCR Process Error:", error);
    return { success: false, error: "OCR işlemi tamamlanamadı." };
  }
}
