import React from "react";
import { CoupleSidebar } from "@/components/couple/layout/CoupleSidebar";

export default function CoupleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F9F8F6]">
      <CoupleSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}