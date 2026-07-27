"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signContractAction } from "@/lib/actions/contract";

export default function ContractDocumentViewerModal({
  userId,
  contract,
  isOpen,
  onClose,
}: {
  userId: string;
  contract: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [confirmedTerms, setConfirmedTerms] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  if (!isOpen || !contract) return null;

  const handleSign = async () => {
    setIsSigning(true);
    const res = await signContractAction(userId, {
      contractId: contract.id,
      signatureData: "DIGITAL_SIGNATURE_TIMESTAMP_" + Date.now(),
      confirmedTerms,
    });
    setIsSigning(false);

    if (res.success) {
      alert(res.message);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-600">Doküman Viewer & E-İmza</span>
              <h2 className="text-xl font-serif font-bold">{contract.title}</h2>
              <p className="text-xs text-slate-400">{contract.vendorName} • {contract.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => alert("📄 İndiriliyor...")} className="px-3 py-1.5 rounded-xl border text-xs font-semibold">İndir 📥</button>
              <button onClick={() => alert("🖨️ Yazdırılıyor...")} className="px-3 py-1.5 rounded-xl border text-xs font-semibold">Yazdır 🖨️</button>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold pl-2">✕</button>
            </div>
          </div>

          {/* Doküman Önizleme Alanı */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-serif leading-relaxed text-slate-700 dark:text-slate-200 space-y-4">
            <h3 className="font-bold text-center text-sm uppercase text-slate-900 dark:text-slate-100">
              DÜĞÜN ORGANİZASYON VE HİZMET SÖZLEŞMESİ
            </h3>
            <p><strong>MADDE 1 - TARAFLAR:</strong> İşbu sözleşme {contract.vendorName} (Tedarikçi) ile Selin & Kaan (Müşteri) arasında акdedilmiştir.</p>
            <p><strong>MADDE 2 - KONU VE TUTAR:</strong> Düğün organizasyonu hizmet bedeli toplam {contract.amount.toLocaleString("tr-TR")} {contract.currency} olarak belirlenmiştir.</p>
            <p><strong>MADDE 3 - İPTAL VE İADE:</strong> Etkinlik tarihinden 60 gün öncesine kadar yapılan iptallerde ödenen tutarın tamamı iade edilir.</p>
          </div>

          {/* Dijital İmza Alanı */}
          {contract.status === "PENDING" && (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 space-y-3">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmedTerms}
                  onChange={(e) => setConfirmedTerms(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
                <span>Sözleşme şartlarını ve AI hukuki özetini okudum, onaylıyorum.</span>
              </label>

              <button
                type="button"
                onClick={handleSign}
                disabled={!confirmedTerms || isSigning}
                className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition disabled:opacity-40"
              >
                {isSigning ? "Dijital İmza Uygulanıyor..." : "✍️ Dijital Olarak İmzala & Onayla"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
