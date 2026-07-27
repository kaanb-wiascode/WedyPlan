import React from "react";
import InvitationClient from "@/components/couple/invitations/InvitationClient";

export default function CoupleInvitationsPage() {
  const mockUserId = "usr_couple_demo_123";

  return <InvitationClient userId={mockUserId} />;
}
