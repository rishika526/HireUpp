import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit, Menu, X, User, Briefcase, Sparkles, ChevronRight, LogIn } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const CANDIDATE_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Resume', path: '/resume' },
  { name: 'Mock Interview', path: '/interview' },
  { name: 'Preparation', path: '/preparation' },
  { name: 'Dashboard', path: '/dashboard' },
];

const RECRUITER_LINKS = [
  { name: 'Recruiter Hub', path: '/recruiter' },
  { name: 'Candidate Search', path: '/recruiter/candidates' },
  { name: 'Talent Pool', path: '/recruiter/candidates?tab=pool' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isRecruiterPath = location.pathname.startsWith('/recruiter');

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform border border-white/15">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  HireUpp
                </span>
                <span className="text-[9px] uppercase tracking-widest text-blue-400 font-mono -mt-1 font-semibold">
                  AI Career OS
                </span>
              </div>
            </Link>

            {/* Candidate / Recruiter Mode Badge Switcher */}
            <div className="hidden lg:flex items-center p-1 rounded-full bg-slate-900 border border-white/10 text-xs">
              <Link
                to="/"
                className={clsx(
                  'px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1.5',
                  !isRecruiterPath
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                )}
              >
                <User className="w-3.5 h-3.5" />
                <span>Candidate</span>
              </Link>
              <Link
                to="/recruiter"
                className={clsx(
                  'px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1.5',
                  isRecruiterPath
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                )}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Recruiter</span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {(!isRecruiterPath ? CANDIDATE_LINKS : RECRUITER_LINKS).map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path.split('?')[0]);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={clsx(
                    'px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isRecruiterPath ? (
              <Link
                to="/recruiter"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-colors flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Hire Smarter</span>
              </Link>
            ) : (
              <Link
                to="/"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Candidate Prep</span>
              </Link>
            )}

            <Link
              to="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4 text-slate-400" />
              <span>Login</span>
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs mb-3">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'flex-1 py-1.5 text-center rounded-lg font-medium transition-all',
                    !isRecruiterPath ? 'bg-blue-600 text-white' : 'text-slate-400'
                  )}
                >
                  Candidate View
                </Link>
                <Link
                  to="/recruiter"
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'flex-1 py-1.5 text-center rounded-lg font-medium transition-all',
                    isRecruiterPath ? 'bg-purple-600 text-white' : 'text-slate-400'
                  )}
                >
                  Recruiter View
                </Link>
              </div>

              {(!isRecruiterPath ? CANDIDATE_LINKS : RECRUITER_LINKS).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium',
                    location.pathname === link.path
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  )}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/5 text-slate-200 border border-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
