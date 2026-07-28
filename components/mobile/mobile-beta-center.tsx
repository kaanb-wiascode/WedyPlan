"use client";

import React, { useState, useEffect } from "react";
import { Rocket, Sparkles, Smartphone, Send, CheckCircle2, Copy, Bug, MessageSquare, Download, ChevronRight, AlertCircle, Layers } from "lucide-react";
import { MobileBetaEngine, BetaBuild, BetaFeedback, FeedbackCategory } from "@/lib/mobile/mobile-beta-engine";

export const MobileBetaCenter: React.FC = () => {
  const [builds, setBuilds] = useState<BetaBuild[]>([]);
  const [selectedBuild, setSelectedBuild] = useState<BetaBuild | null>(null);
  const [feedbacks, setFeedbacks] = useState<BetaFeedback[]>([]);
  
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState<FeedbackCategory>("BUG");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    MobileBetaEngine.getBetaBuilds().then((data) => {
      setBuilds(data);
      if (data.length > 0) setSelectedBuild(data[0]);
    });
    setFeedbacks(MobileBetaEngine.getFeedbackHistory());
  }, []);

  const handleSubmitFeedback = () => {
    if (!comment.trim() || !selectedBuild) return;
    setIsSubmitting(true);
    setStatusMsg("WedyAI Geri Bildirimi Sınıflandırıyor & Mükerrer Kontrolü Yapıyor...");

    setTimeout(() => {
      MobileBetaEngine.submitFeedback(selectedBuild.id, comment, category);
      setIsSubmitting(false);
      setStatusMsg("Geri bildiriminiz başarıyla iletildi ve geliştirici ekibe aktarıldı!");
      setComment("");
      setFeedbacks(MobileBetaEngine.getFeedbackHistory());
      setTimeout(() => setStatusMsg(null), 3000);
    }, 1000);
  };

  if (!selectedBuild) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-5 font-sans">
      {/* Beta Overview Header Card */}
      <div className="bg-[#111111] text-[#F5F4F0] p-6 rounded-[36px] border border-white/20 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-lg font-semibold">
              Beta Dağıtım & Test Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full font-bold">
            {selectedBuild.versionName}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-[#86868B] block">Aktif Beta Testçi</span>
            <span className="font-mono font-bold text-white text-base">
              {selectedBuild.activeTestersCount} Kişi
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#86868B] block">Dağıtım Kanalı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {selectedBuild.track}
            </span>
          </div>
        </div>

        {selectedBuild.downloadUrl && (
          <a
            href={selectedBuild.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-white/15 hover:bg-white/25 text-[#F5F4F0] text-xs font-semibold rounded-2xl transition-all"
          >
            <Download className="w-4 h-4 text-[#D4AF37]" />
            <span>TestFlight / Play Store'dan Derlemeyi Yükle</span>
          </a>
        )}
      </div>

      {/* Release Notes Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-base font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#D4AF37]" />
          <span>Sürüm Notları ({selectedBuild.versionName})</span>
        </h4>

        <ul className="space-y-1.5 text-xs text-[#555555] dark:text-[#A1A1A6]">
          {selectedBuild.releaseNotes.map((note, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#D4AF37] font-bold">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* In-App Beta Feedback Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" /> Geri Bildirim Gönder
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">In-App Feedback</span>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            {(["BUG", "PERFORMANCE", "UX_DESIGN", "FEATURE_REQUEST"] as FeedbackCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-1 py-2 px-1 text-[10px] font-bold rounded-xl border transition-all ${
                  category === cat
                    ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                    : "bg-[#F5F4F0] dark:bg-black/20 text-[#666666] border-transparent"
                }`}
              >
                {cat === "BUG" ? "Hata" : cat === "PERFORMANCE" ? "Hız" : cat === "UX_DESIGN" ? "Tasarım" : "İstek"}
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Derleme hakkındaki görüş veya karşılaştığınız hatayı yazın..."
            className="w-full p-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
          />

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          <button
            onClick={handleSubmitFeedback}
            disabled={!comment.trim() || isSubmitting}
            className="flex items-center justify-center gap-2 w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isSubmitting ? "İletiliyor..." : "Geri Bildirimi İlet"}</span>
          </button>
        </div>
      </div>

      {/* AI Classified Feedback Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-base font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>WedyAI Sınıflandırılmış Geri Bildirimler</span>
        </h4>

        <div className="space-y-2">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1 text-xs"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span className="text-[10px] font-mono text-[#D4AF37]">{fb.category}</span>
                <span className="text-[9px] bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full">
                  Öncelik: {fb.aiClassification.priority}
                </span>
              </div>
              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6]">{fb.userComment}</p>
              {fb.aiClassification.isDuplicate && (
                <div className="text-[9px] text-amber-600 font-semibold pt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>WedyAI Tespiti: Mükerrer hata bildirimi algılandı.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};