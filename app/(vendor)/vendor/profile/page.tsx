import React from "react";
import { VendorProfileClient } from "@/components/vendor/profile/VendorProfileClient";

export default function VendorProfilePage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorProfileClient vendorId={mockVendorId} />;
}