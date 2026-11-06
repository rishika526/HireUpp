export interface InterviewQuestionItem {
  id: number;
  category: string;
  topic: string;
  question: string;
  expected_keywords: string[];
  hint: string;
}

export interface InterviewGenerateRequest {
  role: string;
  experience_level: string;
  interview_type: string;
  question_count: number;
  difficulty: string;
  resume_context?: string;
  job_description?: string;
}

export interface InterviewGenerateResponse {
  session_id: string;
  role: string;
  experience_level: string;
  interview_type: string;
  difficulty: string;
  questions: InterviewQuestionItem[];
  is_demo_mode: boolean;
  provider_used: string;
}

export interface AnswerSubmissionItem {
  question_id: number;
  question: string;
  category: string;
  expected_keywords: string[];
  candidate_answer: string;
}

export interface InterviewEvaluateRequest {
  session_id: string;
  role: string;
  interview_type?: string;
  difficulty?: string;
  qa_pairs: AnswerSubmissionItem[];
}

export interface QuestionEvaluation {
  question_id: number;
  question: string;
  score: number;
  feedback: string;
  matched_keywords: string[];
  missing_keywords: string[];
  sample_answer_snippet: string;
}

export interface InterviewEvaluateResponse {
  session_id: string;
  overall_score: number;
  score_grade: string;
  summary: string;
  category_scores: {
    [key: string]: number;
  };
  question_evaluations: QuestionEvaluation[];
  strengths: string[];
  areas_for_improvement: string[];
  recommended_topics: string[];
  recommended_practice_questions: string[];
  is_demo_mode: boolean;
  provider_used: string;
}

const API_BASE = import.meta.env.VITE_API_URL || '';

// Built-in fallback question bank for seamless offline reliability
const FALLBACK_QUESTIONS: Record<string, InterviewQuestionItem[]> = {
  'Java Developer': [
    {
      id: 1,
      category: 'Technical',
      topic: 'Core Java & Memory',
      question: 'Explain the difference between HashMap and ConcurrentHashMap in Java. When would you prefer one over the other?',
      expected_keywords: ['synchronized', 'thread-safe', 'bucket-level locking', 'segment lock', 'concurrency'],
      hint: 'Mention thread safety, synchronization overhead, and bucket-level locking.'
    },
    {
      id: 2,
      category: 'Technical',
      topic: 'Exception Handling',
      question: 'How does exception handling work in Java? What is the architectural difference between checked and unchecked exceptions?',
      expected_keywords: ['try-catch-finally', 'checked exception', 'unchecked exception', 'RuntimeException', 'compile time'],
      hint: 'Explain checked exceptions are checked at compile time, unchecked subclass RuntimeException.'
    },
    {
      id: 3,
      category: 'Technical',
      topic: 'JVM Memory Model',
      question: 'Explain the JVM memory model, particularly the distinction between Heap memory and Stack memory.',
      expected_keywords: ['heap', 'stack', 'garbage collection', 'thread', 'object references'],
      hint: 'Stack stores primitive types and method frames per thread; Heap stores objects managed by GC.'
    },
    {
      id: 4,
      category: 'Technical',
      topic: 'Query Optimization',
      question: 'How would you diagnose and optimize a slow-running SQL query within a Spring Boot / Hibernate application?',
      expected_keywords: ['explain analyze', 'indexes', 'n+1 problem', 'eager vs lazy loading', 'connection pool'],
      hint: 'Mention EXPLAIN plans, resolving N+1 queries, and indexing foreign keys.'
    },
    {
      id: 5,
      category: 'HR',
      topic: 'Conflict Resolution',
      question: 'Tell me about a time you experienced a technical disagreement with a team member. How did you resolve it objectively?',
      expected_keywords: ['communication', 'data-driven', 'consensus', 'respect', 'outcome', 'trade-off'],
      hint: 'Focus on listening, evaluating trade-offs with benchmarks, and maintaining team progress.'
    }
  ],
  'Full Stack Developer': [
    {
      id: 1,
      category: 'Technical',
      topic: 'Authentication & Security',
      question: 'Explain how stateless authentication works in a full-stack application using JSON Web Tokens (JWT). Where should tokens be stored securely?',
      expected_keywords: ['jwt', 'token', 'header', 'payload', 'signature', 'http-only cookie', 'xss'],
      hint: 'Discuss the 3 parts of JWT, signature verification, and HttpOnly cookies to mitigate XSS.'
    },
    {
      id: 2,
      category: 'Technical',
      topic: 'API Protocols',
      question: 'What are the architectural trade-offs between REST APIs and GraphQL in high-concurrency client applications?',
      expected_keywords: ['over-fetching', 'under-fetching', 'single endpoint', 'schema', 'caching', 'rest', 'graphql'],
      hint: 'Contrast REST standard caching with GraphQL precise field selection.'
    },
    {
      id: 3,
      category: 'Technical',
      topic: 'Error Handling',
      question: 'How would you handle asynchronous API errors and network timeouts gracefully across a modern React frontend?',
      expected_keywords: ['error boundary', 'try-catch', 'toast notification', 'retry logic', 'loading state'],
      hint: 'Mention interceptors, centralized error state, and retry logic.'
    },
    {
      id: 4,
      category: 'Technical',
      topic: 'Database Indexing',
      question: 'Explain database indexing. How does a B-Tree index work, and what are the performance trade-offs of adding too many indexes?',
      expected_keywords: ['b-tree', 'lookup time', 'o(log n)', 'write overhead', 'insert', 'disk storage'],
      hint: 'Indexes accelerate SELECT queries but impose write penalties during INSERT/UPDATE.'
    },
    {
      id: 5,
      category: 'HR',
      topic: 'Project Ownership',
      question: 'Describe a challenging full-stack project you worked on. What architectural obstacles did you encounter and how did you resolve them?',
      expected_keywords: ['situation', 'task', 'action', 'result', 'challenge', 'debugging', 'impact'],
      hint: 'Use the STAR format (Situation, Task, Action, Result).'
    }
  ]
};

