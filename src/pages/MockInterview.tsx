import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Sparkles,
  Brain,
  Eye,
  Activity,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Volume2,
} from 'lucide-react';

interface QuestionItem {
  id: number;
  category: 'Technical' | 'Behavioral' | 'System Architecture';
  topic: string;
  text: string;
  expectedKeywords: string[];
  followUpHint: string;
}

export const MockInterview: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const companyParam = searchParams.get('company') || 'Tier 1 Tech';

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [interviewType, setInterviewType] = useState<'technical' | 'behavioral'>('technical');
  const [secondsElapsed, setSecondsElapsed] = useState(245); // simulated progress
  const [showEndModal, setShowEndModal] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  // Computer Vision Telemetry Mock State
  const [faceDetected, setFaceDetected] = useState(true);
  const [eyeContactScore, setEyeContactScore] = useState(94);
  const [confidenceScore, setConfidenceScore] = useState(88);
  const [speechPacing, setSpeechPacing] = useState(136); // words per minute

  const questions: QuestionItem[] = [
    {
      id: 1,
      category: 'Technical',
      topic: 'Data Structures & Algorithmic Trade-offs',
      text: 'Can you describe the internal hashing mechanism of a distributed cache like Redis, and explain how consistent hashing prevents massive cache invalidation during node re-balancing?',
      expectedKeywords: ['Virtual Nodes', 'Hash Ring', 'O(1) amortized', 'Node Addition/Removal'],
      followUpHint: 'Be sure to mention virtual nodes for hot-spot mitigation.',
    },
    {
      id: 2,
      category: 'System Architecture',
      topic: 'High-Concurrency Ingestion',
      text: `For ${companyParam}, imagine designing an event ingestion pipeline processing 100,000 telemetry events per second. How would you choose between Apache Kafka and RabbitMQ?`,
      expectedKeywords: ['Partitioning', 'Consumer Groups', 'Message Persistence', 'Throughput vs Latency'],
      followUpHint: 'Focus on log retention and offset replayability.',
    },
    {
      id: 3,
      category: 'Behavioral',
      topic: 'Conflict Resolution & Technical Disagreement (STAR)',
      text: 'Tell me about a time when you and a senior engineer strongly disagreed on a software architecture decision. How did you resolve it objectively?',
      expectedKeywords: ['Data-driven benchmarks', 'RFC document', 'Constructive alignment', 'Business impact'],
      followUpHint: 'Structure response strictly as Situation, Task, Action, Result.',
    },
    {
      id: 4,
      category: 'Technical',
      topic: 'Database Concurrency & Isolation',
      text: 'What are the main anomalies avoided under Snapshot Isolation versus Serializable Isolation in relational databases, and what is Write Skew?',
      expectedKeywords: ['Dirty Reads', 'Non-repeatable reads', 'Phantom reads', 'Write Skew'],
      followUpHint: 'Provide a real-world example of doctor on-call shifts for write skew.',
    },
  ];

  const currentQ = questions[currentQuestionIndex];

  // Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAISpeaking(true);
      setTimeout(() => setIsAISpeaking(false), 3000);
    } else {
      setShowEndModal(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Session Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10 bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Live Mock Simulation
            </span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-xs text-blue-400 font-semibold">{companyParam} Candidate Track</span>
        </div>

        {/* Mode & Category Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-white/10 text-xs">
            <button
              onClick={() => setInterviewType('technical')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                interviewType === 'technical'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Technical Focus
            </button>
            <button
              onClick={() => setInterviewType('behavioral')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                interviewType === 'behavioral'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Behavioral Focus
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>

          <button
            onClick={() => setShowEndModal(true)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600 hover:text-white transition-all flex items-center gap-1.5"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>End Session</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Video Stage & Telemetry HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Video Stage, AI Evaluator & Question Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Visual Stage (AI Interviewer + Candidate Camera Preview PiP) */}
          <div className="relative rounded-3xl bg-slate-950 border border-white/10 overflow-hidden shadow-2xl h-[420px] sm:h-[480px] flex flex-col justify-between p-6">
            {/* Ambient Room Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-slate-950 to-slate-950 pointer-events-none" />

            {/* Stage Header Info */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md">
                <Brain className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold text-slate-200">
                  AI Interviewer: Dr. Sarah Vance (Lead Staff Architect)
                </span>
              </div>

              {isAISpeaking && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Synthesizing Voice...</span>
                </div>
              )}
            </div>

            {/* Center: AI Avatar & Audio Visualizer */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              <div className="relative">
                {/* Pulse rings */}
                <div className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-2xl border-4 border-white/20 relative z-10">
                  <Brain className="w-14 h-14" />
                </div>
                <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center z-20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </span>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm font-bold text-white">HireUpp Multimodal Evaluation Active</p>
                <p className="text-xs text-slate-400 mt-0.5">Listening to candidate speech stream</p>
              </div>

              {/* Dynamic Sound Waveforms */}
              {isMicOn && (
                <div className="flex items-center gap-1.5 mt-4 h-10">
                  {[8, 16, 28, 14, 34, 22, 38, 18, 30, 14, 26, 12, 20, 8].map((val, i) => (
                    <span
                      key={i}
                      className="w-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full animate-soundwave"
                      style={{
                        height: `${val}px`,
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Candidate Webcam Picture-in-Picture (PiP) */}
            <div className="absolute bottom-6 right-6 w-44 sm:w-52 h-32 sm:h-36 rounded-2xl bg-slate-900 border border-white/20 shadow-2xl overflow-hidden z-20 flex flex-col justify-between p-2.5">
              {isCameraOn ? (
                <>
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span className="flex items-center gap-1 font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Candidate Feed
                    </span>
                    <span className="bg-slate-950/80 px-1.5 py-0.5 rounded font-mono">1080p</span>
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs font-bold">
                      YOU
                    </div>
                  </div>

                  {/* Face Mesh Tracking Bounding Box Indicator */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="text-emerald-400">Mesh Locked</span>
                    <span>30 FPS</span>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                  <VideoOff className="w-6 h-6 mb-1" />
                  <span>Camera Disabled</span>
                </div>
              )}
            </div>

            {/* Bottom Controls Bar inside Stage */}
            <div className="relative z-10 flex items-center gap-3">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-2xl border transition-all ${
                  isMicOn
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/25'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                }`}
                title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-3 rounded-2xl border transition-all ${
                  isCameraOn
                    ? 'bg-slate-800 text-white border-white/20'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                }`}
                title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
              >
                {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <div className="text-xs text-slate-400 pl-2">
                {isMicOn ? 'Voice detection engaged' : 'Microphone muted'}
              </div>
            </div>
          </div>

          {/* Active Question Panel */}
          <div className="p-6 rounded-3xl glass-panel border border-blue-500/20 bg-blue-500/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 uppercase">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-xs text-slate-400">• {currentQ.topic}</span>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>Progress:</span>
                <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              "{currentQ.text}"
            </h3>

            {/* Expected Keyword Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Scoring Keywords:</span>
              {currentQ.expectedKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-slate-400 italic flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Tip: {currentQ.followUpHint}</span>
              </div>

              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all"
              >
                <span>
                  {currentQuestionIndex < questions.length - 1 ? 'Submit & Next Question' : 'Complete Interview'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Computer Vision Indicators & Transcript */}
        <div className="lg:col-span-4 space-y-6">
          {/* Computer Vision Architecture HUD */}
          <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Computer Vision Telemetry</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Tracking
              </span>
            </div>

            {/* Metric 1: Face Presence */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Face Presence</p>
                  <p className="text-[10px] text-slate-400">Head position & framing</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">99.8% Detected</span>
            </div>

            {/* Metric 2: Eye Contact */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Eye-Contact Ratio</p>
                  <p className="text-[10px] text-slate-400">Direct camera gaze ratio</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-blue-400">{eyeContactScore}% High</span>
            </div>

            {/* Metric 3: Posture & Confidence */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Posture / Confidence</p>
                  <p className="text-[10px] text-slate-400">Shoulder balance & fidget index</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-purple-400">{confidenceScore}/100</span>
            </div>

            {/* Metric 4: Speech Rate */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Cadence & Pacing</p>
                  <p className="text-[10px] text-slate-400">Words per minute</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">{speechPacing} WPM (Ideal)</span>
            </div>
          </div>

          {/* Real-time Transcript Stream */}
          <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Live Speech Transcript</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Whisper ASR</span>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 text-xs">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-slate-200">
                <p className="text-[10px] font-mono text-blue-400 font-semibold mb-1">AI Evaluator</p>
                <p>"{currentQ.text}"</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-slate-300">
                <p className="text-[10px] font-mono text-emerald-400 font-semibold mb-1">Candidate (Audio Stream)</p>
                <p>
                  "In consistent hashing, the key space is represented as a circular ring from 0 to 2^32-1. When nodes are added, only K/N keys need remapping rather than the entire cluster..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End Interview Summary Modal */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="max-w-xl w-full rounded-3xl glass-panel p-8 border border-white/20 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Interview Session Completed</h2>
              <p className="text-xs text-slate-400">
                Telemetry processed. Overall readiness calibrated for {companyParam}.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <p className="text-2xl font-bold font-mono text-blue-400">92%</p>
                <p className="text-[11px] text-slate-400 mt-1">Technical Score</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <p className="text-2xl font-bold font-mono text-emerald-400">94%</p>
                <p className="text-[11px] text-slate-400 mt-1">Eye-Contact</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <p className="text-2xl font-bold font-mono text-purple-400">88/100</p>
                <p className="text-[11px] text-slate-400 mt-1">Confidence</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-xs space-y-2">
              <p className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Recommendation:</span>
              </p>
              <p className="text-slate-300">
                "Excellent technical depth on distributed hashing. To achieve top 1% benchmark, improve initial STAR structure clarity on conflict resolution before diving into technical details."
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowEndModal(false);
                  setCurrentQuestionIndex(0);
                }}
                className="flex-1 py-3 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              >
                Practice Again
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all"
              >
                Go to Performance Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
