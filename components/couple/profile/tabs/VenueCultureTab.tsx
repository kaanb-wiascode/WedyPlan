"use client";
import React from "react";
import { WeddingProfileFormData } from "@/lib/validations/wedding-profile";

export default function VenueCultureTab({ data, updateFields }: { data: WeddingProfileFormData; updateFields: (fields: Partial<WeddingProfileFormData>) => void }) {
  return (
    <div className="space-y-4">
      <input type="text" value={data.culture || ""} onChange={(e) => updateFields({ culture: e.target.value })} className="w-full p-2 border rounded-xl text-sm" placeholder="Kültür" />
    </div>
  );
}
