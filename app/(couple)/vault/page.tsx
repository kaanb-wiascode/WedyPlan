import React from "react";
import VaultClient from "@/components/couple/vault/VaultClient";

export default function CoupleVaultPage() {
  const mockUserId = "usr_couple_demo_123";

  return <VaultClient userId={mockUserId} />;
}
