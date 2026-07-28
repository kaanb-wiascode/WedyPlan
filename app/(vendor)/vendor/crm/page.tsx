import React from "react";
import VendorCRMClient from "@/components/vendor/crm/VendorCRMClient";

export default function VendorCRMPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorCRMClient vendorId={mockVendorId} />;
}