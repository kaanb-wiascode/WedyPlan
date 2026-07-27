"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CoupleSidebar() {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "Genel Bakış & AI",
      items: [
        { name: "Executive Dashboard", href: "/couple/dashboard", icon: "📊" },
        { name: "AI Wedding Insights", href: "/couple/insights", icon: "🧠" },
        { name: "AI Wedding Planner", href: "/couple/planner", icon: "✨" },
      ]
    },
    {
      title: "Planlama & Organizasyon",
      items: [
        { name: "Timeline Engine", href: "/couple/timeline", icon: "⏳" },
        { name: "AI Checklist", href: "/couple/checklist", icon: "✅" },
        { name: "Guest Management", href: "/couple/guests", icon: "👥" },
        { name: "Invitation & RSVP", href: "/couple/invitations", icon: "💌" },
      ]
    },
    {
      title: "Finans & Hukuk",
      items: [
        { name: "Budget Engine", href: "/couple/budget", icon: "💰" },
        { name: "Payment Center", href: "/couple/payments", icon: "💳" },
        { name: "Digital Contracts", href: "/couple/contracts", icon: "✍️" },
        { name: "Document Vault", href: "/couple/vault", icon: "🗄️" },
      ]
    },
    {
      title: "Tedarikçi & Keşif",
      items: [
        { name: "Vendor Discovery", href: "/couple/vendors", icon: "🔍" },
        { name: "Smart Offer Requests", href: "/couple/requests", icon: "📨" },
        { name: "Proposal Comparison", href: "/couple/proposals", icon: "⚖️" },
        { name: "Messaging Center", href: "/couple/messages", icon: "💬" },
      ]
    },
    {
      title: "Kişiselleştirme",
      items: [
        { name: "Website Builder", href: "/couple/website", icon: "🌐" },
        { name: "Favorites & Mood", href: "/couple/favorites", icon: "🎨" },
        { name: "Wedding Profile", href: "/couple/profile", icon: "💍" },
        { name: "Settings", href: "/couple/settings", icon: "⚙️" },
      ]
    }
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0 overflow-y-auto hidden md:flex border-r border-slate-800">
      <div className="p-6">
        <h2 className="text-xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
          <span>WedyPlan</span>
          <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-sans uppercase">Couple</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-6 pb-8">
        {menuGroups.map((group, i) => (
          <div key={i}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-2 mb-2 block">
              {group.title}
            </span>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition ${
                      isActive ? "bg-rose-500/10 text-rose-400" : "hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
