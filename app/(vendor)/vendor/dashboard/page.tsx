import React from "react";
import VendorDashboardClient from "@/components/vendor/dashboard/VendorDashboardClient";

export default function VendorDashboardPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorDashboardClient vendorId={mockVendorId} />;
}
