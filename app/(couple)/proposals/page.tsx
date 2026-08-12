import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import ProposalComparisonClient from "@/components/couple/proposals/ProposalComparisonClient";

export default async function CoupleProposalsPage() {
  const userId = await requireUserId();

  return <ProposalComparisonClient userId={userId} />;
}
