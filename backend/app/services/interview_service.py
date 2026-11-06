import uuid
import re
from typing import List, Dict, Any, Tuple
from app.models_interview import (
    InterviewGenerateRequest,
    InterviewGenerateResponse,
    InterviewQuestionItem,
    InterviewEvaluateRequest,
    InterviewEvaluateResponse,
    QuestionEvaluation,
)

# Comprehensive Curated Question Repository
QUESTION_BANK: List[Dict[str, Any]] = [
    # --- Java Developer ---
    {
        "id": 101,
        "role": "Java Developer",
        "category": "Technical",
        "difficulty": "Easy",
        "topic": "Core Java & Memory",
        "question": "Explain the difference between HashMap and ConcurrentHashMap in Java. When would you prefer one over the other?",
        "expected_keywords": ["synchronized", "thread-safe", "bucket-level locking", "segment lock", "null keys", "concurrency"],
        "hint": "Mention thread safety, synchronization overhead, and how ConcurrentHashMap locks buckets instead of the entire map."
    },
    {
        "id": 102,
        "role": "Java Developer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "Exception Handling",
        "question": "How does exception handling work in Java? What is the architectural difference between checked and unchecked exceptions?",
        "expected_keywords": ["try-catch-finally", "checked exception", "unchecked exception", "RuntimeException", "compile time", "throws"],
        "hint": "Explain that checked exceptions are verified at compile-time (e.g., IOException), while unchecked subclass RuntimeException."
    },
    {
        "id": 103,
        "role": "Java Developer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "JVM Internals",
        "question": "Explain the JVM memory model, particularly the distinction between Heap memory and Stack memory.",
        "expected_keywords": ["heap", "stack", "garbage collection", "thread", "object references", "method invocation", "out of memory"],
        "hint": "Contrast how stack memory stores primitive types and method frames per thread, while heap stores dynamically allocated objects."
    },
    {
        "id": 104,
        "role": "Java Developer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Database & Query Optimization",
        "question": "How would you diagnose and optimize a slow-running SQL query within a Spring Boot / Hibernate application?",
        "expected_keywords": ["explain analyze", "indexes", "n+1 problem", "eager vs lazy loading", "connection pool", "batching"],
        "hint": "Discuss checking execution plans with EXPLAIN, addressing Hibernate N+1 select bottlenecks, and proper database indexing."
    },
    {
        "id": 105,
        "role": "Java Developer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Multithreading & Concurrency",
        "question": "What is the volatile keyword in Java, and how does it prevent memory visibility and instruction reordering issues?",
        "expected_keywords": ["visibility", "cpu cache", "main memory", "happens-before", "instruction reordering", "atomic"],
        "hint": "Explain that volatile forces reads and writes directly to main memory rather than CPU register caches, but does not ensure atomicity."
    },

    # --- Python Developer ---
    {
        "id": 201,
        "role": "Python Developer",
        "category": "Technical",
        "difficulty": "Easy",
        "topic": "Python Internals & Execution",
        "question": "What is the Global Interpreter Lock (GIL) in Python, and how does it impact multi-threaded CPU-bound programs?",
        "expected_keywords": ["gil", "single thread", "cpython", "bytecode", "cpu-bound", "multiprocessing", "io-bound"],
        "hint": "Clarify that GIL allows only one thread to execute Python bytecodes at a time, making multiprocessing preferable for CPU-bound tasks."
    },
    {
        "id": 202,
        "role": "Python Developer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "Memory & Performance",
        "question": "Explain the difference between a Python generator and a regular list. When does using yield provide a significant advantage?",
        "expected_keywords": ["generator", "yield", "lazy evaluation", "memory efficiency", "iterator", "streaming", "iterable"],
        "hint": "Highlight that generators compute items lazily on demand, avoiding loading massive datasets into RAM all at once."
    },
    {
        "id": 203,
        "role": "Python Developer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "Design & Metaprogramming",
        "question": "What are decorators in Python, and how would you implement a custom decorator to measure function execution time?",
        "expected_keywords": ["decorator", "wrapper", "first-class function", "functools.wraps", "arguments", "closure"],
        "hint": "Describe decorators as higher-order functions that take a callable and return an enhanced wrapper function."
    },
    {
        "id": 204,
        "role": "Python Developer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Asynchronous Architecture",
        "question": "How does the asyncio event loop work in modern Python web frameworks like FastAPI?",
        "expected_keywords": ["event loop", "async", "await", "coroutine", "non-blocking", "cooperative multitasking", "io-bound"],
        "hint": "Explain cooperative multitasking where coroutines yield control back to the single-threaded event loop while waiting for I/O."
    },
    {
        "id": 205,
        "role": "Python Developer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Data Handling & Memory",
        "question": "How does Python handle memory management and garbage collection behind the scenes?",
        "expected_keywords": ["reference counting", "cyclic garbage collector", "generations", "gc module", "memory leak"],
        "hint": "Explain reference counting as primary mechanism and generational garbage collection for detecting cyclic references."
    },

    # --- Full Stack Developer ---
    {
        "id": 301,
        "role": "Full Stack Developer",
        "category": "Technical",
        "difficulty": "Easy",
        "topic": "Authentication & Security",
        "question": "Explain how stateless authentication works in a full-stack application using JSON Web Tokens (JWT). Where should tokens be stored securely?",
        "expected_keywords": ["jwt", "token", "header", "payload", "signature", "http-only cookie", "xss", "csrf"],
        "hint": "Discuss the three parts of a JWT, verifying signatures on the backend, and storing access tokens in HttpOnly Secure cookies."
    },
    {
        "id": 302,
        "role": "Full Stack Developer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "API Architecture",
        "question": "What are the architectural trade-offs between REST APIs and GraphQL in high-concurrency client applications?",
        "expected_keywords": ["over-fetching", "under-fetching", "single endpoint", "schema", "caching", "http methods", "rest", "graphql"],
        "hint": "Contrast REST's standard HTTP caching and multiple endpoints with GraphQL's precise payload fetching and single endpoint complexity."
    },
    {
        "id": 303,
        "role": "Full Stack Developer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "Frontend State & Error Handling",
        "question": "How would you handle asynchronous API errors and network timeouts gracefully across a modern React frontend?",
        "expected_keywords": ["error boundary", "try-catch", "toast notification", "retry logic", "axios interceptor", "loading state", "fallback ui"],
        "hint": "Mention Axios/fetch interceptors, centralized error state, user-friendly fallback components, and exponential backoff retry."
    },
    {
        "id": 304,
        "role": "Full Stack Developer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Database Architecture",
        "question": "Explain database indexing. How does a B-Tree index work, and what are the performance trade-offs of adding too many indexes?",
        "expected_keywords": ["b-tree", "lookup time", "o(log n)", "write overhead", "insert", "update", "disk storage", "cardinality"],
        "hint": "Explain that indexes dramatically accelerate reads but degrade write (INSERT/UPDATE) operations because index trees must be rebalanced."
    },
    {
        "id": 305,
        "role": "Full Stack Developer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Full-Stack Performance",
        "question": "How would you architect an end-to-end caching strategy spanning browser, CDN, reverse proxy, and Redis distributed cache?",
        "expected_keywords": ["cdn", "cache-control", "redis", "ttl", "invalidation", "stale-while-revalidate", "database load"],
        "hint": "Walk through edge caching for static assets, reverse proxy caching for idempotent GET routes, and Redis for heavy database queries."
    },

    # --- Frontend Developer ---
    {
        "id": 401,
        "role": "Frontend Developer",
        "category": "Technical",
        "difficulty": "Easy",
        "topic": "React Foundations",
        "question": "What is the Virtual DOM in React, and how does the reconciliation algorithm determine when to re-render the actual DOM?",
        "expected_keywords": ["virtual dom", "reconciliation", "diffing algorithm", "keys", "repaint", "reflow", "performance"],
        "hint": "Explain how React computes a lightweight in-memory tree diff and batches updates to minimize expensive browser layout and repaints."
    },
    {
        "id": 402,
        "role": "Frontend Developer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "React Hooks & Lifecycle",
        "question": "What is the difference between useEffect, useMemo, and useCallback? When would you use each to avoid unnecessary re-renders?",
        "expected_keywords": ["usememo", "usecallback", "useeffect", "memoization", "referential equality", "dependency array", "expensive calculation"],
        "hint": "useMemo caches computed values, useCallback caches function references, and useEffect handles asynchronous side effects."
    },
    {
        "id": 403,
        "role": "Frontend Developer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "Web Performance & Core Vitals",
        "question": "How would you optimize Core Web Vitals (LCP, FID/INP, CLS) for an enterprise single-page application?",
        "expected_keywords": ["lcp", "inp", "cls", "code splitting", "lazy loading", "image optimization", "font loading", "bundle size"],
        "hint": "Mention dynamic imports/code splitting, image aspect-ratio sizing to prevent layout shifts, and deferring non-critical scripts."
    },
    {
        "id": 404,
        "role": "Frontend Developer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "State Management & Architecture",
        "question": "How do you decide between local component state, React Context, and an external store like Redux Toolkit or Zustand in a growing codebase?",
        "expected_keywords": ["context re-render", "global state", "zustand", "redux", "selectors", "prop drilling", "scalability"],
        "hint": "Context triggers re-renders on all consuming components when any value changes; dedicated stores provide selective re-rendering via selectors."
    },
    {
        "id": 405,
        "role": "Frontend Developer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Browser & CSS Architecture",
        "question": "Explain CSS specificity, the box model, and how the browser rendering pipeline converts HTML/CSS into pixels on screen.",
        "expected_keywords": ["box model", "dom", "cssom", "render tree", "layout", "paint", "composite", "specificity"],
        "hint": "Trace HTML parsing to DOM, CSS to CSSOM, merging into Render Tree, followed by Layout, Paint, and GPU Compositing stages."
    },

    # --- Backend Developer ---
    {
        "id": 501,
        "role": "Backend Developer",
        "category": "Technical",
        "difficulty": "Easy",
        "topic": "Microservices & Distributed Systems",
        "question": "What are the core trade-offs between a monolithic architecture and a microservices architecture?",
        "expected_keywords": ["monolith", "microservices", "independent deployment", "network latency", "distributed tracing", "coupling", "operational complexity"],
        "hint": "Microservices offer team autonomy and granular scalability at the cost of distributed data consistency, network hops, and operational overhead."
    },
    {
        "id": 502,
        "role": "Backend Developer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "Database Transactions & ACID",
        "question": "Explain ACID properties in relational databases. What is the difference between dirty reads, non-repeatable reads, and phantom reads?",
        "expected_keywords": ["atomicity", "consistency", "isolation", "durability", "dirty read", "phantom read", "isolation levels"],
        "hint": "Break down each ACID component and describe isolation levels: Read Uncommitted, Read Committed, Repeatable Read, and Serializable."
    },
    {
        "id": 503,
        "role": "Backend Developer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "Message Queues & Event Streaming",
        "question": "When would you choose an event streaming platform like Apache Kafka over an AMQP message broker like RabbitMQ?",
        "expected_keywords": ["kafka", "rabbitmq", "log compaction", "partitioning", "message replay", "throughput", "consumer groups"],
        "hint": "Kafka excels at ordered high-throughput event logs that can be replayed by multiple consumer groups; RabbitMQ provides flexible routing and acknowledgments."
    },
    {
        "id": 504,
        "role": "Backend Developer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "System Design & Resilience",
        "question": "How do you protect downstream microservices from cascading failures using circuit breakers and rate limiting algorithms?",
        "expected_keywords": ["circuit breaker", "token bucket", "leaky bucket", "fallback", "half-open", "cascading failure", "resilience"],
        "hint": "Describe circuit breaker states (Closed, Open, Half-Open) and algorithms like Token Bucket or Sliding Window Counter for rate limiting."
    },
    {
        "id": 505,
        "role": "Backend Developer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Distributed Data Consistency",
        "question": "What is the CAP Theorem, and how do modern distributed databases (e.g. Cassandra vs PostgreSQL) navigate the trade-off?",
        "expected_keywords": ["consistency", "availability", "partition tolerance", "eventual consistency", "pacelc", "replication"],
        "hint": "In network partitions, a distributed system must choose between guaranteeing immediate consistency or staying available."
    },

    # --- Data Analyst ---
    {
        "id": 601,
        "role": "Data Analyst",
        "category": "Technical",
        "difficulty": "Easy",
        "topic": "SQL & Analytical Queries",
        "question": "Explain SQL Window Functions such as ROW_NUMBER(), RANK(), and DENSE_RANK(). When would you use PARTITION BY?",
        "expected_keywords": ["window function", "partition by", "order by", "rank", "dense_rank", "row_number", "ties"],
        "hint": "Explain how window functions calculate aggregated or ranked metrics over a subset of rows without collapsing rows like GROUP BY does."
    },
    {
        "id": 602,
        "role": "Data Analyst",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "Data Cleaning & Wrangling",
        "question": "How do you systematically handle missing or corrupted data in a tabular dataset before performing statistical analysis?",
        "expected_keywords": ["imputation", "mean", "median", "mode", "outliers", "forward fill", "bias", "data integrity"],
        "hint": "Discuss evaluating whether missingness is random (MCAR/MAR), applying median/mean imputation, or removing outliers responsibly."
    },
    {
        "id": 603,
        "role": "Data Analyst",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "Experimentation & Statistics",
        "question": "How do you design an A/B test to measure feature impact? What is statistical significance, p-value, and sample size power calculation?",
        "expected_keywords": ["a/b testing", "null hypothesis", "p-value", "statistical significance", "sample size", "control group", "type i error"],
        "hint": "Describe establishing null hypothesis, selecting alpha (0.05) threshold, power (80%), and avoiding peeking bias."
    },
    {
        "id": 604,
        "role": "Data Analyst",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Data Modeling & Warehousing",
        "question": "What is the difference between Star Schema and Snowflake Schema in relational data warehouses? Which performs better for OLAP queries?",
        "expected_keywords": ["star schema", "snowflake schema", "fact table", "dimension table", "normalization", "olap", "join performance"],
        "hint": "Star schema denormalizes dimensions for fewer joins and faster OLAP queries, whereas Snowflake normalizes dimension tables."
    },
    {
        "id": 605,
        "role": "Data Analyst",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Business Intelligence & KPIs",
        "question": "How do you translate an ambiguous executive requirement (e.g. 'Customer churn is too high') into actionable quantitative metrics and dashboards?",
        "expected_keywords": ["churn rate", "cohort analysis", "retention", "leading indicators", "segmentation", "kpi", "actionable insights"],
        "hint": "Break down definition of churn, cohort retention curves, leading warning signals (inactivity), and root-cause segmentation."
    },

    # --- Software Engineer (General) ---
    {
        "id": 701,
        "role": "Software Engineer",
        "category": "Technical",
        "difficulty": "Easy",
        "topic": "Algorithmic Complexity",
        "question": "Explain Big-O notation. What is the time and space complexity of searching, inserting, and deleting in an array versus a singly linked list?",
        "expected_keywords": ["big-o", "time complexity", "space complexity", "o(1)", "o(n)", "linked list", "array indexing"],
        "hint": "Arrays have O(1) indexed lookup but O(n) arbitrary insertion/deletion; linked lists have O(1) pointer updates once node is located."
    },
    {
        "id": 702,
        "role": "Software Engineer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "Object-Oriented Design & SOLID",
        "question": "Explain the SOLID design principles in software engineering. Give a practical example of the Single Responsibility Principle.",
        "expected_keywords": ["single responsibility", "open-closed", "liskov substitution", "interface segregation", "dependency inversion", "maintainability"],
        "hint": "Walk through each letter of SOLID, explaining why classes should only have one reason to change."
    },
    {
        "id": 703,
        "role": "Software Engineer",
        "category": "Technical",
        "difficulty": "Medium",
        "topic": "Testing & Code Quality",
        "question": "What is the difference between unit testing, integration testing, and end-to-end testing? What role do test doubles (mocks/stubs) play?",
        "expected_keywords": ["unit testing", "integration testing", "e2e", "mocking", "stub", "test pyramid", "isolation"],
        "hint": "Reference the test pyramid: fast isolated unit tests with mocks, integration tests validating boundaries, and browser/system E2E tests."
    },
    {
        "id": 704,
        "role": "Software Engineer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Concurrency & Deadlocks",
        "question": "What conditions are necessary for a deadlock to occur in a multithreaded system, and how can engineers prevent them?",
        "expected_keywords": ["mutual exclusion", "hold and wait", "no preemption", "circular wait", "lock ordering", "timeout", "deadlock"],
        "hint": "Recall the four Coffman conditions (Mutual exclusion, Hold & wait, No preemption, Circular wait). Prevention often involves strict lock acquisition ordering."
    },
    {
        "id": 705,
        "role": "Software Engineer",
        "category": "Technical",
        "difficulty": "Hard",
        "topic": "Data Structures & Trees",
        "question": "How does a Binary Search Tree (BST) work, what happens when it becomes degenerate/unbalanced, and how do Self-Balancing Trees (AVL, Red-Black) solve this?",
        "expected_keywords": ["bst", "binary search tree", "balanced", "red-black tree", "avl tree", "rotations", "o(log n)", "o(n) worst case"],
        "hint": "Unbalanced BSTs degrade to linked lists (O(n)). Self-balancing trees execute tree rotations to guarantee O(log n) height."
    },

    # --- HR & Behavioral (Applicable across all roles) ---
    {
        "id": 801,
        "role": "All",
        "category": "HR",
        "difficulty": "Easy",
        "topic": "Professional Introduction",
        "question": "Tell me about yourself, your educational and technical background, and what motivated you to pursue software engineering.",
        "expected_keywords": ["background", "projects", "passion", "skills", "experience", "learning", "growth"],
        "hint": "Structure as: Where you started (education/interest), key projects and technologies you've mastered, and why this opportunity aligns with your goals."
    },
    {
        "id": 802,
        "role": "All",
        "category": "HR",
        "difficulty": "Medium",
        "topic": "Problem Solving & Delivery (STAR)",
        "question": "Describe a technically challenging project you worked on. What obstacles did you encounter, and how did you resolve them?",
        "expected_keywords": ["situation", "task", "action", "result", "challenge", "debugging", "impact", "delivered"],
        "hint": "Use the STAR method (Situation, Task, Action, Result). State the technical bottleneck, your investigative actions, and quantifiable outcome."
    },
    {
        "id": 803,
        "role": "All",
        "category": "HR",
        "difficulty": "Medium",
        "topic": "Conflict Resolution & Teamwork",
        "question": "Tell me about a time you experienced a technical disagreement with a team member or senior colleague. How did you resolve it objectively?",
        "expected_keywords": ["disagreement", "listen", "communication", "data-driven", "consensus", "compromise", "respect", "outcome"],
        "hint": "Focus on listening to their perspective, evaluating technical pros/cons with benchmarks or documentation, and keeping team velocity first."
    },
    {
        "id": 804,
        "role": "All",
        "category": "HR",
        "difficulty": "Hard",
        "topic": "Accountability & Overcoming Failure",
        "question": "Describe a situation where a software release or project deadline failed to go as planned. What did you learn, and what safeguards did you put in place?",
        "expected_keywords": ["ownership", "post-mortem", "root cause", "safeguard", "learning", "accountability", "monitoring"],
        "hint": "Demonstrate mature accountability without blaming others. Highlight the blameless post-mortem and automated guardrails introduced."
    },
    {
        "id": 805,
        "role": "All",
        "category": "HR",
        "difficulty": "Easy",
        "topic": "Career Goals & Motivation",
        "question": "Why are you interested in this specific role and organization? Where do you see your technical trajectory progressing over the next 2-3 years?",
        "expected_keywords": ["alignment", "growth", "mentorship", "architecture", "impact", "culture", "value"],
        "hint": "Tie your technical curiosity to the team's mission, highlighting a desire for continuous learning and measurable engineering contribution."
    }
]


