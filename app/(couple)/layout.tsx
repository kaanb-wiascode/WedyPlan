import React from "react";
import CoupleSidebar from "@/components/couple/layout/CoupleSidebar";

export default function CoupleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <CoupleSidebar />
      <main className="flex-1 md:ml-64 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
