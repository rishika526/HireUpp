import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  linkText?: string;
  linkTo?: string;
  accentColor?: 'blue' | 'purple' | 'cyan' | 'emerald';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  category,
  title,
  description,
  linkText = 'Explore module',
  linkTo = '#',
  accentColor = 'blue',
}) => {
  const accentClasses = {
    blue: 'from-blue-500/20 to-indigo-500/5 text-blue-400 border-blue-500/20 group-hover:border-blue-500/40',
    purple: 'from-purple-500/20 to-pink-500/5 text-purple-400 border-purple-500/20 group-hover:border-purple-500/40',
    cyan: 'from-cyan-500/20 to-blue-500/5 text-cyan-400 border-cyan-500/20 group-hover:border-cyan-500/40',
    emerald: 'from-emerald-500/20 to-teal-500/5 text-emerald-400 border-emerald-500/20 group-hover:border-emerald-500/40',
  }[accentColor];

  const iconBgClasses = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  }[accentColor];

  return (
    <div className={`group relative p-6 sm:p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between border ${accentClasses}`}>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${iconBgClasses} transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <Link
          to={linkTo}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 group-hover:text-blue-400 transition-colors"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
