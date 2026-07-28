import React from "react";
import VendorInventoryClient from "@/components/vendor/inventory/VendorInventoryClient";

export default function VendorInventoryPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorInventoryClient vendorId={mockVendorId} />;
}
