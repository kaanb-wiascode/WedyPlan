import React from "react";
import VendorCalendarClient from "@/components/vendor/calendar/VendorCalendarClient";

export default function VendorCalendarPage() {
  const mockVendorId = "vnd_demo_8821";

  return <VendorCalendarClient vendorId={mockVendorId} />;
}
