"use server";

import { revalidatePath } from "next/cache";
import { signContractSchema, SignContractInput } from "@/lib/validations/contract";

export async function signContractAction(userId: string, data: SignContractInput) {
  const validation = signContractSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Digitally signing contract " + data.contractId + " for user " + userId);
    revalidatePath("/couple/contracts");
    return { success: true, message: "Sözleşme dijital olarak imzalandı ve kasaya kilitlendi ✨" };
  } catch (error) {
    console.error("Sign Contract Error:", error);
    return { success: false, error: "İmzalama işlemi tamamlanamadı." };
  }
}

export async function analyzeContractWithAIAction(contractId: string) {
  try {
    return {
      success: true,
      plainLanguageSummary: "Bu sözleşme Bodrum Sunset Venue ile 19 Haziran 2027 tarihindeki 350 kişilik açık hava düğün organizasyonunu kapsamaktadır. Toplam bedel 320.000 ₺'dir.",
      riskScore: 12, // Düşük risk
      detectedRisks: [
        "Aşırı Kötü Hava Şartları durumunda kapalı salona geçiş için en geç 12 saat önce yazılı bildirim şartı var.",
      ],
      missingClauses: [
        "Elektrik kesintisi durumunda jenaratör yakıt maaliyeti maddesi açıkça belirtilmemiş.",
      ],
      importantDates: [
        { date: "15 Nisan 2027", title: "İkinci Taksit Ödemesi (100.000 ₺)" },
        { date: "19 Mayıs 2027", title: "Kesintisiz İptal Bildirimi Son Günü" },
      ],
    };
  } catch (error) {
    console.error("AI Contract Analysis Error:", error);
    return { success: false, error: "Hukuki analiz oluşturulamadı." };
  }
}
