import React from "react";
import VendorTeamClient from "@/components/vendor/team/VendorTeamClient";

export default function VendorTeamPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorTeamClient vendorId={mockVendorId} />;
}
