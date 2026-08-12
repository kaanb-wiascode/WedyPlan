import React from "react";
import { requireVendorId } from "@/lib/auth/require-ids";
import VendorReviewsClient from "@/components/vendor/reviews/VendorReviewsClient";

export default async function VendorReviewsPage() {
  const vendorId = await requireVendorId();

  return <VendorReviewsClient vendorId={vendorId} />;
}
