"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PublicVendorCardProps {
  id: string;
  name: string;
  category: string;
  location: string;
  capacity?: string;
  price: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  matchScore?: number;
  isVerified?: boolean;
  tags?: string[];
}

export const PublicVendorCard: React.FC<PublicVendorCardProps> = ({
  id,
  name,
  category,
  location,
  capacity,
  price,
  rating,
  reviewsCount,
  imageUrl,
  matchScore = 98,
  isVerified = true,
  tags = ["Boğaz Manzarası", "Özel Menü", "Cam Salon"],
}) => {
  return (
    <div className="group bg-white/90 backdrop-blur-xl rounded-[28px] border border-neutral-200/80 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Görsel Alanı */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Sol Üst: Dumanlı Cam Rozeti */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          {matchScore && (
            <span className="px-3 py-1.5 rounded-full bg-neutral-900/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white tracking-wide">
              %{matchScore} Uyum
            </span>
          )}
          {isVerified && (
            <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[11px] font-medium text-neutral-900 shadow-sm">
              Onaylı
            </span>
          )}
        </div>

        {/* Favori */}
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-900/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
          ♡
        </button>

        {/* Puan */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-neutral-900/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-1">
          <span className="text-amber-400">★</span>
          <span>{rating}</span>
          <span className="text-neutral-300 font-normal">({reviewsCount})</span>
        </div>
      </div>

      {/* Kart Gövdesi */}
      <div className="p-6 space-y-4">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
            {category}
          </span>
          <h3 className="text-xl font-serif font-bold text-neutral-900 mt-1 leading-snug group-hover:text-neutral-700 transition-colors">
            {name}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            {location} {capacity ? `• Max ${capacity}` : ""}
          </p>
        </div>

        {/* Etiketler */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-neutral-100/80 text-[11px] font-medium text-neutral-600 border border-neutral-200/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Alt Fiyat ve Şık Dumanlı Gri Cam Buton */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
              Başlangıç
            </span>
            <span className="text-lg font-serif font-bold text-neutral-900">
              {price}
            </span>
          </div>

          <Link
            href={`/firma/${id}`}
            className="px-5 py-2.5 rounded-full bg-neutral-800/90 hover:bg-neutral-900 backdrop-blur-md border border-neutral-700/50 text-xs font-semibold text-white transition-all shadow-md hover:shadow-lg"
          >
            İncele →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicVendorCard;