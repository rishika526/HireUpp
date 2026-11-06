import React, { useState, useEffect } from 'react';
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
  Award,
  BookOpen,
  Check,
  RotateCcw,
} from 'lucide-react';
import { ProgressRing } from '../components/ui/ProgressRing';
import { ScoreCard } from '../components/ui/ScoreCard';

export const Dashboard: React.FC = () => {
  const [latestResume, setLatestResume] = useState<any>(null);
  const [interviewHistory, setInterviewHistory] = useState<any[]>([]);
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);
  const [completedCompanyChecks, setCompletedCompanyChecks] = useState<number>(0);

  useEffect(() => {
    // 1. Load latest resume analysis if available
    try {
      const resumeRaw = localStorage.getItem('hireupp_latest_resume_analysis');
      if (resumeRaw) {
        setLatestResume(JSON.parse(resumeRaw));
      }
    } catch {}

    // 2. Load mock interview sessions
    try {
      const interviewRaw = localStorage.getItem('hireupp_interview_sessions');
      if (interviewRaw) {
        setInterviewHistory(JSON.parse(interviewRaw));
      }
    } catch {}

    // 3. Load preparation completed topics
    try {
      const prepRaw = localStorage.getItem('hireupp_prep_completed_topics');
      if (prepRaw) {
        setCompletedTopicIds(JSON.parse(prepRaw));
      }
    } catch {}

    // 4. Load company checklist items count
    try {
      const checksRaw = localStorage.getItem('hireupp_company_checklists');
      if (checksRaw) {
        const parsed = JSON.parse(checksRaw);
        const count = Object.values(parsed).filter(Boolean).length;
        setCompletedCompanyChecks(count);
      }
    } catch {}
  }, []);

  // Baseline fallbacks if candidate hasn't run tests yet
  const effectiveAtsScore = latestResume?.ats_score ?? 83;
  const effectiveResumeName = latestResume?.fileName ?? 'Alex_Morgan_Senior_SWE.pdf';
  const effectiveResumeDate = latestResume?.analyzedAt ?? 'Verified Baseline';

  const defaultMockSessions = [
    {
      id: 'demo-mock-1',
      role: 'Full Stack Developer',
      interview_type: 'Technical',
      difficulty: 'Medium',
      date: 'Today',
      time: '10:30 AM',
      score: 84,
      score_grade: 'B+ (Meets Bar)',
      strengths: ['Structured technical reasoning', 'Clean API error handling explanation'],
      areas_for_improvement: ['Deepen B-Tree database indexing mechanics'],
    },
    {
      id: 'demo-mock-2',
      role: 'Java Developer',
      interview_type: 'Technical',
      difficulty: 'Medium',
      date: 'Yesterday',
      time: '04:15 PM',
      score: 78,
      score_grade: 'B (Approaching Bar)',
      strengths: ['JVM stack vs heap clarity'],
      areas_for_improvement: ['Omitted ConcurrentHashMap bucket locking details'],
    },
  ];

  const displayedSessions = interviewHistory.length > 0 ? interviewHistory : defaultMockSessions;
  const latestMockScore = displayedSessions[0]?.score ?? 84;

  const totalCurriculumTopics = 15;
  const completedTopicsCount = completedTopicIds.length;
  const prepProgressPercent = Math.min(100, Math.round((completedTopicsCount / totalCurriculumTopics) * 100));

  return (
    <div className="space-y-10">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Candidate Intelligence Console • Demo Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Alex Morgan
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Target Focus: <strong className="text-white">Full Stack / Backend Software Engineer</strong> • Ready for Enterprise Rounds
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

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreCard
          title="Latest ATS Benchmark"
          score={effectiveAtsScore}
          subtitle={`Document: ${effectiveResumeName}`}
          trend={latestResume ? "Live Scan Result" : "Verified Baseline Scan"}
          status={effectiveAtsScore >= 80 ? "Passes Enterprise ATS Filters" : "Requires Keyword Optimization"}
          color="#3b82f6"
          badge={latestResume ? "Live Cache" : "Baseline Scan"}
        />

        <ScoreCard
          title="Mock Interview Readiness"
          score={latestMockScore}
          subtitle={`Latest: ${displayedSessions[0]?.role || 'Full Stack'}`}
          trend={`${displayedSessions.length} Mock Rounds Logged`}
          status={displayedSessions[0]?.score_grade || "Meets Hiring Standard"}
          color="#10b981"
          badge={interviewHistory.length > 0 ? "Live Recorded" : "Demo Session"}
        />

        <ScoreCard
          title="Curriculum Mastery"
          score={prepProgressPercent > 0 ? prepProgressPercent : 45}
          subtitle={`${completedTopicsCount} of ${totalCurriculumTopics} Modules Cleared`}
          trend={`${completedCompanyChecks} Company Checklist Tasks`}
          status="On Track for Recruitment Season"
          color="#a855f7"
          badge="Prep Tracker"
        />
      </div>

      {/* Two Column Grid: Resume Diagnostic & Mock History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Resume Audit & Recommended Steps */}
        <div className="lg:col-span-7 space-y-6">
          {/* Resume Analysis Summary Card */}
          <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <h2 className="text-base font-bold text-white">Resume Intelligence Summary</h2>
              </div>
              <Link
                to="/resume/analyze"
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <span>Run New Analysis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white">{effectiveResumeName}</h3>
                  <p className="text-[11px] text-slate-400">{effectiveResumeDate}</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  {effectiveAtsScore}% ATS Score
                </span>
              </div>

              {latestResume?.summary ? (
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{latestResume.summary}"
                </p>
              ) : (
                <p className="text-xs text-slate-400 leading-relaxed">
                  Candidate profile demonstrates strong technical foundation with verified competencies in TypeScript, Node.js, Python, PostgreSQL, and Docker.
                </p>
              )}

              {/* Matched vs Missing skills breakdown if present */}
              {latestResume?.matched_skills && latestResume.matched_skills.length > 0 && (
                <div className="pt-2 border-t border-white/5 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                    Top Verified Skills ({latestResume.matched_skills.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {latestResume.matched_skills.slice(0, 8).map((sk: string, i: number) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-mono"
                      >
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recommended Next Actions */}
          <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Recommended Preparation Actions</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">Personalized Next Steps</span>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-blue-500/30 transition-all space-y-1.5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-bold text-white">Drill Database Indexing & B-Trees</h3>
                  <Link
                    to="/preparation"
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap"
                  >
                    Study Topic
                  </Link>
                </div>
                <p className="text-xs text-slate-400">
                  Identified as a critical keyword in high-volume enterprise candidate rounds.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-purple-500/30 transition-all space-y-1.5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-bold text-white">Complete TCS & Infosys Checklists</h3>
                  <Link
                    to="/preparation/companies"
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white transition-all whitespace-nowrap"
                  >
                    View Playbooks
                  </Link>
                </div>
                <p className="text-xs text-slate-400">
                  Review indicative online assessment patterns and common technical question answers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/30 transition-all space-y-1.5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-bold text-white">Take a Mixed Technical & HR Mock</h3>
                  <Link
                    to="/interview/mock"
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all whitespace-nowrap"
                  >
                    Start Session
                  </Link>
                </div>
                <p className="text-xs text-slate-400">
                  Practice voice responses under live simulated panel pressure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Mock Interview History & Topic Progress */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mock Interview History */}
          <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-400" />
                <span>Mock Interview Sessions</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {displayedSessions.length} Recorded
              </span>
            </div>

            <div className="space-y-3">
              {displayedSessions.map((session, idx) => (
                <div
                  key={session.id || idx}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{session.role}</p>
                      <p className="text-[10px] text-slate-500">
                        {session.date} • {session.difficulty || 'Medium'} • {session.interview_type || 'Technical'}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                        session.score >= 80
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {session.score}%
                    </span>
                  </div>

                  {session.strengths && session.strengths.length > 0 && (
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      <strong className="text-emerald-400">Strength:</strong> {session.strengths[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <Link
              to="/interview/mock"
              className="w-full mt-2 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Launch New Mock Interview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Curriculum Completed Topics */}
          <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>Recently Mastered Modules</span>
              </h2>
              <span className="text-xs text-blue-400 font-mono">
                {completedTopicsCount} Done
              </span>
            </div>

            {completedTopicIds.length > 0 ? (
              <div className="space-y-2">
                {completedTopicIds.map((tid) => (
                  <div
                    key={tid}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <span className="text-white capitalize font-medium">{tid}</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 text-center space-y-2">
                <p>No modules marked completed yet.</p>
                <Link
                  to="/preparation"
                  className="inline-block text-blue-400 hover:text-blue-300 font-semibold"
                >
                  Browse Preparation Curriculum →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
