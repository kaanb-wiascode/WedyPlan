'use client';

import React from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface VendorAiRecommendationProps {
  suggestedQuestions?: string[];
}

export const VendorAiRecommendation: React.FC<VendorAiRecommendationProps> = ({ suggestedQuestions = [] }) => {
  if (!suggestedQuestions.length) return null;

  return (
    <div className="mt-6">
      <GlassCard className="p-6 border-indigo-100/50 bg-gradient-to-br from-indigo-50/60 to-purple-50/60">
        
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
            Firmaya Ne Soracağınızı Bilmiyor Musunuz?
          </h3>
        </div>
        
        <p className="text-[13px] text-gray-600 mb-5 font-light">
          Yapay zeka asistanımız, bu firmanın profiline ve özelliklerine göre sormanız gereken en iyi soruları sizin için derledi:
        </p>

        <div className="space-y-2.5">
          {suggestedQuestions.map((question, idx) => (
            <button 
              key={idx}
              className="w-full text-left p-3.5 bg-white/70 hover:bg-white border border-indigo-50/50 rounded-xl text-[13px] text-gray-800 font-medium transition-all shadow-sm hover:shadow flex items-start gap-2.5 group"
            >
              <MessageSquare className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 group-hover:text-indigo-600 transition-colors" />
              <span className="leading-snug">{question}</span>
            </button>
          ))}
        </div>

      </GlassCard>
    </div>
  );
};