import React from "react";
import TimelineClient from "@/components/couple/timeline/TimelineClient";

export default function CoupleTimelinePage() {
  const mockUserId = "usr_couple_demo_123";

  return <TimelineClient userId={mockUserId} />;
}
