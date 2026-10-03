import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  hover = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl glass-panel ${hover ? 'glass-panel-hover' : ''} ${
        glow ? 'border-glow' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
