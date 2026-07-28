import React from "react";
import VendorSubscriptionClient from "@/components/vendor/subscription/VendorSubscriptionClient";

export default function VendorSubscriptionPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorSubscriptionClient vendorId={mockVendorId} />;
}
