import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorMarketplaceClient from "@/components/vendor/marketplace/VendorMarketplaceClient";

export default async function VendorMarketplacePage() {
  const vendorId = await requireVendorId();

  return <VendorMarketplaceClient vendorId={vendorId} />;
}
