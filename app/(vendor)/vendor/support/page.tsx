import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorSupportClient from "@/components/vendor/support/VendorSupportClient";

export default async function VendorSupportPage() {
  const vendorId = await requireVendorId();

  return <VendorSupportClient vendorId={vendorId} />;
}
