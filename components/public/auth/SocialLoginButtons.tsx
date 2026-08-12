'use client';

import React from 'react';

interface SocialLoginButtonsProps {
  onGoogleClick: () => void;
  onAppleClick: () => void;
  isLoading?: boolean;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGoogleClick,
  onAppleClick,
  isLoading
}) => {
  return (
    <div className="space-y-3">
      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-black/10 w-full" />
        <span className="bg-[#f5f5f7] px-3 text-[11px] font-bold text-[#86868B] uppercase tracking-wider shrink-0">
          veya sosyal hesabınızla
        </span>
        <div className="border-t border-black/10 w-full" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Google OAuth Button */}
        <button
          type="button"
          disabled={isLoading}
          onClick={onGoogleClick}
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-[12px] font-bold text-[#1D1D1F] transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google</span>
        </button>

        {/* Apple OAuth Button */}
        <button
          type="button"
          disabled={isLoading}
          onClick={onAppleClick}
          className="p-3 bg-[#1D1D1F] hover:bg-black text-white rounded-2xl text-[12px] font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs disabled:opacity-50"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.9-14.36-6.1-3.3-2.73-7.23-7.44-11.79-14.13-6.85-10.08-12.33-21.2-16.44-33.37-4.11-12.16-6.17-23.23-6.17-33.2 0-14.86 3.42-26.69 10.26-35.5 6.84-8.81 15.63-13.32 26.37-13.53 4.34 0 9.25 1.14 14.74 3.42 5.49 2.28 9.25 3.42 11.28 3.42 1.62 0 5.49-1.2 11.61-3.6 6.12-2.4 11.08-3.51 14.88-3.32 10.97.52 19.82 4.4 26.54 11.64 6.72 7.24 10.66 16.03 11.82 26.37-12.43 7.5-18.52 17.81-18.27 30.93.25 10.33 4.29 18.91 12.11 25.75 4.3 3.75 9.27 6.45 14.9 8.1-1.39 4.13-3.1 8.52-5.13 13.17zM119.22 31.08c0-7.3 2.66-14.28 7.98-20.94 5.32-6.66 11.97-10.14 19.95-10.44.25.99.38 1.9.38 2.73 0 7.18-2.72 14.22-8.16 21.12-5.44 6.9-12.02 10.51-19.74 10.83-.12-.87-.41-2.02-.41-3.3z" />
          </svg>
          <span>Apple ID</span>
        </button>
      </div>
    </div>
  );
};