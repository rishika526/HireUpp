import React, { useState } from 'react';
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
  Check,
  X,
  FileText,
  Clock,
  Eye,
  Info,
} from 'lucide-react';

interface ApplicationItem {
  id: string;
  name: string;
  role: string;
  experience: string;
  matchScore: number;
  atsScore: number;
  skills: string[];
  status: 'Applied' | 'Screened' | 'Shortlisted' | 'Interview Scheduled';
  appliedDate: string;
}

const SAMPLE_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'app-1',
    name: 'Alex Morgan',
    role: 'Full Stack Engineer',
    experience: '1.8 Years',
    matchScore: 94,
    atsScore: 87,
    skills: ['React', 'TypeScript', 'Node.js', 'SQL', 'PostgreSQL', 'Docker'],
    status: 'Shortlisted',
    appliedDate: 'Nov 04, 2026',
  },
  {
    id: 'app-2',
    name: 'Priya Sharma',
    role: 'Backend Distributed Engineer',
    experience: '2.0 Years',
    matchScore: 88,
    atsScore: 89,
    skills: ['Java', 'Spring Boot', 'SQL', 'Kafka', 'Redis', 'TypeScript'],
    status: 'Interview Scheduled',
    appliedDate: 'Nov 03, 2026',
  },
  {
    id: 'app-3',
    name: 'David Chen',
    role: 'Frontend UI Architect',
    experience: '1.5 Years',
    matchScore: 91,
    atsScore: 85,
    skills: ['React', 'TypeScript', 'Tailwind', 'Next.js', 'GraphQL'],
    status: 'Shortlisted',
    appliedDate: 'Nov 02, 2026',
  },
  {
    id: 'app-4',
    name: 'Amina Al-Mansoor',
    role: 'Cloud Native DevOps',
    experience: '2.0 Years',
    matchScore: 79,
    atsScore: 82,
    skills: ['AWS', 'Docker', 'Kubernetes', 'Python', 'SQL', 'Terraform'],
    status: 'Screened',
    appliedDate: 'Nov 01, 2026',
  },
  {
    id: 'app-5',
    name: 'Rohan Mehta',
    role: 'Full Stack & AI Engineer',
    experience: '1.0 Year',
    matchScore: 89,
    atsScore: 88,
    skills: ['React', 'Python', 'FastAPI', 'Node.js', 'SQL', 'TypeScript'],
    status: 'Applied',
    appliedDate: 'Oct 30, 2026',
  },
];

export const RecruiterHub: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationItem[]>(SAMPLE_APPLICATIONS);

  const toggleStatus = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const nextStatus =
            app.status === 'Applied'
              ? 'Screened'
              : app.status === 'Screened'
              ? 'Shortlisted'
              : app.status === 'Shortlisted'
              ? 'Interview Scheduled'
              : 'Applied';
          return { ...app, status: nextStatus };
        }
        return app;
      })
    );
  };

  const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted' || a.status === 'Interview Scheduled').length;

  return (
    <div className="space-y-10">
      {/* Recruiter Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Recruiter Intelligence Console • Demo Requisition</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Recruitment & Talent Screening Dashboard
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Streamline candidate evaluation with automated ATS scoring, required skills matching, and real-time candidate pipeline stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/recruiter/candidates"
            className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all whitespace-nowrap"
          >
            <span>Search All Candidates ({applications.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Honest Demo Notice */}
      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
        <span>
          <strong className="text-white">Demonstration Environment:</strong> Job requisitions and candidate applications shown below are realistic sample records designed to showcase the HireUpp screening, skill-matching, and shortlisting workflow.
        </span>
      </div>

      {/* Active Featured Job Posting */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-slate-950 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                Active Requisition #REQ-2026-08
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Software Engineer — Full Stack</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Core Engineering Team • Bangalore / Remote • Experience: <strong>Entry-Level / 0–2 Years</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold font-mono">
              18 Applicants Received
            </span>
          </div>
        </div>

        {/* Required Skills & Job Criteria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              Required Core Skills:
            </span>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'SQL'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30"
                >
                  ✓ {skill} (Mandatory)
                </span>
              ))}
              <span className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 text-slate-400 border border-white/10">
                Preferred: Docker, REST APIs
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              Screening Standard:
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Minimum 75% ATS match score + proficiency across modern component architecture, TypeScript types, and relational database schema design.
            </p>
          </div>
        </div>

        {/* Recruitment Pipeline Funnel Status Bar */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Candidate Pipeline Status:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">1. Applied</span>
              <strong className="text-white text-lg font-mono">18</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
              <span className="text-blue-400 block text-[10px] uppercase font-mono">2. Screened</span>
              <strong className="text-white text-lg font-mono">10</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
              <span className="text-purple-400 block text-[10px] uppercase font-mono">3. Interviewed</span>
              <strong className="text-white text-lg font-mono">6</strong>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <span className="text-purple-300 block text-[10px] uppercase font-mono font-bold">4. Shortlisted</span>
              <strong className="text-purple-300 text-lg font-mono font-bold">{shortlistedCount}</strong>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 col-span-2 sm:col-span-1">
              <span className="text-emerald-400 block text-[10px] uppercase font-mono font-bold">5. Final Offer</span>
              <strong className="text-emerald-300 text-lg font-mono font-bold">1</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Applications Table for this Requisition */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Candidate Applications</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review candidates matching the "Software Engineer — Full Stack" role
            </p>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Showing {applications.length} candidates
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider">
                <th className="pb-3 font-semibold">Candidate</th>
                <th className="pb-3 font-semibold">Experience</th>
                <th className="pb-3 font-semibold">Skills Match</th>
                <th className="pb-3 font-semibold">ATS Compatibility</th>
                <th className="pb-3 font-semibold">Pipeline Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-bold text-xs">
                        {app.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-purple-300 transition-colors">
                          {app.name}
                        </p>
                        <p className="text-[11px] text-slate-400">{app.role}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-slate-300 font-medium">
                    {app.experience}
                  </td>

                  <td className="py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {app.skills.slice(0, 4).map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5 text-[10px] font-mono"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white">{app.atsScore}%</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          app.matchScore >= 90
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}
                      >
                        {app.matchScore}% Job Fit
                      </span>
                    </div>
                  </td>

                  <td className="py-4">
                    <button
                      onClick={() => toggleStatus(app.id)}
                      title="Click to cycle candidate status"
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                        app.status === 'Shortlisted'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          : app.status === 'Interview Scheduled'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : app.status === 'Screened'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}
                    >
                      {app.status} ↻
                    </button>
                  </td>

                  <td className="py-4 text-right">
                    <Link
                      to="/recruiter/candidates"
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <span>Full Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
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
