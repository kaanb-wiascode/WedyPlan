"use client";

import React, { useState } from "react";
import InsightsHeader from "./InsightsHeader";
import ExecutiveScoreCard from "./ExecutiveScoreCard";
import StressAndRiskWidget from "./StressAndRiskWidget";
import AIWeeklyPlanWidget from "./AIWeeklyPlanWidget";
import { completeCoachingAction } from "@/lib/actions/insights";

export default function InsightsClient({ userId }: { userId: string }) {
  const [readinessScore, setReadinessScore] = useState(89);

  const [nextBestAction, setNextBestAction] = useState({
    title: "Fotoğraf & Video Sözleşmesini İmzala",
    deadline: "Bu Cuma",
    impact: "Studio Aegean sözleşmesinin onaylanması düğün günündeki çekim rotasını kilitler.",
  });

  const [predictions] = useState({
    budgetOverrunRisk: "%4 (Tolerans Sınırında)",
    delayRisk: "1 Görev Gecikmede (Tadımlık Menü)",
    missingVendors: ["Müzik & DJ", "Transfer Servisi"],
  });

  const [weeklyPlan, setWeeklyPlan] = useState([
    { id: "wp1", title: "Mekan ile son 350 kişilik menü teyidini yap", completed: true },
    { id: "wp2", title: "Studio Aegean fotoğraf sözleşmesini e-imza ile onayla", completed: false },
    { id: "wp3", title: "LCV vermeyen 14 konuğa WhatsApp hatırlatması at", completed: false },
  ]);

  const handleCompleteAction = async () => {
    const res = await completeCoachingAction("action_1");
    if (res.success) {
      setReadinessScore((prev) => Math.min(prev + 3, 100));
      setNextBestAction({
        title: "Müzik & DJ Tedarikçisinden Teklif Al",
        deadline: "Gelecek Hafta",
        impact: "Eğlence ve ses/ışık düzenini tamamlayacaktır.",
      });
      alert(res.message);
    }
  };

  const handleToggleWeeklyTask = (id: string) => {
    setWeeklyPlan((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <InsightsHeader
        readinessScore={readinessScore}
        successProbability={96}
        stressIndex="DÜŞÜK"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <ExecutiveScoreCard
            nextBestAction={nextBestAction}
            onCompleteAction={handleCompleteAction}
          />
          <StressAndRiskWidget predictions={predictions} />
        </div>

        <div className="lg:col-span-8">
          <AIWeeklyPlanWidget
            weeklyPlan={weeklyPlan}
            onToggleTask={handleToggleWeeklyTask}
          />
        </div>
      </div>
    </div>
  );
}
