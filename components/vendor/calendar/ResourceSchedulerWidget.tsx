'use client';

import React, { useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';

interface ResourceSchedulerProps {
  selectedSpace: string;
  onSelectSpace: (spaceId: string) => void;
}

const SPACES = [
  { id: 'all', name: 'Tüm Alanlar', color: 'bg-rose-600 text-white' },
  { id: 'space_karina', name: 'Karina Balo Salonu', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
  { id: 'space_teras', name: 'Panoramik Teras', color: 'bg-blue-500/10 text-blue-700 border-blue-200' },
  { id: 'space_havuzbasi', name: 'Havuzbaşı Bahçe', color: 'bg-amber-500/10 text-amber-700 border-amber-200' },
];

export default function ResourceSchedulerWidget({ selectedSpace, onSelectSpace }: ResourceSchedulerProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-zinc-800 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 shrink-0">
        <Layers className="w-3.5 h-3.5 text-rose-500" />
        Alan Filtresi:
      </div>

      {SPACES.map((space) => {
        const isSelected = selectedSpace === space.id;
        return (
          <button
            key={space.id}
            onClick={() => onSelectSpace(space.id)}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 border ${
              isSelected
                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                : 'bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-300 border-slate-200 dark:border-zinc-800 hover:border-rose-300'
            }`}
          >
            {space.name}
          </button>
        );
      })}
    </div>
  );
}