"use client";
import React from "react";
import { WeddingProfileFormData } from "@/lib/validations/wedding-profile";

export default function PrivacyNotesTab({ data, updateFields }: { data: WeddingProfileFormData; updateFields: (fields: Partial<WeddingProfileFormData>) => void }) {
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={data.isPrivateProfile} onChange={(e) => updateFields({ isPrivateProfile: e.target.checked })} />
        Gizli Profil
      </label>
      {data.isPrivateProfile && (
        <input type="text" value={data.passcodeProtection || ""} onChange={(e) => updateFields({ passcodeProtection: e.target.value })} className="w-full p-2 border rounded-xl text-sm" placeholder="Giriş Şifresi" />
      )}
    </div>
  );
}
