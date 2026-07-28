"use client";

import React, { useState, useEffect } from "react";
import { Bell, Sparkles, FileText, Calendar, CheckCheck, X, ChevronRight } from "lucide-react";
import { PushNotificationEngine, MobileNotificationPayload } from "@/lib/mobile/notification-engine";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onDeepLinkClick?: (url: string) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  onDeepLinkClick,
}) => {
  const [notifications, setNotifications] = useState<MobileNotificationPayload[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Örnek bildirimler veya yerel veritabanı verisi
      const history = PushNotificationEngine.getHistory();
      if (history.length === 0) {
        // Mock başlangıç bildirimi ekle
        const sample = PushNotificationEngine.saveToHistory({
          title: "Sözleşmeniz Onaylandı",
          body: "Çırağan Palace düğün sözleşmesi e-imzanız ile başarıyla onaylandı.",
          category: "CONTRACT",
          priority: "CONTRACT_ESCROW",
          deepLinkUrl: "/contracts/contract_demo_101",
        });
        setNotifications([sample]);
      } else {
        setNotifications(history);
      }
    }
  }, [isOpen]);

  const handleMarkAllRead = () => {
    PushNotificationEngine.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-md p-4 pt-12">
      <div className="w-full max-w-md bg-[#F5F4F0] rounded-[32px] border border-white/80 p-6 shadow-2xl space-y-5 animate-in slide-in-from-top duration-300">
        <div className="flex justify-between items-center pb-3 border-b border-black/10">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#111111]" />
            <h3 className="font-serif-editorial text-xl font-semibold text-[#111111]">
              Bildirim Merkezi
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-[#666666] hover:text-[#111111] flex items-center gap-1 font-medium"
            >
              <CheckCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              Okundu İşaretle
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10"
            >
              <X className="w-4 h-4 text-[#111111]" />
            </button>
          </div>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#86868B]">
              Yeni bir bildiriminiz bulunmuyor.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.deepLinkUrl && onDeepLinkClick) {
                    onDeepLinkClick(item.deepLinkUrl);
                    onClose();
                  }
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  item.isRead
                    ? "bg-white/40 border-black/5 text-[#555555]"
                    : "bg-white/80 border-black/15 shadow-sm text-[#111111]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {item.category === "CONTRACT" && <FileText className="w-4 h-4 text-[#D4AF37]" />}
                    {item.category === "WEDY_AI" && <Sparkles className="w-4 h-4 text-[#111111]" />}
                    {item.category === "BOOKING" && <Calendar className="w-4 h-4 text-emerald-600" />}
                    <h4 className="text-xs font-bold leading-tight">{item.title}</h4>
                  </div>
                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                  )}
                </div>

                <p className="text-xs text-[#666666] mt-1.5 leading-relaxed">{item.body}</p>

                {item.deepLinkUrl && (
                  <div className="flex items-center justify-end gap-1 mt-2 text-[10px] font-semibold text-[#111111]">
                    <span>İncele</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};