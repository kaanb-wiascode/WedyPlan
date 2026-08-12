import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorSubscriptionClient from "@/components/vendor/subscription/VendorSubscriptionClient";

export default async function VendorSubscriptionPage() {
  const vendorId = await requireVendorId();

  return <VendorSubscriptionClient vendorId={vendorId} />;
}
