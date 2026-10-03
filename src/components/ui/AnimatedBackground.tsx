import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Ambient gradient orbs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl rounded-full" />
      <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full" />
      <div className="absolute top-2/3 -right-48 w-[600px] h-[600px] bg-blue-500/10 blur-[140px] rounded-full" />

      {/* Top vignette */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-950/80 to-transparent" />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
};
