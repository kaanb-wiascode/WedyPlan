import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorCampaignsClient from "@/components/vendor/campaigns/VendorCampaignsClient";

export default async function VendorCampaignsPage() {
  const vendorId = await requireVendorId();

  return <VendorCampaignsClient vendorId={vendorId} />;
}
