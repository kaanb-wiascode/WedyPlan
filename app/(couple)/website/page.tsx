import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import WebsiteBuilderClient from "@/components/couple/website/WebsiteBuilderClient";

export default async function CoupleWebsitePage() {
  const userId = await requireUserId();

  return <WebsiteBuilderClient userId={userId} />;
}
