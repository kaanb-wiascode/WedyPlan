"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Heart, MapPin, Star, Users } from "lucide-react";
import type { CatalogVendor } from "@/lib/catalog/listings";
import { catalogVendorHref, formatCatalogPrice } from "@/lib/catalog/map";
import { CatalogQuoteModal } from "./CatalogQuoteModal";

type CatalogCardProps = {
  vendor: CatalogVendor;
  saved?: boolean;
  onToggleSave?: (id: string) => void;
  layout?: "grid" | "list";
};

export function CatalogCard({ vendor, saved, onToggleSave, layout = "grid" }: CatalogCardProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [photo, setPhoto] = useState(0);
  const href = catalogVendorHref(vendor);
  const priceSuffix = vendor.priceType === "PER_PERSON" ? "/ kişi" : "/ paket";
  const photos = vendor.gallery.length ? vendor.gallery : [vendor.imageUrl];
  const isList = layout === "list";

  return (
    <>
      <article
        className={`apple-panel group overflow-hidden rounded-[24px] ${
          isList ? "flex flex-col sm:flex-row" : "flex h-full flex-col"
        }`}
      >
        <div className={`relative overflow-hidden bg-[#e8e8ed] ${isList ? "h-56 w-full sm:h-auto sm:w-[280px] sm:min-h-[220px]" : "h-56 w-full"}`}>
          <Link href={href} className="absolute inset-0">
            <Image src={photos[photo] ?? vendor.imageUrl} alt={vendor.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          </Link>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {vendor.discountPct ? (
              <span className="rounded-full bg-[#1d1d1f] px-2.5 py-1 text-[11px] font-semibold text-white">
                %{vendor.discountPct}
              </span>
            ) : null}
            {vendor.isVerified ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#1d1d1f]">
                Onaylı
              </span>
            ) : null}
          </div>

          {onToggleSave ? (
            <button
              type="button"
              onClick={() => onToggleSave(vendor.id)}
              className="absolute right-3 top-3 rounded-full bg-white/90 p-2"
              aria-label="Kaydet"
            >
              <Heart className={`h-4 w-4 ${saved ? "fill-[#0071e3] text-[#0071e3]" : "text-[#1d1d1f]"}`} />
            </button>
          ) : null}

          {photos.length > 1 ? (
            <div className="absolute bottom-3 left-3 flex gap-1">
              {photos.slice(0, 5).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPhoto(i)}
                  className={`h-1.5 rounded-full ${i === photo ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
                  aria-label={`Fotoğraf ${i + 1}`}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[12px] font-medium text-[#86868b]">{vendor.categoryName}</p>
              <Link href={href}>
                <h3 className="mt-1 line-clamp-1 text-[18px] font-semibold tracking-tight text-[#1d1d1f] hover:text-[#0071e3]">
                  {vendor.name}
                </h3>
              </Link>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-[#1d1d1f]">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {vendor.rating}
              <span className="font-normal text-[#86868b]">({vendor.reviewCount})</span>
            </div>
          </div>

          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#6e6e73]">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {vendor.district}, {vendor.city}
            </span>
            {vendor.capacityMax > 0 ? (
              <span className="inline-flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {vendor.capacityMin}–{vendor.capacityMax}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {vendor.responseTime}
            </span>
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {vendor.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-md bg-[#f5f5f7] px-2 py-1 text-[11px] text-[#6e6e73]">
                {tag}
              </span>
            ))}
          </div>

          <div className={`mt-auto flex items-end justify-between gap-3 pt-5 ${isList ? "sm:pt-6" : ""}`}>
            <div>
              {vendor.oldPrice ? (
                <span className="block text-[12px] text-[#86868b] line-through">{formatCatalogPrice(vendor.oldPrice)}</span>
              ) : (
                <span className="block text-[11px] text-[#86868b]">Başlangıç</span>
              )}
              <p className="text-[18px] font-semibold tracking-tight text-[#1d1d1f]">
                {formatCatalogPrice(vendor.price)}{" "}
                <span className="text-[12px] font-normal text-[#86868b]">{priceSuffix}</span>
              </p>
              {vendor.campaignDaysLeft ? (
                <p className="text-[11px] text-[#86868b]">{vendor.campaignDaysLeft} gün kampanya</p>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link href={href} className="text-[14px] font-medium text-[#0071e3] hover:underline">
                İncele
              </Link>
              <button type="button" onClick={() => setQuoteOpen(true)} className="apple-btn apple-btn-compact">
                Teklif Al
              </button>
            </div>
          </div>
        </div>
      </article>

      {quoteOpen ? (
        <CatalogQuoteModal
          vendorId={vendor.id}
          vendorName={vendor.name}
          categorySlug={vendor.categorySlug}
          city={vendor.city}
          district={vendor.district}
          onClose={() => setQuoteOpen(false)}
        />
      ) : null}
    </>
  );
}
