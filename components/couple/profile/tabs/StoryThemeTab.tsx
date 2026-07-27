"use client";
import React from "react";
import { WeddingProfileFormData } from "@/lib/validations/wedding-profile";

export default function StoryThemeTab({ data, updateFields }: { data: WeddingProfileFormData; updateFields: (fields: Partial<WeddingProfileFormData>) => void }) {
  return (
    <div className="space-y-4">
      <textarea value={data.weddingStory || ""} onChange={(e) => updateFields({ weddingStory: e.target.value })} className="w-full p-2 border rounded-xl text-sm" placeholder="Hikayeniz" />
      <input type="text" value={data.weddingTheme} onChange={(e) => updateFields({ weddingTheme: e.target.value })} className="w-full p-2 border rounded-xl text-sm" placeholder="Tema" />
      <div className="flex gap-2">
        {data.colorPalette.map((color: string, idx: number) => (
          <div key={idx} className="w-8 h-8 rounded-full border" style={{ backgroundColor: color }} />
        ))}
      </div>
    </div>
  );
}
