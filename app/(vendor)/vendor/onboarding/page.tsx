import React from "react";
import VendorOnboardingClient from "@/components/vendor/onboarding/VendorOnboardingClient";

export default function VendorOnboardingPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorOnboardingClient vendorId={mockVendorId} />;
}
