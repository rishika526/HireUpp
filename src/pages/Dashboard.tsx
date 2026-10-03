import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Brain,
  FileText,
  Video,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
  Target,
  ChevronRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { ProgressRing } from '../components/ui/ProgressRing';
import { ScoreCard } from '../components/ui/ScoreCard';

export const Dashboard: React.FC = () => {
  const recentActivities = [
    {
      id: 1,
      type: 'interview',
      title: 'Amazon SDE Mock Interview Completed',
      score: '92%',
      date: 'Today, 10:45 AM',
      icon: <Video className="w-4 h-4 text-blue-400" />,
      tag: 'Technical Lead',
    },
    {
      id: 2,
      type: 'resume',
      title: 'Resume Analyzed against Tier 1 Tech Spec',
      score: '87 ATS',
      date: 'Yesterday, 4:20 PM',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      tag: 'Optimized',
    },
    {
      id: 3,
      type: 'practice',
      title: 'Completed "Consistent Hashing & Ring Rebalancing"',
      score: '100%',
      date: 'Oct 01, 2026',
      icon: <Brain className="w-4 h-4 text-purple-400" />,
      tag: 'System Design',
    },
  ];

  const skillGaps = [
    { name: 'Kubernetes Orchestration', priority: 'High', deficit: '-6 pts', topic: 'Cloud/DevOps' },
    { name: 'Kafka Partition Rebalance', priority: 'High', deficit: '-5 pts', topic: 'Streaming' },
    { name: 'Distributed Caching (Redis)', priority: 'Medium', deficit: '-3 pts', topic: 'Architecture' },
    { name: 'STAR Behavioral Delivery', priority: 'Low', deficit: '-2 pts', topic: 'HR Fit' },
  ];

  const recommendedActions = [
    {
      id: 1,
      title: 'Drill AWS ECS & Kubernetes Concepts',
      reason: 'Flagged as top gap in 3 of your target company profiles.',
      actionText: 'Start 15-min drill',
      linkTo: '/preparation',
    },
    {
      id: 2,
      title: 'Re-run Behavioral STAR Mock',
      reason: 'Your eye-contact was strong (94%), but conflict stories need crisper metric conclusions.',
      actionText: 'Practice behavioral session',
      linkTo: '/interview/mock',
    },
    {
      id: 3,
      title: 'Export Optimized Resume Bullets',
      reason: 'Apply AI-suggested STAR revisions to reach 92+ ATS score.',
      actionText: 'Review recommendations',
      linkTo: '/resume/analyze',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Candidate Intelligence Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, Alex Morgan
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-1">
            Target Goal: <strong className="text-white">Senior Software Engineer (Amazon / Microsoft / Tier 1 Tech)</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/interview/mock"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all"
          >
            <span>Launch Mock Interview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Top Core Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreCard
          title="ATS Benchmark Score"
          score={87}
          subtitle="Top 8% of all platform candidates"
          trend="+14% this month"
          status="Workday & Greenhouse Pass"
          color="#3b82f6"
          badge="Verified Scan"
        />

        <ScoreCard
          title="AI Interview Readiness"
          score={92}
          subtitle="Based on 4 simulated mock rounds"
          trend="+8% this week"
          status="Calibrated for SDE-II Level"
          color="#10b981"
          badge="Live HUD Evaluated"
        />

        <ScoreCard
          title="Curriculum Velocity"
          score={78}
          subtitle="70 of 90 targeted modules cleared"
          trend="Streak: 8 Days Active"
          status="On Track for Nov Interviews"
          color="#a855f7"
          badge="Adaptive Engine"
        />
      </div>

      {/* Main Content: Recommendations & Skill Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recommended AI Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Recommended AI Actions</span>
              </h2>
              <span className="text-xs text-blue-400 font-mono">Prioritized for You</span>
            </div>

            <div className="space-y-3">
              {recommendedActions.map((action) => (
                <div
                  key={action.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-blue-500/30 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm font-bold text-white">{action.title}</h3>
                    <Link
                      to={action.linkTo}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap flex items-center gap-1"
                    >
                      <span>{action.actionText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <p className="text-xs text-slate-400">{action.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Telemetry Activity */}
          <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Recent Career Activities</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">Last 72 Hours</span>
            </div>

            <div className="space-y-3">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      {act.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{act.title}</p>
                      <p className="text-[10px] text-slate-500">{act.date} • {act.tag}</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {act.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Skill Gaps Radar & Company Readiness (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Skill Gaps Breakdown */}
          <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Detected Skill Gaps ({skillGaps.length})</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">Impact Score</span>
            </div>

            <div className="space-y-2.5">
              {skillGaps.map((gap, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{gap.name}</p>
                    <p className="text-[10px] text-slate-500">{gap.topic}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      {gap.deficit}
                    </span>
                    <span className="text-[10px] block text-slate-500 mt-0.5">{gap.priority} Priority</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/preparation"
              className="w-full mt-2 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Address Skill Gaps in Prep Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Target Company Radar */}
          <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Company Readiness Radar</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">Benchmark</span>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Amazon SDE', readiness: 88, status: 'Interview Ready' },
                { name: 'Microsoft SWE-I', readiness: 84, status: 'Strong Fit' },
                { name: 'TCS Digital', readiness: 96, status: 'Exceeds Bar' },
                { name: 'LSEG Quantitative Eng', readiness: 79, status: 'Close Gap' },
              ].map((c, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">{c.name}</span>
                    <span className="text-blue-400 font-mono font-bold">{c.readiness}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      style={{ width: `${c.readiness}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/preparation/companies"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>Browse all target company syllabi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
