import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import SettingsClient from "@/components/couple/settings/SettingsClient";

export default async function CoupleSettingsPage() {
  const userId = await requireUserId();

  return <SettingsClient userId={userId} />;
}
