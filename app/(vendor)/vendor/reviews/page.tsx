import React from "react";
import VendorReviewsClient from "@/components/vendor/reviews/VendorReviewsClient";

export default function VendorReviewsPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorReviewsClient vendorId={mockVendorId} />;
}
