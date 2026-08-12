import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorContractsClient from "@/components/vendor/contracts/VendorContractsClient";

export default async function VendorContractsPage() {
  const vendorId = await requireVendorId();

  return <VendorContractsClient vendorId={vendorId} />;
}
