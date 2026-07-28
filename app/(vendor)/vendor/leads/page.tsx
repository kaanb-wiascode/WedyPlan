import React from "react";
import VendorLeadsClient from "@/components/vendor/leads/VendorLeadsClient";

export default function VendorLeadsPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorLeadsClient vendorId={mockVendorId} />;
}
