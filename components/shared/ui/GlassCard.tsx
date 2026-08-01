import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({ 
  children, 
  className = '', 
  hoverEffect = false,
  ...props 
}: GlassCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/10 backdrop-blur-md border border-white/20
        shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
        ${hoverEffect ? 'transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg' : ''}
        ${className}
      `}
      {...props}
    >
      {/* İsteğe bağlı iç parlama efekti için ince bir gradient katmanı */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none" />
      
      {/* İçerik */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}