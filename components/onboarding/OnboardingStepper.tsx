'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface OnboardingStepperProps {
  currentStep: number;
  totalSteps: number;
  stepsLabels: string[];
}

export const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ currentStep, totalSteps, stepsLabels }) => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      <div className="flex items-center justify-between text-[11px] font-bold text-[#86868B] uppercase tracking-wider">
        <span>Adım {currentStep} / {totalSteps}</span>
        <span className="text-[#E6007E]">{stepsLabels[currentStep - 1]}</span>
      </div>

      {/* Glass Progress Track */}
      <div className="relative h-2.5 w-full bg-white/60 backdrop-blur-md rounded-full border border-white/80 overflow-hidden shadow-2xs">
        <motion.div
          className="h-full bg-gradient-to-r from-[#1D1D1F] via-[#E6007E] to-[#D4AF37] rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Step Pills */}
      <div className="hidden sm:flex items-center justify-between text-[11px] font-semibold text-[#6E6E73] pt-1">
        {stepsLabels.map((label, idx) => {
          const isDone = idx + 1 < currentStep;
          const isCurrent = idx + 1 === currentStep;
          return (
            <div key={idx} className="flex items-center gap-1.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-[#1D1D1F] text-white shadow-xs' : 'bg-slate-200 text-slate-500'
              }`}>
                {isDone ? <Check className="w-3 h-3" /> : idx + 1}
              </div>
              <span className={isCurrent ? 'text-[#1D1D1F] font-bold' : ''}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};