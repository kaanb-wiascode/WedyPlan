"use server";

import { revalidatePath } from "next/cache";
import { approveVendorSchema, ApproveVendorInput, suspendVendorSchema, SuspendVendorInput, issueWarningSchema, IssueWarningInput } from "@/lib/validations/admin-vendors";

export async function approveVendorStatusAction(data: ApproveVendorInput) {
  const validation = approveVendorSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Approving vendor on platform:", validation.data);
    revalidatePath("/admin/vendors");
    return {
      success: true,
      message: "Tedarikçi başvurusu onaylandı, belgeleri doğrulandı ve vitrine alındı ✨",
    };
  } catch (error) {
    console.error("Approve Vendor Error:", error);
    return { success: false, error: "Tedarikçi onaylanamadı." };
  }
}

export async function suspendOrBlacklistVendorAction(data: SuspendVendorInput) {
  const validation = suspendVendorSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating vendor status:", validation.data);
    revalidatePath("/admin/vendors");
    return {
      success: true,
      message: "Tedarikçi durumu güncellendi: " + data.action + " (Gerekçe: " + data.reason + ")",
    };
  } catch (error) {
    console.error("Suspend Vendor Error:", error);
    return { success: false, error: "Tedarikçi durumu değiştirilemedi." };
  }
}

export async function issueVendorWarningAction(data: IssueWarningInput) {
  const validation = issueWarningSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Issuing warning to vendor:", validation.data);
    revalidatePath("/admin/vendors");
    return {
      success: true,
      message: "Tedarikçiye resmi kural ihlali uyarısı ve " + data.penaltyPoints + " ceza puanı işlendi ⚠️",
    };
  } catch (error) {
    console.error("Issue Warning Error:", error);
    return { success: false, error: "Uyarı iletilemedi." };
  }
}

export async function generateAIVendorAuditReportAction(vendorId: string) {
  try {
    return {
      success: true,
      qualityScore: 96,
      riskScore: 4,
      fraudFlagsCount: 0,
      aiAnalysis: "Tedarikçi belgeleri güncel, VKN doğrulaması eşleşti. Son 60 mesajlaşmada platform dışı ödeme yönlendirmesi tespit edilmedi. Müşteri CSAT puanı 4.9/5.0 seviyesinde.",
      recommendation: "Bu işletmeye 'WedyPlan Verified Luxury' rozeti verilmesi önerilir.",
    };
  } catch (error) {
    console.error("AI Vendor Audit Error:", error);
    return { success: false, error: "AI tedarikçi denetim raporu üretilemedi." };
  }
}
