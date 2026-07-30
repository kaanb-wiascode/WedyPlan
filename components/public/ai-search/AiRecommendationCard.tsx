"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AiRecommendationProps {
  queryPrompt?: string;
  resultCount?: number;
  items?: Array<{
    id: string;
    name: string;
    location: string;
    rating: number;
    matchScore: number;
    imageUrl: string;
  }>;
}

export const AiRecommendationCard: React.FC<AiRecommendationProps> = ({
  queryPrompt,
  resultCount,
  items,
}) => {
  const defaultItems = [
    {
      id: "1",
      name: "Luxe Kır Bahçesi & Balo Salonu",
      location: "Beykoz, İstanbul",
      rating: 4.95,
      matchScore: 98,
      imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "2",
      name: "Bosphorus Palace Hall",
      location: "Üsküdar, İstanbul",
      rating: 4.92,
      matchScore: 95,
      imageUrl: "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "3",
      name: "Maison de Blanc Haute Couture",
      location: "Nişantaşı, İstanbul",
      rating: 4.96,
      matchScore: 96,
      imageUrl: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const list = items && items.length > 0 ? items : defaultItems;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
          <h3 className="text-xs font-bold tracking-widest text-neutral-900 uppercase">
            Öne Çıkarılan Seçkin Tavsiyeler
          </h3>
        </div>
        <span className="text-[11px] text-neutral-400 font-medium">
          {resultCount ? `${resultCount} Sonuç İçinden Yüksek Uyum Skorlular` : "Yüksek Uyum Skorlu İşletmeler"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.map((item) => (
          <Link
            key={item.id}
            href={`/firma/${item.id}`}
            className="group relative p-3.5 rounded-2xl bg-neutral-900 text-white border border-neutral-800 hover:border-neutral-700 shadow-xl transition-all duration-300 flex items-center gap-4"
          >
            {/* Görsel */}
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* İçerik */}
            <div className="flex-1 min-w-0 space-y-1">
              <span className="inline-block px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-semibold text-neutral-300 border border-white/10">
                %{item.matchScore} Uyum
              </span>
              <h4 className="font-serif font-bold text-sm text-white truncate group-hover:text-neutral-200 transition-colors">
                {item.name}
              </h4>
              <p className="text-[11px] text-neutral-400 truncate">
                {item.location} • ★ {item.rating}
              </p>
            </div>

            {/* Ok İkonu */}
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-all text-xs">
              →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AiRecommendationCard;