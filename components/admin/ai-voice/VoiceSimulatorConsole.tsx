"use client";

import React, { useState } from "react";
import { processVoiceAudioAction, generateMeetingSummaryAction } from "@/lib/actions/ai-voice-platform";

export default function VoiceSimulatorConsole() {
  const [audioPromptText, setAudioPromptText] = useState("Bodrum'daki kır düğünü mekanlarının bütçelerini göster ve takvimime ekle.");
  const [mode, setMode] = useState<any>("VOICE_SEARCH");
  const [voiceResult, setVoiceResult] = useState<any>(null);
  const [summaryResult, setSummaryResult] = useState<any>(null);

  const handleProcessVoice = async () => {
    const res = await processVoiceAudioAction({
      audioPromptText,
      mode,
      language: "tr-TR",
      enableEmotionDetection: true,
    });

    if (res.success) {
      setVoiceResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleGenerateSummary = async () => {
    const res = await generateMeetingSummaryAction({
      meetingId: "meet_bodrum_catering_01",
      rawTranscript: "Mekan sahibi ile Bodrum kır bahçesi için 200 kişilik düğün ve yemek tadımı tarihi kararlaştırıldı.",
    });

    if (res.success) {
      setSummaryResult(res);
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Voice Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Live Voice Audio Processing & Command Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            Voice Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Sesli Komut Modu</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="VOICE_SEARCH">Sesli Arama (Voice Search)</option>
                <option value="NAVIGATION_COMMAND">Sesli Navigasyon Komutu</option>
                <option value="MEETING_TRANSCRIBE">Toplantı Transkripsiyonu</option>
                <option value="COPILOT_CONVERSATION">Copilot Sesli Sohbet</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Sesli Simülasyon Cümlesi (Speech Prompt)</label>
              <input
                type="text"
                value={audioPromptText}
                onChange={(e) => setAudioPromptText(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-violet-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleProcessVoice}
              className="py-2.5 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition"
            >
              🎙️ Sesi İşle, Duygu & Komutu Analiz Et
            </button>

            <button
              onClick={handleGenerateSummary}
              className="py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-md transition"
            >
              📝 Toplantı Notları & Kararlar Çıkar
            </button>
          </div>

          {voiceResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-violet-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Voice Session ID: {voiceResult.sessionId}</span>
                <span className="text-emerald-400 font-bold">Duygu: {voiceResult.detectedEmotion} (%{voiceResult.emotionConfidencePct})</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Konuşmacı: <span className="text-slate-300">{voiceResult.speakerIdentity}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Hedef Rota: <span className="text-violet-400 font-bold">{voiceResult.navigatedRoute}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">İşlem Hızı: <span className="text-teal-400 font-bold">{voiceResult.latencyMs} ms</span></div>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                🔊 <strong>Sentezlenen Ses Yanıtı (TTS URL):</strong> <span className="text-violet-400 underline">{voiceResult.ttsAudioUrl}</span>
              </div>
            </div>
          )}

          {summaryResult && (
            <div className="p-3 rounded-2xl bg-indigo-950 text-indigo-200 border border-indigo-800 text-[11px] font-mono space-y-1">
              <span className="font-bold block text-white">📝 Toplantı Özeti ({summaryResult.meetingTitle}):</span>
              {summaryResult.summaryPoints.map((pt: string, idx: number) => (
                <div key={idx} className="text-[10px] text-slate-300">• {pt}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
