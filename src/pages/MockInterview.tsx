import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  RefreshCw,
  FileText,
  RotateCcw,
  BookOpen,
  Info,
  ShieldCheck,
  Check,
  Zap,
} from 'lucide-react';
import {
  generateInterviewApi,
  evaluateInterviewApi,
  type InterviewQuestionItem,
  type InterviewEvaluateResponse,
  type AnswerSubmissionItem,
} from '../services/interviewApi';

const AVAILABLE_ROLES = [
  'Full Stack Developer',
  'Java Developer',
  'Python Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Analyst',
  'Software Engineer',
];

export const MockInterview: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Mode: 'setup' | 'interview' | 'evaluating' | 'report'
  const [sessionPhase, setSessionPhase] = useState<'setup' | 'interview' | 'evaluating' | 'report'>('setup');

  // Setup configuration state
  const initialCompany = searchParams.get('company') || '';
  const [targetRole, setTargetRole] = useState(searchParams.get('role') || 'Full Stack Developer');
  const [experienceLevel, setExperienceLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [interviewType, setInterviewType] = useState<'Technical' | 'HR' | 'Mixed'>('Technical');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [resumeContext, setResumeContext] = useState('');
  const [jobDescription, setJobDescription] = useState(
    initialCompany ? `Target Requisition for ${initialCompany} Software Engineering Track.` : ''
  );
  const [hasCachedResume, setHasCachedResume] = useState(false);

  // Active interview state
  const [sessionId, setSessionId] = useState<string>('');
  const [questions, setQuestions] = useState<InterviewQuestionItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Speech Recognition (Voice-to-Text) state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Speech Synthesis (Text-to-Speech) state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Optional local camera preview state
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Evaluation Report state
  const [evaluationResult, setEvaluationResult] = useState<InterviewEvaluateResponse | null>(null);

  // Check for cached resume from ResumeAnalyzer on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem('hireupp_latest_resume_analysis');
      if (cached) {
        setHasCachedResume(true);
      }
    } catch {}
  }, []);

  // Check browser SpeechRecognition support
  useEffect(() => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechSupported(false);
    }
  }, []);

  // Timer effect for active interview
  useEffect(() => {
    let interval: any = null;
    if (sessionPhase === 'interview') {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sessionPhase]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      stopSpeech();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  // Helper: Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Helper: Import cached resume context
  const handleImportResume = () => {
    try {
      const cachedStr = localStorage.getItem('hireupp_latest_resume_analysis');
      if (cachedStr) {
        const parsed = JSON.parse(cachedStr);
        const skillsText = (parsed.skills || []).slice(0, 15).join(', ');
        const summaryText = parsed.summary || '';
        const combined = `Extracted Skills: ${skillsText}\nProfile Summary: ${summaryText}`;
        setResumeContext(combined);
      }
    } catch {}
  };

  // Camera controls
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err: any) {
      setCameraError('Camera access was denied or is not available. Camera preview remains optional.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Speech Recognition (Voice-to-Text) controls
  const toggleListening = () => {
    setSpeechError(null);
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      setSpeechError('Web Speech Recognition is not supported by your current browser.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalChunk = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalChunk += event.results[i][0].transcript;
          }
        }
        if (finalChunk.trim()) {
          setAnswers((prev) => {
            const current = prev[currentIdx] || '';
            const separator = current.length > 0 && !current.endsWith(' ') ? ' ' : '';
            return {
              ...prev,
              [currentIdx]: current + separator + finalChunk.trim(),
            };
          });
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission was denied. Please allow microphone access or type your answers.');
        } else {
          setSpeechError(`Speech recognition notice: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      setSpeechError(`Could not initialize microphone: ${err.message}`);
      setIsListening(false);
    }
  };

  // Text-to-Speech (Read Aloud) controls
  const speakCurrentQuestion = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const currentQ = questions[currentIdx];
    if (!currentQ) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentQ.question);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Generate Questions & Start Interview
  const handleStartInterview = async () => {
    setIsLoadingQuestions(true);
    setErrorMessage(null);

    try {
      const response = await generateInterviewApi({
        role: targetRole,
        experience_level: experienceLevel,
        interview_type: interviewType,
        question_count: questionCount,
        difficulty: difficulty,
        resume_context: resumeContext.trim() || undefined,
        job_description: jobDescription.trim() || undefined,
      });

      if (!response.questions || response.questions.length === 0) {
        throw new Error('No questions generated. Please check your configuration.');
      }

      setSessionId(response.session_id);
      setQuestions(response.questions);
      setCurrentIdx(0);
      setAnswers({});
      setSecondsElapsed(0);
      setSessionPhase('interview');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to initialize mock interview questions.');
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Submit interview and generate structured feedback
  const handleFinishInterview = async () => {
    stopCamera();
    stopSpeech();
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
    }

    setSessionPhase('evaluating');

    const qaPairs: AnswerSubmissionItem[] = questions.map((q, idx) => ({
      question_id: q.id,
      question: q.question,
      category: q.category,
      expected_keywords: q.expected_keywords,
      candidate_answer: answers[idx] || '',
    }));

    try {
      const evalResponse = await evaluateInterviewApi({
        session_id: sessionId || 'session-' + Date.now(),
        role: targetRole,
        interview_type: interviewType,
        difficulty: difficulty,
        qa_pairs: qaPairs,
      });

      setEvaluationResult(evalResponse);

      // Save to localStorage for Candidate Dashboard history
      try {
        const historyItem = {
          id: evalResponse.session_id,
          role: targetRole,
          interview_type: interviewType,
          difficulty: difficulty,
          date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          score: evalResponse.overall_score,
          score_grade: evalResponse.score_grade,
          question_count: questions.length,
          time_spent_secs: secondsElapsed,
          strengths: evalResponse.strengths,
          areas_for_improvement: evalResponse.areas_for_improvement,
        };

        const existingRaw = localStorage.getItem('hireupp_interview_sessions');
        const existingList = existingRaw ? JSON.parse(existingRaw) : [];
        const updatedList = [historyItem, ...existingList.filter((item: any) => item.id !== historyItem.id)];
        localStorage.setItem('hireupp_interview_sessions', JSON.stringify(updatedList.slice(0, 10)));
      } catch {}

      setSessionPhase('report');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to evaluate interview answers.');
      setSessionPhase('interview');
    }
  };

  const currentQ = questions[currentIdx];
  const currentAnswer = answers[currentIdx] || '';
  const wordCount = currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0;

  // ==========================================
  // 1. SETUP PHASE VIEW
  // ==========================================
  if (sessionPhase === 'setup') {
    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Mock Interview Room</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Configure Your Interview Session
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Select your target role, seniority level, and question parameters. Questions are drawn from curated technical and behavioral banks.
            </p>
          </div>

          <Link
            to="/interview"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </Link>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Configuration Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 space-y-6">
          {/* Target Role & Seniority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Target Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-input text-xs cursor-pointer bg-slate-900 border border-white/10 focus:border-blue-500 text-white"
              >
                {AVAILABLE_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExperienceLevel(lvl)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      experienceLevel === lvl
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/20'
                        : 'bg-slate-900 text-slate-400 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interview Type & Question Count */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Interview Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Technical', 'HR', 'Mixed'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setInterviewType(t)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      interviewType === t
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/20'
                        : 'bg-slate-900 text-slate-400 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Difficulty
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Easy', 'Medium', 'Hard'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      difficulty === d
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-900 text-slate-400 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Number of Questions
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 15].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      questionCount === cnt
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 text-slate-400 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {cnt} Qs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Optional Resume Context & Job Description */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Resume Context (Optional)</span>
              </label>

              {hasCachedResume && (
                <button
                  type="button"
                  onClick={handleImportResume}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Import from Latest Resume Scan</span>
                </button>
              )}
            </div>

            <textarea
              rows={3}
              value={resumeContext}
              onChange={(e) => setResumeContext(e.target.value)}
              placeholder="Paste candidate technical skills, notable projects, or achievements (or click import above)..."
              className="w-full px-4 py-3 rounded-2xl glass-input text-xs bg-slate-900/80 border border-white/10 focus:border-blue-500 text-slate-200 resize-none"
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Job Description (Optional)
              </label>
              <textarea
                rows={2}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste key responsibilities or target job requirements..."
                className="w-full px-4 py-2.5 rounded-2xl glass-input text-xs bg-slate-900/80 border border-white/10 focus:border-blue-500 text-slate-200 resize-none"
              />
            </div>
          </div>

          {/* Ready to launch CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Realistic question generator with transparent rubric evaluation</span>
            </div>

            <button
              onClick={handleStartInterview}
              disabled={isLoadingQuestions}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoadingQuestions ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Calibrating Questions...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Begin Mock Interview</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. ACTIVE INTERVIEW ROOM VIEW
  // ==========================================
  if (sessionPhase === 'interview' && currentQ) {
    const isLastQuestion = currentIdx === questions.length - 1;

    return (
      <div className="space-y-6">
        {/* Top Session Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Live Simulation
              </span>
            </div>
            <span className="text-slate-500">|</span>
            <span className="text-xs text-blue-400 font-semibold">{targetRole} Track</span>
            <span className="text-slate-500">|</span>
            <span className="text-xs text-slate-400 font-mono">Difficulty: {difficulty}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>

            <button
              onClick={handleFinishInterview}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600 hover:text-white transition-all"
            >
              Finish Early
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">
              Question <strong className="text-white">{currentIdx + 1}</strong> of {questions.length}
            </span>
            <span className="text-blue-400 font-mono font-semibold">
              {Math.round(((currentIdx + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Left Stage (Question & Response) | Right (Tools & Camera Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Question, Speech Controls, and Answer Textarea */}
          <div className="lg:col-span-8 space-y-6">
            {/* Question Card */}
            <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {currentQ.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Topic: {currentQ.topic}</span>
                </div>

                {/* Text-to-Speech Button */}
                <button
                  onClick={speakCurrentQuestion}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                    isSpeaking
                      ? 'bg-blue-600 text-white border-blue-400 animate-pulse'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                  title="Read question aloud using Web Speech API"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Stop Voice</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Read Aloud</span>
                    </>
                  )}
                </button>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                "{currentQ.question}"
              </h2>

              {currentQ.hint && (
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300">Tip:</strong> {currentQ.hint}
                  </span>
                </div>
              )}
            </div>

            {/* Answer Input Area */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Your Response</span>
                  <span className="text-[11px] text-slate-500 font-mono">({wordCount} words)</span>
                </div>

                {/* Voice-to-Text Button */}
                <div className="flex items-center gap-2">
                  {speechSupported ? (
                    <button
                      onClick={toggleListening}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        isListening
                          ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
                          : 'bg-blue-600/10 text-blue-300 border-blue-500/30 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="w-3.5 h-3.5" />
                          <span>Stop Recording</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5 text-blue-400" />
                          <span>Voice to Text</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500 bg-white/5 px-2.5 py-1 rounded-lg">
                      Voice input unsupported in this browser
                    </span>
                  )}
                </div>
              </div>

              {speechError && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                  {speechError}
                </div>
              )}

              {isListening && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Microphone listening... Speak clearly and your words will append below. You can edit anytime.</span>
                </div>
              )}

              <textarea
                rows={6}
                value={currentAnswer}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [currentIdx]: e.target.value,
                  }))
                }
                placeholder="Type or speak your answer here. Explain architectural trade-offs, internal mechanisms, or personal project experiences..."
                className="w-full px-4 py-3 rounded-2xl glass-input text-xs sm:text-sm bg-slate-900/90 border border-white/10 focus:border-blue-500 text-white leading-relaxed resize-none font-sans"
              />

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {isLastQuestion ? (
                  <button
                    type="button"
                    onClick={handleFinishInterview}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit & View AI Feedback</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center gap-1.5"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Optional Local Camera Preview & Interview Tips */}
          <div className="lg:col-span-4 space-y-6">
            {/* Optional Local Camera Preview */}
            <div className="rounded-3xl glass-panel p-5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white">Local Camera Preview</span>
                </div>

                <button
                  onClick={cameraActive ? stopCamera : startCamera}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                    cameraActive
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500 hover:text-white'
                      : 'bg-purple-600/20 text-purple-300 border-purple-500/30 hover:bg-purple-600 hover:text-white'
                  }`}
                >
                  {cameraActive ? 'Stop Camera' : 'Enable Camera'}
                </button>
              </div>

              {cameraError && (
                <p className="text-[11px] text-amber-400 bg-amber-500/10 p-2 rounded-lg">
                  {cameraError}
                </p>
              )}

              {/* Video container */}
              <div className="relative rounded-2xl bg-slate-950 border border-white/10 aspect-video overflow-hidden flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                />
                {!cameraActive && (
                  <div className="text-center p-4 text-slate-500 space-y-2">
                    <VideoOff className="w-8 h-8 mx-auto text-slate-600" />
                    <p className="text-xs">Camera preview is off</p>
                    <p className="text-[10px] text-slate-600 max-w-[200px] mx-auto">
                      Click Enable Camera to view your local mirror. No video is ever recorded or uploaded.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Expected Key Concepts Guidance */}
            <div className="rounded-3xl glass-panel p-5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Evaluation Rubric Focus</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our transparent evaluator rewards answers that demonstrate:
              </p>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Technical correctness & domain keywords</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Balanced depth (typically 40–120 words)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Clear structural markers (trade-offs, examples)</span>
                </li>
              </ul>
            </div>

            {/* Question Jump Selector */}
            <div className="rounded-3xl glass-panel p-5 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Session Navigator
              </span>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const hasAnswer = (answers[idx] || '').trim().length > 0;
                  const isCurrent = idx === currentIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-9 rounded-xl text-xs font-mono font-bold transition-all border ${
                        isCurrent
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/25'
                          : hasAnswer
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. EVALUATING LOADING VIEW
  // ==========================================
  if (sessionPhase === 'evaluating') {
    return (
      <div className="py-20 text-center max-w-lg mx-auto space-y-6">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-2xl border border-white/20 relative z-10 animate-spin">
            <RefreshCw className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Synthesizing Feedback Report</h2>
          <p className="text-xs text-slate-400">
            Applying transparent heuristic rubric across keyword coverage, response completeness, and architectural structure...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 4. EVALUATION REPORT VIEW
  // ==========================================
  if (sessionPhase === 'report' && evaluationResult) {
    return (
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Top Report Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Interview Complete • Verified Report</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Evaluation & Feedback Diagnostic
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {targetRole} Track • Time Spent: {formatTime(secondsElapsed)} • {questions.length} Prompts Evaluated
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setSessionPhase('setup');
                setEvaluationResult(null);
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Take Another Mock</span>
            </button>

            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center gap-1.5"
            >
              <span>View in Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Core Score Banner */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-purple-950/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl border-4 border-white/20">
                {evaluationResult.overall_score}%
              </div>
            </div>

            <div className="space-y-1">
              <div className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-white/10 text-white border border-white/10">
                {evaluationResult.score_grade}
              </div>
              <h2 className="text-xl font-bold text-white">Overall Readiness Score</h2>
              <p className="text-xs text-slate-300 max-w-md">{evaluationResult.summary}</p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-400 font-mono space-y-1">
            <p>Evaluation Provider: {evaluationResult.provider_used}</p>
            <p className="text-emerald-400">● Session Saved to Local History</p>
          </div>
        </div>

        {/* Category Rubric Breakdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(evaluationResult.category_scores || {}).map(([cat, val]) => (
            <div key={cat} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400">{cat}</span>
              <div className="text-2xl font-extrabold font-mono text-white">{val}%</div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Strengths & Improvement Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl glass-panel border border-emerald-500/30 bg-emerald-500/5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Demonstrated Strengths</span>
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              {evaluationResult.strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-amber-500/30 bg-amber-500/5 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Recommended Areas for Improvement</span>
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              {evaluationResult.areas_for_improvement.map((area, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Question-by-Question Detailed Feedback Breakdown */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white">Question-by-Question Breakdown</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Review your response against expected technical keywords and model explanations
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {evaluationResult.question_evaluations.length} Questions
            </span>
          </div>

          <div className="space-y-4">
            {evaluationResult.question_evaluations.map((qEval, idx) => {
              const originalAnswer = answers[idx] || '(No answer submitted)';
              return (
                <div
                  key={qEval.question_id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white">
                      Q{idx + 1}. {qEval.question}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border self-start sm:self-auto ${
                        qEval.score >= 75
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : qEval.score >= 50
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}
                    >
                      Score: {qEval.score}/100
                    </span>
                  </div>

                  {/* Candidate Answer */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                      Your Answer:
                    </span>
                    <p className="italic">"{originalAnswer}"</p>
                  </div>

                  {/* Feedback */}
                  <div className="text-xs text-slate-300 space-y-1">
                    <p className="font-semibold text-blue-300">AI Feedback:</p>
                    <p className="text-slate-400">{qEval.feedback}</p>
                  </div>

                  {/* Keywords Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                    {qEval.matched_keywords.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-slate-400">Matched Concepts:</span>
                        {qEval.matched_keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono"
                          >
                            ✓ {kw}
                          </span>
                        ))}
                      </div>
                    )}

                    {qEval.missing_keywords.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-slate-400">Omitted Concepts:</span>
                        {qEval.missing_keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono"
                          >
                            ○ {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Next Practice Actions */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Recommended Next Steps & Revision Topics</span>
            </h3>
            <Link to="/preparation" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <span>Go to Prep Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Curriculum Modules to Revise:
              </p>
              <div className="space-y-2">
                {evaluationResult.recommended_topics.map((top, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-200 flex items-center justify-between"
                  >
                    <span>{top}</span>
                    <Link to="/preparation" className="text-blue-400 hover:text-blue-300 text-[11px] font-semibold">
                      Study Topic →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Next Practice Questions to Drill:
              </p>
              <div className="space-y-2">
                {evaluationResult.recommended_practice_questions.map((pq, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300"
                  >
                    "{pq}"
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
