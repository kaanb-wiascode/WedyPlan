import React from "react";
import VendorSettingsClient from "@/components/vendor/settings/VendorSettingsClient";

export default function VendorSettingsPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorSettingsClient vendorId={mockVendorId} />;
}
