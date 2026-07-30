"use client";

import React, { useState } from "react";

const ORG_OPTIONS = [
  { label: "Düğün", value: "DUGUN" },
  { label: "Nişan", value: "NISAN" },
  { label: "Kına", value: "KINA" },
  { label: "Söz", value: "SOZ" },
  { label: "Sünnet", value: "SUNNET" },
  { label: "Baby Shower", value: "BABY_SHOWER" },
  { label: "Doğum Günü", value: "DOGUM_GUNU" },
  { label: "Diğer", value: "DIGER" },
];

export default function CoupleRegisterPage() {
  const [formData, setFormData] = useState({
    brideFirstName: "",
    brideLastName: "",
    groomFirstName: "",
    groomLastName: "",
    weddingDate: "",
    organizationType: "DUGUN",
    organizationDate: "",
    guestCount: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Çift Kayıt Verisi:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full p-8 rounded-2xl shadow-xl border border-rose-100 bg-white/80 backdrop-blur-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Çift Kayıt Formu</h1>
          <p className="mt-2 text-sm text-gray-600">
            Düğün ve organizasyon planlamanızı başlatmak için bilgilerinizi giriniz.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gelin Adı & Soyadı */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Gelin Adı</label>
            <input
              type="text"
              name="brideFirstName"
              value={formData.brideFirstName}
              onChange={handleChange}
              placeholder="Ayşe"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Gelin Soyadı</label>
            <input
              type="text"
              name="brideLastName"
              value={formData.brideLastName}
              onChange={handleChange}
              placeholder="Yılmaz"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>

          {/* Damat Adı & Soyadı */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Damat Adı</label>
            <input
              type="text"
              name="groomFirstName"
              value={formData.groomFirstName}
              onChange={handleChange}
              placeholder="Ahmet"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Damat Soyadı</label>
            <input
              type="text"
              name="groomLastName"
              value={formData.groomLastName}
              onChange={handleChange}
              placeholder="Kaya"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>

          {/* Düğün Tarihi & Org. Türü */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Düğün Tarihi</label>
            <input
              type="date"
              name="weddingDate"
              value={formData.weddingDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Organizasyon Türü</label>
            <select
              name="organizationType"
              value={formData.organizationType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            >
              {ORG_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Org. Tarihi & Kişi Sayısı */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Organizasyon Tarihi</label>
            <input
              type="date"
              name="organizationDate"
              value={formData.organizationDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Kişi Sayısı</label>
            <input
              type="number"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              placeholder="Örn: 250"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>

          {/* Telefon & Mail */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Telefon</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="05XX XXX XX XX"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">E-Posta</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@mail.com"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>

          {/* Adres */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-gray-700">Adres</label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="Açık adresinizi giriniz..."
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl shadow-lg transition duration-200"
            >
              Kaydı Tamamla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}