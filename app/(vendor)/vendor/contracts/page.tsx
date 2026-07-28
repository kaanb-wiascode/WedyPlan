import React from "react";
import VendorContractsClient from "@/components/vendor/contracts/VendorContractsClient";

export default function VendorContractsPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorContractsClient vendorId={mockVendorId} />;
}
