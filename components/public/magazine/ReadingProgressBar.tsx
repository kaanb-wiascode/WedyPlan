'use client';

import React, { useEffect, useState } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollCompletion);
    return () => window.removeEventListener('scroll', updateScrollCompletion);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-slate-200/50">
      <div
        className="h-full bg-gradient-to-r from-[#1D1D1F] via-[#E6007E] to-[#D4AF37] transition-all duration-150"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
};