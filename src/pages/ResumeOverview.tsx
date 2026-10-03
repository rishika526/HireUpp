import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Download,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ResumeUploader } from '../components/ui/ResumeUploader';
import { ProgressRing } from '../components/ui/ProgressRing';
import { SectionHeading } from '../components/ui/SectionHeading';

interface UploadHistoryItem {
  id: string;
  name: string;
  targetRole: string;
  date: string;
  size: string;
  score: number;
  status: 'Ready' | 'Needs Work' | 'Strong';
}

export const ResumeOverview: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<UploadHistoryItem[]>([
    {
      id: 'res-1',
      name: 'Alex_Morgan_Senior_SWE_2026.pdf',
      targetRole: 'Full-Stack Software Engineer',
      date: '2 hours ago',
      size: '240 KB',
      score: 87,
      status: 'Strong',
    },
    {
      id: 'res-2',
      name: 'Alex_Morgan_Backend_Distributed.pdf',
      targetRole: 'Backend / Systems Engineer',
      date: 'Yesterday',
      size: '310 KB',
      score: 74,
      status: 'Needs Work',
    },
    {
      id: 'res-3',
      name: 'Alex_Morgan_DevOps_Cloud.docx',
      targetRole: 'Cloud Solutions Architect',
      date: 'Oct 01, 2026',
      size: '185 KB',
      score: 82,
      status: 'Ready',
    },
  ]);

  return (
    <div className="space-y-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Resume Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Resume Intelligence & ATS Benchmarking
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Audit your resume with the same semantic parsing algorithms used by Fortune 500 ATS systems (Workday, Taleo, Greenhouse, Lever).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/resume/analyze"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all"
          >
            <span>Open Deep Diagnostic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Upload Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>Upload New Resume</span>
              </h2>
              <span className="text-xs text-slate-400">PDF, DOCX accepted</span>
            </div>

            <ResumeUploader />
          </div>
        </div>

        {/* Quick Highlights / Why ATS Matters */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl glass-panel p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ATS Benchmark Standards</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              75% of resumes are filtered out before reaching a human recruiter due to keyword mismatches, improper section parsing, or untrackable graphic layouts.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span>Semantic Keyword Extraction</span>
                </div>
                <span className="text-xs font-semibold text-emerald-400">99.8% match accuracy</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span>STAR Impact Metric Scoring</span>
                </div>
                <span className="text-xs font-semibold text-purple-400">Action-Verb Audit</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Job Spec Gap Analysis</span>
                </div>
                <span className="text-xs font-semibold text-amber-400">Tailored Suggestions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload History Table */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              <span>Resume Scan History</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review and compare your previous resume iterations and score progressions
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {history.length} Saved Diagnostics
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider">
                <th className="pb-3 font-semibold">Document</th>
                <th className="pb-3 font-semibold">Target Spec</th>
                <th className="pb-3 font-semibold">Uploaded</th>
                <th className="pb-3 font-semibold">ATS Compatibility</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-500">{item.size}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-slate-300 font-medium">
                    {item.targetRole}
                  </td>

                  <td className="py-4 text-slate-400 font-mono">
                    {item.date}
                  </td>

                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.score >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="font-bold font-mono text-white">{item.score}%</span>
                    </div>
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        item.status === 'Strong'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : item.status === 'Ready'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate('/resume/analyze')}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white transition-colors text-xs font-semibold"
                      >
                        View Analysis
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
