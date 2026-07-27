"use server";

import { revalidatePath } from "next/cache";
import { addExpenseSchema, AddExpenseFormData, updateBudgetGoalSchema, UpdateBudgetGoalData } from "@/lib/validations/budget";

export async function addExpenseAction(userId: string, data: AddExpenseFormData) {
  const validation = addExpenseSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Adding expense for user " + userId + ":", validation.data);
    revalidatePath("/couple/budget");
    return { success: true, message: "Harcama başarıyla eklendi ✨" };
  } catch (error) {
    console.error("Expense Add Error:", error);
    return { success: false, error: "Harcama kaydedilirken bir hata oluştu." };
  }
}

export async function updateBudgetGoalAction(userId: string, data: UpdateBudgetGoalData) {
  const validation = updateBudgetGoalSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating budget goals for user " + userId + ":", validation.data);
    revalidatePath("/couple/budget");
    return { success: true, message: "Bütçe hedefleri güncellendi." };
  } catch (error) {
    console.error("Budget Update Error:", error);
    return { success: false, error: "Bütçe güncellenemedi." };
  }
}
