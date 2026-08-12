import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import ChecklistClient from "@/components/couple/checklist/ChecklistClient";

export default async function CoupleChecklistPage() {
  const userId = await requireUserId();

  return <ChecklistClient userId={userId} />;
}
