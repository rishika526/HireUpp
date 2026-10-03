import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, Sparkles, User, Briefcase, Lock, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetCompany, setTargetCompany] = useState('Amazon / Google / Tier 1');

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
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/20 blur-3xl pointer-events-none rounded-full" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/20 shadow-lg shadow-blue-500/25 mb-3">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Create HireUpp Account</h1>
          <p className="text-xs text-slate-400 mt-1">
            Unlock AI mock interviews and neural ATS benchmarking
          </p>
        </div>

        {/* Account Type */}
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
            <span>Job Seeker</span>
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
            <span>Hiring Team</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.morgan@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          {role === 'candidate' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Target Companies
              </label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g. Amazon, TCS, Microsoft"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Organization / Company
              </label>
              <input
                type="text"
                placeholder="e.g. Stripe, Razorpay, Enterprise Corp"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          )}

          <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-400">
            <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <span>Includes free AI resume audit and 3 full multimodal mock interview credits.</span>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-xs font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-4 ${
              role === 'candidate'
                ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/25'
                : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/25'
            }`}
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
