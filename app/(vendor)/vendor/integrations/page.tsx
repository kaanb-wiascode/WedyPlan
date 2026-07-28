import React from "react";
import VendorIntegrationsClient from "@/components/vendor/integrations/VendorIntegrationsClient";

export default function VendorIntegrationsPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorIntegrationsClient vendorId={mockVendorId} />;
}
