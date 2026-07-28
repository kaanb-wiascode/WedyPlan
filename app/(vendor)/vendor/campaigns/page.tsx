import React from "react";
import VendorCampaignsClient from "@/components/vendor/campaigns/VendorCampaignsClient";

export default function VendorCampaignsPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorCampaignsClient vendorId={mockVendorId} />;
}
