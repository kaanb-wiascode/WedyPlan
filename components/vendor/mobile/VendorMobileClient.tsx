"use client";

import React, { useState } from "react";
import MobileHeader from "./MobileHeader";
import AIMobileBriefingWidget from "./AIMobileBriefingWidget";
import QuickActionsBar from "./QuickActionsBar";
import MobileFeedWidget from "./MobileFeedWidget";
import { executeMobileQuickActionAction } from "@/lib/actions/vendor-mobile";

export default function VendorMobileClient({ vendorId }: { vendorId: string }) {
  const [isOnline] = useState(true);
  const [pendingOfflineSyncs] = useState(0);

  const [briefing] = useState({
    greeting: "Günaydın! Bugün sahadaki 1 numaralı önceliğiniz Bodrum düğünü.",
    weatherAlert: "☀️ Bodrum: 28°C Açık - Nem %45 (Açık hava çekimine son derece uygun)",
    urgentTasks: [
      "Saat 14:00 - Bodrum Sunset Venue Ses & Işık Kontrolü",
      "Saat 18:30 - Selin & Kaan Nikah Seremonisi Başlangıcı",
    ],
    aiPrioritySuggestion: "Gelin Hanım'a 'Ekip sahada, hazırlıklar tamam' WhatsApp mesajı atılması önerilir.",
  });

  const handleActionExecute = async (actionName: string) => {
    const res = await executeMobileQuickActionAction(vendorId, {
      actionType: "QUICK_REPLY",
      payloadText: actionName,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 pb-24 max-w-md mx-auto space-y-6">
      <MobileHeader
        vendorName="Bodrum Sunset Venue"
        isOnline={isOnline}
        pendingOfflineSyncsCount={pendingOfflineSyncs}
      />

      <AIMobileBriefingWidget briefing={briefing} />

      <QuickActionsBar
        vendorId={vendorId}
        onActionExecute={handleActionExecute}
      />

      <MobileFeedWidget
        onQuickAction={(type, id) => handleActionExecute(type + "_" + id)}
      />
    </div>
  );
}
