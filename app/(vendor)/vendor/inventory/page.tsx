import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorInventoryClient from "@/components/vendor/inventory/VendorInventoryClient";

export default async function VendorInventoryPage() {
  const vendorId = await requireVendorId();

  return <VendorInventoryClient vendorId={vendorId} />;
}
