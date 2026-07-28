import React from "react";
import VendorMarketplaceClient from "@/components/vendor/marketplace/VendorMarketplaceClient";

export default function VendorMarketplacePage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorMarketplaceClient vendorId={mockVendorId} />;
}
