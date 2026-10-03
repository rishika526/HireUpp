import React from 'react';
import { ArrowRight, Layers, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CompanyData {
  id: string;
  name: string;
  ticker?: string;
  logoText: string;
  logoBg: string;
  difficulty: 'Easy-Medium' | 'Medium' | 'Medium-Hard' | 'Hard';
  difficultyColor: string;
  questionsCount: number;
  progress: number;
  topics: string[];
  hiringRole: string;
  avgPackage?: string;
}

interface CompanyCardProps {
  company: CompanyData;
  onSelect?: (company: CompanyData) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onSelect }) => {
  return (
    <div className="group relative rounded-2xl glass-panel p-6 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Header: Logo + Difficulty */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-white text-base shadow-inner border border-white/20 ${company.logoBg}`}
            >
              {company.logoText}
            </div>
            <div>
              <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors">
                {company.name}
              </h3>
              <p className="text-xs text-slate-400">{company.hiringRole}</p>
            </div>
          </div>

          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${company.difficultyColor}`}
          >
            {company.difficulty}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 my-4 py-3 px-3.5 rounded-xl bg-slate-900/50 border border-white/5 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>{company.questionsCount} Curated Qs</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>{company.topics.length} Core Modules</span>
          </div>
        </div>

        {/* Preparation Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400">Preparation Readiness</span>
            <span className="font-semibold text-blue-400">{company.progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${company.progress}%` }}
            />
          </div>
        </div>

        {/* Topics Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {company.topics.map((topic, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          Updated for 2026 Season
        </span>
        <Link
          to={`/interview/mock?company=${encodeURIComponent(company.name)}`}
          onClick={() => onSelect && onSelect(company)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all duration-200"
        >
          <span>Start Preparation</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
