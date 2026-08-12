import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorCRMClient from "@/components/vendor/crm/VendorCRMClient";

export default async function VendorCRMPage() {
  const vendorId = await requireVendorId();

  return <VendorCRMClient vendorId={vendorId} />;
}