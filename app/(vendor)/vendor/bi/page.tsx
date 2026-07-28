import React from "react";
import VendorBIClient from "@/components/vendor/bi/VendorBIClient";

export default function VendorBIPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorBIClient vendorId={mockVendorId} />;
}
