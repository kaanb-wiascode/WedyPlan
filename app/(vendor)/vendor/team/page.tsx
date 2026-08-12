import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorTeamClient from "@/components/vendor/team/VendorTeamClient";

export default async function VendorTeamPage() {
  const vendorId = await requireVendorId();

  return <VendorTeamClient vendorId={vendorId} />;
}
