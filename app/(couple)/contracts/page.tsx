import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import ContractCenterClient from "@/components/couple/contracts/ContractCenterClient";

export default async function CoupleContractsPage() {
  const userId = await requireUserId();

  return <ContractCenterClient userId={userId} />;
}
