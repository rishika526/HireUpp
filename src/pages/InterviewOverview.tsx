import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Video,
  Mic,
  Camera,
  Brain,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Settings2,
  Clock,
  Code,
  Users,
  Building2,
  Play,
} from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';

export const InterviewOverview: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'technical' | 'behavioral' | 'system-design'>('technical');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Standard' | 'Challenging' | 'FAANG-Caliber'>('Challenging');
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const interviewModes = [
    {
      id: 'technical',
      title: 'Technical & Coding Architecture',
      description: 'Algorithm walk-throughs, concurrency trade-offs, language internals, and live technical problem solving.',
      icon: <Code className="w-5 h-5 text-blue-400" />,
      questions: '5 Questions • 25 Mins',
      color: 'border-blue-500/30 bg-blue-500/5',
    },
    {
      id: 'behavioral',
      title: 'STAR Leadership & Cultural Fit',
      description: 'Conflict resolution, ownership, ambiguity handling, and cross-functional team dynamics assessed on STAR metrics.',
      icon: <Users className="w-5 h-5 text-purple-400" />,
      questions: '4 Questions • 20 Mins',
      color: 'border-purple-500/30 bg-purple-500/5',
    },
    {
      id: 'system-design',
      title: 'Distributed System Design',
      description: 'High-level architecture, scalability, database sharding, caching, and resiliency for distributed services.',
      icon: <Brain className="w-5 h-5 text-emerald-400" />,
      questions: '3 Deep Scenarios • 35 Mins',
      color: 'border-emerald-500/30 bg-emerald-500/5',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <Video className="w-3.5 h-3.5" />
            <span>AI Mock Interview Simulator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Multimodal Interview Preparation
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Simulate realistic video interviews with our real-time AI evaluator. Receive instant telemetry on technical depth, speech pacing, eye contact, and confidence markers.
          </p>
        </div>

        <Link
          to="/interview/mock"
          className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all whitespace-nowrap"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Launch AI Interview Room</span>
        </Link>
      </div>

      {/* Step 1: Select Format */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>1. Choose Interview Focus</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Dynamic AI Persona</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interviewModes.map((mode) => {
            const isSelected = selectedCategory === mode.id;
            return (
              <div
                key={mode.id}
                onClick={() => setSelectedCategory(mode.id as any)}
                className={`p-6 rounded-2xl glass-panel border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${mode.color} ring-2 ring-blue-500/50 shadow-xl`
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {mode.icon}
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        Selected
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{mode.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{mode.description}</p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {mode.questions}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2: Difficulty & Hardware Check */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Difficulty */}
        <div className="lg:col-span-6 rounded-3xl glass-panel p-6 sm:p-7 border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white">2. Evaluation Rigor</h2>
          <p className="text-xs text-slate-400">
            Calibrate the follow-up depth and strictness of the AI technical interviewer.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {(['Standard', 'Challenging', 'FAANG-Caliber'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedDifficulty === diff
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/25'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-400">
            {selectedDifficulty === 'Standard' && 'Friendly guidance, hints available upon request, gentle follow-ups.'}
            {selectedDifficulty === 'Challenging' && 'Probing edge cases, time/space complexity pushback, realistic mid-level bar.'}
            {selectedDifficulty === 'FAANG-Caliber' && 'Rigorous p99 latency queries, trade-off defense, strict STAR quantification.'}
          </div>
        </div>

        {/* Media & Vision Device Readiness */}
        <div className="lg:col-span-6 rounded-3xl glass-panel p-6 sm:p-7 border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white">3. Sensor & Telemetry Readiness</h2>
          <p className="text-xs text-slate-400">
            HireUpp analyzes your visual presence and audio waveforms in real-time.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setCameraEnabled(!cameraEnabled)}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                cameraEnabled
                  ? 'bg-blue-500/10 border-blue-500/30 text-white'
                  : 'bg-slate-900 border-white/10 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2.5 text-xs font-bold">
                <Camera className="w-4 h-4 text-blue-400" />
                <span>Webcam Telemetry</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${cameraEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                {cameraEnabled ? 'Ready' : 'Off'}
              </span>
            </button>

            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                micEnabled
                  ? 'bg-blue-500/10 border-blue-500/30 text-white'
                  : 'bg-slate-900 border-white/10 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2.5 text-xs font-bold">
                <Mic className="w-4 h-4 text-blue-400" />
                <span>Audio Stream</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${micEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                {micEnabled ? 'Ready' : 'Off'}
              </span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/interview/mock')}
              className="w-full py-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Enter AI Interview Room Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
