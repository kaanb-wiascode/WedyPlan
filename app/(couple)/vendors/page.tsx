import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import VendorDiscoveryClient from "@/components/couple/vendors/VendorDiscoveryClient";

export default async function CoupleVendorDiscoveryPage() {
  const userId = await requireUserId();

  return <VendorDiscoveryClient userId={userId} />;
}
