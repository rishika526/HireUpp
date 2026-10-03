import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Brain,
  Video,
  Building2,
  TrendingUp,
  Cpu,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Target,
  Search,
  Users,
  ShieldCheck,
  ChevronRight,
  Database,
  Layers,
  Mic,
  Eye,
  Activity,
  Play,
} from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FeatureCard } from '../components/ui/FeatureCard';
import { CompanyCard, type CompanyData } from '../components/ui/CompanyCard';
import { ProgressRing } from '../components/ui/ProgressRing';
import { CTASection } from '../components/ui/CTASection';

const SAMPLE_COMPANIES: CompanyData[] = [
  {
    id: 'tcs',
    name: 'TCS',
    logoText: 'TCS',
    logoBg: 'bg-gradient-to-br from-blue-700 to-indigo-900',
    difficulty: 'Easy-Medium',
    difficultyColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    questionsCount: 420,
    progress: 78,
    topics: ['NQT Aptitude', 'Java & C++', 'DSA Basics', 'Behavioral HR'],
    hiringRole: 'Ninja / Digital Specialist',
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logoText: 'INFY',
    logoBg: 'bg-gradient-to-br from-blue-600 to-cyan-800',
    difficulty: 'Easy-Medium',
    difficultyColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    questionsCount: 380,
    progress: 65,
    topics: ['Pseudocode', 'Python & DBMS', 'System Analysis', 'HR Rounds'],
    hiringRole: 'Systems Engineer / Specialist',
  },
  {
    id: 'ibm',
    name: 'IBM',
    logoText: 'IBM',
    logoBg: 'bg-gradient-to-br from-blue-800 to-slate-900',
    difficulty: 'Medium',
    difficultyColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    questionsCount: 310,
    progress: 52,
    topics: ['Cognitive Ability', 'Cloud Fundamentals', 'Data Structures', 'Fitment'],
    hiringRole: 'Associate Software Engineer',
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logoText: 'ACN',
    logoBg: 'bg-gradient-to-br from-purple-700 to-indigo-900',
    difficulty: 'Medium',
    difficultyColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    questionsCount: 350,
    progress: 70,
    topics: ['Critical Reasoning', 'Coding Round', 'Communication Assessment'],
    hiringRole: 'Advanced App Engineering',
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    logoText: 'DTT',
    logoBg: 'bg-gradient-to-br from-emerald-700 to-slate-900',
    difficulty: 'Medium',
    difficultyColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    questionsCount: 290,
    progress: 60,
    topics: ['Versant Test', 'Tech MCQs', 'Consulting Fit', 'Managerial Interview'],
    hiringRole: 'Technology Analyst',
  },
  {
    id: 'lseg',
    name: 'LSEG',
    logoText: 'LSEG',
    logoBg: 'bg-gradient-to-br from-cyan-800 to-blue-950',
    difficulty: 'Medium-Hard',
    difficultyColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    questionsCount: 240,
    progress: 45,
    topics: ['Financial Tech', 'C++ & Low Latency', 'SQL & Distributed', 'System Design'],
    hiringRole: 'Graduate Software Engineer',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logoText: 'MSFT',
    logoBg: 'bg-gradient-to-br from-blue-600 to-amber-600',
    difficulty: 'Hard',
    difficultyColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    questionsCount: 510,
    progress: 40,
    topics: ['Trees & Graphs', 'Dynamic Programming', 'Scalable Systems', 'Behavioral (STAR)'],
    hiringRole: 'Software Development Engineer I',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logoText: 'AMZN',
    logoBg: 'bg-gradient-to-br from-amber-600 to-stone-900',
    difficulty: 'Hard',
    difficultyColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    questionsCount: 560,
    progress: 35,
    topics: ['16 Leadership Principles', 'OOP & Concurrency', 'System Architecture', 'OA Prep'],
    hiringRole: 'Software Development Engineer',
  },
];

