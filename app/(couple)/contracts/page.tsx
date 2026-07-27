import React from "react";
import ContractCenterClient from "@/components/couple/contracts/ContractCenterClient";

export default function CoupleContractsPage() {
  const mockUserId = "usr_couple_demo_123";

  return <ContractCenterClient userId={mockUserId} />;
}
