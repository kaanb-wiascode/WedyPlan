import React from "react";
import VendorFinanceClient from "@/components/vendor/finance/VendorFinanceClient";

export default function VendorFinancePage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorFinanceClient vendorId={mockVendorId} />;
}
