import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Target,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  Check,
  XCircle,
  Upload,
  AlertCircle,
  FileCheck,
  Layers,
  BookOpen,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { ProgressRing } from '../components/ui/ProgressRing';
import {
  analyzeResumeApi,
  checkBackendHealth,
  type ResumeAnalysisResponse,
} from '../services/api';

const DEFAULT_SAMPLE_JD = `Senior Backend & Distributed Systems Engineer
Target Level: SDE-II / Senior SWE

Core Requirements:
- 4+ years software development experience with TypeScript, Node.js, and Python.
- Strong hands-on expertise with PostgreSQL, Redis distributed caching, and relational database schema design.
- Experience architecting microservices, containerization with Docker, and cloud deployments on AWS (ECS, S3, Lambda).
- Experience with REST and GraphQL API design for high-concurrency systems.
- Preferred: Experience with Apache Kafka for real-time event streaming and Kubernetes (k8s) cluster orchestration.`;

export const ResumeAnalyzer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'bullets' | 'extracted'>('overview');
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState(DEFAULT_SAMPLE_JD);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<'online' | 'checking' | 'offline'>('checking');
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResponse | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth()
      .then(() => setBackendStatus('online'))
      .catch(() => setBackendStatus('offline'));
  }, []);

  // Auto-run analysis when file is loaded
  const executeAnalysis = async (fileToAnalyze: File) => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisStage('Uploading PDF document to HireUpp backend...');

    try {
      setTimeout(() => setAnalysisStage('Extracting text and structure via PyPDF...'), 400);
      setTimeout(() => setAnalysisStage('Cross-referencing semantic skills with job description...'), 900);
      setTimeout(() => setAnalysisStage('Synthesizing ATS compatibility metrics...'), 1400);

      const result = await analyzeResumeApi(fileToAnalyze, jobDescription);
      setAnalysisResult(result);
      setBackendStatus('online');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to analyze resume. Please ensure the backend is running.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStage('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      executeAnalysis(selected);
    }
  };

  // Demo helper: Fetch the bundled sample PDF and analyze
  const handleLoadSamplePDF = async () => {
    try {
      setIsAnalyzing(true);
      setErrorMessage(null);
      setAnalysisStage('Loading sample candidate PDF (Alex_Morgan_Senior_SWE.pdf)...');

      const res = await fetch('/Alex_Morgan_Senior_SWE.pdf');
      if (!res.ok) throw new Error('Could not fetch sample PDF from public directory.');

      const blob = await res.blob();
      const sampleFile = new File([blob], 'Alex_Morgan_Senior_SWE.pdf', {
        type: 'application/pdf',
      });

      setFile(sampleFile);
      await executeAnalysis(sampleFile);
    } catch (err: any) {
      setErrorMessage(err.message);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Live Backend Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link to="/resume" className="hover:text-blue-400">
              Resume Intelligence
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">ATS Compatibility Diagnostic</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            End-to-End Resume & ATS Analyzer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload your PDF resume to evaluate real semantic match against your target requisition.
          </p>
        </div>

        {/* Backend Connectivity Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                backendStatus === 'online'
                  ? 'bg-emerald-400 animate-pulse'
                  : backendStatus === 'checking'
                  ? 'bg-amber-400'
                  : 'bg-rose-400'
              }`}
            />
            <span className="font-mono text-slate-300">
              Backend API: {backendStatus === 'online' ? 'Connected (FastAPI :8000)' : backendStatus}
            </span>
          </div>

          <button
            onClick={handleLoadSamplePDF}
            disabled={isAnalyzing}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Sample PDF</span>
          </button>
        </div>
      </div>

      {/* Upload Zone & Job Description Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: File Upload Component */}
        <div className="lg:col-span-6 rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-400" />
              <span>1. Upload PDF Resume</span>
            </h2>
            <span className="text-[11px] text-slate-400">PDF up to 10MB</span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,application/pdf"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/15 hover:border-blue-500/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/60 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
              <FileText className="w-6 h-6" />
            </div>

            {file ? (
              <div>
                <p className="text-xs font-bold text-white">{file.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {(file.size / 1024).toFixed(1)} KB • Click to choose a different PDF
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs font-bold text-white">Click or drag & drop PDF here</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Real text extraction via Python <code className="text-blue-400">pypdf</code>
                </p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Extraction Error:</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Job Description Requisition Input */}
        <div className="lg:col-span-6 rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span>2. Target Job Description</span>
            </h2>
            <button
              onClick={() => setJobDescription(DEFAULT_SAMPLE_JD)}
              className="text-[11px] font-semibold text-blue-400 hover:text-blue-300"
            >
              Reset to Sample JD
            </button>
          </div>

          <textarea
            rows={5}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description you're applying for here..."
            className="w-full p-3 rounded-2xl glass-input text-xs font-mono text-slate-200 leading-relaxed resize-none"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">
              Matches skills, seniority requirements, and keyword density
            </span>
            <button
              onClick={() => {
                if (file) executeAnalysis(file);
                else handleLoadSamplePDF();
              }}
              disabled={isAnalyzing}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing...' : 'Run Live ATS Scan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Loading Progress State */}
      {isAnalyzing && (
        <div className="p-8 rounded-3xl glass-panel border border-blue-500/30 bg-blue-500/5 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto animate-pulse">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Analyzing Resume & Job Description</h3>
            <p className="text-xs text-blue-300 font-mono mt-1">{analysisStage}</p>
          </div>
          <div className="max-w-md mx-auto h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-pulse w-3/4 rounded-full" />
          </div>
        </div>
      )}

      {/* Live Results Display */}
      {analysisResult && !isAnalyzing && (
        <div className="space-y-8 animate-fadeIn">
          {/* Mode Notification Banner */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <div>
                <span className="text-white font-bold">Analysis Engine: </span>
                <span className="text-slate-300">{analysisResult.provider_used}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <span>Extracted Chars: {analysisResult.extracted_character_count}</span>
              <span>•</span>
              <span className="text-emerald-400">Status: Verified</span>
            </div>
          </div>

          {/* Primary Scores Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Overall Score */}
            <div className="p-6 rounded-2xl glass-panel border border-blue-500/30 bg-blue-500/5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-blue-400 font-semibold">
                  Overall ATS Compatibility
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  {analysisResult.ats_score >= 80 ? 'High Fit' : 'Moderate'}
                </span>
              </div>
              <div className="flex items-center gap-4 my-2">
                <ProgressRing
                  progress={analysisResult.ats_score}
                  size={84}
                  strokeWidth={8}
                  color="#3b82f6"
                />
                <div>
                  <div className="text-3xl font-extrabold text-white font-mono">
                    {analysisResult.ats_score}/100
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Requisition Alignment</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 border-t border-white/10 pt-3 mt-2">
                Evaluated against current job description.
              </p>
            </div>

            {/* Skills Match */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-purple-400 font-semibold">
                  Skills Match
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                  {analysisResult.matched_skills.length} Matched
                </span>
              </div>
              <div className="flex items-center gap-4 my-2">
                <ProgressRing
                  progress={analysisResult.category_scores.skills_match}
                  size={84}
                  strokeWidth={8}
                  color="#a855f7"
                />
                <div>
                  <div className="text-3xl font-extrabold text-white font-mono">
                    {analysisResult.category_scores.skills_match}%
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Core Tech Stack Fit</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 border-t border-white/10 pt-3 mt-2">
                {analysisResult.missing_skills.length} critical skills missing.
              </p>
            </div>

            {/* Experience Relevance */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold">
                  Experience Relevance
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  STAR Metric
                </span>
              </div>
              <div className="flex items-center gap-4 my-2">
                <ProgressRing
                  progress={analysisResult.category_scores.experience_relevance}
                  size={84}
                  strokeWidth={8}
                  color="#10b981"
                />
                <div>
                  <div className="text-3xl font-extrabold text-white font-mono">
                    {analysisResult.category_scores.experience_relevance}%
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Impact & Seniority</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 border-t border-white/10 pt-3 mt-2">
                Action-driven outcomes detected.
              </p>
            </div>

            {/* Keywords Density */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-amber-400 font-semibold">
                  Keyword Optimization
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  Parsed
                </span>
              </div>
              <div className="flex items-center gap-4 my-2">
                <ProgressRing
                  progress={analysisResult.category_scores.keywords}
                  size={84}
                  strokeWidth={8}
                  color="#f59e0b"
                />
                <div>
                  <div className="text-3xl font-extrabold text-white font-mono">
                    {analysisResult.category_scores.keywords}%
                  </div>
                  <p className="text-xs text-slate-300 mt-1">ATS Parser Index</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 border-t border-white/10 pt-3 mt-2">
                High skimmability verified.
              </p>
            </div>
          </div>

          {/* Executive Summary Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>AI Executive Diagnostic Summary</span>
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {analysisResult.summary}
            </p>
          </div>

          {/* Category Breakdown Bars */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Multidimensional Score Breakdown</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {Object.entries(analysisResult.category_scores).map(([key, val]) => (
                <div key={key} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <span className="font-bold font-mono text-white">{val}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs for In-depth Details */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Strengths & Fixes
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'skills'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Matched vs Missing Skills
            </button>
            <button
              onClick={() => setActiveTab('extracted')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'extracted'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Extracted Resume Data
            </button>
          </div>

          {/* Tab Content: Strengths & Improvements */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Strengths */}
              <div className="lg:col-span-6 rounded-3xl glass-panel p-6 border border-emerald-500/20 bg-emerald-500/5 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Detected Strengths ({analysisResult.strengths.length})</span>
                </h3>

                <div className="space-y-3">
                  {analysisResult.strengths.map((str, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{str.title}</h4>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {str.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{str.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvements */}
              <div className="lg:col-span-6 rounded-3xl glass-panel p-6 border border-amber-500/20 bg-amber-500/5 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>Improvement Recommendations ({analysisResult.improvements.length})</span>
                </h3>

                <div className="space-y-3">
                  {analysisResult.improvements.map((imp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{imp.title}</h4>
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          {imp.impact}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">Actionable Suggestion:</p>
                      <p className="text-xs text-slate-400">{imp.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Skills Breakdown */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Matched Skills */}
              <div className="lg:col-span-6 rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Matched Skills ({analysisResult.matched_skills.length})</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.matched_skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="lg:col-span-6 rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Missing Skills in Resume ({analysisResult.missing_skills.length})</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.missing_skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/30 flex items-center gap-1.5"
                    >
                      <XCircle className="w-3 h-3 text-rose-400" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Keywords to add */}
              <div className="lg:col-span-12 rounded-3xl glass-panel p-6 border border-blue-500/20 bg-blue-500/5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Recommended Keywords for ATS Ranking
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.recommended_keywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-lg bg-white/5 text-slate-200 border border-white/10"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Extracted Resume Data */}
          {activeTab === 'extracted' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Experience */}
              <div className="lg:col-span-6 rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span>Extracted Work Experience</span>
                </h3>
                <div className="space-y-4">
                  {analysisResult.experience.map((exp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-white">{exp.role}</p>
                          <p className="text-[11px] text-slate-400">{exp.company}</p>
                        </div>
                        {exp.duration && (
                          <span className="text-[10px] font-mono text-slate-400">{exp.duration}</span>
                        )}
                      </div>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Projects */}
              <div className="lg:col-span-6 space-y-6">
                <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    <span>Extracted Education & Credentials</span>
                  </h3>
                  <div className="space-y-3">
                    {analysisResult.education.map((edu, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                        <p className="text-xs font-bold text-white">{edu.degree}</p>
                        <p className="text-[11px] text-slate-400">{edu.institution} • {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Extracted Projects</span>
                  </h3>
                  <div className="space-y-3">
                    {analysisResult.projects.map((proj, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1.5">
                        <p className="text-xs font-bold text-white">{proj.name}</p>
                        <p className="text-xs text-slate-400">{proj.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {proj.technologies.map((t, tIdx) => (
                            <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps CTA */}
          <div className="p-6 rounded-3xl glass-panel border border-blue-500/20 bg-gradient-to-r from-blue-900/30 to-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Next Step: Practice Live Mock Interview</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Take an AI interview tailored to your detected gaps: {analysisResult.missing_skills.slice(0, 3).join(', ')}
              </p>
            </div>
            <Link
              to="/interview/mock"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all whitespace-nowrap"
            >
              <span>Launch Mock Interview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
