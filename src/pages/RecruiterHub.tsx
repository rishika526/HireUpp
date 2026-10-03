import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Star,
  Layers,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { ScoreCard } from '../components/ui/ScoreCard';

export const RecruiterHub: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Recruiter Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Recruiter Intelligence Console</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hire Smarter with AI-Verified Talent
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Source pre-vetted engineers with quantified ATS scores, verified mock interview telemetry, and RAG semantic matching.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/recruiter/candidates"
            className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all whitespace-nowrap"
          >
            <span>Open Candidate Pool & Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Recruiter Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl glass-panel border border-purple-500/30 bg-purple-500/5">
          <span className="text-[10px] font-mono uppercase text-purple-300 font-semibold">Active Pool</span>
          <div className="text-3xl font-extrabold text-white font-mono my-1">4,820</div>
          <p className="text-xs text-slate-400">Pre-vetted tech candidates</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10">
          <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold">Match Efficiency</span>
          <div className="text-3xl font-extrabold text-white font-mono my-1">89%</div>
          <p className="text-xs text-slate-400">Interview conversion rate</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10">
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">Shortlisted Today</span>
          <div className="text-3xl font-extrabold text-white font-mono my-1">128</div>
          <p className="text-xs text-slate-400">Fast-tracked to final rounds</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10">
          <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">Time Saved</span>
          <div className="text-3xl font-extrabold text-white font-mono my-1">14 hrs</div>
          <p className="text-xs text-slate-400">Per engineering requisition</p>
        </div>
      </div>

      {/* Workflow Showcase */}
      <div className="rounded-3xl glass-panel p-8 sm:p-10 border border-white/10 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white">How HireUpp Automates Screening</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Our pipeline replaces manual keyword ctrl-F with multidimensional semantic scoring and verified technical simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-white">Instant ATS Parsing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every resume is parsed for hard skills, quantitative STAR bullets, and structural integrity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-white">Multimodal Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Candidates complete AI mock interviews measuring technical correctness, communication cadence, and posture.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-white">Confidence Shortlisting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Recruiters view match percentage directly mapped to their custom role rubric and schedule next steps.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="text-xs text-slate-400">
            Ready to explore verified engineering profiles right now?
          </div>
          <Link
            to="/recruiter/candidates"
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
          >
            <span>Browse 4,820 Candidates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
