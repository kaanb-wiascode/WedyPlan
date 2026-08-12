import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorMobileClient from "@/components/vendor/mobile/VendorMobileClient";

export default async function VendorMobilePage() {
  const vendorId = await requireVendorId();

  return <VendorMobileClient vendorId={vendorId} />;
}
