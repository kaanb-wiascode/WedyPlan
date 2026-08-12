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
      className={`apple-glass relative overflow-hidden rounded-[22px] ${
        hoverEffect ? 'transition-transform duration-300 hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
