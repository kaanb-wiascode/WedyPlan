import React from "react";
import VendorMediaClient from "@/components/vendor/media/VendorMediaClient";

export default function VendorMediaPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorMediaClient vendorId={mockVendorId} />;
}
