import React from "react";
import InsightsClient from "@/components/couple/insights/InsightsClient";

export default function CoupleInsightsPage() {
  const mockUserId = "usr_couple_demo_123";

  return <InsightsClient userId={mockUserId} />;
}
