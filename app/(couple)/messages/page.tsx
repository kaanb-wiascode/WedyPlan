import React from "react";
import MessagesClient from "@/components/couple/messages/MessagesClient";

export default function CoupleMessagesPage() {
  const mockUserId = "usr_couple_demo_123";

  return <MessagesClient userId={mockUserId} />;
}
