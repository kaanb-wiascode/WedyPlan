import React from "react";
import VendorDiscoveryClient from "@/components/couple/vendors/VendorDiscoveryClient";

export default function CoupleVendorDiscoveryPage() {
  const mockUserId = "usr_couple_demo_123";

  return <VendorDiscoveryClient userId={mockUserId} />;
}
