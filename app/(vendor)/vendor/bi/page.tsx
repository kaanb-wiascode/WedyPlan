import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorBIClient from "@/components/vendor/bi/VendorBIClient";

export default async function VendorBIPage() {
  const vendorId = await requireVendorId();

  return <VendorBIClient vendorId={vendorId} />;
}
