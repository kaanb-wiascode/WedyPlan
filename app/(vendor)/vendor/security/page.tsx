import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorSecurityClient from "@/components/vendor/security/VendorSecurityClient";

export default async function VendorSecurityPage() {
  const vendorId = await requireVendorId();

  return <VendorSecurityClient vendorId={vendorId} />;
}
