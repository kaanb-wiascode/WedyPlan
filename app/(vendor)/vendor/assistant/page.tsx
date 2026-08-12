import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorAIAssistantClient from "@/components/vendor/assistant/VendorAIAssistantClient";

export default async function VendorAIAssistantPage() {
  const vendorId = await requireVendorId();

  return <VendorAIAssistantClient vendorId={vendorId} />;
}
