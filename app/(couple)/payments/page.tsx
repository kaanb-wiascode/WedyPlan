import React from "react";
import PaymentCenterClient from "@/components/couple/payments/PaymentCenterClient";

export default function CouplePaymentsPage() {
  const mockUserId = "usr_couple_demo_123";

  return <PaymentCenterClient userId={mockUserId} />;
}
