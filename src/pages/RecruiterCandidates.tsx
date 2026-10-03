import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Building,
  GraduationCap,
  ExternalLink,
  X,
  FileText,
  Video,
  Award,
} from 'lucide-react';
import { RecruiterCandidateCard, type CandidateData } from '../components/ui/RecruiterCandidateCard';
import { ProgressRing } from '../components/ui/ProgressRing';

const INITIAL_CANDIDATES: CandidateData[] = [
  {
    id: 'cand-1',
    name: 'Alex Morgan',
    role: 'Senior Full-Stack Engineer',
    experience: '4.5 Years Exp',
    location: 'Bangalore / Remote',
    avatar: 'AM',
    aiMatchScore: 94,
    atsScore: 87,
    targetRole: 'Senior SDE / Tech Lead',
    primarySkills: ['TypeScript', 'React 19', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    education: 'B.Tech in Computer Science, 2021',
    status: 'Fast-Track',
    summary: 'High-throughput API specialist with strong distributed systems foundations. Led 6 microservices migrations on AWS ECS with 92% AI mock interview score.',
  },
  {
    id: 'cand-2',
    name: 'Priya Sharma',
    role: 'Backend Distributed Systems Engineer',
    experience: '3.8 Years Exp',
    location: 'Hyderabad / Hybrid',
    avatar: 'PS',
    aiMatchScore: 91,
    atsScore: 89,
    targetRole: 'SDE-II Backend',
    primarySkills: ['Java 21', 'Spring Boot', 'Kafka', 'Redis', 'Kubernetes', 'gRPC'],
    education: 'M.Tech in Software Engineering, 2022',
    status: 'Ready to Interview',
    summary: 'Specialized in event-driven streaming and high-volume message queues. Handled 80K msg/sec Kafka pipelines with sub-5ms p99 latency.',
  },
  {
    id: 'cand-3',
    name: 'David Chen',
    role: 'Frontend & Web Infrastructure Architect',
    experience: '5.2 Years Exp',
    location: 'San Francisco / Remote',
    avatar: 'DC',
    aiMatchScore: 88,
    atsScore: 85,
    targetRole: 'Senior Frontend Architect',
    primarySkills: ['React', 'Next.js', 'WebAssembly', 'Performance Opt', 'GraphQL', 'Tailwind'],
    education: 'B.S. in Computer Engineering, 2020',
    status: 'In Review',
    summary: 'Core web vitals wizard. Reduced initial bundle size by 65% and created enterprise design systems adopted across 14 product squads.',
  },
  {
    id: 'cand-4',
    name: 'Amina Al-Mansoor',
    role: 'Cloud Native DevOps & Site Reliability',
    experience: '4.0 Years Exp',
    location: 'Dubai / Remote',
    avatar: 'AA',
    aiMatchScore: 86,
    atsScore: 82,
    targetRole: 'SRE / Platform Engineer',
    primarySkills: ['Terraform', 'Kubernetes', 'AWS', 'Prometheus', 'ArgoCD', 'Python'],
    education: 'B.Sc. in Computer Networks, 2021',
    status: 'Ready to Interview',
    summary: 'Multi-region AWS infrastructure automation expert with 99.99% uptime track record. Implemented zero-trust GitOps deployments.',
  },
  {
    id: 'cand-5',
    name: 'Rohan Mehta',
    role: 'Machine Learning / AI Systems Engineer',
    experience: '3.2 Years Exp',
    location: 'Pune / Remote',
    avatar: 'RM',
    aiMatchScore: 92,
    atsScore: 88,
    targetRole: 'Applied AI / LLM Engineer',
    primarySkills: ['Python', 'PyTorch', 'LangChain', 'Vector DBs (Qdrant)', 'RAG', 'FastAPI'],
    education: 'B.Tech in Artificial Intelligence, 2022',
    status: 'Fast-Track',
    summary: 'Built production RAG pipelines serving 1M+ embeddings daily. Proficient in LLM fine-tuning, latency optimization, and semantic search routing.',
  },
  {
    id: 'cand-6',
    name: 'Elena Rostova',
    role: 'Full-Stack Fintech Engineer',
    experience: '4.8 Years Exp',
    location: 'London / Hybrid',
    avatar: 'ER',
    aiMatchScore: 85,
    atsScore: 84,
    targetRole: 'Fintech Software Engineer',
    primarySkills: ['Go (Golang)', 'PostgreSQL', 'React', 'Payment Gateways', 'Docker'],
    education: 'M.Sc. in Financial Computing, 2021',
    status: 'Ready to Interview',
    summary: 'Led PCI-DSS compliant checkout microservice processing $40M annually with zero idempotency discrepancies.',
  },
];

export const RecruiterCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateData[]>(INITIAL_CANDIDATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(['cand-1']);
  const [activeTab, setActiveTab] = useState<'all' | 'shortlisted'>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateData | null>(null);

  const toggleShortlist = (id: string) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.primarySkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole =
      selectedRole === 'All' || c.role.toLowerCase().includes(selectedRole.toLowerCase());

    const matchesTab = activeTab === 'all' || shortlistedIds.includes(c.id);

    return matchesSearch && matchesRole && matchesTab;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Talent Acquisition Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Candidate Search & Talent Pool
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Semantic vector search matching active requisitions against verified candidate telemetry and quantifiable ATS benchmarks.
          </p>
        </div>

        {/* Shortlist Counter */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab(activeTab === 'all' ? 'shortlisted' : 'all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              activeTab === 'shortlisted'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25'
                : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'
            }`}
          >
            <Star className={`w-4 h-4 ${activeTab === 'shortlisted' ? 'fill-slate-950' : 'text-amber-400'}`} />
            <span>Shortlisted ({shortlistedIds.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search bar */}
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, skill (e.g. React, Kafka, Docker) or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          {/* Role select */}
          <div className="sm:col-span-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl glass-input text-xs cursor-pointer bg-slate-900"
            >
              <option value="All">All Disciplines</option>
              <option value="Full-Stack">Full-Stack Engineers</option>
              <option value="Backend">Backend / Distributed</option>
              <option value="Frontend">Frontend / UI Architecture</option>
              <option value="DevOps">DevOps / SRE / Cloud</option>
              <option value="Machine Learning">AI / Applied ML</option>
            </select>
          </div>
        </div>

        {/* Tab switchers & counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`font-semibold pb-1 border-b-2 transition-all ${
                activeTab === 'all'
                  ? 'border-purple-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              All Candidates ({candidates.length})
            </button>
            <button
              onClick={() => setActiveTab('shortlisted')}
              className={`font-semibold pb-1 border-b-2 transition-all ${
                activeTab === 'shortlisted'
                  ? 'border-amber-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Shortlist Queue ({shortlistedIds.length})
            </button>
          </div>

          <span>Showing {filteredCandidates.length} candidate profiles</span>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <RecruiterCandidateCard
            key={candidate.id}
            candidate={candidate}
            isShortlisted={shortlistedIds.includes(candidate.id)}
            onToggleShortlist={toggleShortlist}
            onViewProfile={(c) => setSelectedCandidate(c)}
          />
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="py-16 text-center rounded-3xl glass-panel border border-white/10 space-y-3">
          <Users className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No candidates match your filters</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your query or switching from Shortlisted view to All Candidates.
          </p>
        </div>
      )}

      {/* Candidate Detail Modal / Drawer */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg border border-white/20">
                {selectedCandidate.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{selectedCandidate.name}</h2>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {selectedCandidate.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{selectedCandidate.role}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedCandidate.experience} • {selectedCandidate.location} • {selectedCandidate.education}
                </p>
              </div>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                <span className="text-xs text-purple-300 font-semibold uppercase">AI Match Score</span>
                <p className="text-3xl font-extrabold font-mono text-white mt-1">
                  {selectedCandidate.aiMatchScore}%
                </p>
                <span className="text-[11px] text-slate-400">High Requisition Alignment</span>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <span className="text-xs text-blue-300 font-semibold uppercase">ATS Audit Benchmark</span>
                <p className="text-3xl font-extrabold font-mono text-white mt-1">
                  {selectedCandidate.atsScore}/100
                </p>
                <span className="text-[11px] text-slate-400">STAR Metrics Verified</span>
              </div>
            </div>

            {/* Candidate Summary */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                AI Executive Summary
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedCandidate.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Verified Skill Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCandidate.primarySkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-lg bg-white/5 text-slate-200 border border-white/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => toggleShortlist(selectedCandidate.id)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                  shortlistedIds.includes(selectedCandidate.id)
                    ? 'bg-amber-500 text-slate-950 font-extrabold'
                    : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
                }`}
              >
                {shortlistedIds.includes(selectedCandidate.id)
                  ? 'Remove from Shortlist'
                  : 'Add to Shortlist'}
              </button>

              <button
                onClick={() => {
                  alert(`Interview scheduled with ${selectedCandidate.name}. Link dispatched.`);
                  setSelectedCandidate(null);
                }}
                className="flex-1 py-3 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25 transition-all"
              >
                Schedule Final Round
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
