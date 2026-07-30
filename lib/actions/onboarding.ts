"use server";

import { CoupleRegisterSchema, CoupleRegisterInput } from "@/lib/validations/onboarding";
// import { prisma } from "@/lib/prisma"; // Prisma client importunuz

export async function registerCoupleAction(input: CoupleRegisterInput) {
  // 1. Zod ile doğrula
  const validated = CoupleRegisterSchema.safeParse(input);
  
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    // 2. Veritabanına kaydet
    /*
    const couple = await prisma.coupleProfile.create({
      data: {
        ...validated.data,
        weddingDate: new Date(validated.data.weddingDate),
        organizationDate: new Date(validated.data.organizationDate),
      },
    });
    */

    return { success: true, message: "Kayıt başarıyla oluşturuldu." };
  } catch (error) {
    return { success: false, message: "Kayıt sırasında bir hata oluştu." };
  }
}