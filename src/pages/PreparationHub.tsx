import React, { useState, useEffect } from 'react';
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
  CheckSquare,
  Square,
  ChevronDown,
  ChevronRight,
  Database,
  Cpu,
  Globe,
  FileCode2,
  Zap,
} from 'lucide-react';

interface TopicData {
  id: string;
  name: string;
  category: 'Programming' | 'CS Fundamentals' | 'Web Development';
  tagline: string;
  shortExplanation: string;
  importantConcepts: string[];
  codeExample?: {
    language: string;
    code: string;
    explanation: string;
  };
  commonInterviewQA: {
    q: string;
    a: string;
  }[];
  practiceQuestions: string[];
}

const ALL_TOPICS: TopicData[] = [
  // --- Programming ---
  {
    id: 'java',
    name: 'Java',
    category: 'Programming',
    tagline: 'JVM Architecture, Collections, Concurrency & Modern Java',
    shortExplanation:
      'Java is an object-oriented, class-based language designed to have as few implementation dependencies as possible, executing bytecode atop the platform-independent Java Virtual Machine (JVM).',
    importantConcepts: [
      'JVM Architecture: ClassLoader, JVM Memory (Heap, Stack, Metaspace), and Execution Engine (JIT Compiler, Garbage Collector).',
      'Java Collections Framework: Difference between ArrayList (dynamic array) and LinkedList (doubly linked); HashMap internal bucket indexing and treeification at threshold 8.',
      'Multithreading: Synchronization primitives, volatile keyword for memory visibility, and ExecutorService thread pooling.',
      'Streams & Lambdas: Functional data transformations (map, filter, reduce) introduced in Java 8.',
    ],
    codeExample: {
      language: 'java',
      code: `// Safe Concurrent Counter using AtomicInteger
import java.util.concurrent.atomic.AtomicInteger;

public class MetricTracker {
    private final AtomicInteger requestCount = new AtomicInteger(0);

    public int recordRequest() {
        // Lock-free atomic increment using Compare-And-Swap (CAS)
        return requestCount.incrementAndGet();
    }
}`,
      explanation: 'AtomicInteger avoids expensive synchronized blocks by leveraging low-level hardware CAS instructions.',
    },
    commonInterviewQA: [
      {
        q: 'Why is String immutable in Java?',
        a: 'String immutability enables String Pooling for memory efficiency, guarantees thread-safety across concurrent routines, and secures network connections and class loading where strings hold sensitive parameters.',
      },
      {
        q: 'Explain the difference between fail-fast and fail-safe iterators.',
        a: 'Fail-fast iterators (e.g., ArrayList, HashMap) throw ConcurrentModificationException if the collection is structurally modified during iteration. Fail-safe iterators (e.g., ConcurrentHashMap, CopyOnWriteArrayList) operate on a clone or snapshot without throwing exceptions.',
      },
    ],
    practiceQuestions: [
      'Implement an LRU Cache in Java using LinkedHashMap.',
      'Explain the difference between final, finally, and finalize().',
    ],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    tagline: 'Dynamic Typing, Pythonic Idioms, Asyncio & GIL',
    shortExplanation:
      'Python is an interpreted, high-level, dynamically typed language emphasizing human readability, extensive standard libraries, and first-class functional abstractions.',
    importantConcepts: [
      'Global Interpreter Lock (GIL): Mutex that prevents multiple native threads from executing Python bytecodes concurrently in CPython.',
      'Memory Management: Primary reference counting supplemented by cyclic generational garbage collection.',
      'Generators & Iterators: Memory-efficient streaming of sequences using the yield keyword.',
      'Decorators: Higher-order functions used for aspect-oriented cross-cutting concerns like logging, timing, and authentication.',
    ],
    codeExample: {
      language: 'python',
      code: `import time
from functools import wraps

def time_it(func):
    """Decorator to measure execution runtime"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"{func.__name__} executed in {duration:.4f}s")
        return result
    return wrapper`,
      explanation: 'functools.wraps preserves docstrings and function metadata when wrapping callables.',
    },
    commonInterviewQA: [
      {
        q: 'What is the difference between deepcopy and shallow copy in Python?',
        a: 'A shallow copy (copy.copy) creates a new collection object but populates it with references to the child objects contained in the original. A deep copy (copy.deepcopy) recursively copies all nested objects.',
      },
      {
        q: 'How does the asyncio event loop achieve high concurrency without multithreading?',
        a: 'Asyncio uses cooperative multitasking over a single thread: when an asynchronous task awaits network or file I/O, it yields execution back to the event loop, which handles other pending tasks.',
      },
    ],
    practiceQuestions: [
      'Write a generator that yields Fibonacci numbers indefinitely without memory overflow.',
      'Explain *args and **kwargs unpacking with dictionary merges.',
    ],
  },
  {
    id: 'c',
    name: 'C Language',
    category: 'Programming',
    tagline: 'Pointers, Memory Allocation, Structures & Low-Level Control',
    shortExplanation:
      'C is an imperative procedural systems language that provides direct memory access and minimal runtime overhead, serving as the foundation for modern operating systems and runtime environments.',
    importantConcepts: [
      'Pointers & Pointer Arithmetic: Memory addresses, dereferencing, void pointers, and function pointers.',
      'Dynamic Memory Allocation: malloc(), calloc(), realloc(), and preventing memory leaks using free().',
      'Segmentation Faults: Accessing unallocated memory, buffer overflows, and null pointer dereferences.',
      'Storage Classes: auto, register, static, and extern scope qualifiers.',
    ],
    codeExample: {
      language: 'c',
      code: `#include <stdio.h>
#include <stdlib.h>

// Dynamic integer array allocation
int* create_buffer(size_t n) {
    int* ptr = (int*)malloc(n * sizeof(int));
    if (ptr == NULL) return NULL; // Guard against allocation failure
    for (size_t i = 0; i < n; i++) ptr[i] = (int)i * 10;
    return ptr;
}`,
      explanation: 'Always verify malloc return value against NULL before dereferencing to prevent crashes.',
    },
    commonInterviewQA: [
      {
        q: 'What is a Dangling Pointer, and how do you prevent it?',
        a: 'A dangling pointer points to a memory location that has already been deallocated using free(). Prevent it by setting the pointer to NULL immediately after freeing.',
      },
    ],
    practiceQuestions: [
      'Implement string copy (strcpy) using pointer increments.',
      'Explain the difference between struct and union memory layout.',
    ],
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Programming',
    tagline: 'OOP, STL Containers, RAII, Move Semantics & Smart Pointers',
    shortExplanation:
      'C++ extends C with object-oriented abstractions, generic programming via templates, and RAII (Resource Acquisition Is Initialization) for zero-overhead resource safety.',
    importantConcepts: [
      'Standard Template Library (STL): Vectors, Maps (Red-Black trees), Unordered Maps (Hash tables), Sets, and Iterators.',
      'Virtual Functions & VTables: Dynamic dispatch runtime polymorphism via virtual method tables.',
      'Smart Pointers (C++11): std::unique_ptr (exclusive ownership), std::shared_ptr (reference counted), and std::weak_ptr.',
      'Move Semantics & Rvalue References (&&): Transferring resource ownership without expensive deep copying.',
    ],
    codeExample: {
      language: 'cpp',
      code: `#include <iostream>
#include <memory>

class Resource {
public:
    void execute() { std::cout << "Executing managed resource\\n"; }
};

void run() {
    // RAII: Automatically freed when going out of scope
    std::unique_ptr<Resource> res = std::make_unique<Resource>();
    res->execute();
}`,
      explanation: 'std::make_unique prevents memory leaks in case of unexpected exceptions.',
    },
    commonInterviewQA: [
      {
        q: 'Why should base class destructors always be declared virtual in C++?',
        a: 'If a derived class object is deleted through a base class pointer, a non-virtual destructor results in undefined behavior (the derived class destructor will never execute, leaking resources).',
      },
    ],
    practiceQuestions: [
      'Implement a thread-safe Singleton pattern in modern C++.',
      'Explain the differences between std::vector and std::deque in memory layout.',
    ],
  },

  // --- CS Fundamentals ---
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'CS Fundamentals',
    tagline: 'Complexity, Trees, Graphs, Sorting & Dynamic Programming',
    shortExplanation:
      'DSA forms the foundational bedrock of technical interviews, evaluating how software engineers organize memory and compute optimal solutions under space and time constraints.',
    importantConcepts: [
      'Asymptotic Analysis: Big-O, Big-Omega, Big-Theta, and amortized time complexity.',
      'Core Structures: Arrays, Singly/Doubly Linked Lists, Stacks, Queues, Hash Tables, Binary Search Trees.',
      'Graph Traversal: Breadth-First Search (BFS) for shortest path; Depth-First Search (DFS) for cycle detection.',
      'Dynamic Programming: Memoization (top-down) vs Tabulation (bottom-up), optimal substructure, and overlapping subproblems.',
    ],
    commonInterviewQA: [
      {
        q: 'How does a Hash Table handle hash collisions?',
        a: 'Two primary strategies: Separate Chaining (each bucket holds a linked list or red-black tree of collided entries) and Open Addressing (probing techniques such as Linear Probing, Quadratic Probing, or Double Hashing).',
      },
      {
        q: 'What is the time complexity of QuickSort, and when does its worst case occur?',
        a: 'Average time complexity is O(n log n). The worst-case is O(n^2), which occurs when the pivot chosen is consistently the smallest or largest element (e.g., sorting an already sorted array with first element as pivot).',
      },
    ],
    practiceQuestions: [
      'Find the longest substring without repeating characters using the Sliding Window pattern.',
      'Detect and remove a loop in a linked list using Floyd Cycle-Finding algorithm.',
    ],
  },
  {
    id: 'dbms',
    name: 'DBMS',
    category: 'CS Fundamentals',
    tagline: 'ACID Properties, Normalization, Transactions & Concurrency',
    shortExplanation:
      'Database Management Systems manage structured persistent data, guaranteeing consistency, durability, and multi-user transactional isolation.',
    importantConcepts: [
      'ACID Properties: Atomicity (all-or-nothing), Consistency (integrity constraints), Isolation (concurrent independence), Durability (persisted to disk).',
      'Database Normalization: 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF.',
      'Indexing: B+ Tree hierarchical indexes vs Hash indexes; clustered vs non-clustered indexes.',
      'Concurrency Anomalies: Dirty Reads, Non-repeatable Reads, and Phantom Reads across isolation levels.',
    ],
    commonInterviewQA: [
      {
        q: 'What is the difference between Clustered and Non-Clustered Indexes?',
        a: 'A Clustered index physically sorts the actual rows in the table on disk (hence only one clustered index per table). A Non-clustered index stores index pointers pointing to the physical data rows.',
      },
    ],
    practiceQuestions: [
      'Write an explanation of the Two-Phase Locking (2PL) protocol.',
      'Design a normalized schema for an E-commerce Cart system.',
    ],
  },
  {
    id: 'os',
    name: 'Operating Systems',
    category: 'CS Fundamentals',
    tagline: 'Processes, Threads, CPU Scheduling, Virtual Memory & Deadlocks',
    shortExplanation:
      'Operating Systems coordinate hardware resources, multi-tasking execution, virtual memory translation, and hardware isolation for application software.',
    importantConcepts: [
      'Process vs Thread: A process is an independent execution unit with its own virtual address space; threads share process memory (code, data, heap) but have private stacks.',
      'Deadlocks: The Coffman conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait) and Banker algorithm prevention.',
      'Virtual Memory & Paging: Page tables, Translation Lookaside Buffer (TLB), Page Faults, and replacement algorithms (LRU, FIFO).',
      'Inter-Process Communication (IPC): Pipes, Message Queues, Shared Memory, and Semaphores.',
    ],
    commonInterviewQA: [
      {
        q: 'What is thrashing in operating systems and how is it resolved?',
        a: 'Thrashing occurs when the operating system spends more time swapping pages in and out of disk than executing instructions. It is resolved by increasing RAM or decreasing degree of multiprogramming.',
      },
    ],
    practiceQuestions: [
      'Explain the difference between preemptive and non-preemptive CPU scheduling.',
      'What is a context switch and why is it expensive?',
    ],
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    category: 'CS Fundamentals',
    tagline: 'OSI 7 Layers, TCP/IP, Three-Way Handshake, DNS & HTTPS',
    shortExplanation:
      'Computer Networking encompasses communication protocols and hardware architectures that allow distributed computers to exchange packets reliably across the internet.',
    importantConcepts: [
      'OSI 7 Layers: Physical, Data Link, Network (IP), Transport (TCP/UDP), Session, Presentation, Application (HTTP/DNS).',
      'TCP vs UDP: TCP provides connection-oriented, ordered, reliable byte streams with congestion control; UDP is lightweight, connectionless, and ideal for gaming/streaming.',
      'TCP Three-Way Handshake: SYN -> SYN-ACK -> ACK.',
      'HTTPS & TLS: Asymmetric key exchange followed by symmetric encryption for secure payload transfer.',
    ],
    commonInterviewQA: [
      {
        q: 'What happens when you type https://www.google.com in your browser and press Enter?',
        a: 'DNS lookup resolves domain to IP -> Browser initiates TCP 3-way handshake -> TLS handshake negotiates encryption keys -> HTTP GET request is transmitted -> Server returns HTML response -> Browser renders DOM/CSSOM.',
      },
    ],
    practiceQuestions: [
      'Explain the difference between symmetric and asymmetric encryption.',
      'What is the purpose of subnet masks and CIDR notation?',
    ],
  },
  {
    id: 'oop',
    name: 'OOP & SOLID',
    category: 'CS Fundamentals',
    tagline: 'Encapsulation, Inheritance, Polymorphism, Abstraction & Design Principles',
    shortExplanation:
      'Object-Oriented Programming models real-world business logic into cohesive objects, enforcing maintainability, testability, and modularity via the SOLID principles.',
    importantConcepts: [
      'Four Pillars: Encapsulation (data hiding), Abstraction (hiding implementation details), Inheritance (reusability), Polymorphism (multiple forms).',
      'Single Responsibility Principle: A class should have one, and only one, reason to change.',
      'Open/Closed Principle: Software entities should be open for extension, but closed for modification.',
      'Liskov Substitution Principle: Subclasses must be substitutable for their base classes without breaking correctness.',
    ],
    commonInterviewQA: [
      {
        q: 'What is the Dependency Inversion Principle (DIP)?',
        a: 'High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces). Abstractions should not depend on details; details should depend on abstractions.',
      },
    ],
    practiceQuestions: [
      'Design a Parking Lot System using clean Object-Oriented Principles.',
      'Explain how composition is preferred over inheritance.',
    ],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'CS Fundamentals',
    tagline: 'Joins, Window Functions, Aggregate Queries & Query Tuning',
    shortExplanation:
      'Structured Query Language (SQL) is the universal declarative standard for querying, defining, and manipulating data across relational databases.',
    importantConcepts: [
      'JOIN Types: INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN, FULL OUTER JOIN, CROSS JOIN.',
      'Grouping & Aggregation: GROUP BY, HAVING (filters aggregated groups), COUNT(), SUM(), AVG().',
      'Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), and PARTITION BY clauses.',
      'Subqueries & Common Table Expressions (CTEs): WITH cte_name AS (...) for query readability and recursion.',
    ],
    commonInterviewQA: [
      {
        q: 'What is the difference between WHERE and HAVING in SQL?',
        a: 'WHERE filters rows before any groupings or aggregate functions are applied. HAVING filters groups after the GROUP BY clause has evaluated.',
      },
      {
        q: 'Write a SQL query to find the Nth highest salary in an Employee table.',
        a: 'SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET N-1 (or using DENSE_RANK() OVER (ORDER BY salary DESC)).',
      },
    ],
    practiceQuestions: [
      'Write a query to find all duplicate emails in a Users table.',
      'Explain the difference between DELETE, TRUNCATE, and DROP.',
    ],
  },

  // --- Web Development ---
  {
    id: 'html-css',
    name: 'HTML & CSS',
    category: 'Web Development',
    tagline: 'Semantic HTML5, CSS Grid, Flexbox, Specificity & Core Web Vitals',
    shortExplanation:
      'HTML and CSS define the structural markup and visual presentation layer for modern browser applications, ensuring accessibility, performance, and responsive viewports.',
    importantConcepts: [
      'Semantic HTML: Using <header>, <nav>, <article>, <section>, and <main> for screen readers and SEO.',
      'Box Model: Content, Padding, Border, Margin, and box-sizing: border-box.',
      'CSS Specificity: Inline styles (1000) > IDs (100) > Classes/Attributes (10) > Elements (1).',
      'Flexbox vs Grid: Flexbox handles one-dimensional row/column alignment; CSS Grid handles complex two-dimensional layouts.',
    ],
    commonInterviewQA: [
      {
        q: 'What does box-sizing: border-box do?',
        a: 'It includes padding and border within an element total width and height, preventing unexpected layout overflows when adding interior padding.',
      },
    ],
    practiceQuestions: [
      'Center a div horizontally and vertically using Flexbox in three lines of CSS.',
      'Explain how CSS media queries make websites responsive.',
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Web Development',
    tagline: 'Event Loop, Closures, Promises, Prototypes & ES6+ Features',
    shortExplanation:
      'JavaScript is the ubiquitous, single-threaded, non-blocking asynchronous scripting language of the web platform, powered by an event loop and prototype-based inheritance.',
    importantConcepts: [
      'Event Loop: Call Stack, Web APIs, Microtask Queue (Promises, queueMicrotask), and Macrotask Queue (setTimeout, setInterval).',
      'Closures: A function bundled together with references to its surrounding lexical environment.',
      'Promises & Async/Await: Managing asynchronous workflows without callback hell.',
      'Prototype Chain: Object inheritance where objects inherit methods through __proto__ references.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// Practical Debounce implementation for Search Inputs
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}`,
      explanation: 'Debounce limits the execution rate of expensive functions (like live autocomplete searches).',
    },
    commonInterviewQA: [
      {
        q: 'What is the difference between == and === in JavaScript?',
        a: '== performs type coercion before comparison (e.g., 5 == "5" is true). === checks strict equality of both type and value without coercion (5 === "5" is false).',
      },
    ],
    practiceQuestions: [
      'Implement Promise.all from scratch using vanilla JavaScript.',
      'Explain the difference between let, const, and var regarding hoisting.',
    ],
  },
  {
    id: 'react',
    name: 'React',
    category: 'Web Development',
    tagline: 'Virtual DOM, Hooks, State Architecture & Component Lifecycle',
    shortExplanation:
      'React is a declarative component-driven frontend library that synchronizes application state with the DOM via an in-memory Virtual DOM diffing reconciliation process.',
    importantConcepts: [
      'Virtual DOM & Reconciliation: Fiber architecture diffing keys and props to batch real DOM updates.',
      'React Hooks: useState, useEffect (side effects), useMemo (memoized values), useCallback (memoized functions), useRef.',
      'State Management: Props, Context API, and state libraries (Zustand, Redux Toolkit).',
      'Component Lifecycle: Mounting, Updating, and Unmounting phases.',
    ],
    commonInterviewQA: [
      {
        q: 'Why should keys in React lists be unique and stable rather than array indexes?',
        a: 'Stable keys allow React diffing algorithm to identify which items have changed, been added, or been removed. Using array indexes breaks component state when list elements are sorted or deleted.',
      },
    ],
    practiceQuestions: [
      'Build a custom useFetch hook handling caching, loading, and error states.',
      'Explain the purpose and trade-offs of React.memo.',
    ],
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Web Development',
    tagline: 'V8 Engine, Libuv, Non-blocking I/O, Streams & Middleware',
    shortExplanation:
      'Node.js is an open-source cross-platform JavaScript runtime built on Chrome V8 engine, utilizing an event-driven non-blocking I/O model powered by Libuv.',
    importantConcepts: [
      'Libuv Thread Pool: Handles asynchronous file system, DNS, and crypto operations off the main V8 execution thread.',
      'Streams & Buffers: Processing large payloads chunk-by-chunk without loading entire files into memory.',
      'Express Middleware: Request-response pipeline handling authorization, body parsing, and logging.',
      'Clustering: Forking multiple Node processes sharing the same server port to utilize multi-core CPUs.',
    ],
    commonInterviewQA: [
      {
        q: 'Is Node.js completely single-threaded?',
        a: 'JavaScript execution on Node.js runs on a single main thread. However, internal operations (file I/O, compression, crypto) are handled asynchronously by the Libuv worker thread pool.',
      },
    ],
    practiceQuestions: [
      'Explain the difference between process.nextTick() and setImmediate().',
      'How do you handle unhandled promise rejections in production Node.js services?',
    ],
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'Web Development',
    tagline: 'HTTP Verbs, Status Codes, Idempotency, Rate Limiting & Auth',
    shortExplanation:
      'Representational State Transfer (REST) is an architectural style for networked systems leveraging standard HTTP verbs, stateless requests, and uniform resource identifiers (URIs).',
    importantConcepts: [
      'HTTP Methods: GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove).',
      'Idempotency: An operation that produces the same result no matter how many times it is executed (GET, PUT, DELETE are idempotent; POST is not).',
      'HTTP Status Codes: 2xx (Success), 3xx (Redirection), 4xx (Client errors), 5xx (Server errors).',
      'API Security: Rate limiting, CORS, API keys, and JWT authentication.',
    ],
    commonInterviewQA: [
      {
        q: 'What makes an API method idempotent? Give an example.',
        a: 'An HTTP method is idempotent if the side-effects of N identical requests are the same as for a single request. For example, DELETE /users/42 removes user 42; calling it multiple times leaves the user deleted, whereas POST /users creates a new user on each call.',
      },
    ],
    practiceQuestions: [
      'Design RESTful endpoint conventions for an online banking transaction ledger.',
      'Explain the difference between 401 Unauthorized and 403 Forbidden.',
    ],
  },
];

export const PreparationHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'Programming' | 'CS Fundamentals' | 'Web Development'>('Programming');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('java');
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hireupp_prep_completed_topics');
      if (saved) {
        setCompletedTopicIds(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const toggleCompleteTopic = (id: string) => {
    setCompletedTopicIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('hireupp_prep_completed_topics', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const filteredTopics = ALL_TOPICS.filter((t) => t.category === activeCategory);
  const activeTopic = ALL_TOPICS.find((t) => t.id === selectedTopicId) || filteredTopics[0];

  const totalModules = ALL_TOPICS.length;
  const completedCount = completedTopicIds.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Structured Interview Curriculum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical & Fundamentals Learning Hub
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Topic-based learning paths across modern programming languages, computer science fundamentals, and web architecture.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/preparation/companies"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-2 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Company Tracks</span>
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

      {/* Progress & Category Selection Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Category Pills (8 cols) */}
        <div className="lg:col-span-8 flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-white/10 bg-slate-900/60 overflow-x-auto">
          {(['Programming', 'CS Fundamentals', 'Web Development'] as const).map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  const firstOfCat = ALL_TOPICS.find((t) => t.category === cat);
                  if (firstOfCat) setSelectedTopicId(firstOfCat.id);
                }}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat === 'Programming' && <Terminal className="w-4 h-4" />}
                {cat === 'CS Fundamentals' && <Cpu className="w-4 h-4" />}
                {cat === 'Web Development' && <Globe className="w-4 h-4" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Global Learning Progress Bar (4 cols) */}
        <div className="lg:col-span-4 p-4 rounded-2xl glass-panel border border-white/10 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Mastery Progress</span>
            <span className="font-mono text-white font-bold">
              {completedCount} / {totalModules} Modules ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sub-Topics Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filteredTopics.map((topic) => {
          const isSelected = topic.id === activeTopic.id;
          const isCompleted = completedTopicIds.includes(topic.id);

          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 whitespace-nowrap ${
                isSelected
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/20'
                  : 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              <span>{topic.name}</span>
              {isCompleted && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Topic Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Explanations, Code Examples, and Q&A */}
        <div className="lg:col-span-8 space-y-6">
          {/* Topic Title & Overview Card */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-blue-400 tracking-wider font-semibold">
                  {activeTopic.category} Track
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">{activeTopic.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{activeTopic.tagline}</p>
              </div>

              {/* Mark as Completed Toggle */}
              <button
                onClick={() => toggleCompleteTopic(activeTopic.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 self-start sm:self-auto ${
                  completedTopicIds.includes(activeTopic.id)
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {completedTopicIds.includes(activeTopic.id) ? (
                  <>
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <Square className="w-4 h-4 text-slate-400" />
                    <span>Mark as Completed</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeTopic.shortExplanation}
            </p>
          </div>

          {/* Important Core Concepts */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Core Architectural & Theoretical Concepts</span>
            </h3>

            <div className="space-y-2.5">
              {activeTopic.importantConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 leading-relaxed flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Example if present */}
          {activeTopic.codeExample && (
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-purple-400" />
                  <span>Code Architecture Pattern</span>
                </h3>
                <span className="text-[10px] font-mono uppercase text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                  {activeTopic.codeExample.language}
                </span>
              </div>

              <div className="relative rounded-2xl bg-slate-950 p-4 font-mono text-xs text-blue-300 border border-white/10 overflow-x-auto leading-relaxed">
                <pre>{activeTopic.codeExample.code}</pre>
              </div>

              <p className="text-xs text-slate-400 italic">
                <strong className="text-slate-300">Explanation:</strong> {activeTopic.codeExample.explanation}
              </p>
            </div>
          )}

          {/* Top Interview Questions & Model Answers */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Top Interview Questions & Model Technical Answers</span>
            </h3>

            <div className="space-y-4">
              {activeTopic.commonInterviewQA.map((qa, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2"
                >
                  <p className="text-xs sm:text-sm font-bold text-white">
                    Q: {qa.q}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-emerald-400 font-mono block mb-1">Model Response:</strong>
                    {qa.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Practice Challenges & Fast Navigation */}
        <div className="lg:col-span-4 space-y-6">
          {/* Practice Questions Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Recommended Practice Questions</span>
            </h3>

            <div className="space-y-2.5">
              {activeTopic.practiceQuestions.map((pq, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <span className="font-mono text-blue-400 font-bold">0{i + 1}.</span>
                  <span>{pq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fast Track Simulator CTA */}
          <div className="p-6 rounded-3xl glass-panel border border-blue-500/30 bg-gradient-to-b from-blue-950/30 to-slate-900/80 space-y-3 text-center">
            <h4 className="text-sm font-bold text-white">Test Your Knowledge</h4>
            <p className="text-xs text-slate-400">
              Launch an AI mock interview tailored to test your mastery of {activeTopic.name}.
            </p>
            <Link
              to="/interview/mock"
              className="w-full py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Practice {activeTopic.name} Mock</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
