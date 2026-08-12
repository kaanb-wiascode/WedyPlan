import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorOnboardingClient from "@/components/vendor/onboarding/VendorOnboardingClient";

export default async function VendorOnboardingPage() {
  const vendorId = await requireVendorId();

  return <VendorOnboardingClient vendorId={vendorId} />;
}
