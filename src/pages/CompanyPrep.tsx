import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Building2,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  TrendingUp,
  CheckSquare,
  Square,
  BookOpen,
  Code2,
  Users,
  Compass,
  FileCheck,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Info,
} from 'lucide-react';

interface CompanyBlueprint {
  id: string;
  name: string;
  logoText: string;
  logoBg: string;
  difficulty: 'Easy-Medium' | 'Medium' | 'Medium-Hard' | 'Hard';
  difficultyColor: string;
  hiringRoles: string[];
  overview: string;
  avgPackage: string;
  recruitmentStages: {
    stage: number;
    title: string;
    description: string;
    duration: string;
  }[];
  aptitudeTopics: string[];
  programmingTopics: string[];
  techInterviewQuestions: {
    q: string;
    a: string;
  }[];
  hrQuestions: {
    q: string;
    tips?: string;
    a?: string;
  }[];
  codingProblems: {
    title: string;
    difficulty: string;
    tag: string;
  }[];
  checklistItems: string[];
}

const CURATED_COMPANIES: CompanyBlueprint[] = [
  {
    id: 'tcs',
    name: 'TCS',
    logoText: 'TCS',
    logoBg: 'bg-gradient-to-br from-blue-700 to-indigo-900',
    difficulty: 'Easy-Medium',
    difficultyColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    hiringRoles: ['TCS Ninja (3.6 LPA)', 'TCS Digital (7.5 LPA)', 'TCS Prime (9.0 LPA)'],
    avgPackage: '3.6 - 9.0 LPA',
    overview:
      'Tata Consultancy Services is a global IT services and consulting leader. The primary entry pathway is the TCS National Qualifier Test (NQT), testing cognitive aptitude and foundational programming before technical interviews.',
    recruitmentStages: [
      { stage: 1, title: 'TCS NQT Foundation Section', description: 'Numerical Ability, Verbal Ability, and Reasoning Ability', duration: '75 Mins' },
      { stage: 2, title: 'TCS NQT Advanced Section', description: 'Advanced Quantitative Aptitude, Advanced Reasoning, and 2 Hands-on Coding Problems', duration: '90 Mins' },
      { stage: 3, title: 'Technical Interview', description: 'Core CS concepts (OOP, DBMS, SQL), final year project walkthrough, and code debugging', duration: '30-45 Mins' },
      { stage: 4, title: 'Managerial & HR Round', description: 'Behavioral fitment, willingness to relocate, communication skills, and situational questions', duration: '20-30 Mins' },
    ],
    aptitudeTopics: [
      'Number Systems & Divisibility Rules',
      'Time, Speed & Distance / Work & Time',
      'Percentages, Profit & Loss, Ratios',
      'Data Interpretation (Charts & Tables)',
      'Statement & Assumptions / Syllogisms',
      'Reading Comprehension & Error Detection',
    ],
    programmingTopics: ['Core Java / C++ Basics', 'Array Manipulations & String Operations', 'SQL Joins & Group By Queries', 'OOP Principles (Polymorphism, Inheritance)'],
    techInterviewQuestions: [
      {
        q: 'What is the difference between Call by Value and Call by Reference in Java/C++?',
        a: 'Java is strictly Pass by Value. When an object reference is passed, a copy of the reference is passed by value, meaning the object internal state can be altered, but reassigning the reference does not alter the caller reference.',
      },
      {
        q: 'Explain the difference between Primary Key, Unique Key, and Foreign Key in DBMS.',
        a: 'Primary Key uniquely identifies a record and cannot contain NULL. Unique Key ensures distinctness but allows one NULL value. Foreign Key enforces referential integrity by pointing to the Primary Key of another table.',
      },
    ],
    hrQuestions: [
      {
        q: 'Why do you want to start your professional journey at TCS?',
        a: 'Highlight TCS scale, global client footprint, commitment to enterprise learning (e.g., Elevate Wings certifications), and your alignment with structured software delivery.',
      },
      {
        q: 'Are you comfortable working in rotating shifts or relocating across centers?',
        a: 'Express genuine flexibility and enthusiasm for diverse team environments, while emphasizing a focus on continuous project contribution.',
      },
    ],
    codingProblems: [
      { title: 'Subarray with Given Sum', difficulty: 'Easy', tag: 'Sliding Window' },
      { title: 'Check Anagram and Palindrome Strings', difficulty: 'Easy', tag: 'Strings' },
      { title: 'Kth Smallest Element in Array', difficulty: 'Medium', tag: 'Sorting/Heap' },
    ],
    checklistItems: [
      'Practice 40+ TCS NQT Numerical Ability questions under time pressure',
      'Master string and array manipulations in either C++, Java, or Python',
      'Prepare a 3-minute structured walkthrough of your academic capstone project',
      'Revise SQL queries (JOINs, Aggregate functions, Second highest salary)',
      'Review TCS company values, recent client achievements, and readiness for relocation',
    ],
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logoText: 'INFY',
    logoBg: 'bg-gradient-to-br from-blue-600 to-cyan-800',
    difficulty: 'Easy-Medium',
    difficultyColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    hiringRoles: ['Systems Engineer (3.6 LPA)', 'Specialist Programmer (9.5 LPA)', 'Digital Specialist Engineer (6.5 LPA)'],
    avgPackage: '3.6 - 9.5 LPA',
    overview:
      'Infosys is a pioneer in global technology consulting and next-generation digital services. Its flagship Mysore training campus is renowned for rigorous software engineering foundations.',
    recruitmentStages: [
      { stage: 1, title: 'Online Assessment (Cognitive & Pseudocode)', description: 'Mathematical Ability, Logical Reasoning, Verbal Ability, and Pseudocode interpretation', duration: '100 Mins' },
      { stage: 2, title: 'Hands-on Coding Assessment', description: '2 to 3 programming challenges (Strings, Dynamic Programming, Graphs for DSE/SP tracks)', duration: '60-90 Mins' },
      { stage: 3, title: 'Technical & Academic Interview', description: 'Project presentation, programming concepts, basic data structures, and debugging', duration: '30-40 Mins' },
      { stage: 4, title: 'HR & Fitment Interview', description: 'Interpersonal skills, career goals, willingness to undergo Mysore training, and cultural fit', duration: '20 Mins' },
    ],
    aptitudeTopics: [
      'Pseudocode tracing & bitwise operator puzzles',
      'Permutations, Combinations & Probability',
      'Data Sufficiency & Analytical Reasoning',
      'Critical Thinking & Sentence Correction',
      'Cryptarithmetic / Logical Sequence Puzzles',
    ],
    programmingTopics: ['Object-Oriented Design', 'Stack, Queue & Linked List implementations', 'Basic Graph / Tree traversals', 'Database Normalization & ACID properties'],
    techInterviewQuestions: [
      {
        q: 'What are abstract classes versus interfaces, and when do you choose one?',
        a: 'Abstract classes allow partial implementation (state, concrete methods, constructors), whereas interfaces define contracts. In modern Java, interfaces also support default methods, but multiple inheritance of state remains restricted to abstract class single inheritance.',
      },
      {
        q: 'What is Database Normalization (1NF, 2NF, 3NF)?',
        a: 'Normalization minimizes data redundancy and eliminates insertion/update/deletion anomalies by decomposing complex relations into focused, logically related tables.',
      },
    ],
    hrQuestions: [
      {
        q: 'How do you handle learning completely new technologies under strict deadlines?',
        a: 'Cite your experience picking up modern frameworks for hackathons or college assignments. Emphasize self-directed learning and consulting documentation.',
      },
    ],
    codingProblems: [
      { title: 'Longest Palindromic Substring', difficulty: 'Medium', tag: 'Dynamic Programming' },
      { title: 'Balanced Parentheses Checker', difficulty: 'Easy', tag: 'Stack' },
      { title: 'Merge Two Sorted Arrays without Extra Space', difficulty: 'Medium', tag: 'Two Pointers' },
    ],
    checklistItems: [
      'Solve 25+ pseudocode output tracing questions',
      'Be able to write clean code on virtual whiteboards without auto-complete',
      'Prepare clear explanations for all technologies listed on your resume',
      'Understand basic time complexities of Sorting algorithms (Merge vs Quick Sort)',
      'Prepare questions to ask the interviewer about project deployment methodologies',
    ],
  },
  {
    id: 'wipro',
    name: 'Wipro',
    logoText: 'WIPRO',
    logoBg: 'bg-gradient-to-br from-indigo-800 to-purple-950',
    difficulty: 'Easy-Medium',
    difficultyColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    hiringRoles: ['Project Engineer - Elite (3.5 LPA)', 'Turbo Track (6.5 LPA)'],
    avgPackage: '3.5 - 6.5 LPA',
    overview:
      'Wipro Limited is a multinational IT, consulting and business process services company. The Elite National Talent Hunt (NTH) is the primary hiring gateway for campus graduates.',
    recruitmentStages: [
      { stage: 1, title: 'Wipro NTH Aptitude Test', description: 'Logical Ability, Quantitative Ability, and English (Verbal) Section', duration: '48 Mins' },
      { stage: 2, title: 'Written Communication Test (WCT)', description: 'Essay writing assessing grammar, clarity, vocabulary, and argument coherence', duration: '20 Mins' },
      { stage: 3, title: 'Online Coding Test', description: '2 programming problems (1 Easy, 1 Medium difficulty in Java/C++/Python)', duration: '60 Mins' },
      { stage: 4, title: 'Combined Tech + HR Interview', description: 'Technical fundamentals, project review, strengths, weakness, and location fitment', duration: '30-40 Mins' },
    ],
    aptitudeTopics: [
      'Simple & Compound Interest, Averages',
      'Coding-Decoding & Blood Relations',
      'Deductive Reasoning & Direction Sense',
      'Essay Structure: Introduction, Thesis, Body paragraphs, Conclusion',
    ],
    programmingTopics: ['Basic Recursion & Loops', 'String Tokenization & Search', 'SQL Joins & Grouping', 'Software Engineering Life Cycle (SDLC)'],
    techInterviewQuestions: [
      {
        q: 'What is the Software Development Life Cycle (SDLC)? Compare Waterfall and Agile.',
        a: 'SDLC defines the phased engineering of software: Requirements, Design, Implementation, Testing, Deployment, Maintenance. Waterfall is linear and sequential; Agile is iterative, shipping working increments in 2-week sprints with constant feedback.',
      },
    ],
    hrQuestions: [
      {
        q: 'What are the five core Wipro Spirit values?',
        a: 'Being passionate about clients success, treating each person with respect, being global and responsible, and unyielding integrity in everything we do.',
      },
    ],
    codingProblems: [
      { title: 'Reverse Words in a String', difficulty: 'Easy', tag: 'Strings' },
      { title: 'Find Majority Element in Array', difficulty: 'Easy', tag: 'Boyer-Moore' },
    ],
    checklistItems: [
      'Practice typing a 250-word structured essay in 20 minutes without spelling errors',
      'Review fundamental C/C++ memory pointers or Java fundamentals',
      'Be ready to explain your favorite college subject with practical examples',
      'Prepare thoughtful answers on how you overcome challenges in team assignments',
    ],
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logoText: 'ACN',
    logoBg: 'bg-gradient-to-br from-purple-700 to-indigo-900',
    difficulty: 'Medium',
    difficultyColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    hiringRoles: ['Associate Software Engineer (4.5 LPA)', 'Advanced Application Engineering (6.5 - 9.0 LPA)'],
    avgPackage: '4.5 - 9.0 LPA',
    overview:
      'Accenture is a Fortune Global 500 company providing consulting, digital, technology and operations services. Known for comprehensive candidate evaluations spanning cognitive ability, technical acumen, and communication assessments.',
    recruitmentStages: [
      { stage: 1, title: 'Cognitive & Technical Assessment', description: 'Critical Thinking, Problem Solving, English Ability, Common App & MS Office, Cloud, and Network Security MCQs', duration: '90 Mins' },
      { stage: 2, title: 'Coding Assessment', description: '2 Coding problems on arrays, strings, math, or basic hash tables (Mandatory pass)', duration: '45 Mins' },
      { stage: 3, title: 'Communication Assessment (Automated)', description: 'Sentence reading, listening comprehension, story retelling, and spontaneous speaking', duration: '30 Mins' },
      { stage: 4, title: 'Virtual Interview', description: 'Project defense, situational behavioral questions, adaptability, and technological curiosity', duration: '25-35 Mins' },
    ],
    aptitudeTopics: [
      'Critical Reasoning & Venn Diagrams',
      'Abstract Reasoning & Visual Sequences',
      'Cloud Architecture & Virtualization Basics',
      'Network Security, Firewalls & Threat Models',
    ],
    programmingTopics: ['Bit Manipulation & Arithmetic', 'Array Traversals & Hash Maps', 'Basic Cloud Services (IaaS, PaaS, SaaS)', 'Web Technology Fundamentals (HTTP/HTML)'],
    techInterviewQuestions: [
      {
        q: 'What is Cloud Computing and what is the difference between IaaS, PaaS, and SaaS?',
        a: 'IaaS provides raw infrastructure (EC2, VMs, disks); PaaS provides runtime platforms without managing OS (AWS Elastic Beanstalk, Heroku); SaaS provides complete application software (Google Workspace, Salesforce).',
      },
    ],
    hrQuestions: [
      {
        q: 'Describe a project where you had to adapt quickly to unexpected scope changes.',
        a: 'Use the STAR method: explain the sudden shift, how you re-prioritized deliverables, and how you communicated transparently with team members.',
      },
    ],
    codingProblems: [
      { title: 'Move Zeroes to End of Array', difficulty: 'Easy', tag: 'Arrays' },
      { title: 'Maximum Subarray (Kadane Algorithm)', difficulty: 'Medium', tag: 'Dynamic Programming' },
    ],
    checklistItems: [
      'Review Cloud & Cybersecurity fundamentals (IaaS vs PaaS, basic encryption)',
      'Test your headset/microphone for the automated Communication Assessment round',
      'Practice speaking smoothly without fillers (um, ah, like) for 60 seconds on random topics',
      'Review Kadane algorithm and frequency hash map patterns in coding',
    ],
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    logoText: 'CTSH',
    logoBg: 'bg-gradient-to-br from-blue-900 to-cyan-950',
    difficulty: 'Medium',
    difficultyColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    hiringRoles: ['GenC (4.0 LPA)', 'GenC Next (6.75 LPA)', 'GenC Pro (9.0 LPA)'],
    avgPackage: '4.0 - 9.0 LPA',
    overview:
      'Cognizant Technology Solutions helps clients modernize technology, reimagine processes and transform experiences. Its GenC campus tracks segment talent based on algorithmic coding depth.',
    recruitmentStages: [
      { stage: 1, title: 'Cognitive & Skill Assessment', description: 'Quantitative, Analytical, Verbal, and Domain Technical MCQs', duration: '80 Mins' },
      { stage: 2, title: 'GenC Next Coding Challenge', description: 'Complex algorithms, graph traversals, and dynamic programming for premium compensation bands', duration: '60 Mins' },
      { stage: 3, title: 'Technical Evaluation Round', description: 'Live coding problem solving, database schema design, and core programming languages', duration: '35-45 Mins' },
      { stage: 4, title: 'HR & Cultural Round', description: 'Communication, willingness to learn new tech stacks, and career roadmap alignment', duration: '20 Mins' },
    ],
    aptitudeTopics: [
      'Geometry & Mensuration',
      'Clocks, Calendars & Series Completion',
      'Sentence Rearrangement & Reading Comprehension',
      'Code Debugging & Dry Runs',
    ],
    programmingTopics: ['Object-Oriented Programming (OOP)', 'Relational Databases (SQL Queries)', 'Recursion & Dynamic Programming', 'Time Complexity Analysis'],
    techInterviewQuestions: [
      {
        q: 'What is the difference between Method Overloading and Method Overriding?',
        a: 'Overloading happens within the same class with identical names but differing parameter signatures (compile-time polymorphism). Overriding happens across subclass/superclass inheritance where a subclass provides a specific implementation of a parent method (runtime polymorphism).',
      },
    ],
    hrQuestions: [
      {
        q: 'Are you open to continuous upskilling across unfamiliar tech stacks?',
        a: 'Affirm enthusiasm for full-stack, cloud, and AI engineering, highlighting past instances where you rapidly acquired new programming tools.',
      },
    ],
    codingProblems: [
      { title: 'Detect Cycle in a Linked List', difficulty: 'Medium', tag: 'Floyd Cycle' },
      { title: 'Find First Non-Repeating Character', difficulty: 'Easy', tag: 'Hash Map' },
    ],
    checklistItems: [
      'Practice debugging code snippets under time limits',
      'Solidify OOP concepts (Inheritance, Polymorphism, Encapsulation, Abstraction)',
      'Prepare to write SQL queries involving aggregate functions (COUNT, SUM, AVG)',
      'Review git version control basics and teamwork collaboration methodologies',
    ],
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    logoText: 'DTT',
    logoBg: 'bg-gradient-to-br from-emerald-800 to-slate-900',
    difficulty: 'Medium',
    difficultyColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    hiringRoles: ['Technology Analyst (7.6 - 10.0 LPA)', 'Consultant Intern'],
    avgPackage: '7.6 - 10.0 LPA',
    overview:
      'Deloitte is one of the Big Four professional services firms, delivering world-class audit, consulting, tax, and advisory services. Technical candidates are evaluated heavily on business logic, consulting fit, and clear articulation.',
    recruitmentStages: [
      { stage: 1, title: 'Deloitte Online Assessment', description: 'Quantitative Ability, Logical Reasoning, Verbal Ability, and Computer Science Fundamentals', duration: '75 Mins' },
      { stage: 2, title: 'Versant / Speaking Assessment', description: 'Automated test measuring English oral fluency, pronunciation, and active listening', duration: '30 Mins' },
      { stage: 3, title: 'Technical Interview', description: 'Database schema design, Web architecture, coding logic, and software engineering scenarios', duration: '40 Mins' },
      { stage: 4, title: 'Managerial / Leadership Fit Round', description: 'Consulting case scenario, client handling mindset, prioritization under pressure, and ethical judgment', duration: '30 Mins' },
    ],
    aptitudeTopics: [
      'Probability, Permutations & Averages',
      'Critical Reasoning & Inference Questions',
      'Business Data Interpretation (Multi-chart analysis)',
      'Grammar & Sentence Improvement',
    ],
    programmingTopics: ['Database Normalization & Indexing', 'API Design & Integration', 'Client-Server Architecture', 'Software Quality Assurance'],
    techInterviewQuestions: [
      {
        q: 'How do you design a database schema for an enterprise Employee Management System?',
        a: 'Identify core entities (Employees, Departments, Roles, Projects). Define primary keys, foreign key relationships, normalize to 3NF, and apply composite indexes on frequently filtered fields like department_id and hire_date.',
      },
    ],
    hrQuestions: [
      {
        q: 'A client demands an impossible project timeline. How do you respond professionally?',
        a: 'Avoid overpromising. Clarify requirements, present data on current engineering velocity, offer phased delivery of core MVP features first, and agree on realistic milestones.',
      },
    ],
    codingProblems: [
      { title: 'Merge Intervals', difficulty: 'Medium', tag: 'Sorting' },
      { title: 'Two Sum Problem', difficulty: 'Easy', tag: 'Hash Table' },
    ],
    checklistItems: [
      'Practice speaking clearly with structured consulting frameworks (Context, Action, Outcome)',
      'Review SQL query writing and database schema design principles',
      'Understand how enterprise software delivers measurable client ROI',
      'Prepare STAR situational stories on leadership, conflict resolution, and client service',
    ],
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    logoText: 'CAP',
    logoBg: 'bg-gradient-to-br from-blue-700 to-indigo-950',
    difficulty: 'Easy-Medium',
    difficultyColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    hiringRoles: ['Analyst (4.0 LPA)', 'Senior Analyst (5.75 - 7.5 LPA)'],
    avgPackage: '4.0 - 7.5 LPA',
    overview:
      'Capgemini is a global leader in partnering with companies to transform and manage their business by harnessing the power of technology. Its campus recruitment features game-based aptitude evaluations.',
    recruitmentStages: [
      { stage: 1, title: 'Cognitive & Pseudocode Test', description: 'Deductive reasoning, pseudocode logic tracing, and essay writing', duration: '75 Mins' },
      { stage: 2, title: 'Game-Based Aptitude Round', description: 'Interactive visual games evaluating spatial reasoning, short-term memory, and risk appetite', duration: '30 Mins' },
      { stage: 3, title: 'Technical Interview', description: 'Programming fundamentals, data structures, academic projects, and web technologies', duration: '30 Mins' },
      { stage: 4, title: 'HR Round', description: 'Verification of credentials, communication evaluation, and willingness to work across international time zones', duration: '15-20 Mins' },
    ],
    aptitudeTopics: [
      'Game-based cognitive challenges (Grid navigation, Dot tracking)',
      'Pseudocode output prediction',
      'Speed mathematics & ratios',
      'English comprehension & sentence structure',
    ],
    programmingTopics: ['Core Java / Python / C++', 'Array & String manipulation', 'Basic Web Concepts (HTML, CSS, JavaScript)', 'Relational Databases'],
    techInterviewQuestions: [
      {
        q: 'What is the difference between synchronous and asynchronous programming?',
        a: 'Synchronous execution blocks subsequent code until the current task completes. Asynchronous programming delegates long-running I/O tasks to background workers or event loops, allowing the main thread to stay responsive.',
      },
    ],
    hrQuestions: [
      {
        q: 'What qualities make a great software engineering team member at Capgemini?',
        a: 'Integrity, active listening, structured debugging discipline, and a passion for continuous learning in cloud and digital transformation.',
      },
    ],
    codingProblems: [
      { title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', tag: 'Two Pointers' },
      { title: 'Count Vowels and Consonants in String', difficulty: 'Easy', tag: 'Strings' },
    ],
    checklistItems: [
      'Understand game-based aptitude test mechanics (remain calm, avoid erratic clicking)',
      'Practice pseudocode logic tracing and operator precedence puzzles',
      'Be prepared to explain synchronous vs asynchronous execution',
      'Review basic SQL SELECT, UPDATE, and DELETE syntax',
    ],
  },
];

export const CompanyPrep: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopicFocus, setSelectedTopicFocus] = useState('All');
  const [activeCompanyId, setActiveCompanyId] = useState<string>(
    searchParams.get('company') || 'tcs'
  );

  // Checklists saved in localStorage
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hireupp_company_checklists');
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const toggleChecklistItem = (itemKey: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [itemKey]: !prev[itemKey] };
      try {
        localStorage.setItem('hireupp_company_checklists', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const filteredCompanies = CURATED_COMPANIES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.hiringRoles.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.programmingTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const activeCompany =
    CURATED_COMPANIES.find((c) => c.id === activeCompanyId) || CURATED_COMPANIES[0];

  // Calculate progress for active company
  const activeChecklistTotal = activeCompany.checklistItems.length;
  const activeChecklistCompleted = activeCompany.checklistItems.filter(
    (item, idx) => checkedItems[`${activeCompany.id}-${idx}`]
  ).length;
  const companyProgressPercent = Math.round((activeChecklistCompleted / activeChecklistTotal) * 100);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Enterprise Playbooks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Company-Specific Preparation Hub
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Curated recruitment blueprints, syllabus breakdowns, common technical questions, and interactive preparation checklists for leading tech enterprises.
          </p>
        </div>

        <Link
          to={`/interview/mock?company=${encodeURIComponent(activeCompany.name)}`}
          className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all whitespace-nowrap self-start md:self-auto"
        >
          <span>Practice Mock for {activeCompany.name}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Honest Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <span>
          <strong className="text-white">Curated Preparation Notice:</strong> Recruitment patterns, syllabus categories, and interview rounds are indicative examples synthesized from historical candidate placement experiences. They are not official company question papers or hiring guarantees.
        </span>
      </div>

      {/* Company Selector Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CURATED_COMPANIES.map((company) => {
          const isSelected = company.id === activeCompany.id;
          const completedCount = company.checklistItems.filter(
            (_, idx) => checkedItems[`${company.id}-${idx}`]
          ).length;

          return (
            <button
              key={company.id}
              onClick={() => setActiveCompanyId(company.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2.5 whitespace-nowrap ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/20'
                  : 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-extrabold ${company.logoBg} text-white`}
              >
                {company.logoText}
              </div>
              <span>{company.name}</span>
              {completedCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Checklist progress" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Company Detailed Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Overview, Recruitment Stages, Tech & HR Q&A, Coding Challenges */}
        <div className="lg:col-span-8 space-y-6">
          {/* Company Hero Card */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-white text-xl shadow-inner border border-white/20 ${activeCompany.logoBg}`}
                >
                  {activeCompany.logoText}
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">{activeCompany.name}</h2>
                  <p className="text-xs text-slate-400">Typical Package: <strong className="text-white">{activeCompany.avgPackage}</strong></p>
                </div>
              </div>

              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border self-start sm:self-auto ${activeCompany.difficultyColor}`}
              >
                Difficulty: {activeCompany.difficulty}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeCompany.overview}
            </p>

            <div>
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2 font-semibold">
                Key Campus Hiring Tracks:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeCompany.hiringRoles.map((role, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-lg bg-white/5 text-blue-300 border border-blue-500/20 font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recruitment Stages */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-400" />
                <span>Indicative Recruitment Flow</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">4 Typical Rounds</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeCompany.recruitmentStages.map((stg) => (
                <div
                  key={stg.stage}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Stage {stg.stage}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{stg.duration}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{stg.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{stg.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical & Common HR Questions */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span>Common Technical Interview Questions & Model Answers</span>
              </h3>
              <p className="text-xs text-slate-400">
                Frequently observed technical inquiry topics for {activeCompany.name} candidate rounds.
              </p>
            </div>

            <div className="space-y-4">
              {activeCompany.techInterviewQuestions.map((qItem, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2"
                >
                  <p className="text-xs sm:text-sm font-bold text-white">
                    Q: {qItem.q}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-blue-400 font-mono block mb-1">Suggested Articulation:</strong>
                    {qItem.a}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Behavioral & HR Interview Guidance</span>
              </h4>

              <div className="space-y-3">
                {activeCompany.hrQuestions.map((hrItem, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1.5"
                  >
                    <p className="text-xs sm:text-sm font-bold text-white">
                      Q: "{hrItem.q}"
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-emerald-400">Preparation Strategy:</strong> {hrItem.tips || hrItem.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Practice Coding Challenges */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Recommended Practice Coding Problems</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">Curated Exercises</span>
            </div>

            <div className="space-y-2.5">
              {activeCompany.codingProblems.map((prob, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 font-bold">0{idx + 1}</span>
                    <div>
                      <p className="text-xs font-bold text-white">{prob.title}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{prob.tag}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${
                      prob.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Interactive Preparation Checklist & Syllabus Summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Interactive Checklist & Progress Card */}
          <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-400" />
                <span>{activeCompany.name} Checklist</span>
              </h3>
              <span className="text-xs font-mono font-bold text-blue-400">
                {activeChecklistCompleted}/{activeChecklistTotal} Done
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Preparation Readiness</span>
                <span className="font-mono text-white font-bold">{companyProgressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${companyProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 pt-2">
              {activeCompany.checklistItems.map((item, idx) => {
                const itemKey = `${activeCompany.id}-${idx}`;
                const isChecked = !!checkedItems[itemKey];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleChecklistItem(itemKey)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200'
                        : 'bg-slate-900/80 border-white/5 hover:border-white/20 text-slate-400'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      )}
                    </div>
                    <span
                      className={`text-xs leading-relaxed ${
                        isChecked ? 'line-through text-slate-400' : 'text-slate-200'
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Aptitude & Programming Focus Radar */}
          <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Core Aptitude Blueprint</span>
            </h4>
            <div className="space-y-1.5">
              {activeCompany.aptitudeTopics.map((topic, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>

            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 pt-3 border-t border-white/5">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>Programming Concepts</span>
            </h4>
            <div className="space-y-1.5">
              {activeCompany.programmingTopics.map((topic, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="p-6 rounded-3xl glass-panel border border-blue-500/30 bg-gradient-to-b from-blue-950/30 to-slate-900/80 space-y-3 text-center">
            <h4 className="text-sm font-bold text-white">Ready to test your skills?</h4>
            <p className="text-xs text-slate-400">
              Launch an AI mock interview tailored with questions calibrated for {activeCompany.name}.
            </p>
            <Link
              to={`/interview/mock?company=${encodeURIComponent(activeCompany.name)}`}
              className="w-full py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Start {activeCompany.name} Mock Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
