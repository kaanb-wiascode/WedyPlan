import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorExecutiveClient from "@/components/vendor/executive/VendorExecutiveClient";

export default async function VendorExecutivePage() {
  const vendorId = await requireVendorId();

  return <VendorExecutiveClient vendorId={vendorId} />;
}
