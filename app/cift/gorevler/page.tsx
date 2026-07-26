'use client';

import React, { useState } from 'react';
import { MOCK_TASKS } from '@/lib/couple-constants';
import { CheckSquare, Check, Sparkles } from 'lucide-react';

export default function CoupleTasksPage() {
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-xl border border-white rounded-full text-[11px] font-semibold text-[#E6007E] mb-2">
            <CheckSquare className="w-3.5 h-3.5" /> Düğün Checklist
          </div>
          <h1 className="text-[28px] md:text-[32px] font-serif text-[#1D1D1F]">
            Zaman Çizelgesi & Görevler
          </h1>
          <p className="text-[13px] text-[#6E6E73]">
            Aylara ve haftalara bölünmüş yapılacaklar listenizi tamamlayın.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white text-center shadow-sm">
          <span className="text-[11px] font-bold text-[#6E6E73]">İlerleme: </span>
          <span className="text-[14px] font-serif font-bold text-[#E6007E]">{completedCount} / {tasks.length} Görev Bitti</span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-4 rounded-[20px] border backdrop-blur-2xl transition-all cursor-pointer flex items-center justify-between gap-4 ${
              task.isCompleted ? 'bg-emerald-500/10 border-emerald-200/60 opacity-80' : 'bg-white/60 border-white/90 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition ${
                task.isCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-black/20 bg-white'
              }`}>
                {task.isCompleted && <Check className="w-4 h-4" />}
              </div>
              <div>
                <span className={`font-semibold text-[14px] ${task.isCompleted ? 'line-through text-[#86868B]' : 'text-[#1D1D1F]'}`}>
                  {task.title}
                </span>
                <span className="text-[10px] font-mono text-[#86868B] block mt-0.5">{task.timelineGroup} • {task.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}