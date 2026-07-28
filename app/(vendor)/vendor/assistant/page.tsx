import React from "react";
import VendorAIAssistantClient from "@/components/vendor/assistant/VendorAIAssistantClient";

export default function VendorAIAssistantPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorAIAssistantClient vendorId={mockVendorId} />;
}
