import React from "react";
import GuestClient from "@/components/couple/guests/GuestClient";

export default function CoupleGuestsPage() {
  const mockUserId = "usr_couple_demo_123";

  return <GuestClient userId={mockUserId} />;
}