export async function generateInterviewApi(
  req: InterviewGenerateRequest
): Promise<InterviewGenerateResponse> {
  try {
    let res = await fetch(`${API_BASE}/api/interview/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      // Try direct port 8000
      try {
        res = await fetch('http://localhost:8000/api/interview/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req),
        });
      } catch {}
    }

    if (res && res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Backend offline; fall through to deterministic client generator
  }

  // Resilient Client-side Fallback
  const roleKey = req.role in FALLBACK_QUESTIONS ? req.role : 'Full Stack Developer';
  const baseQuestions = FALLBACK_QUESTIONS[roleKey] || FALLBACK_QUESTIONS['Full Stack Developer'];
  const count = Math.min(Math.max(req.question_count || 5, 1), 15);
  
  const mapped = baseQuestions.slice(0, count).map((q, idx) => ({
    ...q,
    id: idx + 1
  }));

  return {
    session_id: 'client-fallback-' + Date.now(),
    role: req.role,
    experience_level: req.experience_level,
    interview_type: req.interview_type,
    difficulty: req.difficulty,
    questions: mapped,
    is_demo_mode: true,
    provider_used: 'HireUpp Client-Side Curated Fallback Engine',
  };
}

export async function evaluateInterviewApi(
  req: InterviewEvaluateRequest
): Promise<InterviewEvaluateResponse> {
  try {
    let res = await fetch(`${API_BASE}/api/interview/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      try {
        res = await fetch('http://localhost:8000/api/interview/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req),
        });
      } catch {}
    }

    if (res && res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Fall through to client-side evaluator
  }

  // Client-side deterministic evaluation fallback
  const evaluations: QuestionEvaluation[] = [];
  let totalScore = 0;

  for (const pair of req.qa_pairs) {
    const text = (pair.candidate_answer || '').trim().toLowerCase();
    const words = text ? text.split(/\s+/).length : 0;
    const matched = pair.expected_keywords.filter((kw) => text.includes(kw.toLowerCase()));
    const missing = pair.expected_keywords.filter((kw) => !text.includes(kw.toLowerCase()));

    const kwPoints = Math.round((matched.length / Math.max(pair.expected_keywords.length, 1)) * 50);
    const lengthPoints = words < 5 ? 5 : words < 15 ? 12 : words < 30 ? 22 : 30;
    const clarityPoints = words >= 15 ? 18 : 10;
    const qScore = Math.min(100, Math.max(0, kwPoints + lengthPoints + clarityPoints));
    totalScore += qScore;

    evaluations.push({
      question_id: pair.question_id,
      question: pair.question,
      score: qScore,
      feedback:
        qScore >= 75
          ? `Strong response. Covered critical concepts (${matched.slice(0, 3).join(', ')}) with solid technical articulation.`
          : `Good foundational effort. To elevate your score, consider incorporating: ${missing.slice(0, 3).join(', ')}.`,
      matched_keywords: matched,
      missing_keywords: missing,
      sample_answer_snippet: `A model response discusses ${pair.expected_keywords.slice(0, 3).join(', ')} while justifying architectural trade-offs.`,
    });
  }

  const overall = Math.round(totalScore / Math.max(req.qa_pairs.length, 1));
  const grade = overall >= 85 ? 'A (Exceeds Bar)' : overall >= 70 ? 'B+ (Meets Bar)' : 'B (Approaching Bar)';

  return {
    session_id: req.session_id,
    overall_score: overall,
    score_grade: grade,
    summary: `Candidate completed interview evaluation for ${req.role} with an overall readiness benchmark of ${overall}%.`,
    category_scores: {
      'Technical Correctness': Math.min(100, overall + 2),
      'Completeness & Depth': Math.min(100, overall - 2),
      'Clarity & Structure': Math.min(100, overall + 4),
      'Relevance to Role': overall,
    },
    question_evaluations: evaluations,
    strengths: [
      'Clear structured verbal/written expression of technical reasoning',
      'Demonstrated understanding of core software development lifecycle principles',
      'Active willingness to articulate trade-offs across architectural options',
    ],
    areas_for_improvement: [
      'Elaborate further on internal runtime mechanics rather than high-level definitions',
      'Cite concrete benchmark numbers or personal project experiences',
    ],
    recommended_topics: [
      `${req.role} Core Architecture`,
      'System Scalability & Latency Optimization',
      'Database Indexing & Query Tuning',
    ],
    recommended_practice_questions: [
      `How do you profile memory leaks and CPU bottlenecks in ${req.role} applications?`,
      'Explain how you design a resilient retry mechanism with exponential backoff.',
    ],
    is_demo_mode: true,
    provider_used: 'HireUpp Client-Side Deterministic Rubric Engine',
  };
}

