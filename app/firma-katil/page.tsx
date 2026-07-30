"use client";

import React, { useState } from "react";

export default function VendorRegisterPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    category: "mekan",
    authorizedName: "",
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
    console.log("Firma Kayıt Verisi:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full p-8 rounded-2xl shadow-xl border border-rose-100 bg-white/80 backdrop-blur-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Firma Katılım Formu</h1>
          <p className="mt-2 text-sm text-gray-600">
            Hizmetlerinizi binlerce çiftle buluşturmak için firmanızı hemen kaydedin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Firma / Marka Adı</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Örn: Masal Düğün Salonu"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Hizmet Kategorisi</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            >
              <option value="mekan">Mekan / Düğün Salonu</option>
              <option value="fotograf">Fotoğraf & Video</option>
              <option value="organizasyon">Organizasyon</option>
              <option value="gelinlik">Gelinlik & Moda</option>
              <option value="muzik">Müzik & DJ</option>
              <option value="diger">Diğer</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Yetkili Adı Soyadı</label>
            <input
              type="text"
              name="authorizedName"
              value={formData.authorizedName}
              onChange={handleChange}
              placeholder="Ahmet Yılmaz"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>

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

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">E-Posta Adresi</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="firma@ornek.com"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Firma Adresi</label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="Firma açık adresinizi giriniz..."
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 outline-none transition"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl shadow-lg transition duration-200"
            >
              Firma Kaydını Tamamla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}