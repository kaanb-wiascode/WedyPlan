"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Sparkles, FileText, User, Search, ChevronLeft } from "lucide-react";
import { DeepLinkRouter, MobileRoute } from "@/lib/mobile/deep-link-router";

export interface NavTabItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAV_TABS: NavTabItem[] = [
  { id: "explore", label: "Keşfet", href: "/", icon: Compass },
  { id: "planner", label: "WedyAI", href: "/wedy-ai", icon: Sparkles },
  { id: "contracts", label: "Sözleşmeler", href: "/contracts", icon: FileText },
  { id: "profile", label: "Profil", href: "/profile", icon: User },
];

interface MobileNavProps {
  onAiQuickAction?: () => void;
  isTablet?: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onAiQuickAction, isTablet = false }) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("explore");

  // State Restoration & Universal Link Auto-Sync
  useEffect(() => {
    const route = DeepLinkRouter.parseUrl(window.location.href);
    if (route.type === "AI_PLANNER") setActiveTab("planner");
    else if (route.type === "CONTRACT_VIEW") setActiveTab("contracts");
    else if (route.type === "HOME") setActiveTab("explore");
  }, [pathname]);

  if (isTablet) {
    // Tablet Split View & Side Navigation Rail
    return (
      <aside className="w-64 h-screen bg-[#F5F4F0] border-r border-black/10 flex flex-col justify-between p-4 fixed left-0 top-0 z-40">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="font-serif-editorial text-xl font-semibold text-[#111111]">WedyPlan</span>
            <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded-full text-[#111111]">Tablet</span>
          </div>
          <nav className="space-y-1">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#111111] text-[#F5F4F0] shadow-sm"
                      : "text-[#555555] hover:bg-black/5 hover:text-[#111111]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={onAiQuickAction}
          className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#111111] to-[#333333] text-[#F5F4F0] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          WedyAI Hızlı Asistan
        </button>
      </aside>
    );
  }

  // Mobile Bottom Navigation Bar (iOS / Android Gestures)
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F5F4F0]/90 backdrop-blur-2xl border-t border-black/10 px-6 py-2 pb-safe">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {NAV_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center justify-center w-16 py-1 transition-all ${
                isActive ? "text-[#111111] scale-105" : "text-[#86868B] hover:text-[#111111]"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.2]" : "stroke-[1.5]"}`} />
              <span className="text-[10px] font-medium tracking-tight mt-1">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};