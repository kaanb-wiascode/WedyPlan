"use client";

import React, { useState } from "react";
import ChecklistHeader from "./ChecklistHeader";
import AIChecklistInsightsCard from "./AIChecklistInsightsCard";
import ChecklistCategoryGroup from "./ChecklistCategoryGroup";
import { generateAIChecklistAction } from "@/lib/actions/checklist";

export default function ChecklistClient({ userId }: { userId: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("ALL");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const [tasks, setTasks] = useState([
    { id: "chk_1", title: "Resmi Nikah Evrak Başvurusu", category: "Yasal & Resmi", dueDate: "10 Mart 2027", priority: "CRITICAL", assignedTo: "Selin & Kaan", isCompleted: true },
    { id: "chk_2", title: "Düğün Mekanı Tadım Etkinliği", category: "Mekan & Catering", dueDate: "15 Mart 2027", priority: "HIGH", assignedTo: "Kaan", isCompleted: false },
    { id: "chk_3", title: "Fotoğraf & Video Konsept Onayı", category: "Tedarikçiler", dueDate: "01 Nisan 2027", priority: "CRITICAL", assignedTo: "Selin", isCompleted: false },
    { id: "chk_4", title: "Gelinlik & Damatlık Provası", category: "Giyim & Aksesuar", dueDate: "20 Nisan 2027", priority: "MEDIUM", assignedTo: "Partner", isCompleted: false },
  ]);

  const handleToggleTask = (id: string, currentStatus: boolean) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !currentStatus } : t))
    );
  };

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    const res = await generateAIChecklistAction(userId);
    setIsGeneratingAI(false);
    if (res.success) {
      alert("✨ AI Özel Checklist oluşturuldu ve listenize eklendi!");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === "ALL" || t.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const categories = Array.from(new Set(filteredTasks.map((t) => t.category)));
  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ChecklistHeader
        completedCount={completedCount}
        totalCount={tasks.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        onGenerateAI={handleGenerateAI}
        isGeneratingAI={isGeneratingAI}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIChecklistInsightsCard score={86} />
        </div>

        <div className="lg:col-span-8 space-y-6">
          {categories.map((cat) => (
            <ChecklistCategoryGroup
              key={cat}
              categoryName={cat}
              tasks={filteredTasks.filter((t) => t.category === cat)}
              onToggleTask={handleToggleTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
