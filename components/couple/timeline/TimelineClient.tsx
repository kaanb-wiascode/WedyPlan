"use client";

import React, { useState } from "react";
import TimelineHeader from "./TimelineHeader";
import AITimelineInsightsCard from "./AITimelineInsightsCard";
import TimelineMilestoneView from "./TimelineMilestoneView";
import TaskListWidget from "./TaskListWidget";

export default function TimelineClient({ userId }: { userId: string }) {
  const [viewMode, setViewMode] = useState("MASTER");

  const [milestones] = useState([
    { phase: "12-9 AY KALA", title: "Mekan & Tarih Konfirmasyonu", date: "Ekim 2026", taskCount: 4, completed: true },
    { phase: "6-3 AY KALA", title: "Tedarikçi Sözleşmeleri & Fotoğraf", date: "Şubat 2027", taskCount: 6, completed: true },
    { phase: "SON 1 AY", title: "LCV Teyidi & Masa Düzeni", date: "Mayıs 2027", taskCount: 8, completed: false },
    { phase: "DÜĞÜN GÜNÜ", title: "Gelinlik, Nikah & Resepsiyon", date: "19 Haziran 2027", taskCount: 12, completed: false },
  ]);

  const [tasks, setTasks] = useState([
    { id: "t1", title: "Bodrum Sunset Venue Tadım Etkinliği", dueDate: "15 Mart 2027", priority: "HIGH", status: "PENDING", vendorName: "Bodrum Sunset" },
    { id: "t2", title: "Fotoğrafçı Sözleşme Depozitosu", dueDate: "01 Nisan 2027", priority: "CRITICAL", status: "COMPLETED", vendorName: "Studio Aegean" },
    { id: "t3", title: "Davetiye Basım Onayı", dueDate: "10 Nisan 2027", priority: "MEDIUM", status: "PENDING", vendorName: "WedyPrint" },
  ]);

  const handleToggleTask = (id: string, currentStatus: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED" } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.status === "COMPLETED").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <TimelineHeader
        completedCount={completedCount}
        totalCount={tasks.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AITimelineInsightsCard />
          <TimelineMilestoneView milestones={milestones} />
        </div>

        <div className="lg:col-span-8">
          <TaskListWidget tasks={tasks} onToggle={handleToggleTask} />
        </div>
      </div>
    </div>
  );
}
