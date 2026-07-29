"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Sparkles, Heart, Bookmark, Share2, Users, CheckCircle2, Send, ShieldCheck, Flame, MessageSquare, Plus, RefreshCw } from "lucide-react";
import { CommunityEngine, CommunityClub, ForumPost } from "@/lib/growth/community-engine";

export const CommunityDashboard: React.FC = () => {
  const [clubs, setClubs] = useState<CommunityClub[]>([]);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedClub, setSelectedClub] = useState<CommunityClub | null>(null);

  // New Post Form
  const [authorInput, setAuthorInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    CommunityEngine.getClubs().then((data) => {
      setClubs(data);
      if (data.length > 0) setSelectedClub(data[0]);
    });
    CommunityEngine.getForumPosts().then(setPosts);
  }, []);

  const handleInteraction = async (postId: string, action: "LIKE" | "BOOKMARK") => {
    await CommunityEngine.toggleInteraction(postId, action);
    CommunityEngine.getForumPosts().then(setPosts);
  };

  const handleCreatePost = async () => {
    if (!titleInput.trim() || !contentInput.trim() || !selectedClub) return;
    setIsSubmitting(true);

    setTimeout(async () => {
      await CommunityEngine.createPost(
        selectedClub.id,
        selectedClub.name,
        authorInput.trim() || "Gelin Adayı",
        titleInput,
        contentInput
      );

      setIsSubmitting(false);
      setTitleInput("");
      setContentInput("");
      setStatusMsg("Tartışma gönderiniz WedyAI moderasyonuyla toplulukta yayınlandı!");
      CommunityEngine.getForumPosts().then(setPosts);
      setTimeout(() => setStatusMsg(null), 3000);
    }, 600);
  };

  if (!selectedClub) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Topluluk & Düğün Kulüpleri
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" /> Trend Topluluk
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Gelin adayları, damatlar ve düğün uzmanları için güvenli paylaşım, soru-cevap ve yerel grup ekosistemi.
        </p>

        {/* Community High-Level Stats */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Kulüp Üyesi</span>
            <span className="font-mono font-bold text-white text-base">14.160</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aylık Tartışma</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">3.840</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Spam Kalkanı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">%99.8</span>
          </div>
        </div>
      </div>

      {/* WedyAI Community Insights & Recommendations */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Topluluk Trend Özetleri
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">AI Community Recs</span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Flame className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ Bu hafta 'Yaz 2026 Gelinleri Kulübü'nde en çok konuşulan konu: Escrow kapora ödeme güvencesi ve Boğaz mekanlarında masa kiralama bütçeleri.
          </p>
        </div>
      </div>

      {/* Clubs Selector Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {clubs.map((club) => (
          <button
            key={club.id}
            onClick={() => setSelectedClub(club)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedClub.id === club.id
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10 hover:bg-black/5"
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{club.name} ({club.memberCount})</span>
          </button>
        ))}
      </div>

      {/* Post New Question Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#D4AF37]" />
          <span>{selectedClub.name}'ne Soru / Tartışma Ekle</span>
        </h4>

        <div className="space-y-3 text-xs">
          <input
            type="text"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            placeholder="Rumuz / Adınız (Örn: Sena B.)..."
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
          />

          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Konu Başlığı..."
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-semibold text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
          />

          <textarea
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            rows={3}
            placeholder="Topluluk üyelerine sormak istediğiniz detaylar..."
            className="w-full p-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
          />

          <button
            onClick={handleCreatePost}
            disabled={!titleInput.trim() || !contentInput.trim() || isSubmitting}
            className="w-full h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Send className="w-4 h-4 text-[#D4AF37]" />
                <span>Tartışmayı Başlat</span>
              </>
            )}
          </button>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Community Feed Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Topluluk Tartışma Akışı ({posts.length})
        </h4>

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">
                    {post.authorName}
                  </span>
                  <span className="text-[10px] text-[#86868B] font-mono">
                    {post.clubName} • {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  Trend: %{post.aiTrendScore}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 space-y-1">
                <h5 className="font-bold text-xs text-[#111111] dark:text-[#F5F4F0]">{post.title}</h5>
                <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{post.content}</p>
              </div>

              {/* Interaction Action Buttons */}
              <div className="pt-1 flex items-center justify-between text-xs text-[#86868B]">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleInteraction(post.id, "LIKE")}
                    className={`flex items-center gap-1 font-bold text-[11px] transition-colors ${
                      post.isLiked ? "text-rose-500" : "hover:text-[#111111]"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? "fill-rose-500" : ""}`} />
                    <span>{post.likesCount}</span>
                  </button>

                  <div className="flex items-center gap-1 text-[11px]">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount} Yanıt</span>
                  </div>
                </div>

                <button
                  onClick={() => handleInteraction(post.id, "BOOKMARK")}
                  className={`p-1.5 rounded-xl transition-colors ${
                    post.isBookmarked ? "text-[#D4AF37]" : "hover:text-[#111111]"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${post.isBookmarked ? "fill-[#D4AF37]" : ""}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};