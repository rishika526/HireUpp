import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AnimatedBackground } from '../ui/AnimatedBackground';

export const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 flex flex-col selection:bg-blue-600/30 selection:text-blue-300">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
