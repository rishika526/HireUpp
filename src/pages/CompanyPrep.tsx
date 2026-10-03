import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';
import { CompanyCard, type CompanyData } from '../components/ui/CompanyCard';

const ALL_COMPANIES: CompanyData[] = [
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
    avgPackage: '7.5 LPA',
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
    avgPackage: '6.5 LPA',
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
    avgPackage: '8.5 LPA',
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
    avgPackage: '9.0 LPA',
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
    avgPackage: '10 LPA',
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
    avgPackage: '14 LPA',
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
    avgPackage: '24 LPA',
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
    avgPackage: '28 LPA',
  },
];

export const CompanyPrep: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<string>('All');

  const filteredCompanies = ALL_COMPANIES.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.hiringRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      selectedDifficulty === 'All' || company.difficulty === selectedDifficulty;

    const matchesTopic =
      selectedTopic === 'All' ||
      company.topics.some((t) => t.toLowerCase().includes(selectedTopic.toLowerCase()));

    const matchesRole =
      selectedRole === 'All' ||
      company.hiringRole.toLowerCase().includes(selectedRole.toLowerCase());

    return matchesSearch && matchesDifficulty && matchesTopic && matchesRole;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Target Organization Hubs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Company-Specific Preparation Tracks
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Syllabus blueprints, actual online assessment (OA) question leaks, interview format breakdowns, and past candidate hiring bars for top tier enterprises.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/interview/mock"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all"
          >
            <span>Start Practice Mock</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search TCS, Amazon, Java..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl glass-input text-xs cursor-pointer bg-slate-900"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy-Medium">Easy-Medium</option>
              <option value="Medium">Medium</option>
              <option value="Medium-Hard">Medium-Hard</option>
              <option value="Hard">Hard (FAANG)</option>
            </select>
          </div>

          {/* Topic Filter */}
          <div>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl glass-input text-xs cursor-pointer bg-slate-900"
            >
              <option value="All">All Topics</option>
              <option value="DSA">Data Structures & Algorithms</option>
              <option value="System">System Architecture</option>
              <option value="Behavioral">Behavioral (STAR / Leadership)</option>
              <option value="Aptitude">Cognitive & Aptitude</option>
            </select>
          </div>

          {/* Role Filter */}
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl glass-input text-xs cursor-pointer bg-slate-900"
            >
              <option value="All">All Target Roles</option>
              <option value="Software">Software Engineer / SDE</option>
              <option value="Specialist">Digital Specialist / Ninja</option>
              <option value="Analyst">Technology Analyst</option>
            </select>
          </div>
        </div>

        {/* Filter Summary pills */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
          <span>
            Showing <strong className="text-white">{filteredCompanies.length}</strong> of{' '}
            {ALL_COMPANIES.length} company tracks
          </span>

          {(selectedDifficulty !== 'All' || selectedTopic !== 'All' || selectedRole !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
                setSelectedTopic('All');
                setSelectedRole('All');
              }}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="py-16 text-center rounded-3xl glass-panel border border-white/10 space-y-3">
          <Building2 className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No company playbooks matched your filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to browse all available enterprises.
          </p>
        </div>
      )}
    </div>
  );
};
