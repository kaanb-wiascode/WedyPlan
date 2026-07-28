import React from "react";
import VendorSecurityClient from "@/components/vendor/security/VendorSecurityClient";

export default function VendorSecurityPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorSecurityClient vendorId={mockVendorId} />;
}
