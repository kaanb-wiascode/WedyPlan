"use server";

import { revalidatePath } from "next/cache";
import { checklistTaskSchema, ChecklistTaskFormData } from "@/lib/validations/checklist";

export async function createChecklistTaskAction(userId: string, data: ChecklistTaskFormData) {
  const validation = checklistTaskSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating checklist task for user " + userId + ":", validation.data);
    revalidatePath("/couple/checklist");
    return { success: true, message: "Görev başarıyla eklendi ✨" };
  } catch (error) {
    console.error("Create Task Error:", error);
    return { success: false, error: "Görev eklenirken bir hata oluştu." };
  }
}

export async function toggleChecklistTaskAction(taskId: string, currentStatus: boolean) {
  try {
    console.log("Toggling checklist task " + taskId + " to " + !currentStatus);
    revalidatePath("/couple/checklist");
    return { success: true, isCompleted: !currentStatus };
  } catch (error) {
    console.error("Toggle Checklist Error:", error);
    return { success: false, error: "Durum güncellenemedi." };
  }
}

export async function generateAIChecklistAction(userId: string) {
  try {
    console.log("Generating AI custom checklist for user " + userId);
    revalidatePath("/couple/checklist");
    return { success: true, message: "Yapay zeka özel checklist listenizi oluşturdu ✨" };
  } catch (error) {
    console.error("AI Checklist Error:", error);
    return { success: false, error: "AI Checklist oluşturulamadı." };
  }
}
