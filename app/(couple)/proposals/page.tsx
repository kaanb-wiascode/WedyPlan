import React from "react";
import ProposalComparisonClient from "@/components/couple/proposals/ProposalComparisonClient";

export default function CoupleProposalsPage() {
  const mockUserId = "usr_couple_demo_123";

  return <ProposalComparisonClient userId={mockUserId} />;
}
