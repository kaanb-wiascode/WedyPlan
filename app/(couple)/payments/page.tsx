import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import PaymentCenterClient from "@/components/couple/payments/PaymentCenterClient";

export default async function CouplePaymentsPage() {
  const userId = await requireUserId();

  return <PaymentCenterClient userId={userId} />;
}
