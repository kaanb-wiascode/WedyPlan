import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import RequestCenterClient from "@/components/couple/requests/RequestCenterClient";

export default async function CoupleRequestCenterPage() {
  const userId = await requireUserId();

  return <RequestCenterClient userId={userId} />;
}
