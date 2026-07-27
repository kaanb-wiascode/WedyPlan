import React from "react";
import RequestCenterClient from "@/components/couple/requests/RequestCenterClient";

export default function CoupleRequestCenterPage() {
  const mockUserId = "usr_couple_demo_123";

  return <RequestCenterClient userId={mockUserId} />;
}
