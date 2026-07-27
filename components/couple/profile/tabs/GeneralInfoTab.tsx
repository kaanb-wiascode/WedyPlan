"use client";
import React from "react";
import { WeddingProfileFormData } from "@/lib/validations/wedding-profile";

export default function GeneralInfoTab({ data, updateFields }: { data: WeddingProfileFormData; updateFields: (fields: Partial<WeddingProfileFormData>) => void }) {
  return (
    <div className="space-y-4">
      <input type="text" value={data.title} onChange={(e) => updateFields({ title: e.target.value })} className="w-full p-2 border rounded-xl text-sm" placeholder="Başlık" />
      <input type="text" value={data.brideGroomName} onChange={(e) => updateFields({ brideGroomName: e.target.value })} className="w-full p-2 border rounded-xl text-sm" placeholder="Adınız" />
      <input type="text" value={data.partnerName} onChange={(e) => updateFields({ partnerName: e.target.value })} className="w-full p-2 border rounded-xl text-sm" placeholder="Partner Adı" />
      <input type="email" value={data.partnerEmail || ""} onChange={(e) => updateFields({ partnerEmail: e.target.value })} className="w-full p-2 border rounded-xl text-sm" placeholder="Partner E-posta" />
    </div>
  );
}
