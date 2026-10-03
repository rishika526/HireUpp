import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Code2,
  Building2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  Terminal,
  Layers,
  Award,
  Clock,
} from 'lucide-react';
import { ProgressRing } from '../components/ui/ProgressRing';

export const PreparationHub: React.FC = () => {
  const learningTracks = [
    {
      id: 'dsa',
      title: 'Data Structures & Algorithmic Patterns',
      lessonsCount: 48,
      completedCount: 36,
      progress: 75,
      level: 'Intermediate - Advanced',
      topics: ['Two Pointers', 'Sliding Window', 'Dynamic Programming', 'Tries & Graphs'],
      badge: 'Core Competency',
      color: 'from-blue-500/20 to-indigo-500/5 border-blue-500/30',
    },
    {
      id: 'sys-design',
      title: 'System Design & Scalability Patterns',
      lessonsCount: 32,
      completedCount: 16,
      progress: 50,
      level: 'Senior / L4+ Standard',
      topics: ['Rate Limiting', 'Consistent Hashing', 'Message Queues', 'CAP Theorem'],
      badge: 'High Impact',
      color: 'from-purple-500/20 to-pink-500/5 border-purple-500/30',
    },
    {
      id: 'behavioral',
      title: 'STAR Method & Executive Communication',
      lessonsCount: 20,
      completedCount: 18,
      progress: 90,
      level: 'All Seniority Levels',
      topics: ['Conflict Resolution', 'Ambiguity', 'Customer Obsession', 'Failures & Learnings'],
      badge: 'HR & Bar Raiser',
      color: 'from-emerald-500/20 to-teal-500/5 border-emerald-500/30',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <Brain className="w-3.5 h-3.5" />
            <span>Personalized Learning Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Preparation Roadmaps & Modules
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            RAG-powered curricula mapped to your resume's detected skill gaps and target company benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/preparation/companies"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-2 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>View Company Tracks</span>
          </Link>
          <Link
            to="/interview/mock"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all"
          >
            <span>Practice Live Mock</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Daily Challenge Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-purple-950/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Today's Adaptive Question (Amazon SDE-II Standard)
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">
            "Design an LRU Cache with O(1) Get & Put using Doubly Linked List + HashMap"
          </h3>
          <p className="text-xs text-slate-300">
            Recommended to strengthen your data structures score before your mock interview tomorrow.
          </p>
        </div>

        <Link
          to="/interview/mock"
          className="px-6 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 whitespace-nowrap transition-all"
        >
          <span>Solve with AI Assistant</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Learning Tracks Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Active Curriculum Modules</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">3 Enrolled Tracks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningTracks.map((track) => (
            <div
              key={track.id}
              className={`p-6 sm:p-7 rounded-3xl glass-panel border bg-gradient-to-b ${track.color} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/10">
                    {track.badge}
                  </span>
                  <span className="text-xs font-mono text-blue-400 font-bold">
                    {track.completedCount}/{track.lessonsCount} Modules
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{track.title}</h3>
                <p className="text-xs text-slate-400 mb-4">{track.level}</p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Mastery</span>
                    <span className="font-semibold text-white font-mono">{track.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${track.progress}%` }}
                    />
                  </div>
                </div>

                {/* Topics pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {track.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  ~40 mins daily
                </span>
                <Link
                  to="/interview/mock"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