class InterviewService:
    @classmethod
    def generate_questions(cls, req: InterviewGenerateRequest) -> InterviewGenerateResponse:
        """
        Deterministic, role-calibrated question generator with fallback resilience.
        """
        role = req.role.strip()
        interview_type = req.interview_type.strip().lower()
        requested_count = min(max(req.question_count, 1), 15)
        difficulty = req.difficulty.strip().lower()
        resume_context = (req.resume_context or "").lower()
        job_description = (req.job_description or "").lower()

        # Step 1: Collect candidates
        role_questions = [q for q in QUESTION_BANK if q["role"].lower() == role.lower()]
        if not role_questions:
            # Fallback to Software Engineer if role is uncommon
            role_questions = [q for q in QUESTION_BANK if q["role"] == "Software Engineer"]

        hr_questions = [q for q in QUESTION_BANK if q["category"] == "HR"]

        selected: List[Dict[str, Any]] = []

        if interview_type == "hr":
            selected = hr_questions.copy()
        elif interview_type == "technical":
            selected = role_questions.copy()
        else:
            # Mixed: 70% technical, 30% HR
            hr_needed = max(1, round(requested_count * 0.3))
            tech_needed = requested_count - hr_needed
            selected = role_questions[:tech_needed] + hr_questions[:hr_needed]

        # Step 2: Score / prioritize questions based on resume keywords & target difficulty
        def score_question(q: Dict[str, Any]) -> int:
            score = 0
            if q.get("difficulty", "").lower() == difficulty:
                score += 5
            # Match resume context
            for kw in q.get("expected_keywords", []):
                if kw.lower() in resume_context:
                    score += 3
                if kw.lower() in job_description:
                    score += 2
            return score

        # Sort by priority
        selected = sorted(selected, key=score_question, reverse=True)

        # Pad with other questions if count is not reached
        if len(selected) < requested_count:
            all_fallback = [q for q in QUESTION_BANK if q not in selected]
            selected.extend(all_fallback[: requested_count - len(selected)])

        final_questions = selected[:requested_count]

        # Map to Pydantic items
        items = []
        for idx, q in enumerate(final_questions, start=1):
            items.append(
                InterviewQuestionItem(
                    id=idx,
                    category=q["category"],
                    topic=q["topic"],
                    question=q["question"],
                    expected_keywords=q["expected_keywords"],
                    hint=q.get("hint", "Provide specific examples and technical justifications.")
                )
            )

        return InterviewGenerateResponse(
            session_id=str(uuid.uuid4()),
            role=req.role,
            experience_level=req.experience_level,
            interview_type=req.interview_type,
            difficulty=req.difficulty,
            questions=items,
            is_demo_mode=True,
            provider_used="HireUpp Curated Question Engine (Deterministic)"
        )

    @classmethod
    def evaluate_answers(cls, req: InterviewEvaluateRequest) -> InterviewEvaluateResponse:
        """
        Deterministic, transparent evaluation rubric analyzing:
        - Expected keyword density & matching
        - Answer length, structure, and depth
        - Presence of STAR / engineering examples
        """
        evaluations: List[QuestionEvaluation] = []
        total_score = 0

        # Category accumulators
        correctness_scores = []
        completeness_scores = []
        clarity_scores = []

        all_matched_keywords = []
        all_missing_keywords = []

        for pair in req.qa_pairs:
            ans = (pair.candidate_answer or "").strip()
            ans_lower = ans.lower()
            words = [w for w in re.split(r"\s+", ans) if w]
            word_count = len(words)

            matched_kw = []
            missing_kw = []
            for kw in pair.expected_keywords:
                if kw.lower() in ans_lower:
                    matched_kw.append(kw)
                else:
                    missing_kw.append(kw)

            all_matched_keywords.extend(matched_kw)
            all_missing_keywords.extend(missing_kw)

            # Scoring breakdown (0 to 100 per question)
            # 1. Keyword coverage: up to 50 pts
            kw_ratio = len(matched_kw) / max(len(pair.expected_keywords), 1)
            kw_points = round(kw_ratio * 50)

            # 2. Completeness / Length: up to 30 pts
            if word_count < 5:
                length_points = 5
            elif word_count < 15:
                length_points = 12
            elif word_count < 30:
                length_points = 22
            elif word_count <= 250:
                length_points = 30
            else:
                length_points = 26

            # 3. Structure & Clarity indicators: up to 20 pts
            # Base clarity for coherent sentence structure
            base_clarity = 10 if word_count >= 15 else 5
            structure_markers = ["for example", "because", "such as", "result", "in order to", "however", "specifically", "first", "trade-off", "while", "unlike"]
            marker_matches = sum(1 for m in structure_markers if m in ans_lower)
            structure_points = min(20, base_clarity + marker_matches * 4)

            q_score = min(100, max(0, kw_points + length_points + structure_points))
            total_score += q_score

            correctness_scores.append(min(100, round(kw_ratio * 100)))
            completeness_scores.append(min(100, round((length_points / 30) * 100)))
            clarity_scores.append(min(100, round((structure_points / 20) * 100)))

            # Feedback synthesis
            if q_score >= 80:
                feedback = f"Strong answer. Successfully highlighted core concepts ({', '.join(matched_kw[:3])}) with structured technical rationale."
            elif q_score >= 60:
                missed_text = f" Consider incorporating key terms: {', '.join(missing_kw[:3])}." if missing_kw else ""
                feedback = f"Good foundational explanation, but could be deepened.{missed_text}"
            elif q_score >= 35:
                feedback = f"Partial response. You answered briefly ({word_count} words). Mentioning concepts like {', '.join(missing_kw[:2]) if missing_kw else 'trade-offs'} would boost your score."
            else:
                feedback = f"Answer lacked required technical depth. Key concepts expected: {', '.join(pair.expected_keywords[:3])}."

            # Construct sample answer snippet
            sample_snippet = f"A high-scoring answer explains the core mechanism, explicitly references {', '.join(pair.expected_keywords[:3])}, and contrasts performance trade-offs."

            evaluations.append(
                QuestionEvaluation(
                    question_id=pair.question_id,
                    question=pair.question,
                    score=q_score,
                    feedback=feedback,
                    matched_keywords=matched_kw,
                    missing_keywords=missing_kw,
                    sample_answer_snippet=sample_snippet
                )
            )

        num_questions = max(len(req.qa_pairs), 1)
        overall_score = round(total_score / num_questions)

        if overall_score >= 88:
            grade = "A (Exceeds Hiring Bar)"
            summary = f"Exceptional interview performance for {req.role}. High technical precision, solid keyword alignment, and structured explanations."
        elif overall_score >= 75:
            grade = "B+ (Meets Hiring Bar)"
            summary = f"Solid interview round for {req.role}. Strong understanding of major concepts with minor gaps in architectural trade-offs."
        elif overall_score >= 60:
            grade = "B (Approaching Bar)"
            summary = f"Demonstrates working knowledge for {req.role}. Focus on structuring answers with concrete examples and technical terminology."
        else:
            grade = "Needs Preparation"
            summary = f"Answer responses were too brief or missed critical domain keywords. Recommended dedicated revision of fundamentals before live panels."

        avg_correctness = round(sum(correctness_scores) / max(len(correctness_scores), 1))
        avg_completeness = round(sum(completeness_scores) / max(len(completeness_scores), 1))
        avg_clarity = round(sum(clarity_scores) / max(len(clarity_scores), 1))
        avg_relevance = min(100, round((avg_correctness * 0.6) + (avg_clarity * 0.4)))

        category_scores = {
            "Technical Correctness": avg_correctness,
            "Completeness & Depth": avg_completeness,
            "Clarity & Structure": avg_clarity,
            "Relevance to Role": avg_relevance
        }

        # Strengths & areas for improvement
        strengths = []
        if avg_clarity >= 70:
            strengths.append("Structured communication with logical sequencing and examples")
        if avg_correctness >= 70:
            strengths.append(f"Demonstrated domain mastery across {len(set(all_matched_keywords))} technical concepts")
        if avg_completeness >= 70:
            strengths.append("Thorough answer length with adequate detail and depth")
        if not strengths:
            strengths.append("Constructive effort addressing complex interview prompts under simulated pressure")

        areas = []
        if all_missing_keywords:
            sample_missing = list(dict.fromkeys(all_missing_keywords))[:4]
            areas.append(f"Reinforce understanding of omitted terms: {', '.join(sample_missing)}")
        if avg_completeness < 70:
            areas.append("Elaborate further on internal mechanics rather than one-sentence summaries")
        if avg_clarity < 70:
            areas.append("Use structured frameworks (e.g., STAR method for behavioral, Trade-off matrices for technical)")
        if not areas:
            areas.append("Maintain high standard and practice live pacing for high-pressure panels")

        # Recommended revision topics
        recommended_topics = [
            f"{req.role} Core Architecture & Internals",
            "System Scalability & Latency Optimization",
            "Database Indexing & Query Plans",
            "STAR Behavioral Storytelling"
        ]

        # Recommended practice questions
        recommended_practice_questions = [
            f"How do you profile memory leaks and CPU bottlenecks in {req.role} applications?",
            "Explain how you design a resilient retry mechanism with exponential backoff.",
            "Describe a time you delivered a project under an aggressive timeline."
        ]

        return InterviewEvaluateResponse(
            session_id=req.session_id,
            overall_score=overall_score,
            score_grade=grade,
            summary=summary,
            category_scores=category_scores,
            question_evaluations=evaluations,
            strengths=strengths,
            areas_for_improvement=areas,
            recommended_topics=recommended_topics,
            recommended_practice_questions=recommended_practice_questions,
            is_demo_mode=True,
            provider_used="HireUpp Deterministic Rubric Engine"
        )