export const Home: React.FC = () => {
  const [activePipelineStep, setActivePipelineStep] = useState(1);
  const [activeTab, setActiveTab] = useState<'candidate' | 'recruiter'>('candidate');

  const pipelineSteps = [
    { id: 0, title: 'Resume', icon: <FileText className="w-4 h-4" />, detail: 'Parse & extract structured candidate data' },
    { id: 1, title: 'AI Analysis', icon: <Brain className="w-4 h-4" />, detail: 'ATS benchmark & deep skill gap evaluation' },
    { id: 2, title: 'Preparation', icon: <Building2 className="w-4 h-4" />, detail: 'Tailored company questions & roadmaps' },
    { id: 3, title: 'Interview', icon: <Video className="w-4 h-4" />, detail: 'Multimodal AI mock session with real-time feedback' },
    { id: 4, title: 'Opportunity', icon: <Target className="w-4 h-4" />, detail: 'Direct matchmaking with hiring teams' },
  ];

  return (
    <div className="space-y-24 sm:space-y-36">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Supertag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Generation AI Career & Recruitment OS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Your Career.{' '}
              <span className="text-gradient-blue block sm:inline">
                One Intelligent Platform.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">
              From resume to interview to opportunity — <strong className="text-white font-semibold">HireUpp</strong> brings AI-powered career preparation and intelligent recruitment into one unified ecosystem.
            </p>

            {/* Two Primary Action Paths */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                to="/resume"
                className="px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Get Career Ready</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/recruiter"
                className="px-8 py-4 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Hire Smarter</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Quick Proof Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
              <div>
                <p className="text-2xl font-bold font-mono text-white">87%</p>
                <p className="text-xs text-slate-400 mt-0.5">Avg ATS Score Boost</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white">3.4x</p>
                <p className="text-xs text-slate-400 mt-0.5">Interview Callback Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">Company-Specific Hubs</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hero Visualization */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-lg">
              {/* Central Intelligent Pipeline Container */}
              <div className="relative rounded-3xl glass-panel p-6 sm:p-7 border border-white/15 shadow-2xl backdrop-blur-2xl">
                {/* Header status bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 -ml-4" />
                    <span className="text-xs font-mono text-slate-300 font-medium">Neural Career Pipeline</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/20">
                    Live Engine
                  </span>
                </div>

                {/* Animated Career Lifecycle Steps */}
                <div className="relative space-y-3 mb-6">
                  {pipelineSteps.map((step) => {
                    const isSelected = activePipelineStep === step.id;
                    return (
                      <div
                        key={step.id}
                        onClick={() => setActivePipelineStep(step.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-600/15 border-blue-500/40 shadow-md shadow-blue-500/10'
                            : 'bg-slate-900/40 border-white/5 hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isSelected
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/5 text-slate-400'
                            }`}
                          >
                            {step.icon}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>{step.title}</span>
                              {isSelected && <span className="text-[10px] text-blue-400 font-mono">● Active</span>}
                            </p>
                            <p className="text-[11px] text-slate-400">{step.detail}</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-600'}`} />
                      </div>
                    );
                  })}
                </div>

                {/* Live Diagnostic Quick Stats */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ProgressRing progress={87} size={40} strokeWidth={4} showPercent={false} color="#3b82f6" />
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Profile Compatibility</p>
                      <p className="text-xs font-bold text-white">Tier 1 Tech Ready</p>
                    </div>
                  </div>
                  <Link
                    to="/resume/analyze"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <span>Run Scan</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Floating Badges */}
              {/* Badge 1: ATS Match */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 sm:-left-8 rounded-2xl glass-panel p-3.5 border border-white/20 shadow-xl flex items-center gap-3 backdrop-blur-xl z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm border border-emerald-500/30">
                  87%
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Diagnostic</p>
                  <p className="text-xs font-bold text-white">ATS Match 87%</p>
                </div>
              </motion.div>

              {/* Badge 2: Interview Readiness */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-28 -right-6 sm:-right-8 rounded-2xl glass-panel p-3.5 border border-white/20 shadow-xl flex items-center gap-3 backdrop-blur-xl z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold font-mono text-sm border border-blue-500/30">
                  92%
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Readiness</p>
                  <p className="text-xs font-bold text-white">Interview Ready 92%</p>
                </div>
              </motion.div>

              {/* Badge 3: Skill Gaps */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-6 -left-4 sm:-left-6 rounded-2xl glass-panel p-3.5 border border-white/20 shadow-xl flex items-center gap-2.5 backdrop-blur-xl z-20"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <div>
                  <p className="text-xs font-bold text-white">3 Skill Gaps Detected</p>
                  <p className="text-[10px] text-amber-400 font-medium">System Design • Kafka • K8s</p>
                </div>
              </motion.div>

              {/* Badge 4: Role Match */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-6 -right-4 sm:-right-6 rounded-2xl glass-panel p-3.5 border border-white/20 shadow-xl flex items-center gap-2.5 backdrop-blur-xl z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">AI Match</p>
                  <p className="text-xs font-bold text-white">Role: Software Engineer</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: EVERYTHING YOU NEED TO GET HIRED */}
      <section>
        <SectionHeading
          badge="Platform Capabilities"
          badgeIcon={<Layers className="w-3.5 h-3.5" />}
          title="Everything You Need to"
          gradientWord="Get Hired"
          description="A comprehensive toolkit engineered to bridge the gap between academic preparation and elite tech industry hiring bars."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FileText className="w-6 h-6" />}
            category="Intelligence"
            title="AI Resume Analyzer"
            description="Extract skills, detect structural deficits, quantify impact metrics, and benchmark your bullet points against top 1% applicants."
            linkTo="/resume/analyze"
            linkText="Run instant scan"
            accentColor="blue"
          />

          <FeatureCard
            icon={<Target className="w-6 h-6" />}
            category="Benchmarking"
            title="ATS Intelligence"
            description="Simulate enterprise ATS parser filters (Workday, Taleo, Greenhouse) with instant keyword gap analysis and format compliance audits."
            linkTo="/resume"
            linkText="Check ATS score"
            accentColor="purple"
          />

          <FeatureCard
            icon={<Video className="w-6 h-6" />}
            category="Simulation"
            title="AI Mock Interviews"
            description="Real-time multimodal mock interviews evaluating technical accuracy, voice fluency, response depth, and computer vision indicators."
            linkTo="/interview/mock"
            linkText="Launch interview room"
            accentColor="cyan"
          />

          <FeatureCard
            icon={<Building2 className="w-6 h-6" />}
            category="Targeted"
            title="Company Preparation"
            description="Company-specific question banks and syllabus breakdowns tailored for TCS, Infosys, IBM, Accenture, Microsoft, Amazon, and more."
            linkTo="/preparation/companies"
            linkText="Select target company"
            accentColor="emerald"
          />

          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            category="Adaptive"
            title="Personalized Learning"
            description="RAG-driven adaptive learning roadmaps generated dynamically from your detected skill gaps and interview weaknesses."
            linkTo="/preparation"
            linkText="View custom roadmap"
            accentColor="purple"
          />

          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            category="Telemetry"
            title="Career Analytics"
            description="Track readiness velocity, technical competence curves, mock performance trends, and interview confidence over time."
            linkTo="/dashboard"
            linkText="Inspect dashboard"
            accentColor="blue"
          />
        </div>
      </section>

      {/* 3. SECTION: YOUR RESUME BECOMES YOUR AI CAREER CONTEXT */}
      <section className="relative rounded-3xl glass-panel p-8 sm:p-12 border border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Database className="w-3.5 h-3.5" />
              <span>Contextual Foundation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Your Resume Becomes Your{' '}
              <span className="text-gradient-blue">AI Career Context.</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              At <strong className="text-white">HireUpp</strong>, a resume is not a static PDF file — it is vectorized into your personal career memory. Our AI contextual engine parses your exact project stack, role history, and domain experience to personalize every single step of your preparation.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Dynamic Interview Question Generation</h4>
                  <p className="text-xs text-slate-400">Interviews challenge you on the actual architectural decisions in your listed projects.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Customized Gap Mitigation</h4>
                  <p className="text-xs text-slate-400">Identifies missing prerequisites for your desired level (Junior vs Mid vs Senior).</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">High-Fidelity Matchmaking</h4>
                  <p className="text-xs text-slate-400">Surfaces your verified profile directly to recruiters hunting your specific stack.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/resume/analyze"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all"
              >
                <span>Vectorize & Analyze Your Resume</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-slate-300">Context Vectorization Visualizer</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Active Vector DB
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Target Role:</span>
                  <span className="font-semibold text-white">Full-Stack / Distributed Systems</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Detected Seniority:</span>
                  <span className="font-semibold text-blue-400">Level 4 (2-4 Years exp equivalent)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Identified Strengths:</span>
                  <span className="font-semibold text-emerald-400">React, Node.js, PostgreSQL, Docker</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-400">AI Preparation Directives Generated:</p>
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-slate-300 space-y-1">
                  <p className="text-blue-300 font-semibold">1. Drill AWS ECS & Redis Caching</p>
                  <p className="text-slate-400 text-[11px]">Recommended based on 23 recent Amazon SDE questions.</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs text-slate-300 space-y-1">
                  <p className="text-purple-300 font-semibold">2. STAR Behavioral Defense on "Microservices Migration"</p>
                  <p className="text-slate-400 text-[11px]">Flagged bullet #3 on resume for deep technical inquiry.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION: PREPARE LIKE THE INTERVIEW IS ALREADY TOMORROW */}
      <section>
        <SectionHeading
          badge="Live Simulation"
          badgeIcon={<Video className="w-3.5 h-3.5" />}
          title="Prepare Like The Interview Is"
          gradientWord="Already Tomorrow"
          description="Step into an authentic AI interview room with real-time audio analysis, speech rate detection, eye-contact telemetry, and instant STAR scoring."
        />

        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Interview Room Preview */}
            <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl border border-white/10 p-5 sm:p-6 shadow-inner">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-200">Session Live: Amazon SDE Mock</span>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10">
                  Elapsed: 08:42
                </span>
              </div>

              {/* AI Avatar Visualizer */}
              <div className="relative rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 p-6 flex flex-col items-center justify-center text-center mb-6">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 border-2 border-white/20">
                    <Brain className="w-10 h-10" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                </div>

                <p className="text-sm font-bold text-white mb-1">AI Evaluator: Sarah (Technical Lead)</p>
                <p className="text-xs text-blue-400 font-mono">Assessing: System Architecture & Concurrency</p>

                {/* Animated Voice Waveform */}
                <div className="flex items-center gap-1.5 mt-4 h-8">
                  {[12, 24, 18, 28, 14, 22, 30, 16, 26, 12].map((height, i) => (
                    <span
                      key={i}
                      className="w-1 bg-blue-500 rounded-full animate-soundwave"
                      style={{
                        height: `${height}px`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Question Dialogue Box */}
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
                <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold block mb-1">
                  Current Question 3 of 5
                </span>
                <p className="text-sm font-medium text-white leading-relaxed">
                  "Walk me through how you would architect a real-time notification service handling 500,000 concurrent websocket connections. How do you prevent thread starvation?"
                </p>
              </div>

              {/* Candidate Response Controls */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                    <Mic className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-300 font-medium">Microphone Active</span>
                </div>

                <Link
                  to="/interview/mock"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <span>Launch Full Interview Room</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Right Column: Computer Vision & Biometrics HUD */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl font-bold text-white">
                Multimodal Computer Vision & Telemetry
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Our vision analysis architecture continuously monitors engagement markers to simulate the pressure of high-stakes video panel interviews.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Eye Contact Alignment</p>
                      <p className="text-[11px] text-slate-400">Direct camera gaze ratio</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold font-mono text-emerald-400">94% Optimum</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Speech Cadence & Pace</p>
                      <p className="text-[11px] text-slate-400">Words per minute pacing</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold font-mono text-blue-400">138 WPM (Ideal)</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Confidence & Posture Index</p>
                      <p className="text-[11px] text-slate-400">Shoulder stability & gesture balance</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold font-mono text-purple-400">89/100 Strong</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/interview"
                  className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Practice Session Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION: PREPARE FOR THE COMPANIES YOU ACTUALLY WANT */}
      <section>
        <SectionHeading
          badge="Enterprise Playbooks"
          badgeIcon={<Building2 className="w-3.5 h-3.5" />}
          title="Prepare For The Companies You"
          gradientWord="Actually Want"
          description="Curated question banks, test pattern breakdowns, and hiring benchmarks for the world's most sought-after tech organizations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_COMPANIES.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/preparation/companies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
          >
            <span>Explore All 80+ Company Playbooks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. SECTION: RECRUITER WORKFLOW */}
      <section className="relative rounded-3xl glass-panel p-8 sm:p-12 border border-purple-500/20 bg-gradient-to-b from-purple-950/20 via-slate-900/60 to-slate-950">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Recruiter Intelligence Suite</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            From Candidate Search to{' '}
            <span className="text-gradient-purple">Shortlist</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            Eliminate manual resume screening. HireUpp provides hiring teams with pre-vetted candidate pools, quantitative ATS diagnostics, and AI-verified competency reports.
          </p>
        </div>

        {/* Conceptual Recruiter Workflow Flowchart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 relative">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold mb-3">
              01
            </div>
            <h4 className="text-base font-bold text-white mb-1">Talent Pool</h4>
            <p className="text-xs text-slate-400">Search thousands of pre-evaluated engineering and tech candidates across disciplines.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 relative">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold mb-3">
              02
            </div>
            <h4 className="text-base font-bold text-white mb-1">AI Matching</h4>
            <p className="text-xs text-slate-400">Match open job specs against candidate vector embeddings with zero keyword spoofing.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold mb-3">
              03
            </div>
            <h4 className="text-base font-bold text-white mb-1">Candidate Insights</h4>
            <p className="text-xs text-slate-400">Review verified mock interview scores, code quality samples, and ATS compatibility.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 bg-purple-500/5 relative">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center mb-3">
              04
            </div>
            <h4 className="text-base font-bold text-white mb-1">Instant Shortlist</h4>
            <p className="text-xs text-slate-300">Fast-track high-confidence candidates straight to final interview rounds.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="text-xs text-slate-400">
            Trusted by hiring leaders at top startups and enterprise talent acquisition teams.
          </div>
          <Link
            to="/recruiter/candidates"
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
          >
            <span>Open Recruiter Talent Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 7. SECTION: AI / RAG TECHNOLOGY EXPLAINER */}
      <section id="tech">
        <SectionHeading
          badge="Architecture"
          badgeIcon={<Cpu className="w-3.5 h-3.5" />}
          title="Generative AI & RAG"
          gradientWord="Intelligence Engine"
          description="How HireUpp orchestrates Large Language Models, Vector Retrieval (RAG), and proprietary scoring algorithms to deliver unmatched career precision."
        />

        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-blue-400 mb-2 uppercase">Input Layer</div>
                <h4 className="text-lg font-bold text-white mb-2">Multimodal Data</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Candidate Resume + Target Job Description + Enterprise Question Knowledge Base.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Text, PDF, Code, Audio</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-blue-500/30 bg-blue-500/5 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-indigo-400 mb-2 uppercase">Semantic Index</div>
                <h4 className="text-lg font-bold text-white mb-2">RAG / Vector Retrieval</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dense embeddings cross-matched via vector similarity search to pull exact interview patterns and skill taxonomies.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                <span>kNN Vector Index</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-purple-500/30 bg-purple-500/5 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-purple-400 mb-2 uppercase">Orchestration</div>
                <h4 className="text-lg font-bold text-white mb-2">Fine-Tuned LLMs</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Custom system prompts evaluate responses against rubric standards calibrated by former FAANG technical hiring managers.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                <span>Dynamic Prompt Engine</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/30 bg-emerald-500/5 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-emerald-400 mb-2 uppercase">Output Layer</div>
                <h4 className="text-lg font-bold text-white mb-2">Personalized Insights</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Quantitative ATS scores, STAR format revisions, speech pacing metrics, and high-probability interview questions.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Actionable Diagnostic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION: FINAL CTA */}
      <CTASection />
    </div>
  );
};
