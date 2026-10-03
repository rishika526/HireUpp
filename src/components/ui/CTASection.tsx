import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTASection: React.FC = () => {
  return (
    <section className="relative my-20 sm:my-32 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-8 sm:p-16 text-center shadow-2xl">
      {/* Background glow orbs */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Career Intelligence</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Your next opportunity starts with{' '}
          <span className="text-gradient-blue">preparation.</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
          From neural resume scoring to live multimodal mock interviews, HireUpp transforms your career trajectory with enterprise-grade AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/resume/analyze"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/preparation/companies"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore HireUpp</span>
          </Link>
        </div>

        {/* Feature proofs */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Instant ATS Diagnostic</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Multimodal Vision & Audio HUD</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>RAG-Powered Target Roles</span>
          </div>
        </div>
      </div>
    </section>
  );
};
