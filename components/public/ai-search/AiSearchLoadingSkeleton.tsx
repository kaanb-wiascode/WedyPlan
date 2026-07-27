'use client';

import React from 'react';

export const AiSearchLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white/30 backdrop-blur-2xl rounded-[32px] border border-white/60 animate-pulse h-28" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="bg-white/30 backdrop-blur-2xl rounded-[32px] border border-white/60 p-4 space-y-4 animate-pulse">
            <div className="h-52 bg-slate-200/60 rounded-[24px]" />
            <div className="h-4 bg-slate-200/60 rounded w-1/3" />
            <div className="h-6 bg-slate-200/60 rounded w-3/4" />
            <div className="h-12 bg-slate-200/60 rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
};