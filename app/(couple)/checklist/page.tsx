import React from "react";
import ChecklistClient from "@/components/couple/checklist/ChecklistClient";

export default function CoupleChecklistPage() {
  const mockUserId = "usr_couple_demo_123";

  return <ChecklistClient userId={mockUserId} />;
}
