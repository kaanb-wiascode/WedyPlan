import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorSettingsClient from "@/components/vendor/settings/VendorSettingsClient";

export default async function VendorSettingsPage() {
  const vendorId = await requireVendorId();

  return <VendorSettingsClient vendorId={vendorId} />;
}
