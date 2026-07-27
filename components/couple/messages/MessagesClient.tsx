"use client";

import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatThread from "./ChatThread";

export default function MessagesClient({ userId }: { userId: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeConversationId, setActiveConversationId] = useState("c_1");

  const [conversations] = useState([
    {
      id: "c_1",
      name: "Bodrum Sunset Venue",
      type: "VENDOR",
      avatarUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=100&q=80",
      lastMessage: "Revize sözleşmeyi cuma gününe kadar ileteceğiz.",
      lastTime: "14:20",
      unreadCount: 1,
      isOnline: true,
      messages: [
        { id: "m1", sender: "VENDOR", content: "Merhaba Selin Hanım & Kaan Bey! Menü tadımı detayları hazırlandı.", timestamp: "14:15" },
        { id: "m2", sender: "COUPLE", content: "Harika! Cuma günkü revize sözleşmeye tadım detaylarını da ekleyebilir misiniz?", timestamp: "14:18" },
        { id: "m3", sender: "VENDOR", content: "Elbette, revize sözleşmeyi cuma gününe kadar ileteceğiz.", timestamp: "14:20" },
      ],
    },
    {
      id: "c_2",
      name: "Studio Aegean Photography",
      type: "VENDOR",
      avatarUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=100&q=80",
      lastMessage: "Çekim rotası için Bodrum Kalesi uygun.",
      lastTime: "Dün",
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: "m10", sender: "VENDOR", content: "Çekim rotası için Bodrum Kalesi uygun.", timestamp: "Dün 16:00" },
      ],
    },
    {
      id: "c_3",
      name: "✦ WedyPlan AI Asistan",
      type: "AI",
      avatarUrl: "",
      lastMessage: "Bütçe risk analizi hazırlandı.",
      lastTime: "10:00",
      unreadCount: 0,
      isOnline: true,
      messages: [
        { id: "m20", sender: "AI", content: "Merhaba! Bütçenizde tespit edilen 2 risk için yapay zeka tavsiyeleri hazırlandı.", timestamp: "10:00" },
      ],
    },
  ]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const filteredConversations = conversations.filter((c) => {
    const matchesFilter = activeFilter === "ALL" || c.type === activeFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto h-[calc(100vh-120px)] min-h-[650px] grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="lg:col-span-4 h-full">
          <ChatSidebar
            conversations={filteredConversations}
            activeId={activeConversationId}
            onSelect={(id) => setActiveConversationId(id)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>

        <div className="lg:col-span-8 h-full">
          <ChatThread
            userId={userId}
            conversation={activeConversation}
          />
        </div>
      </div>
    </div>
  );
}
