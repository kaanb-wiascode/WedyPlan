import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import VaultClient from "@/components/couple/vault/VaultClient";

export default async function CoupleVaultPage() {
  const userId = await requireUserId();

  return <VaultClient userId={userId} />;
}
