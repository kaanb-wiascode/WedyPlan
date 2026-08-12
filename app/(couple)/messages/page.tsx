import React from "react";
import { requireUserId } from "@/lib/auth/require-ids";
import MessagesClient from "@/components/couple/messages/MessagesClient";

export default async function CoupleMessagesPage() {
  const userId = await requireUserId();

  return <MessagesClient userId={userId} />;
}
