"use server";

import { revalidatePath } from "next/cache";
import { timelineTaskSchema, TimelineTaskFormData } from "@/lib/validations/timeline";

export async function createTimelineTaskAction(userId: string, data: TimelineTaskFormData) {
  const validation = timelineTaskSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating task for user " + userId + ":", validation.data);
    revalidatePath("/couple/timeline");
    return { success: true, message: "Görev zaman çizelgesine eklendi ✨" };
  } catch (error) {
    console.error("Create Task Error:", error);
    return { success: false, error: "Görev eklenirken bir hata oluştu." };
  }
}

export async function toggleTaskStatusAction(taskId: string, currentStatus: string) {
  try {
    const newStatus = currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED";
    console.log("Toggling task " + taskId + " status to " + newStatus);
    revalidatePath("/couple/timeline");
    return { success: true, newStatus };
  } catch (error) {
    console.error("Toggle Task Error:", error);
    return { success: false, error: "Durum güncellenemedi." };
  }
}
