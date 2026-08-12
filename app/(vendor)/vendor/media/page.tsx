import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorMediaClient from "@/components/vendor/media/VendorMediaClient";

export default async function VendorMediaPage() {
  const vendorId = await requireVendorId();

  return <VendorMediaClient vendorId={vendorId} />;
}
