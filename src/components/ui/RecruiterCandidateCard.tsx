import React from 'react';
import { Star, CheckCircle, ExternalLink, Sparkles, Building, Briefcase, Mail } from 'lucide-react';

export interface CandidateData {
  id: string;
  name: string;
  role: string;
  experience: string;
  location: string;
  avatar: string;
  aiMatchScore: number;
  atsScore: number;
  targetRole: string;
  primarySkills: string[];
  education: string;
  status: 'Ready to Interview' | 'Shortlisted' | 'In Review' | 'Fast-Track';
  summary: string;
}

interface RecruiterCandidateCardProps {
  candidate: CandidateData;
  isShortlisted?: boolean;
  onToggleShortlist?: (id: string) => void;
  onViewProfile?: (candidate: CandidateData) => void;
}

export const RecruiterCandidateCard: React.FC<RecruiterCandidateCardProps> = ({
  candidate,
  isShortlisted = false,
  onToggleShortlist,
  onViewProfile,
}) => {
  return (
    <div className="relative rounded-2xl glass-panel p-6 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top bar with candidate avatar, role, and match score */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md border border-white/20">
              {candidate.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">{candidate.name}</h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-2.5 h-2.5" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <Briefcase className="w-3 h-3 text-slate-500" />
                {candidate.role} • {candidate.experience}
              </p>
            </div>
          </div>

          <button
            onClick={() => onToggleShortlist && onToggleShortlist(candidate.id)}
            className={`p-2 rounded-xl border transition-all ${
              isShortlisted
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
          >
            <Star className={`w-4 h-4 ${isShortlisted ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* AI Match & ATS Score indicators */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-300">
              AI Role Match
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold font-mono text-white">
                {candidate.aiMatchScore}%
              </span>
              <span className="text-[11px] text-blue-300">High fit</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-300">
              ATS Benchmark
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold font-mono text-white">
                {candidate.atsScore}/100
              </span>
              <span className="text-[11px] text-purple-300">Optimized</span>
            </div>
          </div>
        </div>

        {/* Short AI summary */}
        <p className="text-xs text-slate-400 mb-4 line-clamp-2">
          {candidate.summary}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {candidate.primarySkills.map((skill, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-500 flex items-center gap-1">
          <Building className="w-3 h-3 text-slate-600" />
          {candidate.location}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewProfile && onViewProfile(candidate)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => onToggleShortlist && onToggleShortlist(candidate.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isShortlisted
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            {isShortlisted ? 'Shortlisted' : 'Shortlist'}
          </button>
        </div>
      </div>
    </div>
  );
};
