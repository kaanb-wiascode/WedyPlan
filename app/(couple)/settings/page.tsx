import React from "react";
import SettingsClient from "@/components/couple/settings/SettingsClient";

export default function CoupleSettingsPage() {
  const mockUserId = "usr_couple_demo_123";

  return <SettingsClient userId={mockUserId} />;
}
