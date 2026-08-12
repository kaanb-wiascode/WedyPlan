import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorIntegrationsClient from "@/components/vendor/integrations/VendorIntegrationsClient";

export default async function VendorIntegrationsPage() {
  const vendorId = await requireVendorId();

  return <VendorIntegrationsClient vendorId={vendorId} />;
}
