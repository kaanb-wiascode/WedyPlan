import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import InsightsClient from "@/components/couple/insights/InsightsClient";

export default async function CoupleInsightsPage() {
  const userId = await requireUserId();

  return <InsightsClient userId={userId} />;
}
