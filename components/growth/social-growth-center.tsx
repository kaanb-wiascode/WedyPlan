"use client";

import React, { useState, useEffect } from "react";
import { Share2, Sparkles, Instagram, Youtube, CheckCircle2, RefreshCw, Send, ShieldCheck, Flame, Hash, Clock, Plus, BarChart2 } from "lucide-react";
import { SocialGrowthEngine, SocialMediaPost, UgcProofItem, SocialPlatform } from "@/lib/growth/social-growth-engine";

export const SocialGrowthCenter: React.FC = () => {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [ugcItems, setUgcItems] = useState<UgcProofItem[]>([]);
  const [topicInput, setTopicInput] = useState("");
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    SocialGrowthEngine.getSocialPosts().then(setPosts);
    SocialGrowthEngine.getUgcItems().then(setUgcItems);
  }, []);

  const handleGenerateCaption = () => {
    if (!topicInput.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const res = SocialGrowthEngine.generateAiSocialCaption(topicInput);
      setAiResult(res);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Share2 className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Sosyal Büyüme & UGC Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" /> Omnichannel Growth
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Instagram, TikTok, Pinterest, YouTube ve LinkedIn üzerinde otomatik içerik yayınlama, WedyAI trend hashtag optimizasyonu ve UGC sosyal kanıt akışı.
        </p>

        {/* High Level Stats Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Sosyal Görüntülenme</span>
            <span className="font-mono font-bold text-white text-base">1.84M Views</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">UGC Paylaşım</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">420 Gönderi</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Organik Dönüşüm</span>
            <span className="font-mono font-bold text-emerald-400 text-base">%22.4 Artış</span>
          </div>
        </div>
      </div>

      {/* WedyAI Caption & Hashtag Generator */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Başlık & Hashtag Üretici
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">AI Trend Engine</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex gap-2">
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="Gönderi Konusu (Örn: Boğaz Yalı Düğünleri)..."
              className="flex-1 h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />
            <button
              onClick={handleGenerateCaption}
              disabled={!topicInput.trim() || isGenerating}
              className="px-5 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 shrink-0 flex items-center gap-1.5"
            >
              {isGenerating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>İçerik Üret</span>
                </>
              )}
            </button>
          </div>

          {aiResult && (
            <div className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5">
              <div>
                <span className="text-[10px] font-bold text-[#86868B] block">Önerilen Başlık (Caption)</span>
                <p className="font-semibold text-[#111111] dark:text-[#F5F4F0] text-xs pt-1">{aiResult.captionText}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#86868B] block">En Yüksek Viral Trend Hashtagler</span>
                <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px] text-[#D4AF37]">
                  {aiResult.suggestedHashtags.map((tag: string, i: number) => (
                    <span key={i} className="bg-white/10 px-2 py-0.5 rounded-md border border-black/5">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="pt-1 flex items-center gap-1.5 text-[10px] text-[#86868B] font-mono">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>En Uygun Gönderi Zamanı: {aiResult.bestPostingTime}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* UGC Proof Vault Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          <span>Toplanan UGC (Kullanıcı İçeriği) Sosyal Kanıtlar</span>
        </h4>

        <div className="grid grid-cols-2 gap-3">
          {ugcItems.map((ugc) => (
            <div
              key={ugc.id}
              className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="relative h-28 rounded-xl overflow-hidden">
                <img src={ugc.mediaUrl} alt={ugc.creatorHandle} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono font-bold text-[#D4AF37]">
                  {ugc.platform}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block truncate">
                  {ugc.creatorHandle}
                </span>
                <p className="text-[10px] text-[#666666] line-clamp-2">{ugc.caption}</p>
              </div>

              <div className="pt-1 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[9px]">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Doğrulanmış Çift
                </span>
                <span className="font-mono text-[#D4AF37]">₺{(ugc.attributedGmvAmount / 1000).toFixed(0)}K GMV</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Posts Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Sosyal Medya Yayın Planı ({posts.length})
        </h4>

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{post.title}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                  {post.status}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{post.captionText}</p>

              <div className="pt-1 flex justify-between items-center text-[10px] text-[#86868B] font-mono">
                <span>Kanallar: {post.platforms.join(", ")}</span>
                <span className="font-bold text-[#D4AF37]">
                  {post.totalViewsCount.toLocaleString()} İzlenme
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};