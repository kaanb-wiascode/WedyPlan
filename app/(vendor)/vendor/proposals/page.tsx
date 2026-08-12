import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorProposalsClient from "@/components/vendor/proposals/VendorProposalsClient";

export default async function VendorProposalsPage() {
  const vendorId = await requireVendorId();

  return <VendorProposalsClient vendorId={vendorId} />;
}
