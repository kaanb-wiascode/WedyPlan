"use client";
import React from "react";
import { WeddingProfileFormData } from "@/lib/validations/wedding-profile";

export default function ProfileHeader({ data, onSave, isSaving }: { data: WeddingProfileFormData; onSave: () => void; isSaving: boolean }) {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div>
        <h1 className="text-2xl font-serif">{data.title}</h1>
        <p className="text-xs text-slate-500">{data.brideGroomName} & {data.partnerName}</p>
      </div>
      <button onClick={onSave} disabled={isSaving} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs">
        {isSaving ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
