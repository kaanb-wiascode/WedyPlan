import React from "react";
import VendorMobileClient from "@/components/vendor/mobile/VendorMobileClient";

export default function VendorMobilePage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorMobileClient vendorId={mockVendorId} />;
}
