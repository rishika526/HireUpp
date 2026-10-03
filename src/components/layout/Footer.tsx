import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Sparkles, Terminal, ArrowUpRight, Globe, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="bg-blue-600/20 p-2 rounded-xl border border-blue-500/30">
                <BrainCircuit className="w-6 h-6 text-blue-400" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">HireUpp</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              HireUpp is an all-in-one intelligent recruitment and career preparation ecosystem powered by Generative AI, RAG, Vector Embeddings, and Voice AI.
            </p>

            {/* AI Architecture Pill tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {['Generative AI', 'LLMs', 'RAG Retrieval', 'Vector Database', 'Voice AI'].map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All AI Core Inference Systems Operational</span>
            </div>
          </div>

          {/* Candidate Experience */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">
              Candidate Prep
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/resume" className="hover:text-blue-400 transition-colors">
                  AI Resume Analyzer
                </Link>
              </li>
              <li>
                <Link to="/resume/analyze" className="hover:text-blue-400 transition-colors">
                  ATS Score Diagnostic
                </Link>
              </li>
              <li>
                <Link to="/interview/mock" className="hover:text-blue-400 transition-colors">
                  AI Mock Interview
                </Link>
              </li>
              <li>
                <Link to="/preparation/companies" className="hover:text-blue-400 transition-colors">
                  Company Playbooks
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-400 transition-colors">
                  Candidate Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Recruiter Suite */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">
              Recruiter Suite
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/recruiter" className="hover:text-blue-400 transition-colors">
                  Talent Intelligence
                </Link>
              </li>
              <li>
                <Link to="/recruiter/candidates" className="hover:text-blue-400 transition-colors">
                  Candidate Pool
                </Link>
              </li>
              <li>
                <Link to="/recruiter/candidates" className="hover:text-blue-400 transition-colors">
                  AI Match Engine
                </Link>
              </li>
              <li>
                <Link to="/recruiter/candidates" className="hover:text-blue-400 transition-colors">
                  Shortlist Workflow
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition-colors">
                  Enterprise Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/login" className="hover:text-blue-400 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-400 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <a href="#tech" className="hover:text-blue-400 transition-colors">
                  RAG Architecture
                </a>
              </li>
              <li>
                <span className="text-slate-500">API Documentation (v2.4)</span>
              </li>
              <li>
                <span className="text-slate-500">Security & Compliance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HireUpp Inc. All rights reserved. Built for intelligent career acceleration.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
