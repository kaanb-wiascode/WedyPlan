import React from "react";
import VendorProposalsClient from "@/components/vendor/proposals/VendorProposalsClient";

export default function VendorProposalsPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorProposalsClient vendorId={mockVendorId} />;
}
