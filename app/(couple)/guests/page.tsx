import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import GuestClient from "@/components/couple/guests/GuestClient";

export default async function CoupleGuestsPage() {
  const userId = await requireUserId();

  return <GuestClient userId={userId} />;
}
