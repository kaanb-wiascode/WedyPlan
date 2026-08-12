import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import InvitationClient from "@/components/couple/invitations/InvitationClient";

export default async function CoupleInvitationsPage() {
  const userId = await requireUserId();

  return <InvitationClient userId={userId} />;
}
