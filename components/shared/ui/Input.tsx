'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="space-y-1 w-full text-left">
      {label && (
        <label className="text-[11px] font-bold text-[#86868B] dark:text-zinc-400 uppercase tracking-wider block">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-[#86868B] pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={`w-full py-3 bg-white/80 dark:bg-zinc-800/80 border rounded-2xl text-[13px] font-medium text-[#1D1D1F] dark:text-white outline-none focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100 dark:focus:ring-pink-900/30 transition placeholder:text-[#86868B] dark:placeholder:text-zinc-500 ${
            leftIcon ? 'pl-10' : 'pl-4'
          } ${rightIcon ? 'pr-10' : 'pr-4'} ${
            error ? 'border-rose-500' : 'border-slate-200 dark:border-zinc-700'
          } ${className}`}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 text-[#86868B]">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-rose-500 font-semibold pt-0.5">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';