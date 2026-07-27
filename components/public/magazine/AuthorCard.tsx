'use client';

import React from 'react';
import { Award } from 'lucide-react';
import { MagazineAuthor } from '@/types/wedding-magazine';

interface AuthorCardProps {
  author: MagazineAuthor;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <div className="bg-white/60 backdrop-blur-3xl border border-white/90 p-6 rounded-[32px] shadow-xs space-y-4">
      <div className="flex items-center gap-4">
        <img src={author.avatarUrl} alt={author.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs" />
        <div>
          <h4 className="font-serif font-bold text-[18px] text-[#1D1D1F]">{author.name}</h4>
          <span className="text-[11px] font-semibold text-[#E6007E] block">{author.title}</span>
        </div>
      </div>

      <p className="text-[12px] text-[#6E6E73] font-light leading-relaxed">
        {author.bio}
      </p>

      <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px] font-bold text-[#86868B]">
        <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-[#D4AF37]" /> Onaylı Editör</span>
        <span>{author.articleCount} Yayınlanmış Yazı</span>
      </div>
    </div>
  );
};