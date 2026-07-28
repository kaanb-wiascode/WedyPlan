"use client";

import React, { useState } from "react";
import VendorLeadsHeader from "./VendorLeadsHeader";
import AILeadInsightsWidget from "./AILeadInsightsWidget";
import LeadKanbanBoard from "./LeadKanbanBoard";
import LeadTableView from "./LeadTableView";
import { generateAILeadReplyAction, updateLeadStageAction } from "@/lib/actions/vendor-leads";

export default function VendorLeadsClient({ vendorId }: { vendorId: string }) {
  const [viewMode, setViewMode] = useState<"KANBAN" | "TABLE">("KANBAN");
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [aiReplyData, setAiReplyData] = useState<any>(null);

  const [leads, setLeads] = useState([
    {
      id: "lead_1",
      coupleName: "Selin & Kaan Yılmaz",
      weddingDate: "19 Haziran 2027",
      budget: 320000,
      guestCount: 350,
      location: "Bodrum, Muğla",
      stage: "OFFER_SENT",
      leadScore: 94,
      winProbability: 88,
      bestFollowUpTime: "Bugün 14:30",
      phone: "+90 532 000 1122",
    },
    {
      id: "lead_2",
      coupleName: "Ece & Mert Demir",
      weddingDate: "12 Eylül 2027",
      budget: 250000,
      guestCount: 200,
      location: "Çeşme, İzmir",
      stage: "NEW",
      leadScore: 82,
      winProbability: 75,
      bestFollowUpTime: "Yarın 11:00",
      phone: "+90 533 000 2233",
    },
    {
      id: "lead_3",
      coupleName: "Zeynep & Can Kaya",
      weddingDate: "04 Mayıs 2027",
      budget: 400000,
      guestCount: 400,
      location: "İstanbul",
      stage: "WON",
      leadScore: 98,
      winProbability: 100,
      bestFollowUpTime: "Tamamlandı",
      phone: "+90 535 000 3344",
    },
  ]);

  const handleSelectLead = async (lead: any) => {
    setSelectedLead(lead);
    const res = await generateAILeadReplyAction(lead.id, lead.coupleName, lead.budget.toLocaleString("tr-TR") + " ₺");
    if (res.success) {
      setAiReplyData(res);
    }
  };

  const handleUpdateStage = async (leadId: string, newStage: any) => {
    const res = await updateLeadStageAction(vendorId, { leadId, stage: newStage });
    if (res.success) {
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
      );
    }
  };

  const activePipelineValue = leads
    .filter((l) => l.stage !== "LOST" && l.stage !== "ARCHIVED")
    .reduce((sum, l) => sum + l.budget, 0);

  const wonLeadsCount = leads.filter((l) => l.stage === "WON").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <VendorLeadsHeader
        totalLeads={leads.length}
        wonLeadsCount={wonLeadsCount}
        activePipelineValue={activePipelineValue}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4">
          <AILeadInsightsWidget
            selectedLead={selectedLead}
            aiReplyData={aiReplyData}
            onGenerateAIReply={() => selectedLead && handleSelectLead(selectedLead)}
            onCopyReply={(text) => {
              navigator.clipboard.writeText(text);
              alert("✨ AI yanıt metni panoya kopyalandı!");
            }}
          />
        </div>

        <div className="lg:col-span-8">
          {viewMode === "KANBAN" ? (
            <LeadKanbanBoard
              leads={leads}
              onSelectLead={handleSelectLead}
              onUpdateStage={handleUpdateStage}
            />
          ) : (
            <LeadTableView
              leads={leads}
              onSelectLead={handleSelectLead}
            />
          )}
        </div>
      </div>
    </div>
  );
}
