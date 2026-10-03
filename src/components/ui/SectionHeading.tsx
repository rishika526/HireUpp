import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  gradientWord?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeIcon,
  title,
  gradientWord,
  description,
  align = 'center',
  className = '',
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignmentClasses} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 backdrop-blur-md">
          {badgeIcon && <span className="w-3.5 h-3.5">{badgeIcon}</span>}
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
        {title}{' '}
        {gradientWord && (
          <span className="text-gradient-blue inline-block">
            {gradientWord}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
