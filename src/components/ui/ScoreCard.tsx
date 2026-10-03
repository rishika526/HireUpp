import React from 'react';
import { ProgressRing } from './ProgressRing';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  subtitle: string;
  trend?: string;
  status?: string;
  color?: string;
  badge?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  score,
  subtitle,
  trend = '+12% this week',
  status = 'Ready for Top Tech',
  color = '#3b82f6',
  badge = 'AI Verified',
}) => {
  return (
    <div className="relative rounded-2xl glass-panel p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {badge}
        </span>
        <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{trend}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <ProgressRing progress={score} size={96} strokeWidth={8} color={color} />
        <div>
          <h3 className="text-sm font-medium text-slate-400">{title}</h3>
          <div className="text-2xl font-bold text-white mt-1 flex items-baseline gap-1">
            <span>{score}</span>
            <span className="text-sm font-normal text-slate-500">/ 100</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">{status}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
        <span>{subtitle}</span>
        <ArrowUpRight className="w-4 h-4 text-slate-500" />
      </div>
    </div>
  );
};
