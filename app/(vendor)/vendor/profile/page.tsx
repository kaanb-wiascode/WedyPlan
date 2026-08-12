import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import { VendorProfileClient } from "@/components/vendor/profile/VendorProfileClient";

export default async function VendorProfilePage() {
  const vendorId = await requireVendorId();

  return <VendorProfileClient vendorId={vendorId} />;
}