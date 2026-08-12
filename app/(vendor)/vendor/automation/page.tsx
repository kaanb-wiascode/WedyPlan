import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorAutomationClient from "@/components/vendor/automation/VendorAutomationClient";

export default async function VendorAutomationPage() {
  const vendorId = await requireVendorId();

  return <VendorAutomationClient vendorId={vendorId} />;
}
