'use client';

import React from 'react';
import { MiniChartProps } from '@/types/enterprise-components';

export const MiniChart: React.FC<MiniChartProps> = ({
  data,
  type = 'area',
  color = '#E6007E',
  height = 40
}) => {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data) || 1;
  const width = 100;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / (max - min || 1)) * (height - 8);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <div className="w-full overflow-hidden" style={{ height }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {type === 'area' && (
          <path d={areaD} fill={color} fillOpacity={0.15} />
        )}
        <path d={pathD} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};