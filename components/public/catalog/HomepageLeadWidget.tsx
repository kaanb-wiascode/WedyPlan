"use client";

import React, { useState } from "react";
import { CATALOG_CATEGORIES, CATALOG_CITIES, MAJOR_CITY_SLUGS } from "@/lib/catalog/taxonomy";
import { saveCatalogLead } from "@/lib/catalog/quotes";

export function HomepageLeadWidget() {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("İstanbul");
  const [categorySlug, setCategorySlug] = useState("dugun-mekanlari");
  const major = CATALOG_CITIES.filter((item) => MAJOR_CITY_SLUGS.includes(item.slug));
  const category = CATALOG_CATEGORIES.find((item) => item.slug === categorySlug);
  const topCategories = CATALOG_CATEGORIES.filter((item) => !item.parentSlug);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCatalogLead({
      vendorId: null,
      vendorName: category?.name ?? "WedyPlan keşif",
      categorySlug,
      city,
      district: "",
      coupleNames: name || "Hızlı teklif",
      phone,
      weddingDate: "",
      guestCount: 0,
      note: `${city} / ${category?.name} için ana sayfa hızlı teklif.`,
    });
    setSubmitted(true);
  };

  return (
    <section className="px-4 py-6 md:px-8">
      <form onSubmit={handleSubmit} className="apple-panel mx-auto max-w-5xl rounded-[28px] p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="apple-kicker">Ücretsiz teklif</p>
            <h2 className="mt-2 text-[22px] font-semibold tracking-tight text-[#1d1d1f] md:text-[28px]">
              {submitted ? "Talebiniz iletildi" : "Uygun firmalar sizi arasın"}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[#86868b]">
              {submitted
                ? "Firma panosuna düştü. Çiftlerden komisyon alınmaz."
                : "Telefonunuzu bırakın. Teklif ücretsizdir, çiftlerden komisyon alınmaz."}
            </p>
          </div>
          {!submitted ? (
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:w-auto">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız"
                className="apple-input"
              />
              <select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)} className="apple-input">
                {topCategories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="apple-input">
                {major.map((item) => (
                  <option key={item.slug} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-2 sm:col-span-2 lg:col-span-1">
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05xx xxx xx xx"
                  className="apple-input"
                />
                <button type="submit" className="apple-btn apple-btn-compact shrink-0">
                  Gönder
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </section>
  );
}
