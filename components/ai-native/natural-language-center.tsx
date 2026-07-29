"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Mic, Send, Terminal, Cpu, Zap, Tag } from "lucide-react";
import { AiNaturalLanguageEngine, ParsedNaturalLanguageCommand, NaturalLanguagePlatformSummary, NaturalLanguageInputMode } from "@/lib/ai-native/ai-natural-language-engine";

export const NaturalLanguageCenter: React.FC = () => {
  const [commands, setCommands] = useState<ParsedNaturalLanguageCommand[]>([]);
  const [summary, setSummary] = useState<NaturalLanguagePlatformSummary | null>(null);
  const [userInput, setUserInput] = useState("");
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiNaturalLanguageEngine.getProcessedCommands().then(setCommands);
    AiNaturalLanguageEngine.getPlatformSummary().then(setSummary);
  }, []);

  const handleSendCommand = async (mode: NaturalLanguageInputMode = "TEXT_CHAT") => {
    if (!userInput.trim()) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const executed = await AiNaturalLanguageEngine.parseAndExecuteCommand(userInput, mode);
      setIsProcessing(false);
      setStatusMsg({ type: "success", text: `'${executed.recognizedIntent}' niyeti başarıyla çözümlendi ve çalıştırıldı!` });
      setUserInput("");
      AiNaturalLanguageEngine.getProcessedCommands().then(setCommands);
      AiNaturalLanguageEngine.getPlatformSummary().then(setSummary);
    }, 500);
  };

  const handleSimulateVoiceInput = () => {
    setIsRecordingVoice(true);
    setUserInput("Bodrum'da deniz kenarı 150 kişilik düğün için teklif oluştur.");

    setTimeout(() => {
      setIsRecordingVoice(false);
      handleSendCommand("VOICE_COMMAND");
    }, 1200);
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Natural Language Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Doğal Dil İletişim & Komut Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Voice Accuracy: %{summary.voiceCommandAccuracyPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Platformun doğal dille yönetilmesi, metin ve sesli komut işleme, niyet tanıma (Intent Recognition) ve varlık çıkarımı (NER).
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">İşlenen Komutlar</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalProcessedCommandsCount / 1000).toFixed(1)}K Cmd
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Niyet Tanıma Hızı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.averageIntentRecognitionTimeMs} ms
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Çoklu-Tur Akıl Yürütme</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.aiMultiTurnReasoningHealthPercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI NLU Multi-Turn Reasoning Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı NLU & Diyalog Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Intent Engine
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiNaturalLanguageInsightNote}
          </p>
        </div>
      </div>

      {/* Command Prompt & Voice Input Console */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#D4AF37]" />
          <span>Doğal Dil Komut Konsolu</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="relative">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={3}
              placeholder="WedyPlan'e ne yaptırmak istersiniz? (Örn: Boğaz'da 200 kişilik düğün için bütçe planla)..."
              className="w-full p-4 pr-12 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none font-medium leading-relaxed"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleSendCommand("TEXT_CHAT")}
              disabled={isProcessing || !userInput.trim()}
              className="flex-1 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Komutu İşle & Çalıştır</span>
                </>
              )}
            </button>

            <button
              onClick={handleSimulateVoiceInput}
              disabled={isRecordingVoice || isProcessing}
              className={`px-4 h-11 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2 ${
                isRecordingVoice
                  ? "bg-red-500 text-white border-red-500 animate-pulse"
                  : "bg-white dark:bg-[#141418] text-[#111111] dark:text-[#F5F4F0] border-black/10 dark:border-white/10"
              }`}
            >
              <Mic className="w-4 h-4 text-[#D4AF37]" />
              <span>{isRecordingVoice ? "Dinleniyor..." : "Sesli Komut Ver"}</span>
            </button>
          </div>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Processed Commands Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#D4AF37]" />
          <span>Çözümlenmiş Doğal Dil Komutları ({commands.length})</span>
        </h4>

        <div className="space-y-3">
          {commands.map((c) => (
            <div
              key={c.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>"{c.rawInputText}"</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {c.mode}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Niyet (Intent): <strong className="text-emerald-600 dark:text-emerald-400">{c.recognizedIntent}</strong></span>
                <span>Hedef Ajan: {c.targetAgentRole}</span>
              </div>

              {/* Extracted Entities */}
              <div className="flex flex-wrap gap-1">
                {c.extractedEntities.map((e) => (
                  <span
                    key={e.entityKey}
                    className="text-[9px] font-mono bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md text-[#666666] dark:text-[#A1A1A6] flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3 text-[#D4AF37]" /> {e.entityKey}: <strong>{String(e.entityValue)}</strong>
                  </span>
                ))}
              </div>

              {c.executionResultSummary && (
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                  ✦ Sonuç: {c.executionResultSummary}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};