import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import TimelineClient from "@/components/couple/timeline/TimelineClient";

export default async function CoupleTimelinePage() {
  const userId = await requireUserId();

  return <TimelineClient userId={userId} />;
}
