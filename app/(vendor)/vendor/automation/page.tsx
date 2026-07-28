import React from "react";
import VendorAutomationClient from "@/components/vendor/automation/VendorAutomationClient";

export default function VendorAutomationPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorAutomationClient vendorId={mockVendorId} />;
}
