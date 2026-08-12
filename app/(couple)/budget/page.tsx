import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import BudgetClient from "@/components/couple/budget/BudgetClient";

export default async function CoupleBudgetPage() {
  const userId = await requireUserId();

  return <BudgetClient userId={userId} />;
}
