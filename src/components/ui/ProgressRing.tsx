import React from 'react';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: string;
  showPercent?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  color = '#3b82f6',
  showPercent = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const offset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress bar */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {showPercent && (
          <span className="text-2xl font-bold tracking-tight text-white font-mono">
            {clampedProgress}%
          </span>
        )}
        {label && (
          <span className="text-xs font-medium text-slate-400 mt-0.5 max-w-[80%] truncate">
            {label}
          </span>
        )}
      </div>

      {sublabel && (
        <span className="text-xs font-medium text-slate-400 mt-2 text-center">
          {sublabel}
        </span>
      )}
    </div>
  );
};
