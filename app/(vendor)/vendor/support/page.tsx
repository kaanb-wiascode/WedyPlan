import React from "react";
import VendorSupportClient from "@/components/vendor/support/VendorSupportClient";

export default function VendorSupportPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorSupportClient vendorId={mockVendorId} />;
}
