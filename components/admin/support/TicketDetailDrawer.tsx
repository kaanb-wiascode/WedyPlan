"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { processAdminTicketResponseAction } from "@/lib/actions/admin-support";

export default function TicketDetailDrawer({
  ticket,
  isOpen,
  onClose,
}: {
  ticket: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [replyText, setReplyText] = useState("");
  const [isInternalNote, setIsInternalNote] = useState(false);

  if (!isOpen || !ticket) return null;

  const handleSendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const res = await processAdminTicketResponseAction({
      ticketId: ticket.id,
      messageText: replyText,
      isInternalNote,
    });

    if (res.success) {
      alert("✨ " + res.message);
      setReplyText("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex justify-end">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full p-6 md:p-8 overflow-y-auto space-y-6 shadow-2xl text-xs"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-sky-600">360° Destek İş İstasyonu</span>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">{ticket.subject}</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
          </div>

          {/* Talep Eden Özeti */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Talep Eden</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{ticket.requesterName} ({ticket.requesterType})</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Kategori</span>
              <span className="font-mono font-bold text-indigo-600">{ticket.category}</span>
            </div>
          </div>

          {/* Geçmiş Mesajlaşma */}
          <div className="space-y-3">
            <span className="font-bold text-slate-700 dark:text-slate-200 block">💬 Konuşma Geçmişi</span>
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{ticket.requesterName} (Müşteri)</span>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-[11px] italic">
                "{ticket.initialMessage || "Düğün günümüze 2 gün kala mekan yetkilisi ek ücret talep etti. Yardımınız rica olunur."}"
              </p>
            </div>
          </div>

          {/* Yanıtlama Formu */}
          <form onSubmit={handleSendResponse} className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <label className="font-semibold block text-slate-700 dark:text-slate-200">Destek Yanıtı veya Dahili Not</label>
              <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold text-purple-600">
                <input
                  type="checkbox"
                  checked={isInternalNote}
                  onChange={(e) => setIsInternalNote(e.target.checked)}
                  className="rounded text-purple-600"
                />
                🔒 Yalnızca Ekip İçi Dahili Not
              </label>
            </div>

            <textarea
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Mesajınızı veya dahili notunuzu buraya yazın..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-[11px] leading-relaxed resize-none"
            />

            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">İptal</button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
              >
                {isInternalNote ? "Dahili Notu Kaydet 🔒" : "Yanıtı Gönder & Bildir ✨"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
