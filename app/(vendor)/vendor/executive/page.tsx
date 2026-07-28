import React from "react";
import VendorExecutiveClient from "@/components/vendor/executive/VendorExecutiveClient";

export default function VendorExecutivePage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorExecutiveClient vendorId={mockVendorId} />;
}
