import React from "react";
import BudgetClient from "@/components/couple/budget/BudgetClient";

export default function CoupleBudgetPage() {
  const mockUserId = "usr_couple_demo_123";

  return <BudgetClient userId={mockUserId} />;
}
