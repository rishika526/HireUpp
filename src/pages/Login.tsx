import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, Sparkles, User, Briefcase, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFillDemo = (demoRole: 'candidate' | 'recruiter') => {
    setRole(demoRole);
    if (demoRole === 'candidate') {
      setEmail('alex.morgan@hireupp.io');
      setPassword('CandidateDemo2026!');
    } else {
      setEmail('recruiter.lead@enterprise.com');
      setPassword('RecruiterDemo2026!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'candidate') {
      navigate('/dashboard');
    } else {
      navigate('/recruiter/candidates');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md rounded-3xl glass-panel p-8 sm:p-10 border border-white/10 shadow-2xl relative">
        {/* Glow behind */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/20 blur-3xl pointer-events-none rounded-full" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/20 shadow-lg shadow-blue-500/25 mb-3">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Sign In to HireUpp</h1>
          <p className="text-xs text-slate-400 mt-1">
            Access your AI career diagnostics or talent intelligence console
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10 text-xs mb-6">
          <button
            type="button"
            onClick={() => setRole('candidate')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
              role === 'candidate'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Candidate</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('recruiter')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
              role === 'recruiter'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Recruiter</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Work Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'candidate' ? 'alex.morgan@hireupp.io' : 'hiring@company.com'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <a href="#" className="text-[11px] text-blue-400 hover:text-blue-300">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-xs font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-2 ${
              role === 'candidate'
                ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/25'
                : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/25'
            }`}
          >
            <span>Sign In to {role === 'candidate' ? 'Candidate OS' : 'Recruiter Console'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Fill Buttons */}
        <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
          <p className="text-[11px] text-center text-slate-400 font-mono">
            Demo Sandbox Access:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo('candidate')}
              className="flex-1 py-1.5 rounded-lg text-[11px] font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
            >
              Demo Candidate
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('recruiter')}
              className="flex-1 py-1.5 rounded-lg text-[11px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
            >
              Demo Recruiter
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have a HireUpp account?{' '}
          <Link to="/register" className="text-blue-400 font-semibold hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};
